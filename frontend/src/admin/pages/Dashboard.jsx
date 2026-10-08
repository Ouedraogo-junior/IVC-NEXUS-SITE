import { Link } from 'react-router-dom'
import { ADMIN_BASE } from '../constants'
import { useApi } from '../hooks'
import { useAuth } from '../AuthContext'
import { Card, ErrorBox, PageHeader, Spinner } from '../components/ui'

function Stat({ label, value, to, accent }) {
  return (
    <Link to={to} className="block">
      <Card className="p-5 transition-shadow hover:shadow-md">
        <p className={`text-3xl font-bold ${accent ? 'text-blue-700' : 'text-slate-900'}`}>{value}</p>
        <p className="mt-1 text-sm text-slate-600">{label}</p>
      </Card>
    </Link>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useApi('/admin/summary')

  return (
    <>
      <PageHeader title={`Bonjour ${user?.name || ''}`.trim()} subtitle="Voici l’état de votre site." />
      {loading && <Spinner />}
      <ErrorBox error={error} onRetry={reload} />
      {data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat accent label="Nouveaux messages" value={data.data.new_submissions} to={`${ADMIN_BASE}/messages`} />
          <Stat label="Articles publiés" value={data.data.posts_published} to={`${ADMIN_BASE}/articles`} />
          <Stat label="Brouillons" value={data.data.posts_draft} to={`${ADMIN_BASE}/articles`} />
          <Stat label="Réalisations en ligne" value={data.data.portfolio_published} to={`${ADMIN_BASE}/realisations`} />
        </div>
      )}

      <Card className="mt-8 p-5">
        <h2 className="font-semibold text-slate-900">Actions rapides</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800" to={`${ADMIN_BASE}/articles/nouveau`}>
            Écrire un article
          </Link>
          <Link className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50" to={`${ADMIN_BASE}/realisations/nouveau`}>
            Ajouter une réalisation
          </Link>
          <Link className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50" to={`${ADMIN_BASE}/messages`}>
            Lire les messages
          </Link>
        </div>
      </Card>
    </>
  )
}
