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
            $table->enum('diagnosis_status', ['Ongoing', 'Recovered', 'Critical', 'Under Observation'])->nullable()->after('diagnosis_details');
            $table->string('attending_physician')->nullable()->after('diagnosis_status');
            $table->date('date_diagnosed')->nullable()->after('attending_physician');
            $table->string('medications')->nullable()->after('date_diagnosed');
            $table->date('last_checkup')->nullable()->after('medications');
            $table->text('medical_remarks')->nullable()->after('last_checkup');
            $table->text('family_medical_history')->nullable()->after('medical_remarks');
            $table->text('medical_files')->nullable()->after('family_medical_history');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('brgy_residents', function (Blueprint $table) {
            $table->dropColumn([
                'diagnosis_status',
                'attending_physician',
                'date_diagnosed',
                'medications',
                'last_checkup',
                'medical_remarks',
                'family_medical_history',
                'medical_files'
            ]);
        });
    }
};
