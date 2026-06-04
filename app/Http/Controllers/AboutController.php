<?php

namespace App\Http\Controllers;

use App\Models\Programme;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About', [
            'programmes' => Programme::orderBy('sort_order')->get()->map(fn ($p) => [
                'key' => $p->key,
                'emoji' => $p->emoji,
                'name' => $p->name,
                'desc' => $p->full_desc,
                'outcomes' => $p->about_outcomes,
                'days' => $p->days,
            ])->values(),
            'event' => HomeController::eventData(),
        ]);
    }
}
