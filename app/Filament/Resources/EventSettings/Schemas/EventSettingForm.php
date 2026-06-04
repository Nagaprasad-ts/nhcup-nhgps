<?php

namespace App\Filament\Resources\EventSettings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EventSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Programme Duration')
                    ->columns(2)
                    ->schema([
                        DatePicker::make('start_date')
                            ->label('Start Date')
                            ->required()
                            ->displayFormat('d M Y'),

                        DatePicker::make('end_date')
                            ->label('End Date')
                            ->required()
                            ->displayFormat('d M Y'),

                        DatePicker::make('registration_open_date')
                            ->label('Registration Opens On')
                            ->required()
                            ->displayFormat('d M Y'),
                    ]),

                Section::make('Session Timings')
                    ->columns(2)
                    ->schema([
                        TextInput::make('weekday_time')
                            ->label('Weekday Timing (Mon–Fri)')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('1:30 PM – 2:30 PM'),

                        TextInput::make('weekend_time')
                            ->label('Weekend Timing (Sat & Sun)')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('10:30 AM – 11:30 AM'),
                    ]),

                Section::make('Fees (₹)')
                    ->columns(3)
                    ->schema([
                        TextInput::make('fee_1_bundle')
                            ->label('Any One Bundle')
                            ->required()
                            ->numeric()
                            ->prefix('₹'),

                        TextInput::make('fee_2_bundles')
                            ->label('Any Two Bundles')
                            ->required()
                            ->numeric()
                            ->prefix('₹'),

                        TextInput::make('fee_3_bundles')
                            ->label('All Three Bundles')
                            ->required()
                            ->numeric()
                            ->prefix('₹'),
                    ]),

                Section::make('Contact & Eligibility')
                    ->columns(3)
                    ->schema([
                        TextInput::make('phone')
                            ->label('Contact Phone / WhatsApp')
                            ->required()
                            ->maxLength(20),

                        TextInput::make('age_group_min')
                            ->label('Min Age (years)')
                            ->required()
                            ->numeric()
                            ->minValue(1),

                        TextInput::make('age_group_max')
                            ->label('Max Age (years)')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                    ]),
            ]);
    }
}
