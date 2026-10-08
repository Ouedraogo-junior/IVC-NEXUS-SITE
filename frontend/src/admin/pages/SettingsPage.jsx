import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { Button, Card, ErrorBox, Field, Input, PageHeader, Spinner } from '../components/ui'
import { useToast } from '../components/Toast'

const GROUPS = [
  {
    title: 'Coordonnées',
    fields: [
      ['phone_1', 'Téléphone principal', 'tel'],
      ['phone_2', 'Téléphone secondaire', 'tel'],
      ['email', 'Adresse e-mail publique', 'email'],
      ['address', 'Adresse', 'text'],
    ],
  },
  {
    title: 'Réseaux sociaux',
    fields: [
      ['facebook', 'Facebook (lien)', 'url'],
      ['instagram', 'Instagram (lien)', 'url'],
      ['linkedin', 'LinkedIn (lien)', 'url'],
      ['youtube', 'YouTube (lien)', 'url'],
      ['tiktok', 'TikTok (lien)', 'url'],
    ],
  },
]

export default function SettingsPage() {
  const toast = useToast()
  const [values, setValues] = useState(null)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api
      .get('/admin/settings')
      .then((res) => setValues(Object.fromEntries(Object.entries(res.data).map(([k, v]) => [k, v ?? '']))))
      .catch(setError)
  }, [])

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    try {
      const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim() || null]))
      await api.put('/admin/settings', payload)
      toast('Coordonnées enregistrées')
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.errors)
        toast('Vérifiez les champs signalés', 'error')
      } else toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (error) return <ErrorBox error={error} />
  if (!values) return <Spinner />

  return (
    <form onSubmit={save}>
      <PageHeader
        title="Coordonnées"
        subtitle="Téléphones, e-mail et réseaux sociaux affichés sur le site."
        actions={
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        }
      />
      <div className="space-y-6">
        {GROUPS.map((g) => (
          <Card key={g.title} className="p-5">
            <h2 className="mb-4 font-semibold text-slate-900">{g.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.fields.map(([key, label, type]) => (
                <Field key={key} label={label} error={errors[key]}>
                  {(fid) => (
                    <Input id={fid} type={type} value={values[key]} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
                  )}
                </Field>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </form>
  )
}
