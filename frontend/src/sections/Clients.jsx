import Icon from '../components/ui/Icon'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'

function ClientIcon({ icon, label, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <div ref={ref} className={`flex flex-col items-center gap-3 reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm bg-white text-nexus">
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <span className="text-xs font-semibold text-center text-slateText">{label}</span>
    </div>
  )
}

export default function Clients() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-20 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <p className="text-center text-xs font-bold tracking-widest uppercase mb-10 text-slateText">
          {t.clients.eyebrow}
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
          {t.clients.items.map((client, i) => (
            <ClientIcon key={client.label} icon={client.icon} label={client.label} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}