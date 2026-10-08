<?php

namespace App\Support;

class Media
{
    /** URL relative d'un fichier du disque "public" (servi via /storage). */
    public static function url(?string $path): ?string
    {
        return $path ? '/storage/'.ltrim($path, '/') : null;
    }

    /** Règle de validation : un chemin issu de notre endpoint d'upload, rien d'autre. */
    public static function pathRule(): string
    {
        return 'regex:#^uploads/[A-Za-z0-9/_.-]+$#';
    }
}
