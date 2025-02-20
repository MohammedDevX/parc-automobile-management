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
        Schema::create('reparations', function (Blueprint $table) {
            $table->id('id_reparation');
            $table->unsignedBigInteger('id_vehicule');
            $table->foreign('id_vehicule')->references('id_vehicule')->on('vehicules')->cascadeOnDelete();
            $table->date('date_debut_reparation');
            $table->date('date_fin_reparation');
            $table->string('type');
            $table->text('description');
            $table->float('prix');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reparations');
    }
};