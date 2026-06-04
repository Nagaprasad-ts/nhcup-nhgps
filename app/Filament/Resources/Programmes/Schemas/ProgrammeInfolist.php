<?php

namespace App\Filament\Resources\Programmes\Schemas;

use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProgrammeInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Identity')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('key')
                            ->label('Key')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'A' => 'pink',
                                'B' => 'info',
                                'C' => 'success',
                                default => 'gray',
                            }),

                        TextEntry::make('emoji')
                            ->label('Emoji'),

                        TextEntry::make('sort_order')
                            ->label('Sort Order'),
                    ]),

                Section::make('Names & Descriptions')
                    ->schema([
                        TextEntry::make('name'),

                        TextEntry::make('subtitle'),

                        TextEntry::make('short_desc')
                            ->label('Short Description'),

                        TextEntry::make('full_desc')
                            ->label('Full Description')
                            ->columnSpanFull(),
                    ]),

                Section::make('Schedule')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('days'),
                        TextEntry::make('schedule'),
                    ]),

                Section::make('Content')
                    ->schema([
                        RepeatableEntry::make('experience')
                            ->label('What Children Experience')
                            ->schema([
                                TextEntry::make('item')->hiddenLabel(),
                            ])
                            ->columnSpanFull(),

                        RepeatableEntry::make('activities')
                            ->label('Activities')
                            ->schema([
                                TextEntry::make('item')->hiddenLabel(),
                            ])
                            ->columnSpanFull(),

                        TextEntry::make('outcome_text')
                            ->label('Outcome Text')
                            ->columnSpanFull(),

                        RepeatableEntry::make('about_outcomes')
                            ->label('About Page Outcomes')
                            ->schema([
                                TextEntry::make('item')->hiddenLabel(),
                            ])
                            ->columnSpanFull(),
                    ]),

                Section::make('Timestamps')
                    ->columns(2)
                    ->collapsed()
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime(),
                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ]),
            ]);
    }
}
