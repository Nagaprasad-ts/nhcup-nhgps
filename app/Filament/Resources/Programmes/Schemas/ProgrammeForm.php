<?php

namespace App\Filament\Resources\Programmes\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProgrammeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Identity')
                    ->columns(3)
                    ->schema([
                        Select::make('key')
                            ->label('Programme Key')
                            ->required()
                            ->options(['A' => 'A', 'B' => 'B', 'C' => 'C'])
                            ->unique(ignoreRecord: true),

                        TextInput::make('emoji')
                            ->required()
                            ->maxLength(10),

                        TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0),
                    ]),

                Section::make('Names & Descriptions')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(100),

                        TextInput::make('subtitle')
                            ->required()
                            ->maxLength(150)
                            ->helperText('Short tagline shown under the programme name'),

                        TextInput::make('short_desc')
                            ->label('Short Description')
                            ->required()
                            ->maxLength(100)
                            ->helperText('Used on the Register form (e.g. "Thinking, Logic & Problem-Solving")'),

                        Textarea::make('full_desc')
                            ->label('Full Description')
                            ->required()
                            ->rows(4)
                            ->helperText('Full paragraph shown on the Programmes section'),
                    ]),

                Section::make('Schedule')
                    ->columns(2)
                    ->schema([
                        TextInput::make('days')
                            ->required()
                            ->maxLength(50)
                            ->helperText('e.g. Mon & Thu'),

                        TextInput::make('schedule')
                            ->required()
                            ->maxLength(150)
                            ->helperText('e.g. Mon: Chess, Puzzles · Thu: Abacus'),
                    ]),

                Section::make('Content')
                    ->schema([
                        Repeater::make('experience')
                            ->label('What Children Experience (bullet list)')
                            ->simple(TextInput::make('item')->required())
                            ->required()
                            ->minItems(1)
                            ->reorderable()
                            ->collapsible(),

                        Repeater::make('activities')
                            ->label('Activity Tags')
                            ->simple(TextInput::make('item')->required())
                            ->required()
                            ->minItems(1)
                            ->reorderable()
                            ->collapsible(),

                        Textarea::make('outcome_text')
                            ->label('Outcome Text')
                            ->required()
                            ->rows(3)
                            ->helperText('Outcome paragraph shown on the Programmes card'),

                        Repeater::make('about_outcomes')
                            ->label('About Page Outcomes (bullet list)')
                            ->simple(TextInput::make('item')->required())
                            ->required()
                            ->minItems(1)
                            ->reorderable()
                            ->collapsible(),
                    ]),
            ]);
    }
}
