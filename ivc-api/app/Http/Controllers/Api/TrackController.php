<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Models\Post;
use App\Models\Visit;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Compteur de visites sans cookie.
 * Le visiteur est reconnu par une empreinte (IP + navigateur + date + clé secrète du site) qui change chaque jour :
 * on ne peut ni remonter à la personne, ni la suivre d'un jour à l'autre. L'adresse IP n'est jamais enregistrée.
 */
class TrackController extends Controller
{
    private const BOTS = '/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|java\/|go-http|axios|node-fetch|okhttp|scrapy|httpclient/i';

    public function store(Request $request): Response
    {
        $ua = (string) $request->userAgent();

        // Robots, outils automatiques et visiteurs qui refusent le suivi : on ne compte pas.
        if ($ua === '' || preg_match(self::BOTS, $ua)
            || $request->header('DNT') === '1' || $request->header('Sec-GPC') === '1') {
            return response()->noContent();
        }

        $path = $this->cleanPath((string) $request->input('path', ''));
        if ($path === null) {
            return response()->noContent();
        }

        $day = now()->toDateString();
        $key = [
            'visited_on' => $day,
            'visitor' => substr(hash_hmac('sha256', $request->ip().'|'.$ua.'|'.$day, (string) config('app.key')), 0, 16),
            'path' => $path,
        ];

        if ($visit = Visit::where($key)->first()) {
            $visit->increment('hits');
        } else {
            try {
                Visit::create($key + [
                    'referrer' => $this->cleanReferrer($request),
                    'device' => $this->device($ua),
                ]);
            } catch (QueryException) {
                // deux requêtes simultanées du même visiteur : l'autre a gagné, on ajoute simplement un affichage
                Visit::where($key)->increment('hits');
            }
        }

        return response()->noContent();
    }

    /** Ne garde que les pages réelles du site (liste dans config/ivc.php, articles et réalisations publiés). */
    private function cleanPath(string $raw): ?string
    {
        $path = parse_url($raw, PHP_URL_PATH);
        if (! is_string($path) || $path === '' || $path[0] !== '/') {
            return null;
        }

        $path = '/'.trim((string) preg_replace('#/+#', '/', $path), '/');
        if (strlen($path) > 200 || ! preg_match('#^/[A-Za-z0-9/_\-.~%]*$#', $path)) {
            return null;
        }

        if (in_array($path, config('ivc.tracked_pages'), true)) {
            return $path;
        }
        if (preg_match('#^/blog/([A-Za-z0-9_\-]+)$#', $path, $m)) {
            return Post::published()->where('slug', $m[1])->exists() ? $path : null;
        }
        if (preg_match('#^/realisations/([A-Za-z0-9_\-]+)$#', $path, $m)) {
            return PortfolioItem::where('is_published', true)->where('slug', $m[1])->exists() ? $path : null;
        }

        return null;
    }

    /** Provenance : le nom de domaine seulement (google.com), jamais l'adresse complète. */
    private function cleanReferrer(Request $request): ?string
    {
        $host = parse_url((string) $request->input('referrer', ''), PHP_URL_HOST);
        if (! is_string($host)) {
            return null;
        }

        $host = (string) preg_replace('/^www\./', '', strtolower($host));
        $own = (string) preg_replace('/^www\./', '', strtolower($request->getHost()));

        if ($host === '' || $host === $own || strlen($host) > 120 || ! preg_match('/^[a-z0-9.\-]+$/', $host)) {
            return null;
        }

        return $host;
    }

    private function device(string $ua): string
    {
        if (preg_match('/iPad|Tablet|Android(?!.*Mobile)/i', $ua)) {
            return 'tablet';
        }

        return preg_match('/Mobi|iPhone|Android/i', $ua) ? 'mobile' : 'desktop';
    }
}
