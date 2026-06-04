<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    protected $fillable = [
        'key',
        'emoji',
        'name',
        'subtitle',
        'short_desc',
        'full_desc',
        'days',
        'schedule',
        'experience',
        'activities',
        'outcome_text',
        'about_outcomes',
        'sort_order',
    ];

    protected $casts = [
        'experience' => 'array',
        'activities' => 'array',
        'about_outcomes' => 'array',
        'sort_order' => 'integer',
    ];
}
