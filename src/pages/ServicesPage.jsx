import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import FaqAccordion from '../components/FaqAccordion'
import RevealBlock from '../components/RevealBlock'
import Icon from '../components/ui/Icon'
import { Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { serviceSlugs } from '../data/serviceSlugs'
import Seo from '../components/Seo'

const gradients = [
  ['#1D3557', '#2a4a73'],
  ['#FF6B00', '#FFB066'],
  ['#152844', '#1D3557'],
  ['#0D1F33', '#1D3557'],
  ['#2a4a73', '#1D3557'],
]

function ServiceGallery({ icon, colorPair }) {
  const [from, to] = colorPair
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
      <div
        className="col-span-2 row-span-2 rounded-2xl flex items-center justify-center text-white"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <Icon name={icon} className="w-16 h-16" strokeWidth={1.5} />
      </div>
      <div className="rounded-xl opacity-70" style={{ background: `linear-gradient(135deg, ${to}, ${from})` }} />
      <div className="rounded-xl opacity-40" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }} />
    </div>
  )
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const s = t.servicesSection

  return (
    <>
      <Seo title={t.seo.services.title} description={t.seo.services.description} />
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col gap-20">
          {s.list.map((service, i) => (
            <div
              key={service.title}
              id={serviceSlugs[i]}
              className={`grid lg:grid-cols-2 gap-10 items-start scroll-mt-28 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <RevealBlock variant={i % 2 === 0 ? 'reveal-left' : 'reveal'} style={{ aspectRatio: '4 / 3' }}>
                <ServiceGallery icon={service.icon} colorPair={gradients[i % gradients.length]} />
              </RevealBlock>

              <RevealBlock variant={i % 2 === 0 ? 'reveal' : 'reveal-left'} delay={100}>
                <h2 className="text-3xl font-black text-nexus mb-4">{service.title}</h2>
                <p className="text-slateText leading-loose mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {service.subservices.map((sub) => (
                    <span key={sub} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-sectionbg text-nexus">
                      {sub}
                    </span>
                  ))}
                </div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{s.advantagesTitle}</h3>
                <ul className="grid sm:grid-cols-3 gap-3 mb-8">
                  {service.advantages.map((adv) => (
                    <li key={adv} className="text-sm text-slateText flex items-center gap-2">
                      <Check className="w-4 h-4 text-impact shrink-0" /> {adv}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mb-10">
                  <Button to={`/contact?service=${serviceSlugs[i]}`} variant="primary">
                    {s.quoteButton}
                  </Button>
                  <Button to={`/contact?service=${serviceSlugs[i]}&type=reservation`} variant="outlineDark">
                    {s.bookButton}
                  </Button>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-impact mb-3">{s.faqTitle}</h3>
                <FaqAccordion items={service.faq} />
              </RevealBlock>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-sectionbg">
        <div className="max-w-3xl mx-auto px-6">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-2 text-center">
            {t.faqPage.title}
          </RevealBlock>
          <p className="text-sm text-slateText text-center mb-10">{t.faqPage.subtitle}</p>
          <RevealBlock delay={100}>
            <FaqAccordion items={t.faqPage.items} />
          </RevealBlock>
        </div>
      </section>
      
    </>
  )
}