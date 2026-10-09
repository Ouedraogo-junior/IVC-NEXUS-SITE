<?php

return [
    // Adresse(s) qui reçoivent les notifications de nouveaux messages / demandes de devis.
    // Plusieurs adresses possibles, séparées par des virgules : a@x.com,b@y.com
    'notify_to' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('IVC_NOTIFY_EMAIL', env('MAIL_FROM_ADDRESS')))
    ))),

    // Catégories de blog autorisées.
    'categories' => ['Communication', 'Audiovisuel', 'Marketing', 'Réseaux sociaux', 'Branding'],

    // Réglages éditables depuis l'admin (coordonnées et réseaux sociaux).
    'setting_keys' => [
        'phone_1', 'phone_2', 'email', 'address',
        'facebook', 'instagram', 'linkedin', 'youtube', 'tiktok',
    ],

    // Champs textuels d'une réalisation (une version FR et une version EN).
    'portfolio_fields' => ['title', 'summary', 'context', 'need', 'solution', 'result'],

    // Pages comptées par le compteur de visites (chemins exacts). Les articles (/blog/xxx) et les
    // réalisations (/realisations/xxx) publiés sont reconnus automatiquement. Ajouter ici toute nouvelle page.
    'tracked_pages' => [
        '/', '/a-propos', '/services', '/realisations', '/blog', '/contact',
        '/faq', '/secteurs', '/telechargements', '/mentions-legales', '/confidentialite',
    ],

    'upload_max_kb' => 8192,
];
