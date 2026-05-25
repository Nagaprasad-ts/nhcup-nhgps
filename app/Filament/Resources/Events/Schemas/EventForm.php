<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('fee')
                    ->required()
                    ->prefix('₹')
                    ->numeric(),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
