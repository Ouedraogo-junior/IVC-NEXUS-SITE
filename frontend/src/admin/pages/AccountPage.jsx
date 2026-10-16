import { useState } from 'react'
import { api } from '../../lib/api'
import { useAuth } from '../AuthContext'
import { Button, Card, Field, Input, PageHeader } from '../components/ui'
import { useToast } from '../components/Toast'

const MIN_LENGTH = 8
const EMPTY = { current_password: '', password: '', password_confirmation: '' }

export default function AccountPage() {
  const toast = useToast()
  const { user } = useAuth()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value })

  async function save(e) {
    e.preventDefault()

    // Contrôles rapides avant d'appeler le serveur
    const local = {}
    if (values.password.length < MIN_LENGTH) local.password = `Le nouveau mot de passe doit contenir au moins ${MIN_LENGTH} caractères.`
    else if (values.password !== values.password_confirmation) local.password_confirmation = 'Les deux mots de passe ne correspondent pas.'
    if (Object.keys(local).length) {
      setErrors(local)
      return
    }

    setSaving(true)
    setErrors({})
    try {
      await api.put('/admin/password', values)
      setValues(EMPTY)
      toast('Mot de passe modifié')
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.errors)
        toast('Vérifiez les champs signalés', 'error')
      } else if (err.status === 429) {
        toast('Trop de tentatives. Patientez une minute avant de réessayer.', 'error')
      } else toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="max-w-xl">
      <PageHeader
        title="Mon compte"
        subtitle={user?.email ? `Connecté en tant que ${user.email}` : 'Modifier votre mot de passe.'}
      />
      <Card className="p-5">
        <h2 className="mb-1 font-semibold text-slate-900">Changer le mot de passe</h2>
        <p className="mb-4 text-sm text-slate-600">
          Choisissez un mot de passe d’au moins {MIN_LENGTH} caractères, que vous n’utilisez nulle part ailleurs.
        </p>
        <div className="space-y-4">
          <Field label="Mot de passe actuel" error={errors.current_password}>
            {(id) => (
              <Input id={id} type="password" autoComplete="current-password" required value={values.current_password} onChange={set('current_password')} />
            )}
          </Field>
          <Field label="Nouveau mot de passe" error={errors.password} help={`${MIN_LENGTH} caractères minimum.`}>
            {(id) => (
              <Input id={id} type="password" autoComplete="new-password" required value={values.password} onChange={set('password')} />
            )}
          </Field>
          <Field label="Confirmer le nouveau mot de passe" error={errors.password_confirmation}>
            {(id) => (
              <Input id={id} type="password" autoComplete="new-password" required value={values.password_confirmation} onChange={set('password_confirmation')} />
            )}
          </Field>
        </div>
        <div className="mt-5">
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Changer le mot de passe'}
          </Button>
        </div>
      </Card>
    </form>
  )
}