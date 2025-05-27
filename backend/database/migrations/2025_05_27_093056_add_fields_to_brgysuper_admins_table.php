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
        Schema::table('brgysuper_admins', function (Blueprint $table) {
            $table->string('position_status')->after('brgy_position');
            $table->date('term_start_date')->nullable()->after('updated_at');
            $table->date('term_end_date')->nullable()->after('term_start_date');
            $table->string('appointed_by')->nullable()->after('term_end_date');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('brgysuper_admins', function (Blueprint $table) {
            $table->dropColumn(['position_status', 'term_start_date', 'term_end_date', 'appointed_by']);
        });
    }
};
