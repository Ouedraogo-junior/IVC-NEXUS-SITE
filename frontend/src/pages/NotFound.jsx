import Button from '../components/ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { lang } = useLanguage()
  const isFr = lang === 'fr'

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="text-7xl font-black text-nexus/10 mb-4">404</div>
      <h1 className="text-2xl font-black text-nexus mb-3">
        {isFr ? 'Page introuvable' : 'Page not found'}
      </h1>
      <p className="text-slateText mb-8 max-w-md">
        {isFr
          ? "La page que vous cherchez n'existe pas ou a été déplacée."
          : "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Button to="/" variant="primary">
        {isFr ? "Retour à l'accueil" : 'Back to home'}
      </Button>
    </section>
  )
}
