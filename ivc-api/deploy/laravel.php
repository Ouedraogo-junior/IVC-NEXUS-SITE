<?php

// Point d'entrée de l'API Laravel. Le code de l'application est hors du dossier public.
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));
$base = '/home/ivc-api';

if (file_exists($maintenance = $base.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $base.'/vendor/autoload.php';

$app = require_once $base.'/bootstrap/app.php';
$app->usePublicPath(__DIR__);
$app->handleRequest(Request::capture());