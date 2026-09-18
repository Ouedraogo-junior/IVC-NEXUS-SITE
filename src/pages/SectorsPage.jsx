import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Icon from '../components/ui/Icon'
import { useLanguage } from '../i18n/LanguageContext'

export default function SectorsPage() {
  const { t } = useLanguage()
  const p = t.sectorsPage

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.sectors.map((sector, i) => (
              <RevealBlock key={sector.title} delay={i * 100} className="bg-sectionbg rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-white text-impact flex items-center justify-center mb-5">
                  <Icon name={sector.icon} className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black text-nexus mb-3">{sector.title}</h2>
                <p className="text-sm text-slateText leading-relaxed mb-5">{sector.description}</p>
                <ul className="flex flex-col gap-2">
                  {sector.examples.map((example) => (
                    <li key={example} className="text-xs text-slateText flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-impact mt-1.5 shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}