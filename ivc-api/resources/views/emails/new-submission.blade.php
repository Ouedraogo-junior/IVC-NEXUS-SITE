<!doctype html>
<html lang="fr">
<body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5;">
    <h2 style="margin:0 0 12px;">
        {{ $submission->type === 'quote' ? 'Nouvelle demande de devis' : 'Nouveau message de contact' }}
    </h2>

    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr><td><strong>Nom</strong></td><td>{{ $submission->name }}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>{{ $submission->email }}</td></tr>
        @if($submission->phone)<tr><td><strong>Téléphone</strong></td><td>{{ $submission->phone }}</td></tr>@endif
        @if($submission->organisation)<tr><td><strong>Organisation</strong></td><td>{{ $submission->organisation }}</td></tr>@endif
        @if($submission->profile)<tr><td><strong>Profil</strong></td><td>{{ $submission->profile }}</td></tr>@endif
        @if($submission->service)<tr><td><strong>Service</strong></td><td>{{ $submission->service }}</td></tr>@endif
        @if($submission->budget)<tr><td><strong>Budget estimatif</strong></td><td>{{ $submission->budget }}</td></tr>@endif
        @if($submission->desired_date)<tr><td><strong>Date souhaitée</strong></td><td>{{ $submission->desired_date->format('d/m/Y') }}</td></tr>@endif
        @if($submission->attachment_name)<tr><td><strong>Pièce jointe</strong></td><td>{{ $submission->attachment_name }} (à télécharger depuis l’espace d’administration)</td></tr>@endif
        <tr><td><strong>Langue du site</strong></td><td>{{ strtoupper($submission->lang) }}</td></tr>
    </table>

    <h3 style="margin:18px 0 6px;">Message</h3>
    <p style="white-space: pre-line;">{{ $submission->message }}</p>

    <p style="color:#666; font-size: 12px;">Répondre à ce mail répond directement au visiteur.</p>
</body>
</html>