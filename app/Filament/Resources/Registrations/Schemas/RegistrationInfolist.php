<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class RegistrationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Institution Details & Event Name')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('institution_name'),
                        TextEntry::make('event.name')
                            ->label('Event Name'),
                        TextEntry::make('ped_name'),
                        TextEntry::make('ped_contact'),
                    ]),

                Section::make('Captain Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('captain_name'),
                        TextEntry::make('captain_email'),
                        TextEntry::make('captain_contact'),
                    ]),

                Section::make('Payment Details')
                    ->columns(4)
                    ->columnSpanFull()
                    ->schema([
                        TextEntry::make('amount')
                            ->money('INR'),
                        TextEntry::make('payment_status'),
                        TextEntry::make('razorpay_order_id')
                            ->placeholder('-'),
                        TextEntry::make('razorpay_payment_id')
                            ->placeholder('-'),
                        IconEntry::make('email_sent')
                            ->boolean(),
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->timezone('Asia/Kolkata')
                            ->placeholder('-'),

                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->timezone('Asia/Kolkata')
                            ->placeholder('-'),
                    ]),
            ]);
    }
}