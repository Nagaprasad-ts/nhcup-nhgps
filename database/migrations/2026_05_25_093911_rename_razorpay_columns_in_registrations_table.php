<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->renameColumn('razorpay_order_id', 'pg_merchant_txn_no');
            $table->renameColumn('razorpay_payment_id', 'pg_payment_id');
        });
    }

    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->renameColumn('pg_merchant_txn_no', 'razorpay_order_id');
            $table->renameColumn('pg_payment_id', 'razorpay_payment_id');
        });
    }
};
