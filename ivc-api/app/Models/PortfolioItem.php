<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'slug', 'translations', 'media_types', 'sector_types', 'cover_image',
        'gallery', 'video_url', 'year', 'is_published', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'translations' => 'array',
            'media_types' => 'array',
            'sector_types' => 'array',
            'gallery' => 'array',
            'is_published' => 'boolean',
            'year' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function toPublic(): array
    {
        $fr = $this->translations['fr'] ?? [];
        $en = $this->translations['en'] ?? [];

        // Pour chaque champ : si la version anglaise est vide, on retombe sur le français.
        $merged = [];
        foreach (config('ivc.portfolio_fields') as $field) {
            $merged[$field] = [
                'fr' => $fr[$field] ?? null,
                'en' => ($en[$field] ?? null) ?: ($fr[$field] ?? null),
            ];
        }

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'content' => $merged,
            'media_types' => $this->media_types ?? [],
            'sector_types' => $this->sector_types ?? [],
            'cover' => Media::url($this->cover_image),
            'gallery' => array_map(fn ($p) => Media::url($p), $this->gallery ?? []),
            'video_url' => $this->video_url,
            'year' => $this->year,
        ];
    }

    public function toAdmin(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'translations' => $this->translations,
            'media_types' => $this->media_types ?? [],
            'sector_types' => $this->sector_types ?? [],
            'cover_image' => $this->cover_image,
            'cover' => Media::url($this->cover_image),
            'gallery' => $this->gallery ?? [],
            'gallery_urls' => array_map(fn ($p) => Media::url($p), $this->gallery ?? []),
            'video_url' => $this->video_url,
            'year' => $this->year,
            'is_published' => $this->is_published,
            'sort_order' => $this->sort_order,
        ];
    }
}
