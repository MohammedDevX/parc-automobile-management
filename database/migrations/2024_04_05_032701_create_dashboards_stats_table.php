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
        Schema::create('dashboard_stats', function (Blueprint $table) {
            $table->id('id_dashboard');
            $table->unsignedBigInteger('total_vehicules')->default(0);
            $table->unsignedBigInteger('total_employes')->default(0);
            $table->unsignedBigInteger('total_trajets')->default(0);
            $table->unsignedBigInteger('months_accidents')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dashboard_stats');

  }
};