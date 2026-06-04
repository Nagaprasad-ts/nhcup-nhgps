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
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->char('key', 3)->unique()->comment('A | B | C');
            $table->string('emoji', 10);
            $table->string('name');
            $table->string('subtitle');
            $table->string('short_desc')->comment('Short tagline used on Register form');
            $table->text('full_desc')->comment('Full paragraph for Programmes section');
            $table->string('days');
            $table->string('schedule')->comment('Short schedule summary for Register form');
            $table->json('experience')->comment('Bullet list: What Children Experience');
            $table->json('activities')->comment('Activity tags array');
            $table->text('outcome_text')->comment('Outcome paragraph for Programmes card');
            $table->json('about_outcomes')->comment('Bullet list for About page');
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
