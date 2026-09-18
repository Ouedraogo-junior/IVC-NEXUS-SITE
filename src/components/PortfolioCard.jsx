import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Icon from './ui/Icon'

export default function PortfolioCard({ item, wide = false, delay = 0 }) {
  const { lang, t } = useLanguage()
  const [ref, inView] = useRevealOnScroll()
  const [from, to] = item.gradient

  return (
    <Link
      to={`/realisations/${item.id}`}
      ref={ref}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 reveal block ${inView ? 'in-view' : ''}`}
      style={{
        aspectRatio: wide ? '16 / 9' : '4 / 3',
        gridColumn: wide ? 'span 2' : 'span 1',
        transitionDelay: inView ? `${delay}ms` : '0ms',
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <Icon name={item.icon} className="w-10 h-10" strokeWidth={1.5} />
      </div>
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(29,53,87,.92), transparent 60%)' }}
      >
        <span className="inline-block self-start text-xs font-bold text-white px-2 py-0.5 rounded mb-1.5 bg-impact">
          {t.portfolioSection.filters[item.type]}
        </span>
        <span className="text-sm font-bold text-white">{item.label[lang]}</span>
      </div>
    </Link>
  )
}