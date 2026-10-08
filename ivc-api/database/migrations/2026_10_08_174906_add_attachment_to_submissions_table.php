<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            // Chemin sur le disque PRIVÉ (non accessible depuis le web) + nom d'origine nettoyé
            $table->string('attachment_path')->nullable()->after('message');
            $table->string('attachment_name', 160)->nullable()->after('attachment_path');
        });
    }

    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn(['attachment_path', 'attachment_name']);
        });
    }
};