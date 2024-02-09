<?php

use App\Models\district;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ecs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 100)->nullable();
            $table->softDeletes();
            $table->foreignIdFor(district::class)->constrained();
           // $table->foreignId('district_id')->constrained()->cascadeOnDelete(); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ecs');
    }
};
