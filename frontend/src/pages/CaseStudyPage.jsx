import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Seo from '../components/Seo'
import { portfolioSlides } from '../data/heroSlides'
import { useLanguage } from '../i18n/LanguageContext'
import { useFetch } from '../lib/publicApi'
import { adaptPortfolioItem } from '../lib/portfolioAdapter'

const MESSAGES = {
  fr: {
    loading: 'Chargement…',
    error: 'Impossible de charger cette réalisation pour le moment. Merci de réessayer un peu plus tard.',
    video: 'Voir la vidéo',
  },
  en: {
    loading: 'Loading…',
    error: 'We could not load this project right now. Please try again later.',
    video: 'Watch the video',
  },
}

/** YouTube / Vimeo → adresse d'intégration ; toute autre adresse reste un simple lien. */
function embedUrl(url) {
  try {
    const u = new URL(url)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null
    const host = u.hostname.replace(/^www\./, '').replace(/^m\./, '')
    const safe = (id) => (id && /^[\w-]{6,20}$/.test(id) ? id : null)
    if (host === 'youtu.be') {
      const id = safe(u.pathname.slice(1))
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host === 'youtube.com') {
      const id = safe(u.searchParams.get('v')) || safe(u.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1])
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.match(/^\/(\d{5,12})/)?.[1]
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    // adresse invalide : pas de vidéo
  }
  return null
}

const isWebUrl = (url) => /^https?:\/\//i.test(url || '')

function GalleryImage({ src, alt, delay }) {
  return (
    <RevealBlock variant="reveal-scale" delay={delay} className="rounded-xl overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
    </RevealBlock>
  )
}

export default function CaseStudyPage() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const cs = t.caseStudy
  const m = MESSAGES[lang] || MESSAGES.fr
  const { data, loading, error } = useFetch(`/portfolio/${encodeURIComponent(id)}`)
  const item = useMemo(() => (data?.data ? adaptPortfolioItem(data.data) : null), [data])

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slateText" role="status">
          {m.loading}
        </p>
      </section>
    )
  }

  if (error && error.status !== 404) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6 text-center">
        <p className="text-slateText" role="alert">
          {m.error}
        </p>
      </section>
    )
  }

  if (!item) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slateText">{cs.notFound}</p>
      </section>
    )
  }

  const [from, to] = item.gradient
  const mediaLabels = item.mediaTypes.map((tag) => t.portfolioSection.filters[tag] ?? tag)
  const sectorLabels = item.sectorTypes.map((tag) => t.portfolioSection.sectorFilters[tag] ?? tag)

  // "Rapport annuel — ONG internationale" : le titre garde la nature du projet,
  // et le client passe en sous-titre (évite un tiret en début de ligne sur mobile).
  const fullTitle = item.label[lang]
  const [mainTitle, ...rest] = fullTitle.split(' — ')
  const clientLine = rest.join(' — ')

  const blocks = [
    { title: cs.contextTitle, text: item.context[lang] },
    { title: cs.needTitle, text: item.need[lang] },
    { title: cs.solutionTitle, text: item.solution[lang] },
    { title: cs.resultTitle, text: item.result[lang] },
  ].filter((block) => block.text)

  const embed = item.videoUrl ? embedUrl(item.videoUrl) : null

  return (
    <>
      <Seo title={fullTitle} description={item.context[lang] || item.summary[lang]} />
      <PageHeader title={mainTitle} subtitle={clientLine || undefined} slides={portfolioSlides} />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Button to="/realisations" variant="outlineDark" className="!px-5 !py-2.5 mb-6">
            {cs.back}
          </Button>

          {/* Catégories de la réalisation */}
          {(mediaLabels.length > 0 || sectorLabels.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {mediaLabels.map((label) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full bg-impact/10 text-impact text-xs font-bold px-3 py-1.5">
                  <Icon name={item.icon} className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
              {sectorLabels.map((label) => (
                <span key={label} className="inline-flex items-center rounded-full bg-sectionbg text-nexus text-xs font-bold px-3 py-1.5">
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Visuel principal : photo de couverture, sinon aplat de couleur de la charte */}
          {item.cover ? (
            <div className="rounded-2xl overflow-hidden mb-10 lg:mb-14 aspect-[16/9] lg:aspect-[21/9] bg-sectionbg">
              <img src={item.cover} alt={mainTitle} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="relative rounded-2xl flex items-center justify-center text-white mb-10 lg:mb-14 aspect-[16/9] lg:aspect-[21/9]"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              <Icon name={item.icon} className="w-14 h-14 lg:w-20 lg:h-20" strokeWidth={1.5} />
            </div>
          )}

          {/* Le projet en 4 temps */}
          {blocks.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-12 lg:mb-14">
              {blocks.map((block, i) => (
                <RevealBlock key={block.title} delay={(i % 2) * 100} className="bg-sectionbg rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-nexus text-white flex items-center justify-center text-xs font-black shrink-0">
                      {i + 1}
                    </span>
                    <h2 className="font-black text-nexus">{block.title}</h2>
                  </div>
                  <p className="text-sm lg:text-base text-slateText leading-relaxed whitespace-pre-line">{block.text}</p>
                </RevealBlock>
              ))}
            </div>
          )}

          {/* Vidéo */}
          {embed && (
            <div className="mb-12 lg:mb-14 rounded-2xl overflow-hidden aspect-video bg-black">
              <iframe
                title={mainTitle}
                src={embed}
                className="w-full h-full border-0"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          )}
          {!embed && isWebUrl(item.videoUrl) && (
            <div className="mb-12 lg:mb-14">
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-impact text-white font-heading font-bold px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {m.video}
              </a>
            </div>
          )}

          {/* Galerie : affichée seulement quand des images ont été ajoutées */}
          {item.gallery.length > 0 && (
            <>
              <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-4">{cs.galleryTitle}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {item.gallery.map((src, i) => (
                  <GalleryImage key={src} src={src} alt={`${mainTitle} — ${i + 1}`} delay={(i % 3) * 100} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-sectionbg text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <h2 className="text-2xl font-black text-nexus mb-3">{cs.ctaTitle}</h2>
            <p className="text-slateText mb-8">{cs.ctaText}</p>
            <Button to="/contact" variant="primary">
              {t.nav.ctaButton}
            </Button>
          </RevealBlock>
        </div>
      </section>
    </>
  )
}