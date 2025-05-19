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
        Schema::create('brgy_events', function (Blueprint $table) {
            $table->id('event_id');
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('category', 100)->nullable();
            $table->dateTime('date_start')->nullable();
            $table->dateTime('date_end')->nullable();
            $table->string('location', 255)->nullable();
            $table->string('organizer', 100)->nullable();
            $table->enum('status', ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'])->default('Scheduled');
            $table->string('image_url', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->enum('priority', ['High', 'Medium', 'Low'])->default('Medium');
            $table->boolean('rsvp_required')->default(false);
            $table->integer('attendance_limit')->nullable();
            $table->string('contact_person', 100)->nullable();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('brgy_events');
    }
};
