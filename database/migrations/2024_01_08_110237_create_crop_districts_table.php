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
        Schema::create('crop_districts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('cultivated_date')->nullable();
            $table->foreignId('district_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_id')->constrained()->cascadeOnDelete();
            $table->double('cultivated_land', 15, 3)->nullable();
            $table->double('actual_harvest_mt',15,3)->nullable();
            $table->double('cultivation_changes_ha',15,3)->nullable();
            $table->string('reason_for_changes',100)->nullable();

            $table->double('self_sustainability_mt',15,3)->nullable();
            // $table->double('access_production',15,3)->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_districts');
    }
};
