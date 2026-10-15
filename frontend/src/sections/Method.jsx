import SectionHeading from '../components/ui/SectionHeading'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'

function StepItem({ index, title, description, delay }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <div ref={ref} className={`flex flex-col items-center text-center reveal-scale ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="w-12 h-12 rounded-full bg-nexus text-white flex items-center justify-center font-black mb-4">
        {String(index).padStart(2, '0')}
      </div>
      <h3 className="font-black text-nexus mb-2">{title}</h3>
      <p className="text-sm text-slateText leading-relaxed max-w-[260px]">{description}</p>
    </div>
  )
}

export default function Method() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-28 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={t.method.title} subtitle={t.method.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {t.method.steps.map((step, i) => (
            <StepItem key={step.title} index={i + 1} {...step} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}