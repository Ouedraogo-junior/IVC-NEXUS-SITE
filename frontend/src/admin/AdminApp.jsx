import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import { ToastProvider } from './components/Toast'
import AdminLayout, { RequireAuth } from './AdminLayout'
import { ADMIN_BASE } from './constants'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PostsList from './pages/PostsList'
import PostEdit from './pages/PostEdit'
import PortfolioList from './pages/PortfolioList'
import PortfolioEdit from './pages/PortfolioEdit'
import TestimonialsPage from './pages/TestimonialsPage'
import StatsPage from './pages/StatsPage'
import SubmissionsPage from './pages/SubmissionsPage'
import SettingsPage from './pages/SettingsPage'
import AnalyticsPage from './pages/AnalyticsPage'

/**
 * Point d'entrée de l'espace d'administration.
 * À monter dans le routeur du site sur le chemin "/admin/*", HORS de la mise en page publique.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="connexion" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="messages" element={<SubmissionsPage />} />
            <Route path="articles" element={<PostsList />} />
            <Route path="articles/nouveau" element={<PostEdit />} />
            <Route path="articles/:id" element={<PostEdit />} />
            <Route path="realisations" element={<PortfolioList />} />
            <Route path="realisations/nouveau" element={<PortfolioEdit />} />
            <Route path="realisations/:id" element={<PortfolioEdit />} />
            <Route path="temoignages" element={<TestimonialsPage />} />
            <Route path="chiffres" element={<StatsPage />} />
            <Route path="frequentation" element={<AnalyticsPage />} />
            <Route path="reglages" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
