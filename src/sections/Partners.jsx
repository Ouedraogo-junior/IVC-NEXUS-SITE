import { useLanguage } from '../i18n/LanguageContext'
import { useAutoAdvanceCarousel } from '../hooks/useAutoAdvanceCarousel'

const PARTNER_COUNT = 6

function PlaceholderLogo({ label, className = '' }) {
  return (
    <div
      className={`rounded-2xl bg-sectionbg border border-dashed border-gray-300 flex items-center justify-center text-sm text-center text-slateText/50 px-4 ${className}`}
    >
      {label}
    </div>
  )
}

export default function Partners() {
  const { t, lang } = useLanguage()
  const placeholderLabel = lang === 'fr' ? 'Votre logo ici' : 'Your logo here'
  const { ref: scrollRef, index, goTo } = useAutoAdvanceCarousel(PARTNER_COUNT, { interval: 4000 })

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <p className="text-center text-xs font-bold tracking-widest uppercase mb-8 text-slateText">
          {t.partners.title}
        </p>

        {/* Mobile : un logo à la fois, avance automatique + swipe manuel */}
        <div className="sm:hidden">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {Array.from({ length: PARTNER_COUNT }).map((_, i) => (
              <div key={i} className="w-full shrink-0 snap-center flex justify-center px-2">
                <PlaceholderLogo label={placeholderLabel} className="aspect-[16/10] w-full max-w-sm" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: PARTNER_COUNT }).map((_, i) => (
              <button
                key={i}
                aria-label={`Logo ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-impact' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Tablette / desktop : grille statique */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: PARTNER_COUNT }).map((_, i) => (
            <PlaceholderLogo key={i} label={placeholderLabel} className="aspect-[3/2] text-[10px]" />
          ))}
        </div>

        <p className="text-center text-xs text-slateText/60 mt-6">{t.partners.note}</p>
      </div>
    </section>
  )
}