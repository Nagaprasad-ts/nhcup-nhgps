<?php

namespace App\Filament\Resources\SkillBuilderRegistrations\Pages;

use App\Filament\Resources\SkillBuilderRegistrations\SkillBuilderRegistrationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSkillBuilderRegistration extends EditRecord
{
    protected static string $resource = SkillBuilderRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
