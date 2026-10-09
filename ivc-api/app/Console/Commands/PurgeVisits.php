<?php

namespace App\Console\Commands;

use App\Models\Visit;
use Illuminate\Console\Command;

class PurgeVisits extends Command
{
    protected $signature = 'ivc:purge-visits {--days=400 : Nombre de jours de statistiques à conserver}';

    protected $description = 'Supprime les anciennes statistiques de fréquentation';

    public function handle(): int
    {
        $days = max(30, (int) $this->option('days'));
        $deleted = Visit::where('visited_on', '<', now()->subDays($days)->toDateString())->delete();
        $this->info("{$deleted} ligne(s) supprimée(s) (plus de {$days} jours).");

        return self::SUCCESS;
    }
}
