<?php

namespace App\Mail;

use App\Models\Submission;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/** Accusé de réception envoyé au visiteur, dans la langue du site qu'il utilisait. */
class SubmissionReceivedMail extends Mailable
{
    public function __construct(public Submission $submission)
    {
    }

    public function envelope(): Envelope
    {
        $subject = $this->submission->lang === 'en'
            ? 'We have received your message — IVC Nexus'
            : 'Nous avons bien reçu votre message — IVC Nexus';

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.submission-received');
    }
}
