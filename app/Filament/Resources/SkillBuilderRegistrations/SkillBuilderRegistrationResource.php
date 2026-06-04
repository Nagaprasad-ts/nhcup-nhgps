<?php

namespace App\Filament\Resources\SkillBuilderRegistrations;

use App\Filament\Resources\SkillBuilderRegistrations\Pages\CreateSkillBuilderRegistration;
use App\Filament\Resources\SkillBuilderRegistrations\Pages\EditSkillBuilderRegistration;
use App\Filament\Resources\SkillBuilderRegistrations\Pages\ListSkillBuilderRegistrations;
use App\Filament\Resources\SkillBuilderRegistrations\Pages\ViewSkillBuilderRegistration;
use App\Filament\Resources\SkillBuilderRegistrations\Schemas\SkillBuilderRegistrationForm;
use App\Filament\Resources\SkillBuilderRegistrations\Schemas\SkillBuilderRegistrationInfolist;
use App\Filament\Resources\SkillBuilderRegistrations\Tables\SkillBuilderRegistrationsTable;
use App\Models\SkillBuilderRegistration;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SkillBuilderRegistrationResource extends Resource
{
    protected static ?string $model = SkillBuilderRegistration::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Skill Builder';

    protected static ?int $navigationSort = 1;

    public static function getNavigationGroup(): ?string
    {
        return 'Skill Builder';
    }

    public static function form(Schema $schema): Schema
    {
        return SkillBuilderRegistrationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SkillBuilderRegistrationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SkillBuilderRegistrationsTable::configure($table);
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::count();
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSkillBuilderRegistrations::route('/'),
            'create' => CreateSkillBuilderRegistration::route('/create'),
            'view' => ViewSkillBuilderRegistration::route('/{record}'),
            'edit' => EditSkillBuilderRegistration::route('/{record}/edit'),
        ];
    }
}
