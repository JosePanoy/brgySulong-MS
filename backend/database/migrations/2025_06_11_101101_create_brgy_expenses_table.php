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
        Schema::create('brgy_expenses', function (Blueprint $table) {
            $table->increments('expense_id');
            $table->unsignedInteger('inventory_id')->nullable();
            $table->enum('expense_category', ['Operational', 'Event', 'Relief', 'Capital']);
            $table->text('description');
            $table->integer('quantity')->unsigned()->nullable();
            $table->decimal('unit_cost', 12, 2)->nullable();
            $table->decimal('total_cost', 12, 2);
            $table->string('vendor', 255);
            $table->string('payment_method', 100);
            $table->date('purchase_date');
            $table->string('receipt_document')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('inventory_id')->references('inventory_id')->on('brgy_inventory')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brgy_expenses');
    }
};
