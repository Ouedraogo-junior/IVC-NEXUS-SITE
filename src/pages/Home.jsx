import Hero from '../sections/Hero'
import AboutPreview from '../sections/AboutPreview'
import WhyUs from '../sections/WhyUs'
import ServicesPreview from '../sections/ServicesPreview'
import Method from '../sections/Method'
import PortfolioPreview from '../sections/PortfolioPreview'
import Stats from '../sections/Stats'
import Testimonials from '../sections/Testimonials'
import Clients from '../sections/Clients'
import Partners from '../sections/Partners'
import CTABand from '../sections/CTABand'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <Seo title={t.seo.home.title} description={t.seo.home.description} />
      <Hero />
      <AboutPreview />
      <WhyUs />
      <ServicesPreview />
      <Method />
      <PortfolioPreview />
      <Stats />
      <Testimonials />
      <Clients />
      <Partners />
      <CTABand />
    </>
  )
}
