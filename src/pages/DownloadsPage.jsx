import PageHeader from '../components/PageHeader'
import RevealBlock from '../components/RevealBlock'
import Icon from '../components/ui/Icon'
import { Download } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function DownloadsPage() {
  const { t } = useLanguage()
  const p = t.downloadsPage

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {p.documents.map((doc, i) => (
              <RevealBlock key={doc.title} delay={i * 100} className="bg-sectionbg rounded-2xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white text-nexus flex items-center justify-center mb-4">
                  <Icon name={doc.icon} className="w-6 h-6" />
                </div>
                <h2 className="font-black text-nexus text-sm mb-2">{doc.title}</h2>
                <p className="text-xs text-slateText leading-relaxed mb-5 flex-1">{doc.description}</p>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slateText/50 bg-white rounded-full px-4 py-2.5 cursor-not-allowed"
                >
                  <Download className="w-4 h-4" /> {p.comingSoon}
                </button>
              </RevealBlock>
            ))}
          </div>
          <p className="text-center text-xs text-slateText/60">{p.note}</p>
        </div>
      </section>
    </>
  )
}