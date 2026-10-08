<?php

namespace App\Services;

/**
 * Nettoie le HTML produit par l'éditeur d'articles (liste blanche de balises) :
 * supprime scripts, attributs d'événements, liens javascript:, etc.
 */
class HtmlCleaner
{
    public static function clean(string $html): string
    {
        $cache = storage_path('app/purifier');
        if (! is_dir($cache)) {
            @mkdir($cache, 0775, true);
        }

        $config = \HTMLPurifier_Config::createDefault();
        $config->set('Cache.SerializerPath', $cache);
        $config->set('HTML.Allowed', 'p,br,strong,b,em,i,u,s,h2,h3,h4,ul,ol,li,blockquote,hr,code,pre,'
            .'a[href|title|target|rel],img[src|alt|width|height]');
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true, 'tel' => true]);
        $config->set('Attr.AllowedFrameTargets', ['_blank']);
        $config->set('HTML.TargetNoopener', true);
        $config->set('HTML.TargetNoreferrer', true);

        return (new \HTMLPurifier($config))->purify($html);
    }
}
