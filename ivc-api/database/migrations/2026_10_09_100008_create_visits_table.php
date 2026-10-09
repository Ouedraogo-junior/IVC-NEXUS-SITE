<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Une ligne = un visiteur anonyme sur une page pendant une journée (hits = nombre d'affichages).
        // Ni adresse IP, ni navigateur complet : seulement une empreinte qui change chaque jour.
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->date('visited_on');
            $table->string('visitor', 16);
            $table->string('path', 200);
            $table->string('referrer', 120)->nullable(); // nom de domaine seulement (ex. google.com)
            $table->string('device', 10)->default('desktop'); // mobile | tablet | desktop
            $table->unsignedInteger('hits')->default(1);
            $table->timestamps();

            $table->unique(['visited_on', 'visitor', 'path']);
            $table->index('visited_on');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
