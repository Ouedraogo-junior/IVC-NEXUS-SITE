<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => Setting::map()]);
    }

    public function update(Request $request): JsonResponse
    {
        $rules = [];
        foreach (config('ivc.setting_keys') as $key) {
            $rules[$key] = $key === 'email'
                ? ['nullable', 'email', 'max:190']
                : ['nullable', 'string', 'max:255'];
        }

        $data = $request->validate($rules);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return response()->json(['data' => Setting::map()]);
    }
}
