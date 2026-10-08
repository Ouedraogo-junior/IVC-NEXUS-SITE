import { useRef, useState } from 'react'
import { api, mediaUrl } from '../../lib/api'
import { Button } from './ui'
import { useToast } from './Toast'

/** Envoie une image vers l'API et renvoie son chemin relatif (ex. uploads/2026/10/xxx.webp). */
export async function uploadImage(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await api.upload('/admin/uploads', fd)
  return res // { path, url }
}

export default function ImageUpload({ value, onChange, label = 'image' }) {
  const toast = useToast()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)

  async function onPick(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      const res = await uploadImage(file)
      onChange(res.path)
    } catch (err) {
      toast(err.errors?.file?.[0] || err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  const url = mediaUrl(value)

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex h-24 w-36 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
        {url ? <img src={url} alt="" className="h-full w-full object-cover" /> : 'Aucune image'}
      </div>
      <div className="flex flex-wrap gap-2">
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPick} />
        <Button variant="secondary" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? 'Envoi…' : value ? `Changer l’${label}` : `Ajouter une ${label}`}
        </Button>
        {value && !busy && (
          <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
            Retirer
          </Button>
        )}
      </div>
    </div>
  )
}
