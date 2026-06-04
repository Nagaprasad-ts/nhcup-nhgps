<?php

namespace App\Filament\Resources\Programmes\Tables;

use Filament\Actions\ActionGroup;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProgrammesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->label('Key')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'A' => 'pink',
                        'B' => 'info',
                        'C' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('emoji')
                    ->label(''),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('days')
                    ->label('Schedule Days'),

                TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make()->hiddenLabel(),
                    EditAction::make()->hiddenLabel(),
                ])->buttonGroup(),
            ]);
    }
}
