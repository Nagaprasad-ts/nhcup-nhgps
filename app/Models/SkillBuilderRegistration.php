<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillBuilderRegistration extends Model
{
    protected $fillable = [
        'child_name',
        'child_age',
        'programme',
        'parent_name',
        'phone',
        'email',
        'pg_merchant_txn_no',
        'pg_payment_id',
        'payment_status',
        'amount',
        'email_sent',
    ];

    protected $casts = [
        'email_sent' => 'boolean',
        'amount' => 'integer',
    ];
}
