import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ContentIcon from '../components/ui/ContentIcon'
import RevealBlock from '../components/RevealBlock'
import PortfolioCard from '../components/PortfolioCard'
import FaqList from '../components/FaqList'
import Seo from '../components/Seo'
import { servicesSlides } from '../data/heroSlides'
import { serviceSlugs, serviceRelated } from '../data/serviceSlugs'
import { usePortfolio } from '../lib/usePortfolio'
import { selectRelated } from '../lib/portfolioAdapter'
import { useLanguage } from '../i18n/LanguageContext'

const VISUAL_GRADIENTS = [
  ['#1D3557', '#2a4a73'],
  ['#152844', '#1D3557'],
  ['#FF6B00', '#FFB066'],
  ['#0D1F33', '#1D3557'],
  ['#2a4a73', '#152844'],
]

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-sectionbg text-nexus">
          {item}
        </span>
      ))}
    </div>
  )
}

// Bloc de tarifs : affiché seulement si le fichier facultatif des tarifs
// (pricing.fr.json) est présent dans le projet.
function PriceRows({ label, rows, note }) {
  if (!rows?.length && !note) return null
  return (
    <div className="mt-4 rounded-xl border border-gray-100 bg-sectionbg p-4">
      {rows?.length > 0 && (
        <>
          {label && <p className="text-[11px] font-bold uppercase tracking-widest text-impact mb-2">{label}</p>}
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex justify-between gap-4 py-1.5 text-sm border-b border-gray-200 last:border-0"
            >
              <span className="text-slateText">{row.label}</span>
              <span className="font-bold text-nexus text-right">{row.price}</span>
            </div>
          ))}
        </>
      )}
      {note && <p className="text-xs text-slateText mt-2">{note}</p>}
    </div>
  )
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const { hash, pathname } = useLocation()
  const s = t.servicesSection
  const ab = t.abonnements // présent seulement si le fichier des tarifs est installé
  const { items: portfolio } = usePortfolio()

  const faqItems = t.faqExtra
    ? [t.faqPage.items[0], ...t.faqExtra, ...t.faqPage.items.slice(1)]
    : t.faqPage.items

  // Liens d'ancre (ex. /services#impact) : défilement jusqu'à la section
  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => clearTimeout(timer)
  }, [hash, pathname])

  return (
    <>
      <Seo title={t.seo.services.title} description={t.seo.services.description} />
      <PageHeader title={s.title} subtitle={s.subtitle} slides={servicesSlides} />

      {/* Des solutions selon le profil du client */}
      <section className="py-20 lg:py-24 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionHeading title={s.audiencesTitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.audiences.map((audience, i) => (
              <RevealBlock key={audience.eyebrow} delay={(i % 3) * 100} className="bg-white rounded-2xl p-7 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-widest text-impact mb-2">
                  {audience.eyebrow}
                </span>
                {audience.name && <h3 className="text-xl font-black text-nexus mb-2">{audience.name}</h3>}
                <p className="text-sm text-slateText leading-relaxed mb-4">{audience.text}</p>
                <p className="text-xs font-bold text-nexus mb-2">{audience.listLabel}</p>
                <Chips items={audience.items} />
                {audience.cta && (
                  <div className="mt-auto pt-6">
                    <Button to="/contact" variant="outlineDark" className="!px-5 !py-2.5">
                      {audience.cta}
                    </Button>
                  </div>
                )}
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Les 5 offres */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-24">
          {s.list.map((service, i) => {
            const slug = serviceSlugs[i]
            const [from, to] = VISUAL_GRADIENTS[i % VISUAL_GRADIENTS.length]
            const servicePricing = t.servicesPricing?.[slug]
            const relatedItems = selectRelated(portfolio, serviceRelated[i])

            return (
              <div
                key={service.title}
                id={slug}
                className={`grid lg:grid-cols-2 gap-10 items-start scroll-mt-28 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <RevealBlock variant={i % 2 === 0 ? 'reveal-left' : 'reveal-scale'}>
                  <div
                    className="rounded-2xl flex items-center justify-center text-white"
                    style={{ aspectRatio: '4 / 3', background: `linear-gradient(135deg, ${from}, ${to})` }}
                  >
                    <ContentIcon name={service.icon} className="w-16 h-16" strokeWidth={1.2} />
                  </div>
                </RevealBlock>

                <RevealBlock delay={100}>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-impact">{service.title}</span>
                  <h2 className="text-2xl lg:text-3xl font-black text-nexus mt-2 mb-4 leading-snug">
                    {service.tagline}
                  </h2>
                  <p className="text-slateText leading-relaxed mb-8">{service.intro}</p>

                  <div className="flex flex-col gap-7 mb-8">
                    {service.groups.map((group) => {
                      const groupPricing = servicePricing?.groups?.[group.id]
                      return (
                        <div key={group.id}>
                          <h3 className="font-black text-nexus mb-2">{group.title}</h3>
                          {group.text && <p className="text-sm text-slateText leading-relaxed mb-3">{group.text}</p>}
                          {group.lead && <p className="text-sm font-semibold text-nexus mb-3">{group.lead}</p>}
                          {group.items && <Chips items={group.items} />}
                          {group.after && <p className="text-sm text-slateText mt-3">{group.after}</p>}
                          <PriceRows label={t.pricingLabel} rows={groupPricing?.rows} note={groupPricing?.note} />
                        </div>
                      )
                    })}
                    <PriceRows label={t.pricingLabel} rows={servicePricing?.rows} note={servicePricing?.note} />
                  </div>

                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 mb-10">
                    <Button
                      to={`/contact?service=${slug}`}
                      variant="primary"
                      className="w-full sm:w-auto max-sm:!px-3 max-sm:!py-3 max-sm:!text-xs"
                    >
                      {s.quoteButton}
                    </Button>
                    <Button
                      to={`/contact?service=${slug}&type=reservation`}
                      variant="outlineDark"
                      className="w-full sm:w-auto max-sm:!px-3 max-sm:!py-3 max-sm:!text-xs"
                    >
                      {s.bookButton}
                    </Button>
                  </div>

                  {relatedItems.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{s.relatedTitle}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {relatedItems.map((item, j) => (
                          <PortfolioCard key={item.id} item={item} delay={j * 80} />
                        ))}
                      </div>
                    </div>
                  )}
                </RevealBlock>
              </div>
            )
          })}
        </div>
      </section>

      {/* Abonnements : uniquement si le fichier des tarifs est installé */}
      {ab && (
        <section id="abonnements" className="py-20 lg:py-24 bg-sectionbg scroll-mt-28">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <SectionHeading title={ab.title} subtitle={ab.intro} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ab.packs.map((pack, i) => (
                <RevealBlock key={pack.name} delay={(i % 3) * 100} className="bg-white rounded-2xl p-7 flex flex-col">
                  <h3 className="text-xl font-black text-nexus">{pack.name}</h3>
                  <p className="text-2xl font-black text-impact mt-2">{pack.price}</p>
                  {pack.priceAlt && <p className="text-sm text-slateText mt-1">{pack.priceAlt}</p>}
                  <p className="text-sm font-semibold text-nexus mt-3 mb-5">{pack.tagline}</p>

                  {pack.variants && (
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-impact mb-2">{pack.variantsLabel}</p>
                      <ul className="flex flex-col gap-1.5">
                        {pack.variants.map((variant) => (
                          <li key={variant} className="text-sm font-semibold text-nexus">
                            {variant}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-xs font-bold uppercase tracking-widest text-impact mb-2">
                    {pack.includesLabel || ab.includesLabel}
                  </p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {pack.includes.map((entry) => (
                      <li key={entry} className="flex items-start gap-2 text-sm text-slateText">
                        <Check className="w-4 h-4 text-impact shrink-0 mt-0.5" />
                        {entry}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-bold uppercase tracking-widest text-impact mb-2">{ab.recommendedLabel}</p>
                  {pack.recommended && <Chips items={pack.recommended} />}
                  {pack.recommendedText && <p className="text-sm text-slateText leading-relaxed">{pack.recommendedText}</p>}

                  <div className="mt-auto pt-6">
                    <Button to="/contact" variant="outlineDark" className="w-full">
                      {pack.cta}
                    </Button>
                  </div>
                </RevealBlock>
              ))}
            </div>

            <RevealBlock className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl p-7">
              <h3 className="font-black text-nexus mb-3">{ab.notesTitle}</h3>
              <ul className="flex flex-col gap-2">
                {ab.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-sm text-slateText leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-impact mt-2 shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title={t.faqPage.title} subtitle={t.faqPage.subtitle} />
          <RevealBlock>
            <FaqList items={faqItems} />
          </RevealBlock>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-20 lg:py-24 bg-sectionbg text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <h2 className="text-2xl font-black text-nexus mb-3">{t.ctaBand.title}</h2>
            <p className="text-slateText max-w-xl mx-auto mb-8">{t.ctaBand.subtitle}</p>
            <Button to="/contact" variant="primary">
              {t.ctaBand.emailBtn}
            </Button>
          </RevealBlock>
        </div>
      </section>
    </>
  )
}