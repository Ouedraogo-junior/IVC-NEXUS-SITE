import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'

function ServiceCard({ service, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <Link
      to="/services"
      ref={ref}
      className={`group bg-sectionbg rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-nexus/10 reveal ${
        inView ? 'in-view' : ''
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-white text-nexus transition-colors duration-300 group-hover:bg-impact group-hover:text-white">
        <Icon name={service.icon} className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-black mb-3 text-nexus">{service.title}</h3>
      <p className="text-sm leading-relaxed mb-6 text-slateText">{service.description}</p>
    </Link>
  )
}

export default function ServicesPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-28 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={t.servicesSection.title} subtitle={t.servicesSection.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.servicesSection.list.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}