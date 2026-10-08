<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'author', 'role_fr', 'role_en', 'quote_fr', 'quote_en', 'sort_order', 'is_visible',
    ];

    protected function casts(): array
    {
        return ['is_visible' => 'boolean', 'sort_order' => 'integer'];
    }

    public function toPublic(): array
    {
        return [
            'id' => $this->id,
            'author' => $this->author,
            'role' => ['fr' => $this->role_fr, 'en' => $this->role_en ?: $this->role_fr],
            'quote' => ['fr' => $this->quote_fr, 'en' => $this->quote_en ?: $this->quote_fr],
        ];
    }
}
