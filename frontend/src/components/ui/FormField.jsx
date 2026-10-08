// text-base (16px) et non text-sm : en dessous de 16px, Safari/iOS zoome
// automatiquement la page au clic sur le champ.
// min-w-0 : sans ça, un champ natif "capricieux" (type="date" notamment)
// refuse de rétrécir sous sa largeur de contenu et déborde de sa colonne —
// nécessaire ici en plus du min-w-0 déjà posé sur le <label> englobant,
// car l'input est lui-même dans son propre contexte flexible.
const baseClass =
  'w-full min-w-0 rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-impact/40 focus:border-impact transition-colors'

export default function FormField({ label, as = 'input', type = 'text', options = [], className = '', ...props }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold text-nexus min-w-0 ${className}`}>
      {label}
      {as === 'textarea' && <textarea className={`${baseClass} min-h-[120px] resize-y font-normal`} {...props} />}
      {as === 'select' && (
        <select className={`${baseClass} font-normal`} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input type={type} className={`${baseClass} font-normal`} {...props} />}
    </label>
  )
}