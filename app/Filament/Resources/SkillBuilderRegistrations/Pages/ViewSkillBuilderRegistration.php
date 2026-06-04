<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Pages;

use App\Filament\Resources\SkillBuilderRegistrations\SkillBuilderRegistrationResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSkillBuilderRegistration extends ViewRecord
{
    protected static string $resource = SkillBuilderRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
