<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Tables;

use App\Exports\SkillBuilderRegistrationExport;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Maatwebsite\Excel\Facades\Excel;

class SkillBuilderRegistrationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('child_name')
                    ->label('Child')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('child_age')
                    ->label('Age')
                    ->sortable(),

                TextColumn::make('programme')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'A' => 'pink',
                        'B' => 'info',
                        'C' => 'success',
                        'AB' => 'purple',
                        'AC' => 'warning',
                        'BC' => 'danger',
                        'ABC' => 'gray',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('parent_name')
                    ->label('Parent')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->searchable(),

                TextColumn::make('payment_status')
                    ->label('Payment')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'paid' => 'success',
                        'pending' => 'warning',
                        'failed' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('amount')
                    ->label('Amount')
                    ->prefix('₹')
                    ->numeric(thousandsSeparator: ',')
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Registered')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('programme')
                    ->options([
                        'A' => 'A — Brain Builders',
                        'B' => 'B — Confidence & Expression',
                        'C' => 'C — Movement & Sports Foundation',
                        'AB' => 'AB — Brain Builders + Confidence & Expression',
                        'AC' => 'AC — Brain Builders + Movement & Sports',
                        'BC' => 'BC — Confidence & Expression + Movement & Sports',
                        'ABC' => 'ABC — All Three Bundles',
                    ]),

                SelectFilter::make('payment_status')
                    ->label('Payment Status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'failed' => 'Failed',
                    ]),

                SelectFilter::make('child_age')
                    ->label('Age')
                    ->options([
                        '3 years' => '3 years',
                        '4 years' => '4 years',
                        '5 years' => '5 years',
                        '6 years' => '6 years',
                        '7 years' => '7 years',
                        '8 years' => '8 years',
                    ]),
            ])
            ->toolbarActions([
                Action::make('exportAll')
                    ->label('Export All')
                    ->icon(Heroicon::OutlinedArrowDownTray)
                    ->color('success')
                    ->visible(fn (): bool => auth()->user()?->hasRole('super_admin') ?? false)
                    ->action(fn () => Excel::download(
                        new SkillBuilderRegistrationExport,
                        'skill-builder-all-'.now()->format('Ymd-His').'.xlsx'
                    )),

                Action::make('exportPaid')
                    ->label('Export Paid')
                    ->icon(Heroicon::OutlinedArrowDownTray)
                    ->color('info')
                    ->visible(fn (): bool => auth()->user()?->hasAnyRole(['super_admin', 'core-team']) ?? false)
                    ->action(fn () => Excel::download(
                        new SkillBuilderRegistrationExport('paid'),
                        'skill-builder-paid-'.now()->format('Ymd-His').'.xlsx'
                    )),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make()->hiddenLabel(),
                    EditAction::make()->hiddenLabel(),
                ])->buttonGroup(),
            ]);
    }
}
