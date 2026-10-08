import { useEffect, useId } from 'react'

const inputBase =
  'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm ' +
  'placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 ' +
  'disabled:bg-slate-100 sm:text-sm'

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-300',
    secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-50',
    danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:opacity-50',
    ghost: 'text-slate-700 hover:bg-slate-100 disabled:opacity-50',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}

export function Field({ label, error, help, required, children }) {
  const id = useId()
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      {typeof children === 'function' ? children(id) : children}
      {help && !error && <p className="mt-1 text-xs text-slate-500">{help}</p>}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  )
}

export function Input({ id, className = '', ...props }) {
  return <input id={id} className={`${inputBase} ${className}`} {...props} />
}

export function Textarea({ id, className = '', rows = 4, ...props }) {
  return <textarea id={id} rows={rows} className={`${inputBase} ${className}`} {...props} />
}

export function Select({ id, className = '', children, ...props }) {
  return (
    <select id={id} className={`${inputBase} ${className}`} {...props}>
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="relative h-6 w-11 rounded-full bg-slate-300 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-blue-700 peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600/40" />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  )
}

export function Card({ className = '', children }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Badge({ className = '', children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>
  )
}

export function Spinner({ label = 'Chargement…' }) {
  return (
    <div className="flex items-center gap-3 p-6 text-sm text-slate-600" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-700" />
      {label}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  if (!error) return null
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
      {error.message || 'Une erreur est survenue.'}
      {onRetry && (
        <button type="button" className="ml-3 font-semibold underline" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  )
}

export function EmptyState({ children }) {
  return <div className="p-8 text-center text-sm text-slate-500">{children}</div>
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} rounded-xl bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

/** Confirmation native avant une suppression. */
export function confirmDelete(what) {
  return window.confirm(`Supprimer ${what} ? Cette action est définitive.`)
}
