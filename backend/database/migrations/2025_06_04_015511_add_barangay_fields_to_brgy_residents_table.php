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
            $table->date('birthdate')->nullable()->after('address');
            $table->enum('gender', ['Male', 'Female', 'Other'])->after('birthdate');
            $table->enum('civil_status', ['Single', 'Married', 'Widowed', 'Divorced'])->after('gender');
            $table->string('household_no', 50)->nullable()->after('civil_status');
            $table->boolean('is_household_head')->default(false)->after('household_no');
            $table->enum('voter_status', ['Registered', 'Not Registered'])->nullable()->after('is_household_head');
            $table->string('precinct_no', 50)->nullable()->after('voter_status');
            $table->boolean('pwd_status')->default(false)->after('precinct_no');
            $table->boolean('solo_parent')->default(false)->after('pwd_status');
            $table->boolean('senior_citizen')->default(false)->after('solo_parent');
            $table->string('employment_status', 100)->nullable()->after('senior_citizen');
            $table->string('education_level', 100)->nullable()->after('employment_status');
            $table->string('religion', 100)->nullable()->after('education_level');
            $table->string('emergency_contact', 255)->nullable()->after('religion');
            $table->text('medical_conditions')->nullable()->after('emergency_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('brgy_residents', function (Blueprint $table) {
            $table->dropColumn([
                'birthdate',
                'gender',
                'civil_status',
                'household_no',
                'is_household_head',
                'voter_status',
                'precinct_no',
                'pwd_status',
                'solo_parent',
                'senior_citizen',
                'employment_status',
                'education_level',
                'religion',
                'emergency_contact',
                'medical_conditions',
            ]);
        });
    }
};
