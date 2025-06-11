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
    { {
            Schema::create('brgy_inventory', function (Blueprint $table) {
                $table->increments('inventory_id');
                $table->string('item_name', 255);
                $table->text('description')->nullable();
                $table->integer('quantity_total')->unsigned();
                $table->integer('quantity_available')->unsigned();
                $table->string('unit', 50);
                $table->enum('condition_status', ['Good', 'Damaged', 'Needs Repair']);
                $table->date('last_maintenance_date')->nullable();
                $table->string('unique_identifier', 100)->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brgy_inventory');
    }
};
