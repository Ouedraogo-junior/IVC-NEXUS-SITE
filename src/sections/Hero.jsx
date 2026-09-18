import Button from '../components/ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nexus-dark">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(29,53,87,1) 0%, rgba(13,31,51,1) 55%, rgba(29,53,87,.85) 100%)',
          }}
        />
        <div
          className="absolute top-20 right-0 w-96 h-96 opacity-20"
          style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)' }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <line x1="0" y1="300" x2="1440" y2="600" stroke="#FF6B00" strokeWidth="1" />
          <line x1="0" y1="500" x2="1440" y2="200" stroke="white" strokeWidth="0.5" />
          <rect x="100" y="100" width="200" height="200" stroke="#FF6B00" strokeWidth="0.5" fill="none" transform="rotate(15, 200, 200)" />
          <rect x="1100" y="500" width="300" height="300" stroke="white" strokeWidth="0.5" fill="none" transform="rotate(-10, 1250, 650)" />
          <circle cx="1250" cy="150" r="80" stroke="#FF6B00" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-16 text-center lg:text-left w-full">
        <div className="max-w-3xl mx-auto lg:mx-0">
          <div
            className="inline-flex items-center gap-2 mb-6 animate-fade-up rounded-full px-4 py-1.5"
            style={{ background: 'rgba(255,107,0,.15)', border: '1px solid rgba(255,107,0,.4)' }}
          >
            <span className="w-2 h-2 rounded-full bg-impact" />
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase font-heading">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-up delay-200 opacity-0" style={{ letterSpacing: '-0.02em' }}>
            {t.hero.titleLine1} <span className="text-impact">{t.hero.titleLine2}</span>
            <br />
            {t.hero.titleLine3}
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-300 opacity-0">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start animate-fade-up delay-400 opacity-0">
            <Button to="/services" variant="primary" className="w-full sm:w-auto">
              {t.hero.ctaPrimary}
            </Button>
            <Button to="/realisations" variant="outline" className="w-full sm:w-auto">
              {t.hero.ctaSecondary} →
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-fade-in delay-600 opacity-0">
          <span className="text-xs text-white/40 tracking-widest uppercase font-heading">{t.hero.scroll}</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,107,0,.7), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
