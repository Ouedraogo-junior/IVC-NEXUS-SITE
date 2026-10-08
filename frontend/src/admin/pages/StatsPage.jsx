import SimpleCrud from './SimpleCrud'

const FIELDS = [
  { name: 'value', label: 'Valeur', type: 'text', required: true, help: 'Par exemple : 50+, 100%, 12' },
  { name: 'label_fr', label: 'Libellé (français)', type: 'text', required: true, help: 'Par exemple : Projets réalisés' },
  { name: 'label_en', label: 'Libellé (anglais)', type: 'text', help: 'Facultatif : le français est utilisé sinon.' },
  { name: 'sort_order', label: 'Ordre d’affichage', type: 'number', default: 0 },
]

export default function StatsPage() {
  return (
    <SimpleCrud
      title="Chiffres clés"
      subtitle="Les chiffres mis en avant sur la page d’accueil."
      endpoint="/admin/stats"
      fields={FIELDS}
      addLabel="Ajouter un chiffre"
      emptyText="Aucun chiffre pour le moment."
      nounDelete={(s) => `le chiffre « ${s.value} ${s.label_fr} »`}
      renderRow={(s) => (
        <p className="text-slate-900">
          <span className="mr-3 text-2xl font-bold text-blue-700">{s.value}</span>
          <span className="text-sm text-slate-600">{s.label_fr}</span>
        </p>
      )}
    />
  )
}
