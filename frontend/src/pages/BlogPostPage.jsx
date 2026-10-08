import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_URL, SITE_NAME } from '../config/site'
import { blogSlides } from '../data/heroSlides'
import { useFetch } from '../lib/publicApi'

function formatDate(dateStr, lang) {
  const date = new Date(dateStr)
  if (isNaN(date)) return ''
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const STATES = {
  fr: { loading: 'Chargement de l’article…', error: 'Impossible de charger cet article pour le moment.' },
  en: { loading: 'Loading the article…', error: 'We could not load this article right now.' },
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const p = t.blogPage
  const s = STATES[lang] || STATES.fr

  const { data, loading, error } = useFetch(`/posts/${encodeURIComponent(slug)}`)
  const post = data?.data

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slateText" role="status">
          {s.loading}
        </p>
      </section>
    )
  }

  // 404 = article inexistant, brouillon ou programmé dans le futur
  if (error || !post) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-slateText" role="alert">
          {error && error.status !== 404 ? s.error : p.empty}
        </p>
        <Button to="/blog" variant="outlineDark" className="!px-5 !py-2.5">
          {p.back}
        </Button>
      </section>
    )
  }

  const imageUrl = post.cover ? `${SITE_URL}${post.cover}` : undefined

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    image: imageUrl,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} type="article" image={imageUrl} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      <PageHeader title={post.title} subtitle={formatDate(post.published_at, lang)} slides={blogSlides} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Button to="/blog" variant="outlineDark" className="!px-5 !py-2.5 mb-10">
            {p.back}
          </Button>

          {post.cover && (
            <div className="w-full rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: '21 / 9' }}>
              <img src={post.cover} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {post.category && (
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-impact/10 text-impact mb-6">
              {post.category}
            </span>
          )}

          {/* HTML déjà nettoyé par le serveur (balises autorisées uniquement) */}
          <article className="prose-blog" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </>
  )
}