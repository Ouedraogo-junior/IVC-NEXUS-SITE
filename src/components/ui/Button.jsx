import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-impact text-white hover:bg-impact-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-impact/30',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-nexus hover:-translate-y-0.5',
  outlineDark: 'border-2 border-nexus text-nexus hover:bg-nexus hover:text-white hover:-translate-y-0.5',
  white: 'bg-white text-impact hover:bg-white/90 hover:-translate-y-0.5',
}

/**
 * Bouton unique pour tout le site : passer `to` pour un lien interne
 * (react-router), `href` pour un lien externe/mailto/tel, ou rien pour
 * un <button> classique (ex. soumission de formulaire).
 */
export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const base = `inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-8 py-4 text-sm transition-all duration-300 ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={base} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={base} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}
