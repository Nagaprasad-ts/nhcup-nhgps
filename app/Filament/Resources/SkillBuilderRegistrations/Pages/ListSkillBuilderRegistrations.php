<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Pages;

use App\Filament\Resources\SkillBuilderRegistrations\SkillBuilderRegistrationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSkillBuilderRegistrations extends ListRecords
{
    protected static string $resource = SkillBuilderRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
