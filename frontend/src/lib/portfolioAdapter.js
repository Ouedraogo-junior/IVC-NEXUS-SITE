import { mediaTypes, sectorTypes } from '../data/portfolioItems'

// Les types de média et secteurs saisis dans l'admin sont des étiquettes libres ("vidéo", "Video"…).
// On les ramène aux noms du site ("Vidéo"…) pour retrouver leurs traductions ; une étiquette inconnue reste telle quelle.
const strip = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const canon = (tag, list) => list.find((c) => strip(c) === strip(tag)) || String(tag).trim()

const MEDIA = mediaTypes.slice(1) // sans "Tout"
const SECTORS = sectorTypes.slice(1) // sans "Tous secteurs"

const ICONS = { Vidéo: 'Video', Photo: 'Camera', Infographie: 'BarChart3', Impression: 'Printer' }
const GRADIENTS = [
  ['#1D3557', '#2a4a73'],
  ['#152844', '#1D3557'],
  ['#FF6B00', '#FFB066'],
  ['#0D1F33', '#1D3557'],
  ['#2a4a73', '#1D3557'],
]

function hash(str) {
  let h = 0
  for (const ch of String(str)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

/**
 * Transforme une réalisation de l'API Laravel dans la forme utilisée par les composants du site.
 * `id` vaut le slug : les liens /realisations/:id continuent de fonctionner tels quels.
 */
export function adaptPortfolioItem(api) {
  const media = (api.media_types || []).map((t) => canon(t, MEDIA))
  const sectors = (api.sector_types || []).map((t) => canon(t, SECTORS))
  const content = api.content || {}
  const pick = (field) => ({
    fr: content[field]?.fr || '',
    en: content[field]?.en || content[field]?.fr || '',
  })

  return {
    id: api.slug,
    type: media[0] || null,
    sector: sectors[0] || null,
    mediaTypes: media,
    sectorTypes: sectors,
    icon: ICONS[media[0]] || 'Camera',
    gradient: GRADIENTS[hash(api.slug) % GRADIENTS.length],
    label: pick('title'),
    summary: pick('summary'),
    context: pick('context'),
    need: pick('need'),
    solution: pick('solution'),
    result: pick('result'),
    cover: api.cover || null,
    gallery: api.gallery || [],
    videoUrl: api.video_url || null,
    year: api.year || null,
  }
}

/** Options d'un filtre : "Tout" puis les étiquettes réellement utilisées (ordre du site d'abord). */
export function buildFilterOptions(used, canonicalList) {
  const present = [...new Set(used)]
  if (present.length === 0) return []
  const [all, ...known] = canonicalList
  return [
    all,
    ...known.filter((c) => present.includes(c)),
    ...present.filter((p) => !known.includes(p)).sort((a, b) => a.localeCompare(b)),
  ]
}


/**
 * Réalisations à montrer sous un service (règle `serviceRelated` de serviceSlugs.js) :
 * celles qui ont l'un des types de média OU l'un des secteurs demandés.
 */
export function selectRelated(items, related, max = 3) {
  if (!related) return []
  return items
    .filter(
      (p) =>
        related.types?.some((type) => p.mediaTypes.includes(type)) ||
        related.sectors?.some((sector) => p.sectorTypes.includes(sector))
    )
    .slice(0, max)
}