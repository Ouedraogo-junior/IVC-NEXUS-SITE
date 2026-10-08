import { useMemo } from 'react'
import { useFetch } from './publicApi'
import { adaptPortfolioItem } from './portfolioAdapter'

/** Réalisations publiées (API Laravel), déjà adaptées pour les composants du site. */
export function usePortfolio() {
  const { data, loading, error } = useFetch('/portfolio')
  const items = useMemo(() => (data?.data || []).map(adaptPortfolioItem), [data])
  return { items, loading, error }
}