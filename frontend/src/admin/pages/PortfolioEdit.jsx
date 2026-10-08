import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/api'
import { ADMIN_BASE } from '../constants'
import { Badge, Card, Field, Input, PageHeader, Spinner, Textarea } from '../components/ui'
import PublishButtons from '../components/PublishButtons'
import ImageUpload from '../components/ImageUpload'
import GalleryUpload from '../components/GalleryUpload'
import TagInput from '../components/TagInput'
import { useToast } from '../components/Toast'

const TEXT_FIELDS = [
  { key: 'title', label: 'Titre', rows: 0 },
  { key: 'summary', label: 'Résumé (affiché sur la carte)', rows: 3 },
  { key: 'context', label: 'Contexte', rows: 4 },
  { key: 'need', label: 'Besoin du client', rows: 4 },
  { key: 'solution', label: 'Réponse apportée / livrables', rows: 5 },
  { key: 'result', label: 'Résultat', rows: 4 },
]

const emptyLang = () => Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, '']))

const EMPTY = {
  slug: '',
  translations: { fr: emptyLang(), en: emptyLang() },
  media_types: [],
  sector_types: [],
  cover_image: null,
  gallery: [],
  video_url: '',
  year: '',
  is_published: false,
  sort_order: 0,
}

const fromApi = (item) => ({
  slug: item.slug || '',
  translations: {
    fr: { ...emptyLang(), ...(item.translations?.fr || {}) },
    en: { ...emptyLang(), ...(item.translations?.en || {}) },
  },
  media_types: item.media_types || [],
  sector_types: item.sector_types || [],
  cover_image: item.cover_image || null,
  gallery: item.gallery || [],
  video_url: item.video_url || '',
  year: item.year ?? '',
  is_published: !!item.is_published,
  sort_order: item.sort_order ?? 0,
})

function toPayload(f) {
  const blankToNull = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v && v.trim() ? v : null]))
  return {
    slug: f.slug.trim() || null,
    translations: { fr: blankToNull(f.translations.fr), en: blankToNull(f.translations.en) },
    media_types: f.media_types,
    sector_types: f.sector_types,
    cover_image: f.cover_image || null,
    gallery: f.gallery,
    video_url: f.video_url.trim() || null,
    year: f.year === '' ? null : Number(f.year),
    is_published: f.is_published,
    sort_order: f.sort_order === '' ? 0 : Number(f.sort_order),
  }
}

export default function PortfolioEdit() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState(EMPTY)
  const [lang, setLang] = useState('fr')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isNew) return
    let alive = true
    api
      .get(`/admin/portfolio/${id}`)
      .then((res) => alive && setForm(fromApi(res.data)))
      .catch((err) => alive && toast(err.message, 'error'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [id, isNew, toast])

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setText = (key, value) =>
    setForm((f) => ({ ...f, translations: { ...f.translations, [lang]: { ...f.translations[lang], [key]: value } } }))
  const err = (key) => errors[key]

  // publish : true = mettre en ligne, false = enregistrer sans publier
  async function save(publish) {
    setErrors({})
    setSaving(true)
    try {
      const payload = toPayload({ ...form, is_published: publish })
      const res = isNew ? await api.post('/admin/portfolio', payload) : await api.put(`/admin/portfolio/${id}`, payload)
      toast(publish ? 'Réalisation mise en ligne' : 'Réalisation enregistrée (masquée)')
      if (isNew) navigate(`${ADMIN_BASE}/realisations/${res.data.id}`, { replace: true })
      else setForm(fromApi(res.data))
    } catch (e2) {
      if (e2.status === 422) {
        setErrors(e2.errors)
        if (Object.keys(e2.errors).some((k) => k.startsWith('translations.fr'))) setLang('fr')
        toast('Vérifiez les champs signalés', 'error')
      } else toast(e2.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PageHeader
        title={isNew ? 'Nouvelle réalisation' : 'Modifier la réalisation'}
        actions={
          <>
            <Link to={`${ADMIN_BASE}/realisations`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">
              Retour à la liste
            </Link>
            <PublishButtons published={form.is_published} saving={saving} onSave={save} noun="réalisation" />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card className="p-5">
          <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Langue du contenu">
            {[
              ['fr', 'Français'],
              ['en', 'English'],
            ].map(([code, label]) => (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={lang === code}
                onClick={() => setLang(code)}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-semibold ${
                  lang === code ? 'bg-white text-blue-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {lang === 'en' && (
            <p className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-900">
              Les champs anglais laissés vides s’affichent en français sur la version anglaise du site.
            </p>
          )}

          <div className="space-y-4">
            {TEXT_FIELDS.map((f) => (
              <Field
                key={`${lang}-${f.key}`}
                label={f.label}
                required={f.key === 'title' && lang === 'fr'}
                error={err(`translations.${lang}.${f.key}`)}
              >
                {(fid) =>
                  f.rows ? (
                    <Textarea id={fid} rows={f.rows} value={form.translations[lang][f.key]} onChange={(e) => setText(f.key, e.target.value)} />
                  ) : (
                    <Input id={fid} value={form.translations[lang][f.key]} onChange={(e) => setText(f.key, e.target.value)} />
                  )
                }
              </Field>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Statut</span>
              <Badge className={form.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                {form.is_published ? 'En ligne' : 'Masquée'}
              </Badge>
            </div>
            <Field label="Année" error={err('year')}>
              {(fid) => <Input id={fid} type="number" min="2000" max="2100" value={form.year} onChange={(e) => set('year', e.target.value)} />}
            </Field>
            <Field label="Ordre d’affichage" help="Le plus petit s’affiche en premier." error={err('sort_order')}>
              {(fid) => <Input id={fid} type="number" min="0" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} />}
            </Field>
            <Field label="Lien vidéo (YouTube / Vimeo)" error={err('video_url')}>
              {(fid) => <Input id={fid} type="url" placeholder="https://" value={form.video_url} onChange={(e) => set('video_url', e.target.value)} />}
            </Field>
          </Card>

          <Card className="space-y-4 p-5">
            <Field label="Types de média" help="Entrée pour valider. Ex. : vidéo, photo, design">
              {(fid) => <TagInput id={fid} value={form.media_types} onChange={(v) => set('media_types', v)} placeholder="vidéo…" />}
            </Field>
            <Field label="Secteurs / publics" help="Ex. : entreprise, ONG, institution">
              {(fid) => <TagInput id={fid} value={form.sector_types} onChange={(v) => set('sector_types', v)} placeholder="entreprise…" />}
            </Field>
          </Card>

          <Card className="p-5">
            <p className="mb-3 text-sm font-medium text-slate-700">Image principale</p>
            <ImageUpload value={form.cover_image} onChange={(v) => set('cover_image', v)} />
            {err('cover_image') && <p className="mt-1 text-xs font-medium text-red-600">{err('cover_image')[0]}</p>}
          </Card>
        </div>
      </div>

      <Card className="mt-6 p-5">
        <p className="mb-3 text-sm font-medium text-slate-700">Galerie</p>
        <GalleryUpload value={form.gallery} onChange={(v) => set('gallery', v)} />
      </Card>

      <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
        <PublishButtons published={form.is_published} saving={saving} onSave={save} noun="réalisation" />
      </div>
    </form>
  )
}