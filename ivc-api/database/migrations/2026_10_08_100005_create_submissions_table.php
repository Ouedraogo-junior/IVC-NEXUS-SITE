<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20); // contact | quote
            $table->string('name', 120);
            $table->string('email', 190);
            $table->string('phone', 40)->nullable();
            $table->string('organisation', 160)->nullable();
            $table->string('profile', 80)->nullable();
            $table->string('service', 80)->nullable();
            $table->string('budget', 80)->nullable();
            $table->date('desired_date')->nullable();
            $table->text('message');
            $table->boolean('consent')->default(false);
            $table->string('lang', 2)->default('fr');
            $table->string('status', 20)->default('new'); // new | read | done
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamps();

            $table->index(['type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
