<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

/**
 * Enregistre une image envoyée depuis l'admin : vérifie que c'est bien une image,
 * la redresse (EXIF), la réduit à 1600 px de large et la convertit en WebP.
 */
class ImageStore
{
    private const MAX_WIDTH = 1600;

    /** @return string chemin relatif sur le disque "public" (ex. uploads/2026/10/xxxx.webp) */
    public function store(UploadedFile $file, string $dir = 'uploads'): string
    {
        $path = $file->getRealPath();
        $info = @getimagesize($path);
        if (! $info) {
            throw new InvalidArgumentException('Fichier image invalide.');
        }

        $img = match ($info[2]) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_WEBP => @imagecreatefromwebp($path),
            default => false,
        };
        if (! $img) {
            throw new InvalidArgumentException("Format d'image non pris en charge (JPG, PNG ou WebP).");
        }

        if (! imageistruecolor($img)) {
            imagepalettetotruecolor($img);
        }

        if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
            $img = $this->fixOrientation($img, $path);
        }

        if (imagesx($img) > self::MAX_WIDTH) {
            $scaled = imagescale($img, self::MAX_WIDTH, -1, IMG_BICUBIC);
            if ($scaled) {
                $img = $scaled;
            }
        }

        imagesavealpha($img, true);

        $webp = function_exists('imagewebp');
        ob_start();
        $webp ? imagewebp($img, null, 82) : imagejpeg($img, null, 85);
        $data = (string) ob_get_clean();

        $relative = trim($dir, '/').'/'.date('Y/m').'/'.Str::uuid().'.'.($webp ? 'webp' : 'jpg');
        Storage::disk('public')->put($relative, $data);

        return $relative;
    }

    private function fixOrientation(\GdImage $img, string $path): \GdImage
    {
        $exif = @exif_read_data($path);
        $rotation = match ($exif['Orientation'] ?? 1) {
            3 => 180,
            6 => -90,
            8 => 90,
            default => 0,
        };

        if ($rotation !== 0) {
            $rotated = imagerotate($img, $rotation, 0);
            if ($rotated) {
                return $rotated;
            }
        }

        return $img;
    }
}
