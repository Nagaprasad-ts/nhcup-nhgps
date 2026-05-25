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
        if (Schema::hasColumn('registrations', 'event')) {
            Schema::table('registrations', function (Blueprint $table) {
                $table->dropColumn('event');
            });
        }
        
        Schema::table('registrations', function (Blueprint $table) {
            $table->foreignId('event_id')->after('captain_contact')->nullable()->constrained('events');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropForeign(['event_id']);
            $table->dropColumn('event_id');
            $table->string('event')->after('captain_contact');
        });
    }
};
