import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { marked } from 'marked'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Seo from '../components/Seo'
import { blogPosts } from '../data/blogPosts'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_URL, SITE_NAME } from '../config/site'

function formatDate(dateStr, lang) {
  const date = new Date(dateStr)
  if (isNaN(date)) return ''
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const p = t.blogPage
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slateText">{p.empty}</p>
      </section>
    )
  }

  const html = marked.parse(post.body)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} type="article" image={post.image ? `${SITE_URL}${post.image}` : undefined} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      <PageHeader title={post.title} subtitle={formatDate(post.date, lang)} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Button to="/blog" variant="outlineDark" className="!px-5 !py-2.5 mb-10">
            {p.back}
          </Button>

          {post.image && (
            <div className="w-full rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: '21 / 9' }}>
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {post.category && (
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-impact/10 text-impact mb-6">
              {post.category}
            </span>
          )}

          <article className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  )
}