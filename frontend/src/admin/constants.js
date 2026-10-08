// Adresse de l'espace d'administration (une seule valeur à changer si besoin)
export const ADMIN_BASE = '/admin'

// Doit correspondre à config/ivc.php côté Laravel
export const CATEGORIES = ['Communication', 'Audiovisuel', 'Marketing', 'Réseaux sociaux', 'Branding']

export const SUBMISSION_STATUS = {
  new: { label: 'Nouveau', cls: 'bg-blue-100 text-blue-800' },
  read: { label: 'Lu', cls: 'bg-slate-100 text-slate-700' },
  done: { label: 'Traité', cls: 'bg-emerald-100 text-emerald-800' },
}

export const SUBMISSION_TYPE = {
  contact: 'Contact',
  quote: 'Devis',
}
