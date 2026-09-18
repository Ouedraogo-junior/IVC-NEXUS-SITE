import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { portfolioItems } from '../data/portfolioItems'
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
      <Icon name={icon} className="w-10 h-10" strokeWidth={1.5} />
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
  const gallery = [
    item.gradient,
    [to, from],
    ['#1D3557', '#FF6B00'],
  ]

  return (
    <>
      <PageHeader title={item.label[lang]} subtitle={`${t.portfolioSection.filters[item.type]} · ${t.portfolioSection.sectorFilters[item.sector]}`} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Button to="/realisations" variant="outlineDark" className="!px-5 !py-2.5 mb-10">
            {cs.back}
          </Button>

          <div
            className="rounded-2xl flex items-center justify-center text-white mb-14"
            style={{ aspectRatio: '21 / 9', background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            <Icon name={item.icon} className="w-20 h-20" strokeWidth={1.5} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <RevealBlock variant="reveal-left">
              <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{cs.contextTitle}</h2>
              <p className="text-slateText leading-relaxed">{item.context[lang]}</p>
            </RevealBlock>
            <RevealBlock variant="reveal-left" delay={100}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{cs.needTitle}</h2>
              <p className="text-slateText leading-relaxed">{item.need[lang]}</p>
            </RevealBlock>
            <RevealBlock>
              <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{cs.solutionTitle}</h2>
              <p className="text-slateText leading-relaxed">{item.solution[lang]}</p>
            </RevealBlock>
            <RevealBlock delay={100}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{cs.resultTitle}</h2>
              <p className="text-slateText leading-relaxed">{item.result[lang]}</p>
            </RevealBlock>
          </div>

          <h2 className="text-xs font-bold uppercase tracking-widest text-impact mb-4">{cs.galleryTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
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