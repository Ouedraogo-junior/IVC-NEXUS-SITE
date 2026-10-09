import { useEffect, useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { ADMIN_BASE } from './constants'
import { api } from '../lib/api'
import { Spinner } from './components/ui'

const NAV = [
  { to: ADMIN_BASE, label: 'Tableau de bord', end: true },
  { to: `${ADMIN_BASE}/messages`, label: 'Messages & devis', badge: true },
  { to: `${ADMIN_BASE}/articles`, label: 'Articles du blog' },
  { to: `${ADMIN_BASE}/realisations`, label: 'Réalisations' },
  { to: `${ADMIN_BASE}/temoignages`, label: 'Témoignages' },
  { to: `${ADMIN_BASE}/frequentation`, label: 'Fréquentation' },
  { to: `${ADMIN_BASE}/chiffres`, label: 'Chiffres clés' },
  { to: `${ADMIN_BASE}/reglages`, label: 'Coordonnées' },
]

export function RequireAuth({ children }) {
  const { status } = useAuth()
  const location = useLocation()
  if (status === 'loading') return <Spinner />
  if (status === 'guest') return <Navigate to={`${ADMIN_BASE}/connexion`} replace state={{ from: location }} />
  return children
}

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [newCount, setNewCount] = useState(0)

  // Pas d'indexation de l'admin par les moteurs de recherche
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    const previousTitle = document.title
    document.title = 'Administration — IVC Nexus'
    return () => {
      meta.remove()
      document.title = previousTitle
    }
  }, [])

  // Nombre de nouveaux messages (rafraîchi à chaque changement de page)
  useEffect(() => {
    api
      .get('/admin/summary')
      .then((res) => setNewCount(res.data.new_submissions))
      .catch(() => {})
  }, [location.pathname])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 lg:flex">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <span className="font-bold text-slate-900">IVC Nexus · Admin</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold"
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
      </header>

      <aside
        className={`${open ? 'block' : 'hidden'} border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r`}
      >
        <div className="hidden px-6 py-6 lg:block">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">IVC Nexus</p>
          <p className="text-lg font-bold text-slate-900">Administration</p>
        </div>

        <nav className="space-y-1 px-3 pb-4" aria-label="Menu principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
              {item.badge && newCount > 0 && (
                <span className="rounded-full bg-blue-700 px-2 py-0.5 text-xs font-bold text-white">{newCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 border-t border-slate-200 px-6 py-4 text-sm">
          <a href="/" target="_blank" rel="noopener noreferrer" className="block font-medium text-blue-700 hover:underline">
            Voir le site ↗
          </a>
          <p className="truncate text-xs text-slate-500">{user?.email}</p>
          <button type="button" onClick={logout} className="font-semibold text-red-700 hover:underline">
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
