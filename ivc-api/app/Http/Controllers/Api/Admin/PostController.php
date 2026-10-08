<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\HtmlCleaner;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::orderByDesc('created_at')->get();

        return response()->json(['data' => $posts->map(fn (Post $p) => $p->toAdmin(false))->values()]);
    }

    public function show(Post $post): JsonResponse
    {
        return response()->json(['data' => $post->toAdmin()]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlug($data['slug'] ?? $data['title']);
        $data = $this->prepare($data);

        $post = Post::create($data);

        return response()->json(['data' => $post->toAdmin()], 201);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlug($data['slug'] ?? $post->slug, $post->id);
        $data = $this->prepare($data);

        // Si la couverture change, l'ancien fichier n'a plus d'utilité.
        if ($post->cover_image && $post->cover_image !== ($data['cover_image'] ?? null)) {
            Storage::disk('public')->delete($post->cover_image);
        }

        $post->update($data);

        return response()->json(['data' => $post->fresh()->toAdmin()]);
    }

    public function destroy(Post $post): JsonResponse
    {
        if ($post->cover_image) {
            Storage::disk('public')->delete($post->cover_image);
        }
        $post->delete();

        return response()->json(['ok' => true]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'slug' => ['nullable', 'string', 'max:200'],
            'excerpt' => ['nullable', 'string', 'max:400'],
            'category' => ['required', Rule::in(config('ivc.categories'))],
            'cover_image' => ['nullable', 'string', 'max:255', Media::pathRule()],
            'content' => ['required', 'string'],
            'is_published' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ]);
    }

    private function prepare(array $data): array
    {
        $data['content'] = HtmlCleaner::clean($data['content']);
        $data['is_published'] = (bool) ($data['is_published'] ?? false);

        // Publié sans date : on prend maintenant. Brouillon : la date n'a pas de sens.
        if ($data['is_published'] && empty($data['published_at'])) {
            $data['published_at'] = now();
        }
        if (! $data['is_published']) {
            $data['published_at'] = $data['published_at'] ?? null;
        }

        return $data;
    }

    private function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $slug = Str::slug($base) ?: 'article';
        $candidate = $slug;
        $i = 2;

        while (Post::where('slug', $candidate)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $candidate = $slug.'-'.$i++;
        }

        return $candidate;
    }
}
