import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import PortfolioCard from '../components/PortfolioCard'
import { portfolioItems, mediaTypes, sectorTypes } from '../data/portfolioItems'
import { useLanguage } from '../i18n/LanguageContext'

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
          {labels[option]}
        </button>
      ))}
    </div>
  )
}

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [mediaFilter, setMediaFilter] = useState('Tout')
  const [sectorFilter, setSectorFilter] = useState('Tous secteurs')

  const filtered = useMemo(() => {
    return portfolioItems.filter((item) => {
      const mediaOk = mediaFilter === 'Tout' || item.type === mediaFilter
      const sectorOk = sectorFilter === 'Tous secteurs' || item.sector === sectorFilter
      return mediaOk && sectorOk
    })
  }, [mediaFilter, sectorFilter])

  return (
    <>
      <PageHeader title={t.portfolioSection.title} subtitle={t.portfolioSection.subtitle} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-4 mb-10">
            <FilterGroup options={mediaTypes} active={mediaFilter} onSelect={setMediaFilter} labels={t.portfolioSection.filters} />
            <FilterGroup options={sectorTypes} active={sectorFilter} onSelect={setSectorFilter} labels={t.portfolioSection.sectorFilters} />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-slateText py-16">—</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} wide={i % 5 === 0} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
