import Button from '../components/ui/Button'
import { useLanguage } from '../i18n/LanguageContext'
import { Phone, Mail } from 'lucide-react'

export default function CTABand() {
  const { t } = useLanguage()

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-impact">
      <div className="absolute top-0 right-0 w-72 h-72 opacity-10 rounded-full bg-white" style={{ transform: 'translate(30%,-30%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 rounded-full bg-nexus" style={{ transform: 'translate(-30%,30%)' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">{t.ctaBand.title}</h2>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">{t.ctaBand.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="tel:+22600000000" variant="white">
            <Phone className="w-4 h-4" />
            {t.ctaBand.callBtn}
          </Button>
          <Button to="/contact" className="!bg-nexus hover:!bg-nexus-mid">
            <Mail className="w-4 h-4" />
            {t.ctaBand.emailBtn}
          </Button>
        </div>
        <p className="text-xs text-white/60 mt-6">{t.ctaBand.disclaimer}</p>
      </div>
    </section>
  )
}
