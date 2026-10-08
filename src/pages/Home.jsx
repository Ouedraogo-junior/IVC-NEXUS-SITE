import Hero from '../sections/Hero'
import AboutPreview from '../sections/AboutPreview'
import Expertises from '../sections/Expertises'
import Solutions from '../sections/Solutions'
import PortfolioPreview from '../sections/PortfolioPreview'
import Method from '../sections/Method'
import WhyUs from '../sections/WhyUs'
import Stats from '../sections/Stats'
import Testimonials from '../sections/Testimonials'
import Clients from '../sections/Clients'
import Partners from '../sections/Partners'
import CTABand from '../sections/CTABand'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'
import { SHOW_PLACEHOLDER_SECTIONS } from '../config/site'

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <Seo title={t.seo.home.title} description={t.seo.home.description} />
      <Hero />
      <AboutPreview />
      <Expertises />
      <Solutions />
      <PortfolioPreview />
      <Method />
      <WhyUs />
      {SHOW_PLACEHOLDER_SECTIONS && (
        <>
          <Stats />
          <Testimonials />
          <Clients />
          <Partners />
        </>
      )}
      <CTABand />
    </>
  )
}