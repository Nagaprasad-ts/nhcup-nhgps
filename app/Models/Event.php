<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name',
        'fee',
        'is_active',
    ];

    protected $casts = [
        'fee'       => 'integer',
        'is_active' => 'boolean',
    ];

    // ─── Scopes ────────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // ─── Helpers ────────────────────────────────────────────────────────────────

    // public function feeInRupees(): float
    // {
    //     return $this->fee;
    // }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}