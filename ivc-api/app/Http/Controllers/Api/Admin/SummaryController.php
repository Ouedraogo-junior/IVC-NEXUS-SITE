<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Models\Post;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;

class SummaryController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'new_submissions' => Submission::where('status', 'new')->count(),
            'total_submissions' => Submission::count(),
            'posts_published' => Post::where('is_published', true)->count(),
            'posts_draft' => Post::where('is_published', false)->count(),
            'portfolio_published' => PortfolioItem::where('is_published', true)->count(),
        ]]);
    }
}
