import { FacebookIcon, LinkedinIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from './SocialIcons'

const ICONS = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
}

const STYLES = {
  footer:
    'w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white/70 transition-transform duration-200 hover:-translate-y-0.5 hover:text-white',
  light:
    'w-10 h-10 rounded-full bg-white flex items-center justify-center text-nexus shadow-sm hover:-translate-y-0.5 transition-transform',
}

/** Icônes des réseaux sociaux : uniquement ceux dont un lien a été saisi dans l'admin. */
export default function SocialLinks({ socials, variant = 'footer', className = 'flex gap-3' }) {
  if (!socials || socials.length === 0) return null
  return (
    <div className={className}>
      {socials.map(({ key, name, href }) => {
        const Icon = ICONS[key]
        return (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className={STYLES[variant]}>
            <Icon className="w-4 h-4" />
          </a>
        )
      })}
    </div>
  )
}