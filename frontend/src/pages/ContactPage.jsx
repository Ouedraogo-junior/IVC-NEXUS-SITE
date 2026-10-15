import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import RevealBlock from '../components/RevealBlock'
import { serviceSlugs } from '../data/serviceSlugs'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../lib/api'
import { MapPin, Phone, Mail } from 'lucide-react'
import SocialLinks from '../components/ui/SocialLinks'
import Seo from '../components/Seo'
import BookingWidget from '../components/BookingWidget'
import { contactSlides } from '../data/heroSlides'
import { useSiteSettings } from '../lib/siteSettings'

function SuccessNote({ children }) {
  return (
    <div className="rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3" role="status">
      {children}
    </div>
  )
}

// Messages d'erreur et d'état (indépendants des erreurs en anglais renvoyées par le serveur)
const MESSAGES = {
  fr: {
    sending: 'Envoi…',
    failed: 'Erreur d’envoi — réessayez ou écrivez-nous directement par e-mail.',
    invalid: 'Merci de vérifier les champs saisis (adresse e-mail, message…).',
    badFile: 'Pièce jointe refusée : PDF, JPG, PNG ou Word, 5 Mo maximum.',
    tooMany: 'Trop de tentatives. Patientez une minute puis réessayez.',
  },
  en: {
    sending: 'Sending…',
    failed: 'Sending failed — please try again or email us directly.',
    invalid: 'Please check the fields you filled in (email address, message…).',
    badFile: 'Attachment rejected: PDF, JPG, PNG or Word, 5 MB maximum.',
    tooMany: 'Too many attempts. Please wait a minute and try again.',
  },
}

function explain(err, lang) {
  const m = MESSAGES[lang] || MESSAGES.fr
  if (err?.status === 429) return m.tooMany
  if (err?.status === 422) return err.errors?.attachment ? m.badFile : m.invalid
  return m.failed
}

/**
 * Envoie un formulaire à l'API Laravel (/api/contact ou /api/quote).
 * Les champs du formulaire doivent porter les noms attendus par l'API :
 * name, email, phone, organisation, message, service, budget, desired_date, attachment, website (piège anti-robot).
 */
function useFormSubmit(endpoint, lang) {
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status.state === 'sending') return

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('lang', lang)

    // Aucun fichier choisi : le navigateur envoie un fichier vide, on le retire
    const file = data.get('attachment')
    if (file instanceof File && file.size === 0) data.delete('attachment')

    setStatus({ state: 'sending', message: '' })
    try {
      await api.upload(endpoint, data)
      setStatus({ state: 'sent', message: '' })
      form.reset()
    } catch (err) {
      setStatus({ state: 'error', message: explain(err, lang) })
    }
  }

  return [status, onSubmit]
}

/** Champ piège : invisible pour les visiteurs, rempli par les robots. */
function Honeypot() {
  return (
    <p hidden aria-hidden="true">
      <label>
        Ne pas remplir : <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  )
}

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const c = t.contactPage
  const sending = (MESSAGES[lang] || MESSAGES.fr).sending
  const contactInfo = useSiteSettings()

  const preselectedService = searchParams.get('service') || serviceSlugs[0]

  const [contact, handleContactSubmit] = useFormSubmit('/contact', lang)
  const [devis, handleDevisSubmit] = useFormSubmit('/quote', lang)

  const serviceOptions = t.servicesSection.list.map((service, i) => ({
    value: serviceSlugs[i],
    label: service.title,
  }))

  return (
    <>
      <Seo title={t.seo.contact.title} description={t.seo.contact.description} />
      <PageHeader title={c.title} subtitle={c.subtitle} slides={contactSlides} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
          {/* Formulaire général */}
          <RevealBlock variant="reveal-left">
            <h2 className="text-2xl font-black text-nexus mb-6">{c.generalFormTitle}</h2>
            {contact.state === 'sent' && (
              <div className="mb-4">
                <SuccessNote>{c.success}</SuccessNote>
              </div>
            )}
            <form name="contact" onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <Honeypot />
              <FormField label={c.fields.name} name="name" required />
              <FormField label={c.fields.email} type="email" name="email" required />
              <FormField label={c.fields.phone} type="tel" name="phone" />
              <FormField label={c.fields.organisation} name="organisation" />
              <FormField label={c.fields.message} as="textarea" name="message" required />
              <Button type="submit" variant="primary" className="self-start" disabled={contact.state === 'sending'}>
                {contact.state === 'sending' ? sending : c.submit}
              </Button>
              {contact.state === 'error' && (
                <p className="text-sm text-red-600" role="alert">
                  {contact.message}
                </p>
              )}
            </form>
          </RevealBlock>

          {/* Formulaire de devis */}
          <RevealBlock variant="reveal" delay={150}>
            <h2 className="text-2xl font-black text-nexus mb-6">{c.devisFormTitle}</h2>
            {devis.state === 'sent' && (
              <div className="mb-4">
                <SuccessNote>{c.success}</SuccessNote>
              </div>
            )}
            <form name="devis" onSubmit={handleDevisSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
              <Honeypot />
              <FormField label={c.fields.service} as="select" name="service" defaultValue={preselectedService} options={serviceOptions} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={c.fields.date} type="date" name="desired_date" />
                <FormField label={c.fields.budget} name="budget" placeholder="FCFA" />
              </div>
              <FormField label={c.fields.description} as="textarea" name="message" required />
              <FormField label={c.fields.attachment} type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={c.fields.name} name="name" required />
                <FormField label={c.fields.email} type="email" name="email" required />
              </div>
              <FormField label={c.fields.phone} type="tel" name="phone" />
              <Button type="submit" variant="outlineDark" className="self-start" disabled={devis.state === 'sending'}>
                {devis.state === 'sending' ? sending : c.submitDevis}
              </Button>
              {devis.state === 'error' && (
                <p className="text-sm text-red-600" role="alert">
                  {devis.message}
                </p>
              )}
            </form>
          </RevealBlock>
        </div>
      </section>

      {/* Prise de rendez-vous : pleine largeur, en dehors de la grille des formulaires */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock className="text-center mb-10">
            <h2 className="text-2xl font-black text-nexus mb-2">{c.bookingTitle}</h2>
            <p className="text-slateText">{c.bookingSubtitle}</p>
          </RevealBlock>
          <RevealBlock delay={100} className="rounded-2xl overflow-hidden border border-gray-100" style={{ minHeight: '600px' }}>
            <BookingWidget />
          </RevealBlock>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <RevealBlock>
            <h3 className="text-sm font-bold uppercase tracking-widest text-impact mb-4">{c.coordinatesTitle}</h3>
            <ul className="flex flex-col gap-3 text-slateText text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                {contactInfo.address || t.footer.address}
              </li>
              {contactInfo.phones.map((phone) => (
                <li key={phone.tel} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href={`tel:${phone.tel}`} className="hover:text-nexus">
                    {phone.display}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-nexus">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </RevealBlock>
          {contactInfo.socials.length > 0 && (
            <RevealBlock delay={100}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-impact mb-4">{c.socialsTitle}</h3>
              <SocialLinks socials={contactInfo.socials} variant="light" />
            </RevealBlock>
          )}
          <RevealBlock delay={200} variant="reveal-scale" className="rounded-xl overflow-hidden h-48 sm:h-auto">
            <iframe
              title="Localisation IVC Nexus"
              className="w-full h-full min-h-[180px] border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Ouagadougou,Burkina%20Faso&output=embed"
            />
          </RevealBlock>
        </div>
      </section>
    </>
  )
}