<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('brgysuper_admins', function (Blueprint $table) {
        $table->id();
        $table->string('fname');
        $table->string('lname');
        $table->string('brgy_position');
        $table->string('phone_number');
        $table->string('email')->unique();
        $table->string('profile_picture')->nullable();
        $table->text('address');
        $table->string('password');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brgy_super_admins');
    }
};
