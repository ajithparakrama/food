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
        Schema::create('to_sms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('month')->nullable();
            $table->foreignId('district_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_id')->constrained()->cascadeOnDelete();
          //  $table->foreignId('ecs_id')->constrained()->cascadeOnDelete();
            // Example migration snippet
            // $table->unsignedBigInteger('to_id');
            // $table->foreign('to_id')->references('id')->on('districts')->onDelete('cascade');

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
        Schema::dropIfExists('to_sms');
    }
};
