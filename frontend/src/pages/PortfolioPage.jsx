import { useId, useMemo, useState } from 'react'
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
    noMatch: 'Aucune réalisation ne correspond à ces filtres.',
    mediaLabel: 'Type de réalisation',
    sectorLabel: 'Secteur',
    reset: 'Réinitialiser les filtres',
    count: (n) => `${n} réalisation${n > 1 ? 's' : ''}`,
  },
  en: {
    loading: 'Loading our work…',
    error: 'We could not load our work right now. Please try again later.',
    empty: 'Our work will be online soon.',
    noMatch: 'No project matches these filters.',
    mediaLabel: 'Type of work',
    sectorLabel: 'Sector',
    reset: 'Reset filters',
    count: (n) => `${n} project${n > 1 ? 's' : ''}`,
  },
}

function FilterGroup({ label, options, active, onSelect, labels }) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
      <p id={id} className="md:w-44 shrink-0 text-xs font-heading font-bold uppercase tracking-wider text-nexus">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={active === option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-full text-sm font-heading font-bold transition-all ${
              active === option ? 'bg-impact text-white' : 'bg-sectionbg text-slateText hover:bg-nexus/5'
            }`}
          >
            {labels[option] ?? option}
          </button>
        ))}
      </div>
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

  const filtersActive = mediaFilter !== mediaTypes[0] || sectorFilter !== sectorTypes[0]
  const resetFilters = () => {
    setMediaFilter(mediaTypes[0])
    setSectorFilter(sectorTypes[0])
  }

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
            <div className="mb-10 rounded-2xl border border-gray-200 bg-white px-5 py-5 md:px-6">
              {mediaOptions.length > 1 && (
                <FilterGroup
                  label={m.mediaLabel}
                  options={mediaOptions}
                  active={mediaFilter}
                  onSelect={setMediaFilter}
                  labels={t.portfolioSection.filters}
                />
              )}
              {mediaOptions.length > 1 && sectorOptions.length > 1 && <hr className="my-4 border-gray-200" />}
              {sectorOptions.length > 1 && (
                <FilterGroup
                  label={m.sectorLabel}
                  options={sectorOptions}
                  active={sectorFilter}
                  onSelect={setSectorFilter}
                  labels={t.portfolioSection.sectorFilters}
                />
              )}
              {!loading && !error && items.length > 0 && (
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 text-sm text-slateText">
                  <span role="status">{m.count(filtered.length)}</span>
                  {filtersActive && (
                    <button type="button" onClick={resetFilters} className="font-heading font-bold text-impact hover:underline">
                      {m.reset}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {body}
        </div>
      </section>
    </>
  )
}