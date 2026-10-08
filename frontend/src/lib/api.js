/**
 * Client de l'API Laravel (même domaine que le site, authentification par cookie de session).
 * - Les requêtes d'écriture envoient le jeton CSRF (cookie XSRF-TOKEN posé par /sanctum/csrf-cookie).
 * - Les erreurs sont levées sous forme d'ApiError (status + erreurs de validation par champ).
 */

export class ApiError extends Error {
  constructor(status, data) {
    super(data?.message || `Erreur ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.errors = data?.errors || {}
  }
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

async function ensureCsrf(force = false) {
  if (force || !getCookie('XSRF-TOKEN')) {
    await fetch('/sanctum/csrf-cookie', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
  }
}

async function request(path, options = {}, retried = false) {
  const { method = 'GET', body, formData } = options
  const headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }

  if (method !== 'GET' && method !== 'HEAD') {
    await ensureCsrf()
    const token = getCookie('XSRF-TOKEN')
    if (token) headers['X-XSRF-TOKEN'] = token
  }

  const init = { method, headers, credentials: 'same-origin' }
  if (formData) {
    init.body = formData
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const response = await fetch(`/api${path}`, init)

  // Jeton CSRF expiré : on en demande un nouveau et on rejoue la requête une fois.
  if (response.status === 419 && !retried) {
    await ensureCsrf(true)
    return request(path, options, true)
  }

  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!response.ok) throw new ApiError(response.status, data)
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload: (path, formData) => request(path, { method: 'POST', formData }),
}

/** URL publique d'un fichier envoyé (chemin relatif renvoyé par l'API). */
export const mediaUrl = (path) => (path ? `/storage/${String(path).replace(/^\/+/, '')}` : null)
