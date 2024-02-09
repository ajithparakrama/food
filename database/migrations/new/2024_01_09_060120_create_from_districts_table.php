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
        Schema::create('from_districts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('month')->nullable();
            $table->foreignId('district_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_id')->constrained()->cascadeOnDelete();
// Example migration snippet
            $table->unsignedBigInteger('from_id');
            $table->foreign('from_id')->references('id')->on('districts')->onDelete('cascade');

            $table->double('app_precentage', 15, 4)->nullable();
            $table->double('app_mt', 15, 4)->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('from_districts');
    }
};
