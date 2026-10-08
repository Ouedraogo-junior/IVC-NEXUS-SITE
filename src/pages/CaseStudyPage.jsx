import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Seo from '../components/Seo'
import { portfolioItems } from '../data/portfolioItems'
import { portfolioSlides } from '../data/heroSlides'
import { useLanguage } from '../i18n/LanguageContext'

function GalleryTile({ gradient, icon, delay }) {
  const [from, to] = gradient
  return (
    <RevealBlock
      variant="reveal-scale"
      delay={delay}
      className="rounded-xl flex items-center justify-center text-white"
      style={{ aspectRatio: '4 / 3', background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <Icon name={icon} className="w-7 h-7 sm:w-10 sm:h-10" strokeWidth={1.5} />
    </RevealBlock>
  )
}

export default function CaseStudyPage() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const cs = t.caseStudy
  const item = portfolioItems.find((p) => p.id === id)

  if (!item) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slateText">{cs.notFound}</p>
      </section>
    )
  }

  const [from, to] = item.gradient
  const gallery = [item.gradient, [to, from], ['#1D3557', '#FF6B00']]
  const typeLabel = t.portfolioSection.filters[item.type]
  const sectorLabel = t.portfolioSection.sectorFilters[item.sector]

  // "Rapport annuel — ONG internationale" : le titre garde la nature du projet,
  // et le client passe en sous-titre (évite un tiret en début de ligne sur mobile).
  const [mainTitle, ...rest] = item.label[lang].split(' — ')
  const clientLine = rest.join(' — ')

  const blocks = [
    { title: cs.contextTitle, text: item.context[lang] },
    { title: cs.needTitle, text: item.need[lang] },
    { title: cs.solutionTitle, text: item.solution[lang] },
    { title: cs.resultTitle, text: item.result[lang] },
  ]

  return (
    <>
      <Seo title={item.label[lang]} description={item.context[lang]} />
      <PageHeader title={mainTitle} subtitle={clientLine || undefined} slides={portfolioSlides} />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Button to="/realisations" variant="outlineDark" className="!px-5 !py-2.5 mb-6">
            {cs.back}
          </Button>

          {/* Catégories de la réalisation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-impact/10 text-impact text-xs font-bold px-3 py-1.5">
              <Icon name={item.icon} className="w-3.5 h-3.5" />
              {typeLabel}
            </span>
            <span className="inline-flex items-center rounded-full bg-sectionbg text-nexus text-xs font-bold px-3 py-1.5">
              {sectorLabel}
            </span>
          </div>

          {/* Visuel principal */}
          <div
            className="relative rounded-2xl flex items-center justify-center text-white mb-10 lg:mb-14 aspect-[16/9] lg:aspect-[21/9]"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            <Icon name={item.icon} className="w-14 h-14 lg:w-20 lg:h-20" strokeWidth={1.5} />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold px-3 py-1">
              {typeLabel}
            </span>
          </div>

          {/* Le projet en 4 temps */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-12 lg:mb-14">
            {blocks.map((block, i) => (
              <RevealBlock key={block.title} delay={(i % 2) * 100} className="bg-sectionbg rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-nexus text-white flex items-center justify-center text-xs font-black shrink-0">
                    {i + 1}
                  </span>
                  <h2 className="font-black text-nexus">{block.title}</h2>
                </div>
                <p className="text-sm lg:text-base text-slateText leading-relaxed">{block.text}</p>
              </RevealBlock>
            ))}
          </div>

          <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-4">{cs.galleryTitle}</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {gallery.map((g, i) => (
              <GalleryTile key={i} gradient={g} icon={item.icon} delay={i * 100} />
            ))}
          </div>
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