<?php

namespace App\Filament\Resources\EventSettings\Pages;

use App\Filament\Resources\EventSettings\EventSettingResource;
use App\Models\EventSetting;
use Filament\Resources\Pages\ListRecords;

class ListEventSettings extends ListRecords
{
    protected static string $resource = EventSettingResource::class;

    /**
     * Always redirect straight to the single settings record.
     * If none exists yet, create it with defaults first.
     */
    public function mount(): void
    {
        $setting = EventSetting::first() ?? EventSetting::get();

        if (! $setting->exists) {
            $setting->save();
        }

        $this->redirect(EventSettingResource::getUrl('edit', ['record' => $setting]));
    }
}
