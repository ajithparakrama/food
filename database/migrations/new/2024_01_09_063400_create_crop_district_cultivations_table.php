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
        Schema::create('crop_district_cultivations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('month')->nullable();
            $table->foreignId('district_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_id')->constrained()->cascadeOnDelete();
            $table->double('area', 15, 2)->nullable();
            $table->double('harvest',15,2)->nullable();
            $table->double('expected_harvest',15,2)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_district_cultivations');
    }
};
