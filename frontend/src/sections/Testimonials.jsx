import SectionHeading from '../components/ui/SectionHeading'
import { Quote } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'
import testimonialsData from '../../content/settings/testimonials.json'

function TestimonialCard({ quote, author, role, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <div ref={ref} className={`bg-white rounded-2xl p-8 shadow-sm reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <Quote className="w-7 h-7 text-impact mb-3" strokeWidth={1.5} fill="currentColor" />
      <p className="text-slateText text-sm leading-relaxed mb-6 italic">{quote}</p>
      <div className="text-sm font-black text-nexus">{author}</div>
      <div className="text-xs text-slateText">{role}</div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-28 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={t.testimonials.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.items.map((item, i) => (
            <TestimonialCard key={item.author + i} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}