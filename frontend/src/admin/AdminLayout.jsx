import { useEffect, useState } from 'react'
import {
  Briefcase,
  ChartColumn,
  ExternalLink,
  Hash,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Phone,
  UserCog,
} from 'lucide-react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { ADMIN_BASE } from './constants'
import { api } from '../lib/api'
import { Spinner } from './components/ui'

const NAV = [
  { to: ADMIN_BASE, label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: `${ADMIN_BASE}/messages`, label: 'Messages & devis', icon: Inbox, badge: true },
  { to: `${ADMIN_BASE}/articles`, label: 'Articles du blog', icon: Newspaper },
  { to: `${ADMIN_BASE}/realisations`, label: 'Réalisations', icon: Briefcase },
  { to: `${ADMIN_BASE}/temoignages`, label: 'Témoignages', icon: MessageSquareQuote },
  { to: `${ADMIN_BASE}/frequentation`, label: 'Fréquentation', icon: ChartColumn },
  { to: `${ADMIN_BASE}/chiffres`, label: 'Chiffres clés', icon: Hash },
  { to: `${ADMIN_BASE}/reglages`, label: 'Coordonnées', icon: Phone },
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
          {NAV.map(({ icon: Icon, ...item }) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </span>
              {item.badge && newCount > 0 && (
                <span className="rounded-full bg-blue-700 px-2 py-0.5 text-xs font-bold text-white">{newCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 border-t border-slate-200 px-6 py-4 text-sm">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-blue-700 hover:underline"
          >
            <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            Voir le site
          </a>
          <p className="truncate text-xs text-slate-500">{user?.email}</p>
          <NavLink
            to={`${ADMIN_BASE}/compte`}
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium hover:underline ${isActive ? 'text-blue-800' : 'text-slate-700'}`
            }
          >
            <UserCog className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            Mon compte
          </NavLink>
          <button type="button" onClick={logout} className="flex items-center gap-2 font-semibold text-red-700 hover:underline">
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
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