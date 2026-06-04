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
        Schema::create('skill_builder_registrations', function (Blueprint $table) {
            $table->id();

            // Child details
            $table->string('child_name');
            $table->string('child_age');          // e.g. "3 years", "5 years"

            // Programme — A | B | C | All ABC
            $table->string('programme');

            // Parent / guardian details
            $table->string('parent_name');
            $table->string('phone', 10);
            $table->string('email');

            // ICICI PG Direct Payment
            $table->string('pg_merchant_txn_no')->unique()->nullable();
            $table->string('pg_payment_id')->unique()->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->unsignedInteger('amount')->default(0);  // in rupees

            // Email notification flag
            $table->boolean('email_sent')->default(false);

            $table->timestamps();

            $table->index('phone');
            $table->index('programme');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skill_builder_registrations');
    }
};
