import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { ADMIN_BASE } from '../constants'
import { Button, Field, Input, Spinner } from '../components/ui'

export default function LoginPage() {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (status === 'loading') return <Spinner />
  if (status === 'authed') return <Navigate to={location.state?.from?.pathname || ADMIN_BASE} replace />

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
      navigate(location.state?.from?.pathname || ADMIN_BASE, { replace: true })
    } catch (err) {
      setError(
        err.status === 429
          ? 'Trop de tentatives. Patientez une minute avant de réessayer.'
          : err.errors?.email?.[0] || err.message
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">IVC Nexus</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Espace d’administration</h1>
        <p className="mt-1 text-sm text-slate-600">Connectez-vous pour gérer votre site.</p>

        <div className="mt-6 space-y-4">
          <Field label="Adresse e-mail">
            {(id) => (
              <Input id={id} type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            )}
          </Field>
          <Field label="Mot de passe">
            {(id) => (
              <Input id={id} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            )}
          </Field>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="mt-6 w-full" disabled={busy}>
          {busy ? 'Connexion…' : 'Se connecter'}
        </Button>
      </form>
    </div>
  )
}
