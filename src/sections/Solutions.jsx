import { Check } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ContentIcon from '../components/ui/ContentIcon'
import Button from '../components/ui/Button'
import RevealBlock from '../components/RevealBlock'
import { useLanguage } from '../i18n/LanguageContext'

export default function Solutions() {
  const { t } = useLanguage()
  const s = t.solutions
  const hasPricing = Boolean(t.abonnements)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={s.title} />

        <div className="grid md:grid-cols-2 gap-6">
          {s.items.map((item, i) => {
            const showPricingLink = hasPricing && item.pricingCta
            const ctaLabel = showPricingLink ? item.pricingCta : item.cta
            const ctaLink = showPricingLink ? item.pricingLink : item.link

            return (
              <RevealBlock key={item.name} delay={(i % 2) * 100} className="bg-sectionbg rounded-2xl p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-nexus text-white flex items-center justify-center shrink-0">
                    <ContentIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-impact">{item.name}</span>
                </div>

                <h3 className="text-xl lg:text-2xl font-black text-nexus mb-3 leading-snug">{item.tagline}</h3>
                <p className="text-slateText leading-relaxed mb-5">{item.text}</p>

                {item.lead && <p className="text-sm font-bold text-nexus mb-3">{item.lead}</p>}
                {item.items && (
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {item.items.map((entry) => (
                      <li key={entry} className="flex items-start gap-2 text-sm text-slateText">
                        <Check className="w-4 h-4 text-impact shrink-0 mt-0.5" />
                        {entry}
                      </li>
                    ))}
                  </ul>
                )}

                {item.phases && (
                  <ul className="flex flex-col gap-3 mb-6">
                    {item.phases.map((phase) => (
                      <li key={phase.label} className="text-sm text-slateText leading-relaxed">
                        <span className="font-bold text-nexus">{phase.label} : </span>
                        {phase.text}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-2">
                  <Button to={ctaLink} variant="outlineDark" className="!px-5 !py-2.5">
                    {ctaLabel}
                  </Button>
                </div>
              </RevealBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}