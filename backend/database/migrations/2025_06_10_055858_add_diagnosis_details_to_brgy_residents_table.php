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
        Schema::table('brgy_residents', function (Blueprint $table) {
            $table->text('diagnosis_details')->after('medical_conditions')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('brgy_residents', function (Blueprint $table) {
            $table->dropColumn('diagnosis_details');
        });
    }
};
