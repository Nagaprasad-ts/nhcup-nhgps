<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_settings', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('weekday_time');
            $table->string('weekend_time');
            $table->string('phone', 20);
            $table->unsignedTinyInteger('age_group_min')->default(3);
            $table->unsignedTinyInteger('age_group_max')->default(8);
            $table->unsignedInteger('fee_1_bundle');
            $table->unsignedInteger('fee_2_bundles');
            $table->unsignedInteger('fee_3_bundles');
            $table->date('registration_open_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_settings');
    }
};
