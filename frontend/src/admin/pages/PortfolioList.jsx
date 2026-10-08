import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { ADMIN_BASE } from '../constants'
import { useApi } from '../hooks'
import { Badge, Button, Card, EmptyState, ErrorBox, PageHeader, Spinner, confirmDelete } from '../components/ui'
import { useToast } from '../components/Toast'

export default function PortfolioList() {
  const toast = useToast()
  const { data, loading, error, reload } = useApi('/admin/portfolio')
  const items = data?.data || []

  async function remove(item) {
    const title = item.translations?.fr?.title || 'cette réalisation'
    if (!confirmDelete(`la réalisation « ${title} »`)) return
    try {
      await api.del(`/admin/portfolio/${item.id}`)
      toast('Réalisation supprimée')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Réalisations"
        subtitle="Vos projets, présentés en études de cas (besoin, réponse, résultat)."
        actions={
          <Link
            to={`${ADMIN_BASE}/realisations/nouveau`}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Ajouter une réalisation
          </Link>
        }
      />
      {loading && <Spinner />}
      <ErrorBox error={error} onRetry={reload} />
      {data && (
        <Card className="overflow-hidden">
          {items.length === 0 ? (
            <EmptyState>Aucune réalisation pour le moment.</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-slate-100">
                    {item.cover && <img src={item.cover} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link to={`${ADMIN_BASE}/realisations/${item.id}`} className="block truncate font-semibold text-slate-900 hover:text-blue-700">
                      {item.translations?.fr?.title}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {[...(item.media_types || []), ...(item.sector_types || [])].join(' · ') || '—'}
                      {item.year ? ` · ${item.year}` : ''}
                    </p>
                  </div>
                  <Badge className={item.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                    {item.is_published ? 'En ligne' : 'Masquée'}
                  </Badge>
                  <div className="flex gap-2">
                    <Link
                      to={`${ADMIN_BASE}/realisations/${item.id}`}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
                    >
                      Modifier
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => remove(item)}>
                      Supprimer
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </>
  )
}
