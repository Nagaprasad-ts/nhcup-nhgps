<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class RegistrationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('institution_name')
                    ->required(),
                TextInput::make('ped_name')
                    ->required(),
                TextInput::make('ped_contact')
                    ->required(),
                TextInput::make('captain_name')
                    ->required(),
                TextInput::make('captain_email')
                    ->email()
                    ->required(),
                TextInput::make('captain_contact')
                    ->required(),
                TextInput::make('razorpay_order_id'),
                TextInput::make('razorpay_payment_id'),
                TextInput::make('payment_status')
                    ->required()
                    ->default('pending'),
                TextInput::make('amount')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('email_sent')
                    ->required(),
                TextInput::make('event_id')
                    ->numeric(),
            ]);
    }
}
