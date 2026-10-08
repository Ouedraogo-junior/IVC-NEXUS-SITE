<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Testimonial::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json(['data' => $testimonial]);
    }

    public function store(Request $request): JsonResponse
    {
        $item = Testimonial::create($this->validated($request));

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $testimonial->update($this->validated($request));

        return response()->json(['data' => $testimonial->fresh()]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(['ok' => true]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'author' => ['required', 'string', 'max:120'],
            'role_fr' => ['nullable', 'string', 'max:160'],
            'role_en' => ['nullable', 'string', 'max:160'],
            'quote_fr' => ['required', 'string', 'max:1000'],
            'quote_en' => ['nullable', 'string', 'max:1000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_visible' => ['boolean'],
        ]);
    }
}
