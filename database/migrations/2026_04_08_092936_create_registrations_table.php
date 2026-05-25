<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();

            // Institution & PED Details
            $table->string('institution_name');
            $table->string('ped_name');                        // Physical Education Director
            $table->string('ped_contact', 15);

            // Captain Details
            $table->string('captain_name');
            $table->string('captain_email');
            $table->string('captain_contact', 15);

            // Event
            $table->string('event');

            // Razorpay Payment
            $table->string('razorpay_order_id')->unique()->nullable();
            $table->string('razorpay_payment_id')->unique()->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->unsignedInteger('amount')->default(0);     // in paise (₹ × 100)

            // Email notification flag
            $table->boolean('email_sent')->default(false);

            $table->timestamps();

            $table->index('payment_status');
            $table->index('captain_email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};