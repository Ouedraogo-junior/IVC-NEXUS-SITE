// Placeholders visuels cohérents avec la charte graphique, en attendant les
// vraies réalisations (vidéos, photos, graphismes) du client.
// Chaque item : type de média + secteur client, pour le double filtre du portfolio.
// `label` reste bilingue ici (contenu éditorial court, propre au portfolio),
// contrairement au reste du contenu qui vit dans src/i18n/*.json.
export const portfolioItems = [
  {
    id: 'p1',
    type: 'Vidéo',
    sector: 'Entreprise',
    icon: 'Video',
    gradient: ['#1D3557', '#2a4a73'],
    label: { fr: 'Spot publicitaire — Secteur bancaire', en: 'Ad spot — Banking sector' },
  },
  {
    id: 'p2',
    type: 'Photo',
    sector: 'Événementiel',
    icon: 'Camera',
    gradient: ['#152844', '#1D3557'],
    label: { fr: 'Couverture — Forum économique régional', en: 'Coverage — Regional economic forum' },
  },
  {
    id: 'p3',
    type: 'Infographie',
    sector: 'ONG',
    icon: 'BarChart3',
    gradient: ['#FF6B00', '#FFB066'],
    label: { fr: 'Rapport annuel — ONG internationale', en: 'Annual report — International NGO' },
  },
  {
    id: 'p4',
    type: 'Impression',
    sector: 'Entreprise',
    icon: 'Printer',
    gradient: ['#0D1F33', '#1D3557'],
    label: { fr: "Campagne d'affichage — Grande distribution", en: 'Billboard campaign — Retail chain' },
  },
  {
    id: 'p5',
    type: 'Vidéo',
    sector: 'Institution',
    icon: 'Video',
    gradient: ['#2a4a73', '#1D3557'],
    label: { fr: 'Film institutionnel — Collectivité locale', en: 'Institutional film — Local authority' },
  },
  {
    id: 'p6',
    type: 'Photo',
    sector: 'Événementiel',
    icon: 'Camera',
    gradient: ['#1D3557', '#152844'],
    label: { fr: 'Reportage — Festival culturel', en: 'Reportage — Cultural festival' },
  },
  {
    id: 'p7',
    type: 'Infographie',
    sector: 'Particulier',
    icon: 'BarChart3',
    gradient: ['#FFB066', '#FF6B00'],
    label: { fr: 'Identité visuelle — Start-up tech', en: 'Visual identity — Tech start-up' },
  },
  {
    id: 'p8',
    type: 'Impression',
    sector: 'Entreprise',
    icon: 'Printer',
    gradient: ['#1D3557', '#0D1F33'],
    label: { fr: 'Habillage véhicules — Flotte commerciale', en: 'Vehicle wrap — Commercial fleet' },
  },
]

export const mediaTypes = ['Tout', 'Vidéo', 'Photo', 'Infographie', 'Impression']
export const sectorTypes = ['Tous secteurs', 'Entreprise', 'Institution', 'ONG', 'Particulier', 'Événementiel']
