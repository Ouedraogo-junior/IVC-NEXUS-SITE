<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    public const STATUSES = ['new', 'read', 'done'];

    protected $fillable = [
        'type', 'name', 'email', 'phone', 'organisation', 'profile', 'service',
        'budget', 'desired_date', 'message', 'attachment_path', 'attachment_name',
        'consent', 'lang', 'status', 'ip', 'user_agent',
    ];

    protected function casts(): array
    {
        return ['consent' => 'boolean', 'desired_date' => 'date'];
    }

    public function toAdmin(): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'organisation' => $this->organisation,
            'profile' => $this->profile,
            'service' => $this->service,
            'budget' => $this->budget,
            'desired_date' => $this->desired_date?->toDateString(),
            'message' => $this->message,
            'has_attachment' => (bool) $this->attachment_path,
            'attachment_name' => $this->attachment_name,
            'consent' => $this->consent,
            'lang' => $this->lang,
            'status' => $this->status,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}