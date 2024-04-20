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
        Schema::create('trajets', function (Blueprint $table) {
            $table->id('id_trajet');
            $table->unsignedBigInteger('id');
            $table->foreign('id')->references('id')->on('employes')->cascadeOnDelete();
            $table->unsignedBigInteger('id_vehicule');
            $table->foreign('id_vehicule')->references('id_vehicule')->on('vehicules')->cascadeOnDelete();
            $table->string('type');
            $table->string('lieu_debut_trajet');
            $table->string('lieu_fin_trajet');
            $table->float('environ_total');
            $table->date('date_debut_trajet');
            $table->date('date_fin_trajet');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trajets');
    }
};