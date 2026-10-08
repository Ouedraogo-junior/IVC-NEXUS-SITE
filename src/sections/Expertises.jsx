import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'
import ContentIcon from '../components/ui/ContentIcon'
import RevealBlock from '../components/RevealBlock'
import { useLanguage } from '../i18n/LanguageContext'

export default function Expertises() {
  const { t } = useLanguage()
  const e = t.expertises

  return (
    <section className="py-20 lg:py-28 bg-sectionbg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHeading title={e.title} />

        <RevealBlock className="max-w-3xl mx-auto text-center -mt-4 mb-14">
          <p className="text-lg text-nexus font-semibold mb-2">{e.intro[0]}</p>
          <p className="text-lg text-nexus font-semibold mb-4">{e.intro[1]}</p>
          <p className="text-slateText leading-relaxed">{e.intro[2]}</p>
        </RevealBlock>

        <RevealBlock as="h3" className="text-xs font-bold uppercase tracking-widest text-impact mb-6 text-center">
          {e.listTitle}
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {e.items.map((item, i) => (
            <RevealBlock key={item.title} delay={(i % 3) * 100}>
              <Link
                to={item.link}
                className="group block h-full bg-white rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-impact/10 text-impact flex items-center justify-center mb-5 transition-colors group-hover:bg-impact group-hover:text-white">
                  <ContentIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nexus mb-2">{item.title}</h3>
                <p className="text-sm text-slateText leading-relaxed">{item.description}</p>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}