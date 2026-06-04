<?php

namespace App\Http\Controllers;

use App\Models\EventSetting;
use App\Models\Programme;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'programmes' => Programme::orderBy('sort_order')->get()->map(fn ($p) => [
                'key' => $p->key,
                'emoji' => $p->emoji,
                'name' => $p->name,
                'subtitle' => $p->subtitle,
                'full_desc' => $p->full_desc,
                'days' => $p->days,
                'experience' => $p->experience,
                'activities' => $p->activities,
                'outcome_text' => $p->outcome_text,
            ])->values(),
            'event' => self::eventData(),
        ]);
    }

    /**
     * Shared helper — returns a plain array suitable for Inertia props.
     */
    public static function eventData(): array
    {
        $s = EventSetting::get();

        return [
            'start_date' => $s->start_date?->format('d M Y') ?? '15 Jun 2026',
            'end_date' => $s->end_date?->format('d M Y') ?? '13 Mar 2027',
            'start_date_raw' => $s->start_date?->toDateString() ?? '2026-06-15',
            'end_date_raw' => $s->end_date?->toDateString() ?? '2027-03-13',
            'weekday_time' => $s->weekday_time ?? '1:30 PM – 2:30 PM',
            'weekend_time' => $s->weekend_time ?? '10:30 AM – 11:30 AM',
            'phone' => $s->phone ?? '+91 9606911078',
            'age_group_min' => $s->age_group_min ?? 3,
            'age_group_max' => $s->age_group_max ?? 8,
            'fee_1_bundle' => $s->fee_1_bundle ?? 10000,
            'fee_2_bundles' => $s->fee_2_bundles ?? 17000,
            'fee_3_bundles' => $s->fee_3_bundles ?? 21000,
            'registration_open_date' => $s->registration_open_date?->format('M d, Y') ?? 'May 01, 2026',
        ];
    }
}
