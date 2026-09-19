import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import RevealBlock from '../components/RevealBlock'
import { useLanguage } from '../i18n/LanguageContext'
import Icon from '../components/ui/Icon'
import Seo from '../components/Seo'


export default function AboutPage() {
  const { t } = useLanguage()
  const p = t.aboutPage

  return (
    <>
      <Seo title={t.seo.about.title} description={t.seo.about.description} />
      <PageHeader title={p.title} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <RevealBlock variant="reveal-left">
            <h2 className="text-2xl font-black text-nexus mb-4">{p.historyTitle}</h2>
            <p className="text-slateText leading-loose">{p.historyText}</p>
          </RevealBlock>
          <RevealBlock variant="reveal-left" delay={150}>
            <h2 className="text-2xl font-black text-nexus mb-4">{p.missionTitle}</h2>
            <p className="text-slateText leading-loose">{p.missionText}</p>
          </RevealBlock>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-nexus text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <h2 className="text-2xl font-black text-impact mb-4">{p.visionTitle}</h2>
            <p className="text-2xl lg:text-3xl font-black text-white max-w-2xl mx-auto leading-snug">
              {p.visionText}
            </p>
          </RevealBlock>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-10 text-center">
            {p.valuesTitle}
          </RevealBlock>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.values.map((value, i) => (
              <RevealBlock key={value} delay={i * 100} className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-impact/10 text-impact flex items-center justify-center font-black mb-4">
                  {i + 1}
                </div>
                <p className="text-sm text-slateText leading-relaxed">{value}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-2 text-center">
            {p.capabilitiesTitle}
          </RevealBlock>
          <p className="text-xs text-slateText/60 text-center mb-10">{p.capabilitiesNote}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.capabilities.map((cap, i) => (
              <RevealBlock key={cap.label} delay={i * 100} className="bg-sectionbg rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-white text-impact flex items-center justify-center mb-3">
                  <Icon name={cap.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-black text-nexus text-sm mb-2">{cap.label}</h3>
                <p className="text-xs text-slateText leading-relaxed">{cap.text}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-sectionbg text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <h2 className="text-2xl font-black text-nexus mb-4">{p.teamTitle}</h2>
            <p className="text-slateText max-w-xl mx-auto mb-8">{p.teamText}</p>
            <Button to="/contact" variant="outlineDark">
              {t.nav.ctaButton}
            </Button>
          </RevealBlock>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-2 text-center">
            {t.sectorsPage.title}
          </RevealBlock>
          <p className="text-sm text-slateText text-center max-w-xl mx-auto mb-10">{t.sectorsPage.subtitle}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.sectorsPage.sectors.map((sector, i) => (
              <RevealBlock key={sector.title} delay={i * 100} className="bg-sectionbg rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-white text-impact flex items-center justify-center mb-3">
                  <Icon name={sector.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-black text-nexus text-sm mb-2">{sector.title}</h3>
                <p className="text-xs text-slateText leading-relaxed mb-4">{sector.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sector.examples.map((example) => (
                    <span key={example} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white text-nexus">
                      {example}
                    </span>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}