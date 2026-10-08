import { useEffect, useState } from 'react'

/**
 * Lecture de l'API publique de Laravel (aucune connexion nécessaire).
 * Les écritures (formulaires) et l'admin passent par src/lib/api.js.
 */
export async function fetchJson(path, signal) {
  const res = await fetch(`/api${path}`, { headers: { Accept: 'application/json' }, signal })
  if (!res.ok) {
    const error = new Error(`HTTP ${res.status}`)
    error.status = res.status
    throw error
  }
  return res.json()
}

/** Charge une URL de l'API : { data, loading, error }. Se relance quand `path` change. */
export function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    if (!path) return undefined
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })
    fetchJson(path, controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error })
      })
    return () => controller.abort()
  }, [path])

  return state
}