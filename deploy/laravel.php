<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Chemin de l'application Laravel sur le serveur LWS
$base = '/home/ivc-nexus-site/ivc-api';

if (file_exists($maintenance = $base.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $base.'/vendor/autoload.php';

(require_once $base.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
