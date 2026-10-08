import SectionHeading from '../components/ui/SectionHeading'
import PortfolioCard from '../components/PortfolioCard'
import Button from '../components/ui/Button'
import { useLanguage } from '../i18n/LanguageContext'
import { usePortfolio } from '../lib/usePortfolio'

export default function PortfolioPreview() {
  const { t } = useLanguage()
  const { items } = usePortfolio()
  const preview = items.slice(0, 4)

  // Pas encore de réalisation publiée (ou API indisponible) : la section n'apparaît pas.
  if (preview.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={t.portfolioSection.title} subtitle={t.portfolioSection.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {preview.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center">
          <Button to="/realisations" variant="outlineDark">
            {t.portfolioSection.viewAll} →
          </Button>
        </div>
      </div>
    </section>
  )
}