// Placeholders visuels cohérents avec la charte graphique, en attendant les
// vraies réalisations (vidéos, photos, graphismes) du client.
// Chaque item : type de média + secteur client, pour le double filtre du portfolio,
// plus le contenu de la fiche "étude de cas" (context/need/solution/result, bilingue).
export const portfolioItems = [
  {
    id: 'p1',
    type: 'Vidéo',
    sector: 'Entreprise',
    icon: 'Video',
    gradient: ['#1D3557', '#2a4a73'],
    label: { fr: 'Spot publicitaire - Secteur bancaire', en: 'Ad spot — Banking sector' },
    context: {
      fr: "Une banque de la place souhaitait moderniser son image auprès d'une clientèle plus jeune, via un spot publicitaire diffusable à la télévision et sur les réseaux sociaux.",
      en: 'A local bank wanted to modernize its image with a younger audience, through an ad spot suitable for TV and social media.',
    },
    need: {
      fr: "Un film court, dynamique, capable de capter l'attention en quelques secondes tout en restant fidèle à l'identité de la marque.",
      en: 'A short, dynamic film able to capture attention within seconds while staying true to the brand identity.',
    },
    solution: {
      fr: 'Conception du scénario, tournage sur deux jours avec une équipe réduite, montage rythmé et adaptation du format pour la télévision et les réseaux sociaux.',
      en: 'Script writing, a two-day shoot with a small crew, punchy editing, and format adaptation for TV and social media.',
    },
    result: {
      fr: 'Un spot diffusé sur les principales chaînes nationales et largement relayé sur les réseaux sociaux du client.',
      en: "An ad spot aired on major national channels and widely shared on the client's social media.",
    },
  },
  {
    id: 'p2',
    type: 'Photo',
    sector: 'Événementiel',
    icon: 'Camera',
    gradient: ['#152844', '#1D3557'],
    label: { fr: 'Couverture — Forum économique régional', en: 'Coverage — Regional economic forum' },
    context: {
      fr: "Un forum économique régional réunissant plusieurs centaines de participants avait besoin d'une couverture photo complète pour ses communications post-événement.",
      en: 'A regional economic forum gathering several hundred participants needed full photo coverage for its post-event communications.',
    },
    need: {
      fr: 'Des photos de qualité professionnelle, couvrant les temps forts, les intervenants et les échanges informels, livrées rapidement.',
      en: 'Professional-quality photos covering key moments, speakers and informal exchanges, delivered quickly.',
    },
    solution: {
      fr: "Une équipe de deux photographes positionnés sur les différents espaces de l'événement, avec un tri et une retouche accélérés pour une livraison sous 48h.",
      en: 'A two-photographer team covering the different event spaces, with fast-tracked selection and editing for delivery within 48h.',
    },
    result: {
      fr: "Une banque d'images complète utilisée pour le rapport d'activité et les publications sur les réseaux sociaux de l'organisateur.",
      en: "A complete image library used for the activity report and the organizer's social media posts.",
    },
  },
  {
    id: 'p3',
    type: 'Infographie',
    sector: 'ONG',
    icon: 'BarChart3',
    gradient: ['#FF6B00', '#FFB066'],
    label: { fr: 'Rapport annuel — ONG internationale', en: 'Annual report — International NGO' },
    context: {
      fr: 'Une ONG internationale souhaitait rendre son rapport annuel plus accessible et engageant pour ses bailleurs et partenaires.',
      en: 'An international NGO wanted to make its annual report more accessible and engaging for donors and partners.',
    },
    need: {
      fr: 'Transformer des données chiffrées denses en visuels clairs et percutants, sans perdre la rigueur du contenu.',
      en: 'Turn dense figures into clear, impactful visuals without losing the rigor of the content.',
    },
    solution: {
      fr: "Conception d'une série d'infographies reprenant les indicateurs clés du rapport, dans un style graphique cohérent avec l'identité visuelle de l'ONG.",
      en: "Design of a series of infographics covering the report's key indicators, in a graphic style consistent with the NGO's visual identity.",
    },
    result: {
      fr: 'Un rapport annuel largement salué en interne pour sa clarté, réutilisé comme support de présentation lors de réunions bailleurs.',
      en: 'An annual report widely praised internally for its clarity, reused as a presentation aid in donor meetings.',
    },
  },
  {
    id: 'p4',
    type: 'Impression',
    sector: 'Entreprise',
    icon: 'Printer',
    gradient: ['#0D1F33', '#1D3557'],
    label: { fr: "Campagne d'affichage — Grande distribution", en: 'Billboard campaign — Retail chain' },
    context: {
      fr: "Une enseigne de grande distribution lançait une nouvelle campagne promotionnelle et avait besoin de supports d'affichage pour plusieurs points de vente.",
      en: 'A retail chain was launching a new promotional campaign and needed display materials for several stores.',
    },
    need: {
      fr: 'Des visuels impactants, déclinés en plusieurs formats, avec une impression et une pose coordonnées dans un délai serré.',
      en: 'Impactful visuals in several formats, with coordinated printing and installation on a tight deadline.',
    },
    solution: {
      fr: "Création graphique de la campagne, impression grand format et coordination de la pose sur l'ensemble des points de vente concernés.",
      en: 'Graphic design of the campaign, large-format printing, and coordinated installation across all stores involved.',
    },
    result: {
      fr: 'Une campagne visible simultanément sur tous les sites, dans les délais impartis.',
      en: 'A campaign visible simultaneously across all sites, on schedule.',
    },
  },
  {
    id: 'p5',
    type: 'Vidéo',
    sector: 'Institution',
    icon: 'Video',
    gradient: ['#2a4a73', '#1D3557'],
    label: { fr: 'Film institutionnel — Collectivité locale', en: 'Institutional film — Local authority' },
    context: {
      fr: 'Une collectivité locale souhaitait présenter ses réalisations et projets en cours à travers un film institutionnel.',
      en: 'A local authority wanted to showcase its achievements and ongoing projects through an institutional film.',
    },
    need: {
      fr: 'Un film valorisant, factuel et accessible au grand public, mêlant interviews et images de terrain.',
      en: 'A compelling, factual, accessible film mixing interviews and on-the-ground footage.',
    },
    solution: {
      fr: "Tournage sur plusieurs sites, interviews d'élus et de bénéficiaires, montage narratif structuré autour des grands axes d'action de la collectivité.",
      en: "Filming across multiple sites, interviews with officials and beneficiaries, narrative editing structured around the authority's main areas of action.",
    },
    result: {
      fr: "Un film diffusé lors d'événements officiels et sur les canaux de communication de la collectivité.",
      en: "A film screened at official events and shared across the authority's communication channels.",
    },
  },
  {
    id: 'p6',
    type: 'Photo',
    sector: 'Événementiel',
    icon: 'Camera',
    gradient: ['#1D3557', '#152844'],
    label: { fr: 'Reportage — Festival culturel', en: 'Reportage — Cultural festival' },
    context: {
      fr: 'Un festival culturel annuel souhaitait immortaliser son édition pour alimenter sa communication et ses partenaires.',
      en: 'An annual cultural festival wanted to capture its edition to feed its communication and partners.',
    },
    need: {
      fr: "Un reportage photo couvrant l'ambiance, les artistes et le public, restituant l'énergie de l'événement.",
      en: 'A photo reportage covering the atmosphere, artists and audience, conveying the energy of the event.',
    },
    solution: {
      fr: "Couverture photo sur toute la durée du festival, avec une sélection et une retouche livrées avant la clôture de l'événement.",
      en: 'Photo coverage throughout the festival, with a selection and edit delivered before the event closed.',
    },
    result: {
      fr: "Des visuels utilisés pour le bilan du festival et pour la promotion de l'édition suivante.",
      en: "Visuals used for the festival's wrap-up report and to promote the following edition.",
    },
  },
  {
    id: 'p7',
    type: 'Infographie',
    sector: 'Particulier',
    icon: 'BarChart3',
    gradient: ['#FFB066', '#FF6B00'],
    label: { fr: 'Identité visuelle — Start-up tech', en: 'Visual identity — Tech start-up' },
    context: {
      fr: "Une jeune start-up technologique avait besoin d'une identité visuelle complète pour son lancement officiel.",
      en: 'A young tech start-up needed a complete visual identity for its official launch.',
    },
    need: {
      fr: "Un univers graphique moderne et différenciant, décliné sur l'ensemble des supports de communication.",
      en: 'A modern, distinctive graphic universe, applied across all communication materials.',
    },
    solution: {
      fr: 'Création du logo, de la charte graphique et des déclinaisons principales (réseaux sociaux, présentation commerciale, papeterie).',
      en: 'Logo design, brand guidelines, and core applications (social media, sales deck, stationery).',
    },
    result: {
      fr: "Une identité cohérente adoptée dès le lancement et reprise sur l'ensemble des supports de la start-up.",
      en: "A consistent identity adopted from launch and carried across all of the start-up's materials.",
    },
  },
  {
    id: 'p8',
    type: 'Impression',
    sector: 'Entreprise',
    icon: 'Printer',
    gradient: ['#1D3557', '#0D1F33'],
    label: { fr: 'Habillage véhicules — Flotte commerciale', en: 'Vehicle wrap — Commercial fleet' },
    context: {
      fr: 'Une entreprise souhaitait transformer sa flotte de véhicules commerciaux en support de communication mobile.',
      en: 'A company wanted to turn its commercial vehicle fleet into a mobile communication tool.',
    },
    need: {
      fr: "Un habillage visuel cohérent avec l'identité de marque, résistant et adapté à un usage quotidien intensif.",
      en: 'A visual wrap consistent with the brand identity, durable and suited to intensive daily use.',
    },
    solution: {
      fr: "Conception des visuels, impression sur vinyle adhésif de qualité et pose sur l'ensemble de la flotte.",
      en: 'Visual design, printing on quality adhesive vinyl, and installation across the whole fleet.',
    },
    result: {
      fr: "Une flotte immédiatement identifiable, renforçant la visibilité de l'entreprise sur le terrain.",
      en: "An instantly recognizable fleet, boosting the company's visibility on the ground.",
    },
  },
]

export const mediaTypes = ['Tout', 'Vidéo', 'Photo', 'Infographie', 'Impression']
export const sectorTypes = ['Tous secteurs', 'Entreprise', 'Institution', 'ONG', 'Particulier', 'Événementiel']

// Obsolète : la correspondance service -> réalisations vit maintenant dans
// src/data/serviceSlugs.js (serviceRelated). Conservé pour ne casser aucun
// ancien import.
export const serviceRelatedType = ['Vidéo', 'Photo', 'Infographie', 'Impression', null]