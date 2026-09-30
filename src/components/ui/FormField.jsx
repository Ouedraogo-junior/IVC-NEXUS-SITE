// text-base (16px) et non text-sm : en dessous de 16px, Safari/iOS zoome
// automatiquement la page au clic sur le champ — comportement gênant qu'on
// évite en restant à 16px minimum.
const baseClass =
  'w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-impact/40 focus:border-impact transition-colors'

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