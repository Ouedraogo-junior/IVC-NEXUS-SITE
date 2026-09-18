import Button from '../components/ui/Button'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useLanguage } from '../i18n/LanguageContext'

export default function AboutPreview() {
  const { t } = useLanguage()
  const [textRef, textIn] = useRevealOnScroll()
  const [visualRef, visualIn] = useRevealOnScroll()

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={textRef} className={`reveal-left ${textIn ? 'in-view' : ''}`}>
            <span className="inline-block w-[50px] h-1 rounded-full bg-impact mb-4" />
            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight text-nexus">
              {t.aboutPreview.title1} <span className="text-impact">{t.aboutPreview.title2}</span>
            </h2>
            <p className="text-lg mb-5 text-slateText leading-loose">{t.aboutPreview.text1}</p>
            <p className="text-lg mb-8 text-slateText leading-loose">{t.aboutPreview.text2}</p>
            <Button to="/a-propos" variant="outlineDark">
              {t.aboutPreview.cta}
            </Button>
          </div>

          <div ref={visualRef} className={`relative reveal delay-200 ${visualIn ? 'in-view' : ''}`}>
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: '4 / 3', background: 'linear-gradient(135deg, #1D3557 0%, #2a4a73 100%)' }}
            >
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" opacity="0.35">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl px-6 py-4 shadow-xl bg-impact">
              <div className="text-3xl font-black text-white">{t.aboutPreview.badgeNumber}</div>
              <div className="text-xs text-white/80 font-semibold mt-0.5">{t.aboutPreview.badgeLabel}</div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl opacity-20 border-[3px] border-nexus" />
          </div>
        </div>
      </div>
    </section>
  )
}
