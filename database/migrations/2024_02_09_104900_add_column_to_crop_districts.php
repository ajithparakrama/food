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
        Schema::table('crop_districts', function (Blueprint $table) {
            $table->double('total_retain_mt', 15, 3)->nullable();
            $table->double('total_retain', 15, 3)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crop_districts', function (Blueprint $table) {
            $table->dropColumn('total_retain_mt');
            $table->dropColumn('total_retain');
        });
    }
};
