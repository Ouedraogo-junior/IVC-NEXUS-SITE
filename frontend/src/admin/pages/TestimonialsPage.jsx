import SimpleCrud from './SimpleCrud'
import { Badge } from '../components/ui'

const FIELDS = [
  { name: 'author', label: 'Nom', type: 'text', required: true },
  { name: 'role_fr', label: 'Fonction / organisation (français)', type: 'text' },
  { name: 'role_en', label: 'Fonction / organisation (anglais)', type: 'text', help: 'Facultatif : le français est utilisé sinon.' },
  { name: 'quote_fr', label: 'Témoignage (français)', type: 'textarea', required: true },
  { name: 'quote_en', label: 'Témoignage (anglais)', type: 'textarea', help: 'Facultatif : le français est utilisé sinon.' },
  { name: 'sort_order', label: 'Ordre d’affichage', type: 'number', default: 0, help: 'Le plus petit s’affiche en premier.' },
  { name: 'is_visible', label: 'Visible sur le site', type: 'toggle', default: true },
]

export default function TestimonialsPage() {
  return (
    <SimpleCrud
      title="Témoignages clients"
      subtitle="Remplacez les exemples par de vrais retours, avec l’accord de vos clients."
      endpoint="/admin/testimonials"
      fields={FIELDS}
      addLabel="Ajouter un témoignage"
      emptyText="Aucun témoignage pour le moment."
      nounDelete={(t) => `le témoignage de ${t.author}`}
      renderRow={(t) => (
        <>
          <p className="font-semibold text-slate-900">
            {t.author} {!t.is_visible && <Badge className="ml-2 bg-amber-100 text-amber-800">Masqué</Badge>}
          </p>
          <p className="line-clamp-2 text-sm text-slate-600">{t.quote_fr}</p>
        </>
      )}
    />
  )
}
