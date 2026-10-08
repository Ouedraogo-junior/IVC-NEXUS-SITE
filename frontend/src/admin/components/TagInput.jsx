import { useState } from 'react'

/** Saisie de mots-clés : Entrée ou virgule pour valider, ✕ pour retirer. */
export default function TagInput({ value = [], onChange, placeholder = 'Ajouter…', id }) {
  const [text, setText] = useState('')

  function addTag(raw) {
    const v = raw.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setText('')
  }

  const commit = () => addTag(text)

  function onInput(e) {
    const v = e.target.value
    if (v.endsWith(',')) addTag(v.slice(0, -1))
    else setText(v)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 bg-white p-2 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20">
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            aria-label={`Retirer ${tag}`}
            className="text-slate-500 hover:text-red-600"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        id={id}
        value={text}
        onChange={onInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            commit()
          }
          if (e.key === 'Backspace' && !text && value.length) onChange(value.slice(0, -1))
        }}
        onBlur={commit}
        placeholder={placeholder}
        className="min-w-[8rem] flex-1 border-0 bg-transparent p-1 text-base outline-none sm:text-sm"
      />
    </div>
  )
}
