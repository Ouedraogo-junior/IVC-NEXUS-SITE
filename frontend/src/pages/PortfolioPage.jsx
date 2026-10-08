import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import PortfolioCard from '../components/PortfolioCard'
import { mediaTypes, sectorTypes } from '../data/portfolioItems'
import { useLanguage } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import { portfolioSlides } from '../data/heroSlides'
import { useFetch } from '../lib/publicApi'
import { adaptPortfolioItem, buildFilterOptions } from '../lib/portfolioAdapter'

const MESSAGES = {
  fr: {
    loading: 'Chargement des réalisations…',
    error: 'Impossible de charger les réalisations pour le moment. Merci de réessayer un peu plus tard.',
    empty: 'Nos réalisations seront bientôt en ligne.',
    noMatch: 'Aucune réalisation ne correspond à ce filtre.',
  },
  en: {
    loading: 'Loading our work…',
    error: 'We could not load our work right now. Please try again later.',
    empty: 'Our work will be online soon.',
    noMatch: 'No project matches this filter.',
  },
}

function FilterGroup({ options, active, onSelect, labels }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 rounded-full text-sm font-heading font-bold transition-all ${
            active === option ? 'bg-impact text-white scale-105' : 'bg-sectionbg text-slateText hover:bg-nexus/5'
          }`}
        >
          {labels[option] ?? option}
        </button>
      ))}
    </div>
  )
}

export default function PortfolioPage() {
  const { t, lang } = useLanguage()
  const m = MESSAGES[lang] || MESSAGES.fr
  const { data, loading, error } = useFetch('/portfolio')
  const [mediaFilter, setMediaFilter] = useState(mediaTypes[0])
  const [sectorFilter, setSectorFilter] = useState(sectorTypes[0])

  const items = useMemo(() => (data?.data || []).map(adaptPortfolioItem), [data])
  const mediaOptions = useMemo(() => buildFilterOptions(items.flatMap((i) => i.mediaTypes), mediaTypes), [items])
  const sectorOptions = useMemo(() => buildFilterOptions(items.flatMap((i) => i.sectorTypes), sectorTypes), [items])

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (mediaFilter === mediaTypes[0] || item.mediaTypes.includes(mediaFilter)) &&
          (sectorFilter === sectorTypes[0] || item.sectorTypes.includes(sectorFilter))
      ),
    [items, mediaFilter, sectorFilter]
  )

  let body
  if (loading) {
    body = (
      <p className="text-center text-slateText py-16" role="status">
        {m.loading}
      </p>
    )
  } else if (error) {
    body = (
      <p className="text-center text-slateText py-16" role="alert">
        {m.error}
      </p>
    )
  } else if (items.length === 0) {
    body = <p className="text-center text-slateText py-16">{m.empty}</p>
  } else if (filtered.length === 0) {
    body = <p className="text-center text-slateText py-16">{m.noMatch}</p>
  } else {
    body = (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <PortfolioCard key={item.id} item={item} wide={i % 5 === 0} />
        ))}
      </div>
    )
  }

  return (
    <>
      <Seo title={t.seo.portfolio.title} description={t.seo.portfolio.description} />
      <PageHeader title={t.portfolioSection.title} subtitle={t.portfolioSection.subtitle} slides={portfolioSlides} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {(mediaOptions.length > 1 || sectorOptions.length > 1) && (
            <div className="flex flex-col gap-4 mb-10">
              {mediaOptions.length > 1 && (
                <FilterGroup options={mediaOptions} active={mediaFilter} onSelect={setMediaFilter} labels={t.portfolioSection.filters} />
              )}
              {sectorOptions.length > 1 && (
                <FilterGroup options={sectorOptions} active={sectorFilter} onSelect={setSectorFilter} labels={t.portfolioSection.sectorFilters} />
              )}
            </div>
          )}
          {body}
        </div>
      </section>
    </>
  )
}