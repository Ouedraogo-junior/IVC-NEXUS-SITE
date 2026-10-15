/**
 * Textes juridiques rédigés par le client (documents « Mentions légales » et « Politique de confidentialité »).
 * Les {{jetons}} sont remplacés par les valeurs de src/config/legal.js (et {{email}}, {{siteUrl}} par le site).
 * Blocs : { p: 'paragraphe' } ou { ul: ['élément', …] }.
 * Les blocs marqués « AJOUT » ne figurent pas dans les documents du client : ils décrivent le fonctionnement
 * réel du site et doivent être validés par lui.
 */

export const NOTICE = {
  title: 'Mentions légales',
  entity: 'IMPACT VISION COMMUNICATION NEXUS (IVC NEXUS)',
  articles: [
    {
      title: 'Article 1 : Identification de l’éditeur',
      blocks: [
        {
          p: 'Le présent site internet, accessible à l’adresse {{siteUrl}}, est édité par Impact Vision Communication Nexus, en abrégé IVC NEXUS, société à responsabilité limitée (SARL) de droit burkinabè.',
        },
        { p: 'Informations légales :' },
        {
          ul: [
            'Dénomination sociale : {{name}}',
            'Sigle : {{acronym}}',
            'Forme juridique : {{form}}',
            'Capital social : {{capital}}',
            'Siège social : {{address}}',
            'RCCM : {{rccm}}',
            'IFU : {{ifu}}',
            'Téléphones : {{phones}}',
            'Adresse électronique : {{email}}',
          ],
        },
      ],
    },
    {
      title: 'Article 2 : Direction de la publication',
      blocks: [
        {
          p: 'Le directeur de la publication du présent site est {{manager}}, gérant de la société Impact Vision Communication Nexus.',
        },
        { p: 'Il supervise les contenus éditoriaux publiés sur le site, dans le respect des dispositions légales applicables.' },
      ],
    },
    {
      title: 'Article 3 : Hébergement du site',
      blocks: [
        { p: 'Le site est hébergé par :' },
        {
          ul: [
            'Dénomination de l’hébergeur : {{host.name}}',
            'Adresse géographique : {{host.address}}',
            'Téléphone ou autre moyen de contact : {{host.contact}}',
            'Site internet : {{host.website}}',
          ],
        },
      ],
    },
    {
      title: 'Article 4 : Objet du site',
      blocks: [
        {
          p: 'Le présent site constitue une plateforme institutionnelle destinée à présenter IVC NEXUS, ses activités, ses domaines d’expertise, ses prestations, ses réalisations et ses initiatives.',
        },
        {
          p: 'Il permet également aux visiteurs, clients et partenaires de prendre contact avec l’entreprise pour toute demande de renseignements, de collaboration ou de prestations.',
        },
        { p: 'Les informations présentées sur le site peuvent évoluer en fonction des activités de l’entreprise.' },
      ],
    },
    {
      title: 'Article 5 : Propriété intellectuelle',
      blocks: [
        {
          p: 'Les textes, photographies, vidéos, illustrations, créations graphiques, logos et autres contenus originaux présents sur le site sont protégés par les dispositions applicables en matière de propriété intellectuelle.',
        },
        {
          p: 'Sauf mention contraire, ces éléments appartiennent à IVC NEXUS ou sont utilisés en vertu d’une autorisation ou d’un droit d’exploitation approprié.',
        },
        {
          p: 'Toute reproduction, modification, diffusion, représentation ou exploitation des contenus protégés doit respecter les droits de leurs titulaires et les exceptions prévues par la législation applicable.',
        },
      ],
    },
    {
      title: 'Article 6 : Crédits photographiques et audiovisuels',
      blocks: [
        { p: 'Les productions photographiques, graphiques et audiovisuelles originales réalisées par IVC NEXUS sont créditées comme suit :' },
        { p: '© IVC NEXUS — Tous droits réservés.' },
        { p: 'Les photographies et vidéos provenant de partenaires, de clients ou d’autres tiers demeurent soumises aux droits de leurs titulaires respectifs.' },
        {
          p: 'La publication de l’image d’une personne identifiable doit respecter les règles applicables à la protection de la vie privée, au droit à l’image et aux données personnelles.',
        },
      ],
    },
    {
      title: 'Article 7 : Exactitude des informations et responsabilité',
      blocks: [
        { p: 'IVC NEXUS veille à assurer la fiabilité, la pertinence et l’actualisation des informations mises à disposition sur son site.' },
        { p: 'Toutefois, certaines informations peuvent devenir obsolètes ou nécessiter des corrections.' },
        { p: 'L’entreprise se réserve la possibilité de modifier ou d’actualiser les contenus du site.' },
        {
          p: 'Sa responsabilité est appréciée conformément aux dispositions légales applicables, notamment en cas de faute, de manquement à ses obligations ou de dommage juridiquement imputable à l’entreprise.',
        },
      ],
    },
    {
      title: 'Article 8 : Liens vers des sites tiers',
      blocks: [
        { p: 'Le site peut contenir des liens vers des plateformes externes.' },
        { p: 'IVC NEXUS n’assure pas nécessairement le contrôle permanent des contenus de ces plateformes.' },
        {
          p: 'Les utilisateurs sont invités à consulter les conditions d’utilisation et politiques de confidentialité propres aux sites concernés.',
        },
      ],
    },
    {
      title: 'Article 9 : Protection des données personnelles',
      blocks: [
        {
          p: 'Les données personnelles recueillies par le site, notamment à travers le formulaire de contact, sont traitées dans le respect de la législation burkinabè applicable, particulièrement de la loi n°001-2021/AN du 30 mars 2021 portant protection des personnes à l’égard du traitement des données à caractère personnel.',
        },
        {
          p: 'Les finalités, destinataires, durées de conservation et modalités d’exercice des droits des personnes sont détaillés dans la politique de confidentialité accessible sur le site.',
        },
      ],
    },
    {
      title: 'Article 10 : Activités réglementées',
      blocks: [
        {
          p: 'Lorsque certaines activités exercées par IVC NEXUS nécessitent une autorisation administrative, une licence ou un agrément spécifique, les informations correspondantes sont mises à la disposition du public conformément à la réglementation applicable.',
        },
        { p: 'Références des autorisations éventuelles : {{authorizations}}.' },
      ],
    },
    {
      title: 'Article 11 : Droit applicable',
      blocks: [
        { p: 'Les présentes mentions légales sont soumises au droit applicable au Burkina Faso.' },
        {
          p: 'Tout litige relatif au fonctionnement ou à l’utilisation du site sera traité conformément aux règles légales de compétence et aux dispositions applicables.',
        },
      ],
    },
  ],
  footer: 'Dernière mise à jour : {{lastUpdate}}',
}

export const PRIVACY = {
  title: 'Politique de confidentialité',
  entity: 'IMPACT VISION COMMUNICATION NEXUS (IVC NEXUS)',
  articles: [
    {
      title: 'Article 1 : Objet',
      blocks: [
        {
          p: 'Impact Vision Communication Nexus, en abrégé IVC NEXUS, accorde une importance particulière à la protection de la vie privée et des données personnelles des utilisateurs de son site internet.',
        },
        {
          p: 'La présente politique de confidentialité définit les conditions dans lesquelles les données personnelles sont collectées, utilisées, conservées, sécurisées et, le cas échéant, communiquées à des destinataires autorisés.',
        },
        {
          p: 'Elle est établie en référence à la législation applicable au Burkina Faso, notamment la loi n°001-2021/AN du 30 mars 2021 portant protection des personnes à l’égard du traitement des données à caractère personnel.',
        },
      ],
    },
    {
      title: 'Article 2 : Responsable du traitement',
      blocks: [
        { p: 'Le responsable du traitement est :' },
        { p: 'Impact Vision Communication Nexus (IVC NEXUS)' },
        {
          ul: [
            'Forme juridique : {{formShort}}',
            'Siège social : {{address}}',
            'Représentant légal : {{manager}}, gérant',
            'Téléphones : {{phones}}',
            'Adresse électronique : {{email}}',
          ],
        },
        { p: 'La réception et le traitement des demandes transmises via le formulaire de contact sont assurés par :' },
        { p: '{{requestHandler}}.' },
      ],
    },
    {
      title: 'Article 3 : Données collectées',
      blocks: [
        { p: 'Dans le cadre de l’utilisation du formulaire de contact, IVC NEXUS peut collecter, selon les champs effectivement disponibles :' },
        {
          ul: [
            'Le nom et le prénom ;',
            'L’adresse électronique ;',
            'Le numéro de téléphone ;',
            'L’objet de la demande ;',
            'Le contenu du message ;',
            'Toute information supplémentaire volontairement communiquée.',
          ],
        },
        { p: 'Les champs obligatoires seront clairement distingués des champs facultatifs.' },
        { p: 'Le défaut de renseignement d’un champ obligatoire peut empêcher l’envoi du formulaire ou le traitement adéquat de la demande.' },
        { p: 'Les utilisateurs sont invités à éviter la transmission de données sensibles ou sans rapport avec leur demande.' },
      ],
    },
    {
      title: 'Article 4 : Finalités des traitements',
      blocks: [
        { p: 'Les données recueillies sont utilisées pour :' },
        {
          ul: [
            'Recevoir les demandes de contact ;',
            'Répondre aux demandes d’informations ;',
            'Traiter les sollicitations relatives aux prestations ;',
            'Établir, lorsque cela est demandé, des devis ou propositions commerciales ;',
            'Assurer le suivi des échanges professionnels ;',
            'Gérer les relations avec les clients et partenaires.',
          ],
        },
        {
          p: 'Toute utilisation des données pour une finalité nouvelle ou incompatible avec les finalités initiales doit respecter les conditions prévues par la législation applicable.',
        },
      ],
    },
    {
      title: 'Article 5 : Fondement juridique des traitements',
      blocks: [
        { p: 'Le traitement des données personnelles doit reposer sur un fondement juridique approprié.' },
        {
          p: 'Selon la nature des demandes, ce traitement peut notamment être nécessaire à l’exécution de mesures précontractuelles prises à l’initiative de l’utilisateur ou reposer sur un autre fondement prévu par la loi.',
        },
        { p: 'Lorsque le consentement est requis, celui-ci est recueilli dans les conditions prévues par la réglementation.' },
        {
          p: 'Les données recueillies à travers le formulaire de contact ne sont pas utilisées automatiquement pour des opérations de prospection commerciale.',
        },
        {
          p: 'Toute prospection ultérieure est soumise aux règles applicables et, lorsque cela est nécessaire, au consentement préalable de la personne concernée.',
        },
      ],
    },
    {
      title: 'Article 6 : Destinataires des données',
      blocks: [
        { p: 'Les données personnelles sont accessibles uniquement aux personnes habilitées à les traiter dans le cadre de leurs attributions.' },
        { p: 'Le service ou responsable chargé du traitement des messages est :' },
        { p: '{{requestHandler}}.' },
        {
          p: 'Les prestataires techniques assurant l’hébergement, la maintenance ou les services de messagerie peuvent également accéder à certaines données lorsque cela est nécessaire à leurs missions.',
        },
        { p: 'Ces accès doivent être encadrés par des garanties appropriées de confidentialité et de sécurité.' },
        {
          p: 'Les données personnelles collectées par le formulaire de contact ne sont pas destinées à être vendues ou commercialisées auprès de tiers.',
        },
      ],
    },
    {
      title: 'Article 7 : Durée de conservation',
      blocks: [
        { p: 'Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.' },
        {
          p: 'Pour les messages reçus au moyen du formulaire de contact et ne donnant pas lieu à une relation contractuelle, la durée de conservation retenue est :',
        },
        { p: '{{retention}} à compter du dernier échange avec l’utilisateur.' },
        {
          p: 'Les données relatives aux relations contractuelles, aux obligations comptables, fiscales ou aux éventuels litiges peuvent faire l’objet de durées distinctes, conformément aux obligations légales applicables.',
        },
        { p: 'À l’expiration des durées de conservation, les données sont supprimées ou anonymisées, sauf motif légal justifiant leur maintien.' },
      ],
    },
    {
      title: 'Article 8 : Sécurité et confidentialité',
      blocks: [
        { p: 'IVC NEXUS met en œuvre des mesures techniques et organisationnelles appropriées afin d’assurer la protection des données personnelles qu’elle traite.' },
        { p: 'Ces mesures portent notamment sur :' },
        {
          ul: [
            'La limitation des accès aux personnes autorisées ;',
            'La protection des comptes et outils utilisés pour recevoir les messages ;',
            'La sécurisation des transmissions de données ;',
            'La prévention des accès non autorisés ;',
            'La protection contre la perte, l’altération ou la divulgation des informations ;',
            'La suppression sécurisée des données lorsqu’elles ne sont plus nécessaires.',
          ],
        },
        { p: 'Ces mesures sont adaptées à la nature des données, aux risques identifiés et aux moyens techniques effectivement déployés.' },
      ],
    },
    {
      title: 'Article 9 : Droits des personnes concernées',
      blocks: [
        {
          p: 'Conformément à la législation burkinabè applicable, les personnes concernées peuvent exercer, dans les conditions prévues par la loi :',
        },
        {
          ul: [
            'Leur droit d’accès aux données personnelles ;',
            'Leur droit de rectification des données inexactes ;',
            'Leur droit de suppression lorsque les conditions légales sont réunies ;',
            'Leur droit d’opposition aux traitements concernés ;',
            'Leur droit de retirer leur consentement lorsqu’un traitement repose sur celui-ci.',
          ],
        },
        { p: 'Les demandes relatives à l’exercice de ces droits peuvent être adressées à :' },
        { p: '{{email}}.' },
        { p: 'Les demandes sont examinées conformément aux dispositions légales applicables.' },
        {
          p: 'Pour les opérations relevant de l’article 21 de la loi n°001-2021/AN, IVC NEXUS justifie, dans les conditions prévues par cet article, les opérations exigées dans un délai maximal de deux mois après l’enregistrement de la demande.',
        },
        {
          p: 'Les personnes concernées peuvent également saisir la Commission de l’informatique et des libertés (CIL) dans les conditions prévues par les textes en vigueur.',
        },
      ],
    },
    {
      title: 'Article 10 : Cookies et traceurs',
      blocks: [
        {
          p: 'Le site peut utiliser des cookies ou technologies similaires nécessaires à son fonctionnement technique, à sa sécurité ou à la gestion des sessions.',
        },
        {
          p: 'L’utilisation éventuelle de traceurs de mesure d’audience, de publicité ou d’autres dispositifs non essentiels fera l’objet des informations et mécanismes de choix requis par la réglementation applicable.',
        },
        { p: 'Cookies effectivement utilisés : {{cookies}}.' },
        // AJOUT — décrit le compteur de visites réellement en place (à valider par le client)
        {
          p: 'Mesure d’audience : le site compte le nombre de visiteurs et les pages consultées au moyen d’un dispositif interne. Il n’utilise aucun cookie et ne conserve aucune adresse IP : le visiteur est reconnu par une empreinte anonyme qui change chaque jour et ne permet ni de l’identifier ni de le suivre d’un jour à l’autre. Seules la page consultée, la provenance (nom de domaine du site d’origine, le cas échéant) et le type d’appareil sont enregistrés. Aucune donnée n’est transmise à un service de mesure d’audience tiers. Le signal « Ne pas me suivre » du navigateur est respecté.',
        },
        // AJOUT — services tiers réellement chargés par le site (à valider par le client)
        {
          p: 'Services tiers : l’affichage du site peut faire appel à des services extérieurs, notamment Google Fonts (polices de caractères), Google Maps (carte) et Cal.com (prise de rendez-vous). Lors de leur chargement, l’adresse IP du visiteur et des informations techniques sur son navigateur peuvent être transmises à ces prestataires, qui appliquent leurs propres politiques de confidentialité.',
        },
      ],
    },
    {
      title: 'Article 11 : Hébergement et transferts internationaux',
      blocks: [
        {
          p: 'Les données personnelles collectées peuvent être hébergées ou traitées sur les infrastructures utilisées par le site internet ou ses prestataires techniques.',
        },
        {
          ul: [
            'Hébergeur : {{host.name}}',
            'Pays d’hébergement : {{host.country}}',
            'Prestataire de messagerie : {{mailProvider}}',
          ],
        },
        {
          p: 'Tout transfert de données personnelles vers un pays étranger est soumis aux conditions prévues par la législation burkinabè, notamment les obligations d’autorisation et de garanties applicables.',
        },
      ],
    },
    {
      title: 'Article 12 : Formalités réglementaires',
      blocks: [
        {
          p: 'IVC NEXUS s’engage à identifier les formalités réglementaires applicables aux traitements de données personnelles réalisés à travers son site internet.',
        },
        {
          p: 'Les déclarations, demandes d’autorisation ou autres démarches exigées par la réglementation sont effectuées auprès de l’autorité compétente lorsqu’elles sont requises.',
        },
        { p: 'Référence de la formalité accomplie auprès de la CIL, si applicable : {{cilReference}}.' },
      ],
    },
    {
      title: 'Article 13 : Modification de la politique',
      blocks: [
        {
          p: 'La présente politique de confidentialité peut être modifiée afin de prendre en compte les évolutions des activités de l’entreprise, des fonctionnalités du site ou du cadre légal applicable.',
        },
        { p: 'Toute nouvelle version est rendue accessible aux utilisateurs avec indication de sa date de mise à jour.' },
      ],
    },
    {
      title: 'Article 14 : Contact',
      blocks: [
        { p: 'Pour toute demande concernant la présente politique ou le traitement des données personnelles, les utilisateurs peuvent contacter :' },
        { p: 'IMPACT VISION COMMUNICATION NEXUS (IVC NEXUS)' },
        { p: 'Représentant légal : {{manager}}' },
        { p: 'Adresse : {{address}}' },
        { p: 'Téléphones : {{phones}}' },
        { p: 'Adresse électronique : {{email}}' },
      ],
    },
  ],
  footer: 'Dernière mise à jour : {{lastUpdate}}',
}