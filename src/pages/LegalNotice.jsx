import PageHeader from '../components/PageHeader'
import { useLanguage } from '../i18n/LanguageContext'

export default function LegalNotice() {
  const { lang } = useLanguage()
  const isFr = lang === 'fr'

  return (
    <>
      <PageHeader title={isFr ? 'Mentions légales' : 'Legal notice'} />
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-slateText leading-loose text-sm">
          <p className="mb-4">
            {isFr
              ? 'Cette page sera complétée avec les informations légales définitives d\'IVC Nexus : raison sociale, forme juridique, numéro d\'immatriculation, siège social, directeur de publication et hébergeur.'
              : "This page will be completed with IVC Nexus's official legal information: company name, legal form, registration number, registered address, publication director and host."}
          </p>
          <p>
            {isFr
              ? 'Hébergement : Netlify, Inc.'
              : 'Hosting: Netlify, Inc.'}
          </p>
        </div>
      </section>
    </>
  )
}
