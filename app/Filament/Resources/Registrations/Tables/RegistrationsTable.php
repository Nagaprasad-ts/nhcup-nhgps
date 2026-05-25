<?php

namespace App\Filament\Resources\Registrations\Tables;

use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use App\Exports\RegistrationsExport;
use Filament\Actions\Action;
use Maatwebsite\Excel\Facades\Excel;
use Filament\Actions\ActionGroup;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class RegistrationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('institution_name')
                    ->searchable(),
                TextColumn::make('ped_name')
                    ->searchable(),
                TextColumn::make('captain_name')
                    ->searchable(),
                TextColumn::make('event.name')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('amount')
                    ->money('INR')
                    ->sortable(),
                TextColumn::make('payment_status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'paid' => 'success',
                        'pending' => 'warning',
                        'failed' => 'danger',
                    }),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->timezone('Asia/Kolkata')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->timezone('Asia/Kolkata')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->modifyQueryUsing(function (Builder $query) {
                if (Auth::user()?->hasRole('core-team')) {
                    $query->where('payment_status', 'paid');
                }
            })
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make()
                        ->hiddenLabel(),
                    EditAction::make()
                        ->hiddenLabel(),
                ])
                ->buttonGroup(),
            ])
            ->toolbarActions([
                Action::make('export_all')
                    ->label('Export All')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('info')
                    ->visible(fn () => Auth::user()?->hasRole('super_admin'))
                    ->action(fn () => Excel::download(new RegistrationsExport(false), 'registrations-all.xlsx')),

                Action::make('export_paid')
                    ->label('Export Paid')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->visible(fn () => Auth::user()?->hasRole('super_admin') || Auth::user()?->hasRole('core-team'))
                    ->action(fn () => Excel::download(new RegistrationsExport(true), 'registrations-paid.xlsx')),
            ]);
    }
}
