import { useRef, useState } from 'react'
import { mediaUrl } from '../../lib/api'
import { Button } from './ui'
import { uploadImage } from './ImageUpload'
import { useToast } from './Toast'

/** Galerie : plusieurs images (12 maximum), chacune pouvant être retirée. */
export default function GalleryUpload({ value = [], onChange, max = 12 }) {
  const toast = useToast()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)

  async function onPick(e) {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    setBusy(true)
    const added = []
    for (const file of files.slice(0, max - value.length)) {
      try {
        const res = await uploadImage(file)
        added.push(res.path)
      } catch (err) {
        toast(`${file.name} : ${err.errors?.file?.[0] || err.message}`, 'error')
      }
    }
    if (added.length) onChange([...value, ...added])
    setBusy(false)
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((path) => (
          <div key={path} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200">
            <img src={mediaUrl(path)} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(value.filter((p) => p !== path))}
              className="absolute right-1 top-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-xs font-bold text-white"
              aria-label="Retirer cette image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPick} />
      <Button
        variant="secondary"
        size="sm"
        className="mt-3"
        disabled={busy || value.length >= max}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? 'Envoi…' : `Ajouter des images (${value.length}/${max})`}
      </Button>
    </div>
  )
}
