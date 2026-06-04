<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SkillBuilderRegistrationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('child_name')
                    ->label('Child\'s Name')
                    ->required()
                    ->maxLength(100),

                Select::make('child_age')
                    ->label('Age')
                    ->required()
                    ->options([
                        '3 years' => '3 years',
                        '4 years' => '4 years',
                        '5 years' => '5 years',
                        '6 years' => '6 years',
                        '7 years' => '7 years',
                        '8 years' => '8 years',
                    ]),

                Select::make('programme')
                    ->required()
                    ->options([
                        'A' => 'A — Brain Builders',
                        'B' => 'B — Confidence & Expression',
                        'C' => 'C — Movement & Sports Foundation',
                        'AB' => 'AB — Brain Builders + Confidence & Expression',
                        'AC' => 'AC — Brain Builders + Movement & Sports',
                        'BC' => 'BC — Confidence & Expression + Movement & Sports',
                        'ABC' => 'ABC — All Three Bundles',
                    ]),

                TextInput::make('parent_name')
                    ->label('Parent\'s Name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('phone')
                    ->tel()
                    ->required()
                    ->maxLength(10),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(150),
            ]);
    }
}
