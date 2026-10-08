<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    protected $fillable = ['value', 'label_fr', 'label_en', 'sort_order'];

    protected function casts(): array
    {
        return ['sort_order' => 'integer'];
    }

    public function toPublic(): array
    {
        return [
            'id' => $this->id,
            'value' => $this->value,
            'label' => ['fr' => $this->label_fr, 'en' => $this->label_en ?: $this->label_fr],
        ];
    }
}
