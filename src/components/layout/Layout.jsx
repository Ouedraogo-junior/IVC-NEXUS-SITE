import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * Route racine : toutes les pages (Home, About, Services...) s'affichent
 * dans <Outlet /> et partagent ce même Header + Footer.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
