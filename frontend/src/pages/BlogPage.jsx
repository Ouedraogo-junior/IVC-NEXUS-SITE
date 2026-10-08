import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Icon from '../components/ui/Icon'
import { useLanguage } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import { blogSlides } from '../data/heroSlides'
import { useFetch } from '../lib/publicApi'

function formatDate(dateStr, lang) {
  const date = new Date(dateStr)
  if (isNaN(date)) return ''
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const FALLBACK_GRADIENTS = [
  ['#1D3557', '#2a4a73'],
  ['#FF6B00', '#FFB066'],
  ['#152844', '#1D3557'],
]

// Textes d'état (chargement, erreur) : utilisés si le dictionnaire ne les définit pas
const STATES = {
  fr: {
    loading: 'Chargement des articles…',
    error: 'Impossible de charger les articles pour le moment. Réessayez dans quelques instants.',
    more: 'Voir plus d’articles',
  },
  en: {
    loading: 'Loading articles…',
    error: 'We could not load the articles right now. Please try again in a moment.',
    more: 'Show more articles',
  },
}

function BlogThumb({ image, index }) {
  if (image) {
    return (
      <div className="w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '16 / 9' }}>
        <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
    )
  }
  const [from, to] = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
  return (
    <div
      className="w-full rounded-xl overflow-hidden mb-4 flex items-center justify-center text-white"
      style={{ aspectRatio: '16 / 9', background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <Icon name="BookOpen" className="w-8 h-8" strokeWidth={1.5} />
    </div>
  )
}

export default function BlogPage() {
  const { t, lang } = useLanguage()
  const p = t.blogPage
  const s = STATES[lang] || STATES.fr

  // Les articles arrivent par pages de 12 : on les cumule quand on clique sur "Voir plus"
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const { data, loading, error } = useFetch(`/posts?page=${page}`)

  // On se base sur la page reçue (data.current_page) et non sur l'état local, puis on retire les doublons
  useEffect(() => {
    if (!data) return
    setPosts((previous) => {
      if (data.current_page === 1) return data.data
      const known = new Set(previous.map((post) => post.id))
      return [...previous, ...data.data.filter((post) => !known.has(post.id))]
    })
  }, [data])

  const hasMore = data ? data.current_page < data.last_page : false

  return (
    <>
      <Seo title={t.seo.blog.title} description={t.seo.blog.description} />
      <PageHeader title={p.title} subtitle={p.subtitle} slides={blogSlides} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {p.languageNote && <p className="text-center text-xs text-slateText/60 mb-10">{p.languageNote}</p>}

          {error && posts.length === 0 ? (
            <p className="text-center text-slateText py-16" role="alert">
              {s.error}
            </p>
          ) : loading && posts.length === 0 ? (
            <p className="text-center text-slateText py-16" role="status">
              {s.loading}
            </p>
          ) : posts.length === 0 ? (
            <p className="text-center text-slateText py-16">{p.empty}</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <RevealBlock key={post.slug} delay={(i % 12) * 100} as="div">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block bg-sectionbg rounded-2xl p-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <BlogThumb image={post.cover} index={i} />
                      <div className="px-2 pb-2">
                        {post.category && (
                          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-impact/10 text-impact mb-4">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-lg font-black text-nexus mb-2 leading-snug">{post.title}</h2>
                        {post.excerpt && <p className="text-sm text-slateText leading-relaxed mb-4">{post.excerpt}</p>}
                        <span className="text-xs text-slateText/60">{formatDate(post.published_at, lang)}</span>
                      </div>
                    </Link>
                  </RevealBlock>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setPage((n) => n + 1)}
                    disabled={loading}
                    className="rounded-lg border border-nexus px-6 py-3 text-sm font-bold text-nexus transition-colors hover:bg-nexus hover:text-white disabled:opacity-50"
                  >
                    {loading ? s.loading : s.more}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}