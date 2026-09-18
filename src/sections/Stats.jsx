import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import statsData from '../../content/settings/stats.json'

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
  return (
    <section className="py-16 lg:py-20 bg-nexus">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {statsData.items.map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}