<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SkillBuilderRegistrationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Child Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('child_name')
                            ->label('Child\'s Name'),
                        TextEntry::make('child_age')
                            ->label('Age'),
                        TextEntry::make('programme')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'A' => 'pink',
                                'B' => 'info',
                                'C' => 'success',
                                'All ABC' => 'warning',
                                default => 'gray',
                            }),
                    ]),

                Section::make('Parent / Guardian Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('parent_name')
                            ->label('Parent\'s Name'),
                        TextEntry::make('phone'),
                        TextEntry::make('email')
                            ->placeholder('—'),
                    ]),

                Section::make('Payment')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('payment_status')
                            ->label('Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'paid' => 'success',
                                'pending' => 'warning',
                                'failed' => 'danger',
                                default => 'gray',
                            }),
                        TextEntry::make('amount')
                            ->label('Amount')
                            ->prefix('₹'),
                        TextEntry::make('pg_merchant_txn_no')
                            ->label('Merchant Txn No')
                            ->placeholder('—'),
                        TextEntry::make('pg_payment_id')
                            ->label('Payment ID')
                            ->placeholder('—'),
                    ]),

                Section::make('Record')
                    ->columns(2)
                    ->collapsed()
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Registered At')
                            ->dateTime(),
                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ]),
            ]);
    }
}
