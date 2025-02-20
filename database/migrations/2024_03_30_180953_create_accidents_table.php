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
        Schema::create('accidents', function (Blueprint $table) {
            $table->id('id_accident');
            $table->unsignedBigInteger('id_vehicule');
            $table->foreign('id_vehicule')->references('id_vehicule')->on('vehicules')->cascadeOnDelete();
            $table->unsignedBigInteger('id');
            $table->foreign('id')->references('id')->on('employes')->cascadeOnDelete();
            $table->date('date_accident');
            $table->string('lieu');
            $table->string('degats');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accidents');
    }
};