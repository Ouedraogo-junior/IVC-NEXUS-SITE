import { Link } from 'react-router-dom'
import LogoChip from '../ui/LogoChip'
import { MapPin, Phone, Mail } from 'lucide-react'
import SocialLinks from '../ui/SocialLinks'
import { navLinks } from '../../data/navLinks'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSiteSettings } from '../../lib/siteSettings'

export default function Footer() {
  const { t } = useLanguage()
  const contact = useSiteSettings()
  const services = t.servicesSection.list

  return (
    <footer className="bg-nexus-dark py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-1">
            <LogoChip />
            <p className="mt-4 text-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
            <SocialLinks socials={contact.socials} className="flex gap-3 mt-5" />
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-impact">{t.footer.navTitle}</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-impact">{t.footer.servicesTitle}</h4>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.title}>
                  <Link to="/services" className="text-sm text-white/50 hover:text-white transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-impact">{t.footer.contactTitle}</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{contact.address || t.footer.address}</span>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.tel} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href={`tel:${phone.tel}`} className="hover:text-white transition-colors">{phone.display}</a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 border-t border-white/10">
          <span>© {new Date().getFullYear()} IVC Nexus. {t.footer.rights}</span>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">
              {t.footer.legal1}
            </Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors">
              {t.footer.legal2}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}