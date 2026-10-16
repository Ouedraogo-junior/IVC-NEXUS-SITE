import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import LegalNotice from './pages/LegalNotice'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import CaseStudyPage from './pages/CaseStudyPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import PageViewCounter from './components/PageViewCounter'

// Chargé à la demande : l'éditeur de texte ne pèse pas sur le site public
const AdminApp = lazy(() => import('./admin/AdminApp'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageViewCounter />
      <Routes>
        {/* Espace d'administration : hors de la mise en page publique (sans en-tête ni pied de page) */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />

        {/* Site public */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="realisations" element={<PortfolioPage />} />
          <Route path="realisations/:id" element={<CaseStudyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mentions-legales" element={<LegalNotice />} />
          <Route path="confidentialite" element={<PrivacyPolicy />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}