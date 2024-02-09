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
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 100)->unique();
            $table->softDeletes();
            $table->foreignId('crop_type_id')->constrained()->cascadeOnDelete();
          //  $table->tinyInteger('type')->default(1)->comment('up country/ low country/ tuber crops');
            $table->integer('harvesting_at')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop');
    }
};
