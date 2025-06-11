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
        Schema::create('brgy_issuance', function (Blueprint $table) {
            $table->increments('issuance_id');
            $table->unsignedInteger('inventory_id');
            $table->string('issued_to', 255);
            $table->string('position', 100);
            $table->string('purpose', 255);
            $table->integer('quantity_issued')->unsigned();
            $table->date('date_issued');
            $table->date('expected_return')->nullable();
            $table->date('date_returned')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('inventory_id')->references('inventory_id')->on('brgy_inventory')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brgy_issuance');
    }
};
