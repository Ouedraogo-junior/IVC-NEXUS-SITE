<?php

namespace Tests\Feature;

use App\Mail\NewSubmissionMail;
use App\Mail\SubmissionReceivedMail;
use App\Models\Post;
use App\Models\Stat;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    private function makePost(array $overrides = []): Post
    {
        return Post::create($overrides + [
            'title' => 'Titre',
            'slug' => 'titre-'.uniqid(),
            'category' => 'Communication',
            'content' => '<p>Contenu</p>',
            'is_published' => true,
            'published_at' => now()->subDay(),
        ]);
    }

    public function test_public_posts_list_contains_only_published_posts(): void
    {
        $visible = $this->makePost(['title' => 'Visible']);
        $this->makePost(['title' => 'Brouillon', 'is_published' => false, 'published_at' => null]);
        $this->makePost(['title' => 'Futur', 'published_at' => now()->addWeek()]);

        $response = $this->getJson('/api/posts')->assertOk();

        $this->assertCount(1, $response->json('data'));
        $this->assertSame($visible->slug, $response->json('data.0.slug'));
    }

    public function test_draft_post_is_not_found_publicly(): void
    {
        $draft = $this->makePost(['is_published' => false, 'published_at' => null]);

        $this->getJson('/api/posts/'.$draft->slug)->assertNotFound();
    }

    public function test_public_stats_are_returned_in_both_languages(): void
    {
        Stat::create(['value' => '50+', 'label_fr' => 'Projets', 'label_en' => 'Projects']);

        $this->getJson('/api/stats')
            ->assertOk()
            ->assertJsonPath('data.0.value', '50+')
            ->assertJsonPath('data.0.label.en', 'Projects');
    }

    public function test_admin_routes_require_authentication(): void
    {
        $this->getJson('/api/admin/posts')->assertUnauthorized();
        $this->postJson('/api/admin/posts', [])->assertUnauthorized();
        $this->getJson('/api/admin/submissions')->assertUnauthorized();
        $this->getJson('/api/me')->assertUnauthorized();
    }

    public function test_admin_can_create_a_post_and_dangerous_html_is_removed(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->postJson('/api/admin/posts', [
            'title' => 'Mon premier article',
            'category' => 'Marketing',
            'content' => '<p>ok</p><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">piège</a>',
            'is_published' => true,
        ])->assertCreated();

        $content = $response->json('data.content');
        $this->assertStringContainsString('<p>ok</p>', $content);
        $this->assertStringNotContainsString('<script', $content);
        $this->assertStringNotContainsString('onerror', $content);
        $this->assertStringNotContainsString('javascript:', $content);
        $this->assertSame('mon-premier-article', $response->json('data.slug'));
        $this->assertNotNull($response->json('data.published_at'));
    }

    public function test_post_rejects_unknown_category_and_foreign_cover_path(): void
    {
        $this->actingAs(User::factory()->create());

        $this->postJson('/api/admin/posts', [
            'title' => 'X', 'category' => 'Inconnue', 'content' => '<p>a</p>',
        ])->assertUnprocessable()->assertJsonValidationErrors('category');

        $this->postJson('/api/admin/posts', [
            'title' => 'X', 'category' => 'Branding', 'content' => '<p>a</p>',
            'cover_image' => '../../.env',
        ])->assertUnprocessable()->assertJsonValidationErrors('cover_image');
    }

    public function test_duplicate_titles_get_unique_slugs(): void
    {
        $this->actingAs(User::factory()->create());
        $payload = ['title' => 'Même titre', 'category' => 'Communication', 'content' => '<p>a</p>'];

        $first = $this->postJson('/api/admin/posts', $payload)->json('data.slug');
        $second = $this->postJson('/api/admin/posts', $payload)->json('data.slug');

        $this->assertSame('meme-titre', $first);
        $this->assertSame('meme-titre-2', $second);
    }

    public function test_contact_form_is_stored_and_both_mails_are_sent(): void
    {
        Mail::fake();
        config(['ivc.notify_to' => 'agence@example.test']);

        $this->postJson('/api/contact', [
            'name' => "Awa\nTraoré",
            'email' => 'awa@example.test',
            'message' => 'Bonjour, je souhaite un rendez-vous.',
            'lang' => 'fr',
        ])->assertCreated();

        $this->assertDatabaseHas('submissions', [
            'type' => 'contact', 'name' => 'Awa Traoré', 'email' => 'awa@example.test', 'status' => 'new',
        ]);
        Mail::assertSent(NewSubmissionMail::class);
        Mail::assertSent(SubmissionReceivedMail::class);
    }

    public function test_quote_form_keeps_the_extra_fields(): void
    {
        Mail::fake();

        $this->postJson('/api/quote', [
            'name' => 'Ibrahim', 'email' => 'ibrahim@example.test', 'message' => 'Besoin d’un film institutionnel.',
            'organisation' => 'ONG Espoir', 'profile' => 'ONG & Associations',
            'service' => 'production', 'budget' => '1 000 000 – 2 500 000 FCFA',
            'desired_date' => '2026-12-01', 'consent' => true,
        ])->assertCreated();

        $this->assertDatabaseHas('submissions', [
            'type' => 'quote', 'organisation' => 'ONG Espoir', 'service' => 'production', 'consent' => 1,
        ]);
    }

    public function test_honeypot_submissions_are_silently_dropped(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', [
            'name' => 'Robot', 'email' => 'bot@example.test', 'message' => 'spam spam spam',
            'website' => 'http://spam.example',
        ])->assertOk();

        $this->assertSame(0, Submission::count());
        Mail::assertNothingSent();
    }

    public function test_contact_form_validation_errors(): void
    {
        $this->postJson('/api/contact', ['name' => '', 'email' => 'pas-un-mail', 'message' => 'a'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_login_succeeds_with_good_credentials_and_fails_with_bad_ones(): void
    {
        $user = User::factory()->create(['password' => 'mot-de-passe-solide']);
        $stateful = ['Origin' => 'http://localhost'];

        $this->postJson('/api/login', ['email' => $user->email, 'password' => 'faux'], $stateful)
            ->assertUnprocessable();

        $this->postJson('/api/login', ['email' => $user->email, 'password' => 'mot-de-passe-solide'], $stateful)
            ->assertOk()
            ->assertJsonPath('user.email', $user->email);
    }

    public function test_admin_can_mark_a_submission_as_done_and_export_csv(): void
    {
        $this->actingAs(User::factory()->create());
        $s = Submission::create([
            'type' => 'contact', 'name' => '=HYPERLINK("x")', 'email' => 'a@example.test', 'message' => 'Bonjour',
        ]);

        $this->patchJson('/api/admin/submissions/'.$s->id, ['status' => 'done'])
            ->assertOk()->assertJsonPath('data.status', 'done');

        $csv = $this->get('/api/admin/submissions/export')->assertOk()->streamedContent();
        $this->assertStringContainsString("'=HYPERLINK", $csv);
    }
}
