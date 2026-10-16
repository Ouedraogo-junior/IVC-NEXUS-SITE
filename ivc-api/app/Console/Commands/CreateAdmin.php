<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    protected $signature = 'ivc:admin {email : Adresse e-mail de connexion} {--name=Administrateur : Nom affiché}';

    protected $description = "Crée (ou met à jour) le compte de l'espace d'administration";

    public function handle(): int
    {
        $email = (string) $this->argument('email');

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Adresse e-mail invalide.');

            return self::FAILURE;
        }

        $password = (string) $this->secret('Mot de passe (8 caractères minimum)');
        if (mb_strlen($password) < 8) {
            $this->error('Mot de passe trop court.');

            return self::FAILURE;
        }
        if ($password !== (string) $this->secret('Confirmer le mot de passe')) {
            $this->error('Les deux mots de passe ne correspondent pas.');

            return self::FAILURE;
        }

        $user = User::updateOrCreate(
            ['email' => $email],
            ['name' => (string) $this->option('name'), 'password' => Hash::make($password)],
        );

        $this->info("Compte prêt : {$user->email}");

        return self::SUCCESS;
    }
}
