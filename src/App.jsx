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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="realisations" element={<PortfolioPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mentions-legales" element={<LegalNotice />} />
          <Route path="confidentialite" element={<PrivacyPolicy />} />
          <Route path="realisations" element={<PortfolioPage />} />
          <Route path="realisations/:id" element={<CaseStudyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}