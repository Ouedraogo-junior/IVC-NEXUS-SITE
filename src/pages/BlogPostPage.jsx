import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import { blogPosts } from '../data/blogPosts'
import { useLanguage } from '../i18n/LanguageContext'

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

  return (
    <>
      <PageHeader title={post.title} subtitle={formatDate(post.date, lang)} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Button to="/blog" variant="outlineDark" className="!px-5 !py-2.5 mb-10">
            {p.back}
          </Button>

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