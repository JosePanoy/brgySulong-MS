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
        Schema::table('brgysuper_admins', function (Blueprint $table) {
            $table->text('last_edited_by')->nullable()->after('appointed_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('brgysuper_admins', function (Blueprint $table) {
            $table->dropColumn('last_edited_by');
        });
    }
};
