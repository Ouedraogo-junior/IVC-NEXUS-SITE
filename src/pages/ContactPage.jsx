import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import RevealBlock from '../components/RevealBlock'
import { serviceSlugs } from '../data/serviceSlugs'
import { useLanguage } from '../i18n/LanguageContext'
import { submitNetlifyForm } from '../utils/submitNetlifyForm'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FacebookIcon, LinkedinIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from '../components/ui/SocialIcons'

function SuccessNote({ children }) {
  return (
    <div className="rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
      {children}
    </div>
  )
}

export default function ContactPage() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const c = t.contactPage

  const preselectedService = searchParams.get('service') || serviceSlugs[0]

  const [contactSent, setContactSent] = useState(false)
  const [devisSent, setDevisSent] = useState(false)
  const [contactError, setContactError] = useState(false)
  const [devisError, setDevisError] = useState(false)

  const serviceOptions = t.servicesSection.list.map((service, i) => ({
    value: serviceSlugs[i],
    label: service.title,
  }))

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitNetlifyForm('contact', e.target)
      setContactSent(true)
      e.target.reset()
    } catch {
      setContactError(true)
    }
  }

  const handleDevisSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitNetlifyForm('devis', e.target)
      setDevisSent(true)
      e.target.reset()
    } catch {
      setDevisError(true)
    }
  }

  return (
    <>
      <PageHeader title={c.title} subtitle={c.subtitle} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
          {/* Formulaire général */}
          <RevealBlock variant="reveal-left">
            <h2 className="text-2xl font-black text-nexus mb-6">{c.generalFormTitle}</h2>
            {contactSent && <div className="mb-4"><SuccessNote>{c.success}</SuccessNote></div>}
            <form name="contact" onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Ne pas remplir : <input name="bot-field" />
                </label>
              </p>
              <FormField label={c.fields.name} name="nom" required />
              <FormField label={c.fields.email} type="email" name="email" required />
              <FormField label={c.fields.phone} type="tel" name="telephone" />
              <FormField label={c.fields.organisation} name="organisation" />
              <FormField label={c.fields.message} as="textarea" name="message" required />
              <Button type="submit" variant="primary" className="self-start">
                {c.submit}
              </Button>
              {contactError && <p className="text-sm text-red-600">Erreur d'envoi — réessayez ou écrivez-nous directement par e-mail.</p>}
            </form>
          </RevealBlock>

          {/* Formulaire de devis */}
          <RevealBlock variant="reveal" delay={150}>
            <h2 className="text-2xl font-black text-nexus mb-6">{c.devisFormTitle}</h2>
            {devisSent && <div className="mb-4"><SuccessNote>{c.success}</SuccessNote></div>}
            <form name="devis" onSubmit={handleDevisSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
              <input type="hidden" name="form-name" value="devis" />
              <p hidden>
                <label>
                  Ne pas remplir : <input name="bot-field" />
                </label>
              </p>
              <FormField label={c.fields.service} as="select" name="service" defaultValue={preselectedService} options={serviceOptions} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label={c.fields.date} type="date" name="date_souhaitee" />
                <FormField label={c.fields.budget} name="budget" placeholder="FCFA" />
              </div>
              <FormField label={c.fields.description} as="textarea" name="description" required />
              <FormField label={c.fields.attachment} type="file" name="piece_jointe" />
              <div className="grid grid-cols-2 gap-4">
                <FormField label={c.fields.name} name="nom" required />
                <FormField label={c.fields.email} type="email" name="email" required />
              </div>
              <FormField label={c.fields.phone} type="tel" name="telephone" />
              <Button type="submit" variant="outlineDark" className="self-start">
                {c.submitDevis}
              </Button>
              {devisError && <p className="text-sm text-red-600">Erreur d'envoi — réessayez ou écrivez-nous directement par e-mail.</p>}
            </form>
          </RevealBlock>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <RevealBlock>
            <h3 className="text-sm font-bold uppercase tracking-widest text-impact mb-4">{c.coordinatesTitle}</h3>
            <ul className="flex flex-col gap-3 text-slateText text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {t.footer.address}</li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" /> <a href="tel:+22600000000" className="hover:text-nexus">+226 00 00 00 00</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" /> <a href="mailto:contact@ivcnexus.example" className="hover:text-nexus">contact@ivcnexus.example</a>
              </li>
            </ul>
          </RevealBlock>
          <RevealBlock delay={100}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-impact mb-4">{c.socialsTitle}</h3>
            <div className="flex gap-3">
              {[
                  { Icon: FacebookIcon, name: 'Facebook' },
                  { Icon: LinkedinIcon, name: 'LinkedIn' },
                  { Icon: InstagramIcon, name: 'Instagram' },
                  { Icon: TiktokIcon, name: 'TikTok' },
                  { Icon: YoutubeIcon, name: 'YouTube' },
                ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-nexus shadow-sm hover:-translate-y-0.5 transition-transform"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </RevealBlock>
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