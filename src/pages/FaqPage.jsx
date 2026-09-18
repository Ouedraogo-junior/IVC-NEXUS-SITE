import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import FaqAccordion from '../components/FaqAccordion'
import { useLanguage } from '../i18n/LanguageContext'

export default function FaqPage() {
  const { t } = useLanguage()
  const p = t.faqPage

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <RevealBlock>
            <FaqAccordion items={p.items} />
          </RevealBlock>
        </div>
      </section>
    </>
  )
}