import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { ADMIN_BASE } from '../constants'
import { formatDate, useApi } from '../hooks'
import { Badge, Button, Card, EmptyState, ErrorBox, PageHeader, Spinner, confirmDelete } from '../components/ui'
import { useToast } from '../components/Toast'

export default function PostsList() {
  const toast = useToast()
  const { data, loading, error, reload } = useApi('/admin/posts')
  const posts = data?.data || []

  async function remove(post) {
    if (!confirmDelete(`l’article « ${post.title} »`)) return
    try {
      await api.del(`/admin/posts/${post.id}`)
      toast('Article supprimé')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Articles du blog"
        subtitle="Publiez des actualités et des conseils pour faire vivre votre site."
        actions={
          <Link
            to={`${ADMIN_BASE}/articles/nouveau`}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Nouvel article
          </Link>
        }
      />
      {loading && <Spinner />}
      <ErrorBox error={error} onRetry={reload} />
      {data && (
        <Card className="overflow-hidden">
          {posts.length === 0 ? (
            <EmptyState>Aucun article pour le moment. Écrivez le premier !</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {posts.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-slate-100">
                    {p.cover && <img src={p.cover} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link to={`${ADMIN_BASE}/articles/${p.id}`} className="block truncate font-semibold text-slate-900 hover:text-blue-700">
                      {p.title}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {p.category} · {formatDate(p.published_at || p.updated_at)}
                    </p>
                  </div>
                  <Badge className={p.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                    {p.is_published ? 'Publié' : 'Brouillon'}
                  </Badge>
                  <div className="flex gap-2">
                    <Link
                      to={`${ADMIN_BASE}/articles/${p.id}`}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
                    >
                      Modifier
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => remove(p)}>
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
