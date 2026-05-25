<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\Auth;

class EventRevenueChart extends ChartWidget
{
    protected ?string $heading = 'Event-wise Revenue';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $query = Registration::query()
            ->where('payment_status', 'paid')
            ->with('event')
            ->selectRaw('event_id, SUM(amount) as total')
            ->groupBy('event_id')
            ->get();

        return [
            'datasets' => [
                [
                    'label'           => 'Revenue (₹)',
                    'data'            => $query->pluck('total')->toArray(),
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                    ],
                    'borderColor' => [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(139, 92, 246)',
                        'rgb(236, 72, 153)',
                    ],
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $query->map(fn ($r) => $r->event?->name ?? 'Unknown')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}