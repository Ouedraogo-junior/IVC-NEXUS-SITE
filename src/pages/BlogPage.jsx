import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Icon from '../components/ui/Icon'
import { blogPosts } from '../data/blogPosts'
import { useLanguage } from '../i18n/LanguageContext'

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

function BlogThumb({ image, index }) {
  if (image) {
    return (
      <div className="w-full rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '16 / 9' }}>
        <img src={image} alt="" className="w-full h-full object-cover" />
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

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {p.languageNote && (
            <p className="text-center text-xs text-slateText/60 mb-10">{p.languageNote}</p>
          )}

          {blogPosts.length === 0 ? (
            <p className="text-center text-slateText py-16">{p.empty}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <RevealBlock key={post.slug} delay={i * 100} as="div">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-sectionbg rounded-2xl p-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <BlogThumb image={post.image} index={i} />
                    <div className="px-2 pb-2">
                      {post.category && (
                        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-impact/10 text-impact mb-4">
                          {post.category}
                        </span>
                      )}
                      <h2 className="text-lg font-black text-nexus mb-2 leading-snug">{post.title}</h2>
                      <p className="text-sm text-slateText leading-relaxed mb-4">{post.excerpt}</p>
                      <span className="text-xs text-slateText/60">{formatDate(post.date, lang)}</span>
                    </div>
                  </Link>
                </RevealBlock>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}