# IVC Nexus — Site web

Site vitrine d'IVC Nexus (Impact Vision Communication Nexus), construit en
React (Vite) + Tailwind CSS, bilingue FR/EN, mobile-first et animé.

## Installation

```bash
npm install
npm run dev        # serveur de développement, http://localhost:5173
npm run build      # génère le dossier dist/ prêt à déployer
npm run preview    # prévisualise le build de production en local
```

## Structure du projet

```
src/
├── i18n/            Contexte de langue (FR/EN) + dictionnaires fr.json / en.json
│                    → pour ajouter une langue : dupliquer un fichier JSON et
│                      l'enregistrer dans LanguageContext.jsx
├── data/            Contenu structuré : liens de navigation, réalisations du
│                    portfolio, slugs des services
├── hooks/           useRevealOnScroll → anime un élément quand il entre dans
│                    l'écran (utilisé par la plupart des sections)
├── utils/           submitNetlifyForm → soumission AJAX des formulaires
├── assets/          logo.svg (fichier officiel, nettoyé)
├── components/
│   ├── ui/          Composants génériques réutilisables partout (Button,
│   │                SectionHeading, FormField, LogoChip)
│   └── layout/      Header, Footer, Layout (ossature commune à toutes les pages)
├── sections/        Blocs spécifiques à la page d'accueil (Hero, Stats...)
└── pages/           Une page = une route (Home, AboutPage, ServicesPage,
                     PortfolioPage, ContactPage, LegalNotice, PrivacyPolicy)
```

**Pourquoi cette organisation ?** Un composant qui change de couleur, un texte
qui change de langue ou une nouvelle réalisation à ajouter au portfolio se
modifient à un seul endroit (respectivement `tailwind.config.js`, les fichiers
`i18n/*.json`, ou `data/portfolioItems.js`) sans toucher au code des
composants. C'est ce qui rend le site facile à faire évoluer.

## Déploiement sur Netlify

1. Pousser ce projet sur un dépôt Git (GitHub/GitLab/Bitbucket).
2. Sur [netlify.com](https://netlify.com), "Add new site" → "Import an
   existing project" → connecter le dépôt.
3. Build command : `npm run build` — Publish directory : `dist`.
4. Une fois le domaine du client réservé, l'ajouter dans Netlify (Domain
   settings) — Netlify fournit le certificat SSL automatiquement.

Le fichier `public/_redirects` est indispensable : sans lui, Netlify
renverrait une erreur 404 si quelqu'un rafraîchit la page sur `/services` ou
partage un lien direct vers une sous-page (comportement normal d'un hébergeur
statique qui ne connaît pas les routes React).

## Formulaires (Netlify Forms)

Les formulaires (`ContactPage.jsx`) sont prêts à fonctionner sans backend ni
outil tiers, via Netlify Forms — gratuit dans les volumes de ce site.

Point important : Netlify détecte les formulaires en analysant le **HTML
statique** au moment du build. Comme nos formulaires sont générés par React
(donc absents du HTML brut), `index.html` contient une copie cachée de
chaque formulaire (`contact` et `devis`) avec les mêmes champs — **ne pas les
supprimer**. Si un champ est ajouté ou renommé dans `ContactPage.jsx`, il
faut répercuter le changement dans ces formulaires fantômes.

Les soumissions apparaissent dans Netlify sous Site → Forms. Une notification
par e-mail peut être activée dans Forms → Settings → Form notifications.

## CMS (Decap CMS) — à intégrer

Pas encore installé dans ce projet. Pour la prochaine étape (édition du blog
et des sections administrables — chiffres clés, témoignages) :

1. `public/admin/index.html` + `public/admin/config.yml` (configuration
   standard Decap CMS).
2. Activer Netlify Identity + Git Gateway dans les réglages du site Netlify.
3. Définir les collections (ex. `stats`, `testimonials`) dans `config.yml`.

## Statistiques (Google Analytics / Tag Manager)

Le script Google Tag Manager est présent mais **commenté** dans
`index.html`. Une fois l'ID de conteneur récupéré (voir les étapes discutées
précédemment : GA4 → GTM → Search Console), le décommenter et remplacer
`GTM-XXXXXXX`. À faire uniquement après la mise en place du bandeau de
consentement cookies, pour rester conforme.

## Ce qui reste à faire

Contenu / données réelles :
- [ ] Remplacer les coordonnées, réseaux sociaux et chiffres clés provisoires
      par les informations réelles du client
- [ ] Remplacer les visuels du portfolio (vignettes de marque) et de la
      galerie services par les vraies réalisations
- [ ] Remplacer les témoignages et logos partenaires factices par les vrais
- [ ] Compléter les pages légales (mentions légales, confidentialité)
- [ ] Relire/affiner les traductions anglaises dans `src/i18n/en.json`

Pages du CDC client pas encore créées :
- [ ] Page "Secteurs d'intervention" (Entreprises, ONG, Institutions...)
- [ ] Page "FAQ" générale
- [ ] Page "Blog / Ressources" (nécessite Decap CMS, voir plus haut)
- [ ] Page "Prise de rendez-vous" (intégration Calendly/Cal.com)
- [ ] "Espace téléchargements" (documents à télécharger)

Technique :
- [ ] Bouton WhatsApp Business flottant
- [ ] SEO complet (meta title/description par page, sitemap XML, schémas)
- [ ] Bandeau de consentement cookies avant d'activer GTM
- [ ] Intégrer Decap CMS pour le blog et les sections administrables
