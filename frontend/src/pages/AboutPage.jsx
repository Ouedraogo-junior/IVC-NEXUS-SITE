import { useState } from 'react'
import { Check, Eye, MapPin, Video, Link2, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import RevealBlock from '../components/RevealBlock'
import Seo from '../components/Seo'
import { aboutSlides } from '../data/heroSlides'
import { useLanguage } from '../i18n/LanguageContext'

// Photo de l'agence (équipe, locaux, tournage...). Tant qu'elle est à null, un
// visuel de marque s'affiche à sa place. Pour la mettre : déposer le fichier
// dans public/about/ et indiquer son chemin, ex. '/about/agence.jpg'.
const ABOUT_IMAGE = null

const FACT_ICONS = { MapPin, Video, Link2 }

function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-slateText">
          <Check className="w-4 h-4 text-impact shrink-0 mt-1.5" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Carte "Notre approche". Quand une étape a une liste (Comprendre, Concevoir),
// elle est repliée par défaut : toutes les cartes restent ainsi comparables.
function ApproachCard({ step, index, delay, showLabel, hideLabel }) {
  const [open, setOpen] = useState(false)
  const hasDetails = Boolean(step.lead || step.items)
  const panelId = `approach-details-${index}`

  // "… en solution :" n'annonce une liste que lorsque la liste est visible
  const text =
    hasDetails && !open && /\s*:\s*$/.test(step.text) ? step.text.replace(/\s*:\s*$/, '.') : step.text

  return (
    <RevealBlock delay={delay} className="bg-sectionbg rounded-2xl p-6 flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-nexus text-white flex items-center justify-center font-black text-sm mb-4">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="font-black text-nexus mb-2">{step.title}</h3>
      <p className="text-sm text-slateText leading-relaxed">{text}</p>

      {hasDetails && (
        <>
          <div
            id={panelId}
            className="grid transition-all duration-300"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              {step.lead && <p className="text-sm text-slateText leading-relaxed mt-3">{step.lead}</p>}
              {step.items && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slateText">
                      <span className="w-1 h-1 rounded-full bg-impact mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-auto pt-5 self-start inline-flex items-center gap-1.5 text-sm font-bold text-impact hover:text-nexus transition-colors"
          >
            {open ? hideLabel : showLabel}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
        </>
      )}
    </RevealBlock>
  )
}

export default function AboutPage() {
  const { t } = useLanguage()
  const p = t.aboutPage

  return (
    <>
      <Seo title={t.seo.about.title} description={t.seo.about.description} />
      <PageHeader title={p.title} slides={aboutSlides} />

      {/* Présentation de l'agence */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Visuel */}
          <RevealBlock variant="reveal-left" className="relative">
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full rounded-2xl border-2 border-impact/50" />
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center aspect-[4/3] lg:aspect-[4/5]"
              style={{ background: 'linear-gradient(160deg, #1D3557 0%, #2a4a73 100%)' }}
            >
              <div
                className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)' }}
              />
              {ABOUT_IMAGE ? (
                <>
                  <img src={ABOUT_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nexus/80 via-transparent to-transparent" />
                </>
              ) : (
                <Eye className="w-28 h-28 text-white/25" strokeWidth={1} />
              )}
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-4">
                <p className="text-[11px] sm:text-xs font-heading font-bold tracking-widest uppercase text-white text-center">
                  {t.hero.method}
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Texte */}
          <div>
            {p.eyebrow && (
              <RevealBlock>
                <span className="inline-block w-[50px] h-1 rounded-full bg-impact mb-3" />
                <p className="text-xs font-bold uppercase tracking-widest text-impact mb-5">{p.eyebrow}</p>
              </RevealBlock>
            )}

            <RevealBlock delay={100}>
              <p className="text-xl lg:text-2xl font-black text-nexus leading-snug mb-6">{p.intro[0]}</p>
            </RevealBlock>
            {p.intro.slice(1).map((paragraph, i) => (
              <RevealBlock key={i} delay={200 + i * 100}>
                <p className="text-lg text-slateText leading-loose mb-5">{paragraph}</p>
              </RevealBlock>
            ))}

            {p.facts && (
              <RevealBlock delay={400} className="grid sm:grid-cols-3 gap-3 mt-8">
                {p.facts.map((fact) => {
                  const FactIcon = FACT_ICONS[fact.icon] || Check
                  return (
                    <div key={fact.label} className="flex items-center gap-3 rounded-xl bg-sectionbg px-4 py-3">
                      <span className="w-9 h-9 rounded-lg bg-white text-impact flex items-center justify-center shrink-0">
                        <FactIcon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-semibold text-nexus leading-snug">{fact.label}</span>
                    </div>
                  )
                })}
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* Mission et vision */}
      <section className="py-20 lg:py-24 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <RevealBlock variant="reveal-left">
            <h2 className="text-2xl font-black text-nexus mb-4">{p.missionTitle}</h2>
            <p className="text-slateText leading-relaxed mb-5">{p.missionIntro}</p>
            <BulletList items={p.mission} />
          </RevealBlock>
          <RevealBlock variant="reveal-left" delay={150}>
            <h2 className="text-2xl font-black text-nexus mb-4">{p.visionTitle}</h2>
            <p className="text-slateText leading-relaxed mb-5">{p.visionIntro}</p>
            <BulletList items={p.vision} />
          </RevealBlock>
        </div>
      </section>

      {/* Baseline */}
      <section className="py-16 lg:py-20 bg-nexus text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <p className="text-2xl lg:text-4xl font-black text-white max-w-3xl mx-auto leading-snug">
              {t.hero.titleLine1} <span className="text-impact">{t.hero.titleLine2}</span> {t.hero.titleLine3}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Approche */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-10 text-center">
            {p.approachTitle}
          </RevealBlock>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.approach.map((step, i) => (
              <ApproachCard
                key={step.title}
                step={step}
                index={i}
                delay={i * 100}
                showLabel={p.showDetails || 'Voir le détail'}
                hideLabel={p.hideDetails || 'Masquer le détail'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 lg:py-24 bg-sectionbg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock as="h2" className="text-2xl font-black text-nexus mb-10 text-center">
            {p.valuesTitle}
          </RevealBlock>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.values.map((value, i) => (
              <RevealBlock key={value.title} delay={i * 100} className="bg-white rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-impact/10 text-impact flex items-center justify-center font-black mb-4">
                  {i + 1}
                </div>
                <h3 className="font-black text-nexus mb-2">{value.title}</h3>
                <p className="text-sm text-slateText leading-relaxed">{value.text}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-20 lg:py-24 bg-white text-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <RevealBlock variant="reveal-scale">
            <h2 className="text-2xl font-black text-nexus mb-3">{t.ctaBand.title}</h2>
            <p className="text-slateText max-w-xl mx-auto mb-8">{t.ctaBand.subtitle}</p>
            <Button to="/contact" variant="primary">
              {t.ctaBand.emailBtn}
            </Button>
          </RevealBlock>
        </div>
      </section>
    </>
  )
}