<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSetting extends Model
{
    protected $fillable = [
        'start_date',
        'end_date',
        'weekday_time',
        'weekend_time',
        'phone',
        'age_group_min',
        'age_group_max',
        'fee_1_bundle',
        'fee_2_bundles',
        'fee_3_bundles',
        'registration_open_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'registration_open_date' => 'date',
        'age_group_min' => 'integer',
        'age_group_max' => 'integer',
        'fee_1_bundle' => 'integer',
        'fee_2_bundles' => 'integer',
        'fee_3_bundles' => 'integer',
    ];

    /**
     * Retrieve the single event settings row, or a sensible default.
     */
    public static function get(): self
    {
        return static::firstOrNew([], [
            'start_date' => '2026-06-15',
            'end_date' => '2027-03-13',
            'weekday_time' => '1:30 PM – 2:30 PM',
            'weekend_time' => '10:30 AM – 11:30 AM',
            'phone' => '+91 9606911078',
            'age_group_min' => 3,
            'age_group_max' => 8,
            'fee_1_bundle' => 10000,
            'fee_2_bundles' => 17000,
            'fee_3_bundles' => 21000,
            'registration_open_date' => '2026-05-01',
        ]);
    }

    /**
     * Return fees keyed by bundle count.
     *
     * @return array<int,int>
     */
    public function feesMap(): array
    {
        return [
            1 => $this->fee_1_bundle,
            2 => $this->fee_2_bundles,
            3 => $this->fee_3_bundles,
        ];
    }
}
