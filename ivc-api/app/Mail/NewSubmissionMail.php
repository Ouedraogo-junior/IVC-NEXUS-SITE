<?php

namespace App\Mail;

use App\Models\Submission;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/** Notification envoyée à l'agence à chaque nouveau message / demande de devis. */
class NewSubmissionMail extends Mailable
{
    public function __construct(public Submission $submission)
    {
    }

    public function envelope(): Envelope
    {
        $label = $this->submission->type === 'quote' ? 'Demande de devis' : 'Message de contact';

        return new Envelope(
            subject: "[IVC Nexus] {$label} — {$this->submission->name}",
            replyTo: [new Address($this->submission->email, $this->submission->name)],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.new-submission');
    }
}
