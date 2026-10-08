import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/api'
import { ADMIN_BASE, CATEGORIES } from '../constants'
import { isoToLocalInput, localInputToIso } from '../hooks'
import { Badge, Card, Field, Input, PageHeader, Select, Spinner, Textarea } from '../components/ui'
import PublishButtons from '../components/PublishButtons'
import ImageUpload from '../components/ImageUpload'
import RichEditor from '../components/RichEditor'
import { useToast } from '../components/Toast'

const EMPTY = {
  title: '',
  excerpt: '',
  category: CATEGORIES[0],
  cover_image: null,
  content: '',
  is_published: false,
  published_at: '',
}

const fromApi = (p) => ({
  title: p.title || '',
  excerpt: p.excerpt || '',
  category: p.category || CATEGORIES[0],
  cover_image: p.cover_image || null,
  content: p.content || '',
  is_published: !!p.is_published,
  published_at: isoToLocalInput(p.published_at),
})

const toPayload = (f) => ({
  title: f.title.trim(),
  excerpt: f.excerpt.trim() || null,
  category: f.category,
  cover_image: f.cover_image || null,
  content: f.content,
  is_published: f.is_published,
  published_at: localInputToIso(f.published_at),
})

const isEmptyHtml = (html) => !html || html.replace(/<(?!img)[^>]*>|&nbsp;|\s/g, '') === ''

export default function PostEdit() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isNew) return
    let alive = true
    api
      .get(`/admin/posts/${id}`)
      .then((res) => alive && setForm(fromApi(res.data)))
      .catch((err) => alive && toast(err.message, 'error'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [id, isNew, toast])

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const scheduled = !!form.published_at && new Date(form.published_at) > new Date()

  // publish : true = publier, false = enregistrer en brouillon
  async function save(publish) {
    setErrors({})

    if (isEmptyHtml(form.content)) {
      setErrors({ content: ['Le contenu de l’article est obligatoire.'] })
      toast('Vérifiez les champs signalés', 'error')
      return
    }

    setSaving(true)
    try {
      const payload = toPayload({ ...form, is_published: publish })
      const res = isNew ? await api.post('/admin/posts', payload) : await api.put(`/admin/posts/${id}`, payload)
      toast(publish ? 'Article publié' : 'Brouillon enregistré')
      if (isNew) navigate(`${ADMIN_BASE}/articles/${res.data.id}`, { replace: true })
      else setForm(fromApi(res.data))
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.errors)
        toast('Vérifiez les champs signalés', 'error')
      } else {
        toast(err.message, 'error')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PageHeader
        title={isNew ? 'Nouvel article' : 'Modifier l’article'}
        actions={
          <>
            <Link
              to={`${ADMIN_BASE}/articles`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Retour à la liste
            </Link>
            <PublishButtons published={form.is_published} scheduled={scheduled} saving={saving} onSave={save} />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <Card className="space-y-5 p-5">
            <Field label="Titre" required error={errors.title}>
              {(fid) => <Input id={fid} value={form.title} onChange={(e) => set('title', e.target.value)} required maxLength={200} />}
            </Field>
            <Field label="Extrait" help={`${form.excerpt.length}/400 — affiché dans la liste des articles`} error={errors.excerpt}>
              {(fid) => <Textarea id={fid} rows={3} maxLength={400} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />}
            </Field>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Contenu <span className="text-red-600">*</span>
            </p>
            <RichEditor value={form.content} onChange={(html) => set('content', html)} />
            {errors.content && (
              <p className="mt-1 text-xs font-medium text-red-600" role="alert">
                {errors.content[0]}
              </p>
            )}
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Statut</span>
              <Badge className={form.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                {form.is_published ? (scheduled ? 'Programmé' : 'Publié') : 'Brouillon (non visible)'}
              </Badge>
            </div>
            <Field
              label="Date de publication"
              help="Laissez vide pour publier tout de suite. Une date future programme la parution."
              error={errors.published_at}
            >
              {(fid) => (
                <Input id={fid} type="datetime-local" value={form.published_at} onChange={(e) => set('published_at', e.target.value)} />
              )}
            </Field>
            <Field label="Catégorie" required error={errors.category}>
              {(fid) => (
                <Select id={fid} value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              )}
            </Field>
          </Card>

          <Card className="p-5">
            <p className="mb-3 text-sm font-medium text-slate-700">Image de couverture</p>
            <ImageUpload value={form.cover_image} onChange={(v) => set('cover_image', v)} />
            {errors.cover_image && <p className="mt-1 text-xs font-medium text-red-600">{errors.cover_image[0]}</p>}
          </Card>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
        <PublishButtons published={form.is_published} scheduled={scheduled} saving={saving} onSave={save} />
      </div>
    </form>
  )
}