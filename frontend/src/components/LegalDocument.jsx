import { Fragment } from 'react'
import PageHeader from './PageHeader'
import Seo from './Seo'
import { useLanguage } from '../i18n/LanguageContext'
import { useSiteSettings } from '../lib/siteSettings'
import { LEGAL, TODO } from '../config/legal'

const NOTE_EN = 'This document is currently available in French only.'

function lookup(values, path) {
  return path.split('.').reduce((obj, key) => (obj == null ? obj : obj[key]), values)
}

/** Remplace les {{jetons}} ; une information encore manquante est surlignée pour ne jamais passer inaperçue. */
function Text({ value, values }) {
  return value.split(/(\{\{[\w.]+\}\})/).map((part, i) => {
    const match = part.match(/^\{\{([\w.]+)\}\}$/)
    if (!match) return <Fragment key={i}>{part}</Fragment>
    const found = lookup(values, match[1])
    const text = found == null || found === '' ? TODO : String(found)
    return text === TODO ? (
      <mark key={i} className="bg-yellow-200 px-1 text-slate-900 rounded" data-missing="true">
        {text}
      </mark>
    ) : (
      <Fragment key={i}>{text}</Fragment>
    )
  })
}

/** Page de texte juridique (mentions légales, politique de confidentialité). */
export default function LegalDocument({ doc, titleEn, description }) {
  const { lang } = useLanguage()
  const { email } = useSiteSettings()
  const values = {
    ...LEGAL,
    email,
    siteUrl: typeof window !== 'undefined' ? window.location.origin : '',
  }
  const title = lang === 'en' ? titleEn : doc.title

  return (
    <>
      <Seo title={title} description={description} />
      <PageHeader title={title} subtitle={doc.entity} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {lang === 'en' && <p className="mb-8 rounded-lg bg-sectionbg px-4 py-3 text-sm text-slateText">{NOTE_EN}</p>}

          <div className="space-y-10">
            {doc.articles.map((article) => (
              <article key={article.title}>
                <h2 className="font-heading font-black text-xl text-nexus mb-4">{article.title}</h2>
                <div className="space-y-3 text-slateText leading-relaxed">
                  {article.blocks.map((block, i) =>
                    block.ul ? (
                      <ul key={i} className="list-disc pl-6 space-y-1.5">
                        {block.ul.map((item) => (
                          <li key={item}>
                            <Text value={item} values={values} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i}>
                        <Text value={block.p} values={values} />
                      </p>
                    )
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-slateText">
            <Text value={doc.footer} values={values} />
          </p>
        </div>
      </section>
    </>
  )
}