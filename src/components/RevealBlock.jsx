import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

/**
 * Enveloppe n'importe quel contenu pour l'animer à l'entrée dans l'écran.
 * `variant` : 'reveal' (translation verticale, défaut) | 'reveal-left'
 * (translation horizontale) | 'reveal-scale' (zoom léger). Les classes sont
 * définies dans src/index.css.
 *
 *   <RevealBlock variant="reveal-left" delay={150}>...</RevealBlock>
 */
export default function RevealBlock({ as: Tag = 'div', variant = 'reveal', delay = 0, className = '', style, children, ...props }) {
  const [ref, inView] = useRevealOnScroll()
  return (
    <Tag
      ref={ref}
      className={`${variant} ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}