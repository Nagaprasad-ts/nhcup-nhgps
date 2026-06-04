<?php

namespace App\Mail;

use App\Models\SkillBuilderRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SkillBuilderRegistrationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly SkillBuilderRegistration $registration) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Skill Builder Registration Confirmed — New Horizon Gurukul Pre School',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.skill-builder-registration-confirmed',
            with: [
                'registration' => $this->registration,
            ],
        );
    }
}
