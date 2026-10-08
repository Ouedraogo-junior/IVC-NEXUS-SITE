<?php

use App\Http\Controllers\Api\Admin\PortfolioController as AdminPortfolio;
use App\Http\Controllers\Api\Admin\PostController as AdminPost;
use App\Http\Controllers\Api\Admin\SettingController as AdminSetting;
use App\Http\Controllers\Api\Admin\StatController as AdminStat;
use App\Http\Controllers\Api\Admin\SubmissionController as AdminSubmission;
use App\Http\Controllers\Api\Admin\SummaryController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonial;
use App\Http\Controllers\Api\Admin\UploadController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\SubmissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API publique (lue par le site)
|--------------------------------------------------------------------------
*/
Route::get('/posts', [PublicController::class, 'posts']);
Route::get('/posts/{slug}', [PublicController::class, 'post']);
Route::get('/testimonials', [PublicController::class, 'testimonials']);
Route::get('/stats', [PublicController::class, 'stats']);
Route::get('/portfolio', [PublicController::class, 'portfolio']);
Route::get('/portfolio/{slug}', [PublicController::class, 'portfolioItem']);
Route::get('/settings', [PublicController::class, 'settings']);

// Formulaires : 6 envois par minute et par adresse IP
Route::middleware('throttle:6,1')->group(function () {
    Route::post('/contact', [SubmissionController::class, 'contact']);
    Route::post('/quote', [SubmissionController::class, 'quote']);
});

/*
|--------------------------------------------------------------------------
| Authentification de l'espace d'administration
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    /*
    |----------------------------------------------------------------------
    | API d'administration (connexion obligatoire)
    |----------------------------------------------------------------------
    */
    Route::prefix('admin')->group(function () {
        Route::get('summary', SummaryController::class);

        Route::apiResource('posts', AdminPost::class);
        Route::apiResource('testimonials', AdminTestimonial::class);
        Route::apiResource('stats', AdminStat::class);
        Route::apiResource('portfolio', AdminPortfolio::class)->parameters(['portfolio' => 'item']);

        Route::get('submissions/export', [AdminSubmission::class, 'export']);
        Route::get('submissions/{submission}/attachment', [AdminSubmission::class, 'attachment']);
        Route::apiResource('submissions', AdminSubmission::class)->only(['index', 'show', 'update', 'destroy']);

        Route::get('settings', [AdminSetting::class, 'show']);
        Route::put('settings', [AdminSetting::class, 'update']);

        Route::post('uploads', [UploadController::class, 'store']);
    });
});
