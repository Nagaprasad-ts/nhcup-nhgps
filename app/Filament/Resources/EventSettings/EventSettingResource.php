<?php

namespace App\Filament\Resources\EventSettings;

use App\Filament\Resources\EventSettings\Pages\EditEventSetting;
use App\Filament\Resources\EventSettings\Pages\ListEventSettings;
use App\Filament\Resources\EventSettings\Schemas\EventSettingForm;
use App\Models\EventSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class EventSettingResource extends Resource
{
    protected static ?string $model = EventSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static ?string $navigationLabel = 'Event Settings';

    protected static ?int $navigationSort = 3;

    public static function getNavigationGroup(): ?string
    {
        return 'Skill Builder';
    }

    public static function form(Schema $schema): Schema
    {
        return EventSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        // Index page redirects to edit — table is never shown.
        return $table->columns([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEventSettings::route('/'),
            'edit' => EditEventSetting::route('/{record}/edit'),
        ];
    }
}
