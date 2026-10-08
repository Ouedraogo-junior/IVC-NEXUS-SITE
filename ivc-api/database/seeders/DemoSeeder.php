<?php

namespace Database\Seeders;

use App\Models\PortfolioItem;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Données de démonstration pour tester en local.
 * Lancer : php artisan db:seed --class=DemoSeeder
 * À NE PAS lancer en production avec ces textes d'exemple.
 */
class DemoSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'phone_1' => '+226 70 94 98 32',
            'phone_2' => '+226 54 10 20 15',
            'email' => 'ivcnexus@gmail.com',
            'address' => 'Ouagadougou, Burkina Faso',
        ] as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        if (Stat::count() === 0) {
            foreach ([
                ['50+', 'Projets réalisés', 'Projects delivered'],
                ['30+', 'Clients accompagnés', 'Clients supported'],
                ['5', 'Expertises', 'Areas of expertise'],
                ['100%', 'Engagement', 'Commitment'],
            ] as $i => [$value, $fr, $en]) {
                Stat::create(['value' => $value, 'label_fr' => $fr, 'label_en' => $en, 'sort_order' => $i]);
            }
        }

        if (Testimonial::count() === 0) {
            Testimonial::create([
                'author' => 'Nom Prénom (exemple)',
                'role_fr' => 'Fonction, Organisation',
                'role_en' => 'Role, Organisation',
                'quote_fr' => 'Témoignage d’exemple à remplacer par un vrai retour client.',
                'quote_en' => 'Sample testimonial to be replaced with real client feedback.',
            ]);
        }

        if (Post::count() === 0) {
            Post::create([
                'title' => 'Article de démonstration',
                'slug' => 'article-de-demonstration',
                'excerpt' => 'Un premier article pour vérifier que le blog lit bien la base de données.',
                'category' => 'Communication',
                'content' => '<p>Ceci est un article de test. Il peut être modifié ou supprimé depuis l’espace d’administration.</p><h2>Un sous-titre</h2><p>Du contenu avec du <strong>gras</strong> et une <a href="https://example.com" target="_blank">lien</a>.</p>',
                'is_published' => true,
                'published_at' => now()->subDay(),
            ]);
        }

        if (PortfolioItem::count() === 0) {
            PortfolioItem::create([
                'slug' => 'realisation-exemple',
                'translations' => [
                    'fr' => [
                        'title' => 'Réalisation d’exemple',
                        'summary' => 'Un projet pour tester l’affichage.',
                        'context' => 'Contexte du projet.',
                        'need' => 'Besoin exprimé par le client.',
                        'solution' => 'Réponse apportée par IVC Nexus.',
                        'result' => 'Résultat obtenu.',
                    ],
                    'en' => [
                        'title' => 'Sample project',
                        'summary' => 'A project to test the display.',
                        'context' => 'Project context.',
                        'need' => 'Need expressed by the client.',
                        'solution' => 'Solution provided by IVC Nexus.',
                        'result' => 'Outcome.',
                    ],
                ],
                'media_types' => ['video'],
                'sector_types' => ['entreprise'],
                'year' => 2026,
                'is_published' => true,
            ]);
        }
    }
}
