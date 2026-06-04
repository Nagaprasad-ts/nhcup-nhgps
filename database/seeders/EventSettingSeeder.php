<?php

namespace Database\Seeders;

use App\Models\EventSetting;
use Illuminate\Database\Seeder;

class EventSettingSeeder extends Seeder
{
    public function run(): void
    {
        EventSetting::truncate();

        EventSetting::create([
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
}
