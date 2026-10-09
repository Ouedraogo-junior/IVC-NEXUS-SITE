<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $days = min(90, max(7, (int) $request->query('days', 30)));
        $today = now()->startOfDay();
        $range = [$today->copy()->subDays($days - 1)->toDateString(), $today->toDateString()];

        // Un "visiteur-jour" = une personne anonyme venue au moins une fois ce jour-là.
        $visitorDays = Visit::whereBetween('visited_on', $range)
            ->selectRaw('visited_on, visitor, max(device) as device, max(referrer) as referrer, sum(hits) as hits')
            ->groupBy('visited_on', 'visitor')
            ->get();

        $byDay = $visitorDays->groupBy('visited_on');
        $series = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = $today->copy()->subDays($i)->toDateString();
            $rows = $byDay->get($date, collect());
            $series[] = ['date' => $date, 'visitors' => $rows->count(), 'views' => (int) $rows->sum('hits')];
        }

        $pages = Visit::whereBetween('visited_on', $range)
            ->selectRaw('path, sum(hits) as views, count(*) as visitors')
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(fn ($p) => ['path' => $p->path, 'views' => (int) $p->views, 'visitors' => (int) $p->visitors]);

        $referrers = $visitorDays->whereNotNull('referrer')
            ->groupBy('referrer')
            ->map(fn ($g) => $g->count())
            ->sortDesc()
            ->take(8)
            ->map(fn ($count, $source) => ['source' => (string) $source, 'visitors' => $count])
            ->values();

        $devices = ['mobile' => 0, 'tablet' => 0, 'desktop' => 0];
        foreach ($visitorDays->groupBy('device') as $device => $rows) {
            if (isset($devices[$device])) {
                $devices[$device] = $rows->count();
            }
        }

        $last = end($series);

        return response()->json(['data' => [
            'days' => $days,
            'totals' => [
                'visitors' => $visitorDays->count(),
                'views' => (int) $visitorDays->sum('hits'),
                'today' => ['visitors' => $last['visitors'], 'views' => $last['views']],
            ],
            'series' => $series,
            'pages' => $pages,
            'referrers' => $referrers,
            'devices' => $devices,
            'direct' => $visitorDays->whereNull('referrer')->count(),
        ]]);
    }
}
