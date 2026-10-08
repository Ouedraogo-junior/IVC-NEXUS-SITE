import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'
import { useFetch } from '../lib/publicApi'

function StatItem({ value, label, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <div ref={ref} className={`text-center reveal-scale ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-5xl lg:text-6xl font-black mb-2 text-impact">{value}</div>
      <div className="text-sm font-semibold uppercase tracking-widest text-white/70">{label}</div>
    </div>
  )
}

export default function Stats() {
  const { lang } = useLanguage()
  const { data } = useFetch('/stats')
  const items = data?.data || []

  // Aucun chiffre saisi (ou API indisponible) : le bandeau n'apparaît pas.
  if (items.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-nexus">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {items.map((stat, i) => (
            <StatItem key={stat.id} value={stat.value} label={stat.label[lang] || stat.label.fr} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}