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
        Schema::create('crop_types_districts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('month')->nullable();
            $table->foreignId('district_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_type_id')->constrained()->cascadeOnDelete();
            $table->double('total_retain', 15, 3)->nullable();
            $table->double('production',15,3)->nullable();
            $table->double('self_sustainability',15,3)->nullable();
            $table->double('self_sustainability_mt',15,3)->nullable();
            $table->double('access_production',15,3)->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_types_districts');
    }
};
