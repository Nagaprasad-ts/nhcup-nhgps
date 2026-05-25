<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'institution_name',
        'ped_name',
        'ped_contact',
        'captain_name',
        'captain_email',
        'captain_contact',
        'event_id',
        'razorpay_order_id',
        'razorpay_payment_id',
        'payment_status',
        'amount',
        'email_sent',
    ];

    protected $casts = [
        'email_sent' => 'boolean',
        'amount'     => 'integer',
        'event_id'   => 'integer',
    ];

    // ─── Scopes ────────────────────────────────────────────────────────────────

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    public function scopePending($query)
    {
        return $query->where('payment_status', 'pending');
    }

    // ─── Helpers ────────────────────────────────────────────────────────────────

    /** Returns the registration fee in rupees (display-friendly). */
    public function amountInRupees(): float
    {
        return $this->amount;
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}