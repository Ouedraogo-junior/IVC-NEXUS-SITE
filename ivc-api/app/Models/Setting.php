<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    /** Tous les réglages connus sous forme clé => valeur (null si non renseigné). */
    public static function map(): array
    {
        $stored = static::query()->pluck('value', 'key')->all();
        $out = [];
        foreach (config('ivc.setting_keys') as $key) {
            $out[$key] = $stored[$key] ?? null;
        }

        return $out;
    }
}
