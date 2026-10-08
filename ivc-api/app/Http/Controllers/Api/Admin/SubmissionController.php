<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubmissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Submission::orderByDesc('id');

        if (in_array($request->query('type'), ['contact', 'quote'], true)) {
            $query->where('type', $request->query('type'));
        }
        if (in_array($request->query('status'), Submission::STATUSES, true)) {
            $query->where('status', $request->query('status'));
        }

        return response()->json($query->paginate(20)->through(fn (Submission $s) => $s->toAdmin()));
    }

    public function show(Submission $submission): JsonResponse
    {
        // Ouvrir un message le marque comme lu.
        if ($submission->status === 'new') {
            $submission->update(['status' => 'read']);
        }

        return response()->json(['data' => $submission->toAdmin()]);
    }

    public function update(Request $request, Submission $submission): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(Submission::STATUSES)],
        ]);
        $submission->update($data);

        return response()->json(['data' => $submission->toAdmin()]);
    }

    public function destroy(Submission $submission): JsonResponse
    {
        $submission->delete();

        return response()->json(['ok' => true]);
    }

    public function export(): StreamedResponse
    {
        $headers = ['Date', 'Type', 'Nom', 'E-mail', 'Téléphone', 'Organisation', 'Profil',
            'Service', 'Budget', 'Date souhaitée', 'Message', 'Statut'];

        return response()->streamDownload(function () use ($headers) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF"); // BOM : Excel lit correctement les accents
            fputcsv($out, $headers, ',', '"', '');

            Submission::orderByDesc('id')->chunk(200, function ($rows) use ($out) {
                foreach ($rows as $s) {
                    fputcsv($out, array_map([$this, 'safeCell'], [
                        $s->created_at?->format('Y-m-d H:i'), $s->type, $s->name, $s->email, $s->phone,
                        $s->organisation, $s->profile, $s->service, $s->budget,
                        $s->desired_date?->toDateString(), $s->message, $s->status,
                    ]), ',', '"', '');
                }
            });

            fclose($out);
        }, 'messages-ivc-nexus.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /** Empêche qu'une cellule commençant par = + - @ soit interprétée comme une formule par Excel. */
    private function safeCell(?string $value): string
    {
        $value = (string) $value;

        return preg_match('/^[=+\-@\t\r]/', $value) ? "'".$value : $value;
    }
}
