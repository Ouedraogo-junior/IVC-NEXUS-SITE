import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'

function WhyUsItem({ icon, title, description, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <div ref={ref} className={`flex gap-4 reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="w-12 h-12 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-impact">
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-black text-nexus mb-1">{title}</h3>
        <p className="text-sm text-slateText leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-28 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={t.whyUs.title} subtitle={t.whyUs.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {t.whyUs.items.map((item, i) => (
            <WhyUsItem key={item.title} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}