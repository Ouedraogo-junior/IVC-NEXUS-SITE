/**
 * Compteur de visites du site (sans cookie, sans service extérieur).
 * Envoie à /api/track la page affichée ; le serveur ne garde aucune adresse IP.
 */
let firstView = true

export function trackPageView(pathname) {
  try {
    // Un administrateur qui ouvre l'espace /admin n'est plus compté sur ce navigateur.
    if (pathname.startsWith('/admin')) {
      localStorage.setItem('ivc-no-track', '1')
      return
    }
    if (localStorage.getItem('ivc-no-track')) return
  } catch {
    // stockage indisponible (navigation privée…) : on compte normalement
  }

  if (navigator.doNotTrack === '1') return

  const body = JSON.stringify({
    path: pathname,
    // la provenance (Google, Facebook…) n'a de sens que pour la première page de la visite
    referrer: firstView ? document.referrer : '',
  })
  firstView = false

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body,
    keepalive: true,
    credentials: 'omit',
  }).catch(() => {}) // le comptage ne doit jamais gêner le visiteur
}

// pour les tests
export const __resetFirstView = () => {
  firstView = true
}
