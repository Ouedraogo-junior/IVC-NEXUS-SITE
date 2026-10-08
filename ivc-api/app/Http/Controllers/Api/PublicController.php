<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function posts(Request $request): JsonResponse
    {
        $query = Post::published()->orderByDesc('published_at')->orderByDesc('id');

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        $page = $query->paginate(12)->through(fn (Post $p) => $p->toPublic());

        return response()->json($page);
    }

    public function post(string $slug): JsonResponse
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        return response()->json(['data' => $post->toPublic(true)]);
    }

    public function testimonials(): JsonResponse
    {
        $items = Testimonial::where('is_visible', true)->orderBy('sort_order')->orderBy('id')->get();

        return response()->json(['data' => $items->map->toPublic()->values()]);
    }

    public function stats(): JsonResponse
    {
        $items = Stat::orderBy('sort_order')->orderBy('id')->get();

        return response()->json(['data' => $items->map->toPublic()->values()]);
    }

    public function portfolio(): JsonResponse
    {
        $items = PortfolioItem::where('is_published', true)
            ->orderBy('sort_order')->orderByDesc('id')->get();

        return response()->json(['data' => $items->map->toPublic()->values()]);
    }

    public function portfolioItem(string $slug): JsonResponse
    {
        $item = PortfolioItem::where('is_published', true)->where('slug', $slug)->firstOrFail();

        return response()->json(['data' => $item->toPublic()]);
    }

    public function settings(): JsonResponse
    {
        return response()->json(['data' => Setting::map()]);
    }
}
