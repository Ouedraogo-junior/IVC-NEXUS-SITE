import PageHeader from '../components/PageHeader'
import { useLanguage } from '../i18n/LanguageContext'

export default function PrivacyPolicy() {
  const { lang } = useLanguage()
  const isFr = lang === 'fr'

  return (
    <>
      <PageHeader title={isFr ? 'Politique de confidentialité' : 'Privacy policy'} />
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-slateText leading-loose text-sm flex flex-col gap-4">
          <p>
            {isFr
              ? 'Ce site utilise Google Analytics 4 et Google Tag Manager pour mesurer sa fréquentation. Ces outils ne sont activés qu\'après votre consentement via le bandeau de cookies.'
              : 'This site uses Google Analytics 4 and Google Tag Manager to measure traffic. These tools are only activated after your consent via the cookie banner.'}
          </p>
          <p>
            {isFr
              ? 'Les données collectées via les formulaires (contact, devis) sont utilisées uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.'
              : 'Data collected through the forms (contact, quote request) is used solely to respond to your request and is never shared with third parties.'}
          </p>
          <p className="italic">
            {isFr
              ? 'Cette page sera complétée avec la politique de confidentialité définitive d\'IVC Nexus.'
              : "This page will be completed with IVC Nexus's final privacy policy."}
          </p>
        </div>
      </section>
    </>
  )
}
