<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NewSubmissionMail;
use App\Mail\SubmissionReceivedMail;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubmissionController extends Controller
{
    public function contact(Request $request): JsonResponse
    {
        return $this->handle($request, 'contact');
    }

    public function quote(Request $request): JsonResponse
    {
        return $this->handle($request, 'quote');
    }

    private function handle(Request $request, string $type): JsonResponse
    {
        // Champ piège invisible pour les humains : s'il est rempli, c'est un robot.
        // On répond "ok" sans rien enregistrer pour ne pas l'aider à s'adapter.
        if ($request->filled('website')) {
            return response()->json(['ok' => true]);
        }

        $rules = [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'consent' => ['nullable', 'boolean'],
            'lang' => ['nullable', 'in:fr,en'],
        ];

        if ($type === 'quote') {
            $rules += [
                'organisation' => ['nullable', 'string', 'max:160'],
                'profile' => ['nullable', 'string', 'max:80'],
                'service' => ['nullable', 'string', 'max:80'],
                'budget' => ['nullable', 'string', 'max:80'],
                'desired_date' => ['nullable', 'date'],
            ];
        }

        $data = $request->validate($rules);

        // Un nom ne contient jamais de retour à la ligne (évite l'injection d'en-têtes de mail).
        $data['name'] = trim(preg_replace('/\s+/', ' ', $data['name']));

        $submission = Submission::create(array_merge($data, [
            'type' => $type,
            'consent' => (bool) ($data['consent'] ?? false),
            'lang' => $data['lang'] ?? 'fr',
            'ip' => $request->ip(),
            'user_agent' => mb_substr((string) $request->userAgent(), 0, 255),
        ]));

        // Le message est déjà enregistré : un souci d'envoi de mail ne doit pas faire échouer la demande.
        if ($to = config('ivc.notify_to')) {
            try {
                Mail::to($to)->send(new NewSubmissionMail($submission));
            } catch (\Throwable $e) {
                report($e);
            }
        }

        try {
            Mail::to($submission->email)->send(new SubmissionReceivedMail($submission));
        } catch (\Throwable $e) {
            report($e);
        }

        return response()->json(['ok' => true], 201);
    }
}
