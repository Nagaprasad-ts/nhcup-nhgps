<?php

namespace App\Filament\Resources\EventSettings\Pages;

use App\Filament\Resources\EventSettings\EventSettingResource;
use Filament\Resources\Pages\EditRecord;

class EditEventSetting extends EditRecord
{
    protected static string $resource = EventSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [];   // No delete — this is the single settings row.
    }
}
