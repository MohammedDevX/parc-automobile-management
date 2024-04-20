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
        Schema::table('users', function (Blueprint $table) {
            $table->string('cin')->unique();
            $table->string('prenom');
            $table->string('genre');
            $table->date('date_naissance');
            $table->integer('age');
            $table->string('tel');
            $table->string('adresse');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('cin');
            $table->dropColumn('prenom');
            $table->dropColumn('genre');
            $table->dropColumn('date_naissance');
            $table->dropColumn('age');
            $table->dropColumn('tel');
            $table->dropColumn('adresse');
        });
    }
};