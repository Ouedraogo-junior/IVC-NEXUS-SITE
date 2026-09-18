import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogoChip from '../ui/LogoChip'
import Button from '../ui/Button'
import { navLinks } from '../../data/navLinks'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Header() {
  const { t, lang, setLang } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `relative font-heading font-semibold text-sm text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-impact after:transition-all ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-nexus/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <NavLink to="/" aria-label="Accueil IVC Nexus">
          <LogoChip />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
              {t.nav[link.key]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center bg-white/10 rounded-full p-0.5 text-xs font-heading font-bold">
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1 rounded-full transition-colors ${lang === 'fr' ? 'bg-impact text-white' : 'text-white/80'}`}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-impact text-white' : 'text-white/80'}`}
            >
              EN
            </button>
          </div>
          <Button to="/contact" className="!px-5 !py-2.5">
            {t.nav.ctaButton}
          </Button>
        </div>

        <button
          className="lg:hidden p-2 flex flex-col gap-1.5"
          aria-label="Menu"
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div
        className="lg:hidden overflow-hidden transition-all duration-300 bg-nexus/98"
        style={{ maxHeight: isMobileOpen ? '400px' : '0px' }}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 pt-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setIsMobileOpen(false)}
              className="text-white font-heading font-semibold py-2 border-b border-white/10"
            >
              {t.nav[link.key]}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center bg-white/10 rounded-full p-0.5 text-xs font-heading font-bold">
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full ${lang === 'fr' ? 'bg-impact text-white' : 'text-white/80'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-impact text-white' : 'text-white/80'}`}
              >
                EN
              </button>
            </div>
            <Button to="/contact" className="!px-5 !py-2.5" onClick={() => setIsMobileOpen(false)}>
              {t.nav.ctaButton}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}