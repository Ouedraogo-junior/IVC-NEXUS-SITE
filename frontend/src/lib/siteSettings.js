import { useEffect, useMemo, useState } from 'react'
import { fetchJson } from './publicApi'
import { CONTACT } from '../config/contact'

const SOCIALS = [
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
]

// "+226 70 94 98 32" (affichage) -> "+22670949832" (lien tel:)
const toTel = (display) => (display.trim().startsWith('+') ? '+' : '') + display.replace(/\D/g, '')

// Un lien social saisi sans "https://" est complété ; tout autre protocole (javascript:…) est refusé.
function normalizeUrl(value) {
  const v = String(value ?? '').trim()
  if (!v) return null
  if (/^https?:\/\//i.test(v)) return v
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return null
  return `https://${v.replace(/^\/+/, '')}`
}

/**
 * Coordonnées du site à partir des réglages de l'API.
 * Un champ vide retombe sur la valeur écrite dans src/config/contact.js (le site n'affiche jamais "rien"),
 * sauf les réseaux sociaux : un réseau sans lien n'est simplement pas affiché.
 */
export function buildContact(settings) {
  const s = settings || {}
  const phones = [s.phone_1, s.phone_2]
    .map((v) => String(v ?? '').trim())
    .filter(Boolean)
    .map((display) => ({ display, tel: toTel(display) }))

  return {
    phones: phones.length ? phones : CONTACT.phones,
    email: String(s.email ?? '').trim() || CONTACT.email,
    address: String(s.address ?? '').trim() || null, // null : le composant garde le texte traduit du site
    socials: SOCIALS.map(([key, name]) => ({ key, name, href: normalizeUrl(s[key]) })).filter((x) => x.href),
  }
}

// Une seule requête par chargement de page, partagée par le pied de page et la page Contact.
let request = null
function load() {
  if (!request) {
    request = fetchJson('/settings')
      .then((r) => r.data || {})
      .catch((error) => {
        request = null // nouvelle tentative au prochain affichage
        throw error
      })
  }
  return request
}
export const resetSiteSettings = () => {
  request = null
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    let alive = true
    load()
      .then((s) => alive && setSettings(s))
      .catch(() => {}) // API indisponible : on garde les coordonnées de secours
    return () => {
      alive = false
    }
  }, [])

  return useMemo(() => buildContact(settings), [settings])
}