<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        $items = PortfolioItem::orderBy('sort_order')->orderByDesc('id')->get();

        return response()->json(['data' => $items->map->toAdmin()->values()]);
    }

    public function show(PortfolioItem $item): JsonResponse
    {
        return response()->json(['data' => $item->toAdmin()]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->prepare($this->validated($request));
        $data['slug'] = $this->uniqueSlug($data['slug'] ?: ($data['translations']['fr']['title'] ?? ''));

        $item = PortfolioItem::create($data);

        return response()->json(['data' => $item->toAdmin()], 201);
    }

    public function update(Request $request, PortfolioItem $item): JsonResponse
    {
        $data = $this->prepare($this->validated($request));
        $data['slug'] = $this->uniqueSlug($data['slug'] ?: $item->slug, $item->id);

        // Nettoyage des fichiers qui ne sont plus utilisés.
        $old = array_filter(array_merge([$item->cover_image], $item->gallery ?? []));
        $new = array_filter(array_merge([$data['cover_image'] ?? null], $data['gallery'] ?? []));
        foreach (array_diff($old, $new) as $path) {
            Storage::disk('public')->delete($path);
        }

        $item->update($data);

        return response()->json(['data' => $item->fresh()->toAdmin()]);
    }

    public function destroy(PortfolioItem $item): JsonResponse
    {
        foreach (array_filter(array_merge([$item->cover_image], $item->gallery ?? [])) as $path) {
            Storage::disk('public')->delete($path);
        }
        $item->delete();

        return response()->json(['ok' => true]);
    }

    private function validated(Request $request): array
    {
        $rules = [
            'slug' => ['nullable', 'string', 'max:200'],
            'translations' => ['required', 'array'],
            'translations.fr' => ['required', 'array'],
            'translations.fr.title' => ['required', 'string', 'max:200'],
            'translations.en' => ['nullable', 'array'],
            'media_types' => ['nullable', 'array', 'max:10'],
            'media_types.*' => ['string', 'max:60'],
            'sector_types' => ['nullable', 'array', 'max:10'],
            'sector_types.*' => ['string', 'max:60'],
            'cover_image' => ['nullable', 'string', 'max:255', Media::pathRule()],
            'gallery' => ['nullable', 'array', 'max:12'],
            'gallery.*' => ['string', 'max:255', Media::pathRule()],
            'video_url' => ['nullable', 'url', 'max:300'],
            'year' => ['nullable', 'integer', 'between:2000,2100'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ];

        foreach (['fr', 'en'] as $lang) {
            foreach (config('ivc.portfolio_fields') as $field) {
                $rules["translations.$lang.$field"] = $field === 'title' && $lang === 'fr'
                    ? ['required', 'string', 'max:200']
                    : ['nullable', 'string', 'max:5000'];
            }
        }

        return $request->validate($rules);
    }

    /** Ne garde que les champs attendus dans les traductions. */
    private function prepare(array $data): array
    {
        $clean = [];
        foreach (['fr', 'en'] as $lang) {
            foreach (config('ivc.portfolio_fields') as $field) {
                $clean[$lang][$field] = $data['translations'][$lang][$field] ?? null;
            }
        }
        $data['translations'] = $clean;
        $data['is_published'] = (bool) ($data['is_published'] ?? false);
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['media_types'] = array_values($data['media_types'] ?? []);
        $data['sector_types'] = array_values($data['sector_types'] ?? []);
        $data['gallery'] = array_values($data['gallery'] ?? []);

        return $data;
    }

    private function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $slug = Str::slug($base) ?: 'realisation';
        $candidate = $slug;
        $i = 2;

        while (PortfolioItem::where('slug', $candidate)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $candidate = $slug.'-'.$i++;
        }

        return $candidate;
    }
}
