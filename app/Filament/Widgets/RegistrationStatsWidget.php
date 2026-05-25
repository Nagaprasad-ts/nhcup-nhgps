<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class RegistrationStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isPaid = Auth::user()?->hasRole('core-team');

        $baseQuery     = fn () => Registration::query()->when($isPaid, fn ($q) => $q->where('payment_status', 'paid'));
        $total         = $baseQuery()->count();
        $paid          = $baseQuery()->where('payment_status', 'paid')->count();
        $pending       = Registration::where('payment_status', '!=', 'paid')->count();
        $totalRevenue  = $baseQuery()->where('payment_status', 'paid')->sum('amount');

        $stats = [
            Stat::make('Total Registrations', $total)
                ->icon('heroicon-o-users')
                ->description('All registrations')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info'),

            Stat::make('Paid Registrations', $paid)
                ->icon('heroicon-o-check-circle')
                ->description('Completed payments')
                ->descriptionIcon('heroicon-m-check')
                ->color('success'),

            Stat::make('Total Revenue', '₹' . number_format($totalRevenue))
                ->icon('heroicon-o-currency-rupee')
                ->description('From paid registrations')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('warning'),
        ];

        if (!$isPaid) {
            $stats[] = Stat::make('Pending Registrations', $pending)
                ->icon('heroicon-o-clock')
                ->description('Awaiting payment')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger');
        }

        return $stats;
    }
}