<!doctype html>
<html lang="{{ $submission->lang }}">
<body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5;">
@if($submission->lang === 'en')
    <p>Hello {{ $submission->name }},</p>
    <p>Thank you for contacting IVC Nexus. We have received your {{ $submission->type === 'quote' ? 'quote request' : 'message' }} and will get back to you as soon as possible.</p>
    <p>Best regards,<br>The IVC Nexus team</p>
@else
    <p>Bonjour {{ $submission->name }},</p>
    <p>Merci d'avoir contacté IVC Nexus. Nous avons bien reçu {{ $submission->type === 'quote' ? 'votre demande de devis' : 'votre message' }} et reviendrons vers vous dans les meilleurs délais.</p>
    <p>Cordialement,<br>L'équipe IVC Nexus</p>
@endif
</body>
</html>
