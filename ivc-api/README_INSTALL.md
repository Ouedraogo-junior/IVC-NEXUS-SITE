# IVC Nexus — Backend Laravel (installation locale)

Ce dossier contient uniquement **nos fichiers**. Ils se superposent à un projet Laravel neuf.

## 1. Prérequis sur ton ordinateur

- PHP **8.3 ou plus** avec les extensions `gd`, `mbstring`, `openssl`, `fileinfo`, `curl`, `xml`, `zip`, `pdo_sqlite`
- Composer 2
- Sous Windows, le plus simple est **Laragon** (PHP + Composer + MySQL en un seul installateur).

Vérification : `php -v` et `composer -V`.

## 2. Créer le projet Laravel

Place-toi à côté du dossier du site React (les deux dossiers côte à côte) :

```bash
composer create-project laravel/laravel ivc-api
cd ivc-api
composer require ezyang/htmlpurifier
php artisan install:api --no-interaction
```

## 3. Copier nos fichiers

Copie **tout le contenu** de ce dossier dans `ivc-api/`, en acceptant de remplacer les fichiers existants
(`bootstrap/app.php` et `routes/api.php` sont remplacés).

- Linux / macOS : `cp -r CHEMIN/ivc-api-overlay/. .`
- Windows : copier-coller le contenu du dossier et choisir « Remplacer les fichiers ».

## 4. Configurer `.env`

Ouvre `ivc-api/.env` et ajoute ou modifie ces lignes :

```
APP_LOCALE=fr
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
IVC_NOTIFY_EMAIL=ivcnexus@gmail.com
MAIL_MAILER=log
```

`MAIL_MAILER=log` : en local, les e-mails ne partent pas, ils s'écrivent dans `storage/logs/laravel.log`.
La base SQLite par défaut suffit en local (aucune installation de MySQL).

## 5. Créer la base et les données de test

```bash
php artisan migrate
php artisan storage:link
php artisan db:seed --class=DemoSeeder
php artisan ivc:admin ton-email@exemple.com
```

La dernière commande te demande le mot de passe (10 caractères minimum).

## 6. Lancer les tests (important)

```bash
php artisan test
```

Tu dois voir **13 tests verts**. S'il y a des échecs, copie-moi le message tel quel.

## 7. Démarrer le serveur

```bash
php artisan serve
```

Vérification dans le navigateur : <http://127.0.0.1:8000/api/stats> doit afficher du JSON.
Autres adresses à tester : `/api/posts`, `/api/testimonials`, `/api/portfolio`, `/api/settings`.

## 8. Relier le site React (Vite)

Dans le projet React, ajoute le proxy dans `vite.config.js` pour que le site et l'API partagent la même
adresse (comme ce sera le cas en production) :

```js
export default defineConfig({
  // ...le reste de ta config
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/sanctum': 'http://127.0.0.1:8000',
      '/storage': 'http://127.0.0.1:8000',
    },
  },
})
```

Redémarre `npm run dev`. Le site (<http://localhost:5173>) pourra alors appeler `/api/...` sans réglage CORS.
Ouvre le site avec `localhost:5173` (et non `127.0.0.1:5173`), sinon le cookie de connexion ne suivra pas.

## Ce qui est en place

| Élément | Détail |
|---|---|
| Articles | brouillon/publié, date programmée, catégorie, couverture, HTML nettoyé côté serveur |
| Témoignages, chiffres clés | FR/EN, ordre, visibilité |
| Réalisations | contexte / besoin / solution / résultat en FR et EN, médias, secteurs, galerie, vidéo |
| Messages | contact + devis, statut nouveau/lu/traité, export CSV, anti-robot, 6 envois/minute/IP |
| Images | contrôle du format, redressement, 1600 px max, conversion WebP |
| Coordonnées | téléphones, e-mail, adresse, réseaux sociaux |
| Mails | notification à l'agence (réponse = réponse au visiteur) + accusé de réception FR/EN |
| Sécurité | connexion par cookie de session, 5 tentatives/minute, aucune route admin sans connexion |

## Points à connaître

- La connexion fonctionne par cookie : le site doit d'abord appeler `GET /sanctum/csrf-cookie`, puis envoyer
  l'en-tête `X-XSRF-TOKEN` à chaque requête POST/PUT/DELETE (le client API React s'en chargera).
- Les images envoyées vont dans `storage/app/public/uploads` et sont servies via `/storage/...`.
- Cette archive ne contient pas encore l'interface d'administration en React : c'est l'étape suivante.
