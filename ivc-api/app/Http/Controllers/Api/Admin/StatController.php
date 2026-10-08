<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Stat::orderBy('sort_order')->orderBy('id')->get()]);
    }

    public function show(Stat $stat): JsonResponse
    {
        return response()->json(['data' => $stat]);
    }

    public function store(Request $request): JsonResponse
    {
        $item = Stat::create($this->validated($request));

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, Stat $stat): JsonResponse
    {
        $stat->update($this->validated($request));

        return response()->json(['data' => $stat->fresh()]);
    }

    public function destroy(Stat $stat): JsonResponse
    {
        $stat->delete();

        return response()->json(['ok' => true]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'value' => ['required', 'string', 'max:30'],
            'label_fr' => ['required', 'string', 'max:120'],
            'label_en' => ['nullable', 'string', 'max:120'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ]);
    }
}
