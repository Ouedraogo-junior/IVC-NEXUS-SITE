<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    /** Change le mot de passe du compte connecté (le mot de passe actuel est exigé). */
    public function updatePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string', 'current_password:web'],
            'password' => ['required', 'string', 'min:8', 'max:200', 'confirmed', 'different:current_password'],
        ], [
            'current_password.required' => 'Saisissez votre mot de passe actuel.',
            'current_password.current_password' => 'Le mot de passe actuel est incorrect.',
            'password.required' => 'Saisissez un nouveau mot de passe.',
            'password.min' => 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'password.max' => 'Le nouveau mot de passe est trop long.',
            'password.confirmed' => 'Les deux mots de passe ne correspondent pas.',
            'password.different' => 'Le nouveau mot de passe doit être différent de l’actuel.',
        ]);

        $request->user()->forceFill(['password' => Hash::make($data['password'])])->save();

        // Nouvel identifiant de session : l'ancien ne peut plus être rejoué.
        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        return response()->json(['ok' => true]);
    }
}