import { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { uploadImage } from './ImageUpload'
import { mediaUrl } from '../../lib/api'
import { useToast } from './Toast'

function ToolButton({ active, onClick, label, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={!!active}
      className={`min-w-9 rounded-md px-2.5 py-1.5 text-sm font-semibold transition-colors disabled:opacity-40 ${
        active ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  )
}

/** Éditeur de texte riche de l'article. Produit du HTML (nettoyé ensuite côté serveur). */
export default function RichEditor({ value, onChange }) {
  const toast = useToast()
  const fileRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image,
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'prose-blog min-h-[320px] px-4 py-3 focus:outline-none' },
    },
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  })

  // Quand l'article est chargé après coup, on met à jour le contenu de l'éditeur.
  useEffect(() => {
    if (editor && (value || '') !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  if (!editor) return null

  function setLink() {
    const previous = editor.getAttributes('link').href || ''
    const url = window.prompt('Adresse du lien (laisser vide pour retirer le lien)', previous)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  async function onImage(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const res = await uploadImage(file)
      editor.chain().focus().setImage({ src: mediaUrl(res.path), alt: '' }).run()
    } catch (err) {
      toast(err.errors?.file?.[0] || err.message, 'error')
    }
  }

  const chain = () => editor.chain().focus()

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <ToolButton label="Gras" active={editor.isActive('bold')} onClick={() => chain().toggleBold().run()}>
          <b>G</b>
        </ToolButton>
        <ToolButton label="Italique" active={editor.isActive('italic')} onClick={() => chain().toggleItalic().run()}>
          <i>I</i>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolButton label="Titre" active={editor.isActive('heading', { level: 2 })} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
          Titre
        </ToolButton>
        <ToolButton label="Sous-titre" active={editor.isActive('heading', { level: 3 })} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
          Sous-titre
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolButton label="Liste à puces" active={editor.isActive('bulletList')} onClick={() => chain().toggleBulletList().run()}>
          • Liste
        </ToolButton>
        <ToolButton label="Liste numérotée" active={editor.isActive('orderedList')} onClick={() => chain().toggleOrderedList().run()}>
          1. Liste
        </ToolButton>
        <ToolButton label="Citation" active={editor.isActive('blockquote')} onClick={() => chain().toggleBlockquote().run()}>
          “ ”
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolButton label="Lien" active={editor.isActive('link')} onClick={setLink}>
          Lien
        </ToolButton>
        <ToolButton label="Insérer une image" onClick={() => fileRef.current?.click()}>
          Image
        </ToolButton>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onImage} />
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolButton label="Annuler" disabled={!editor.can().undo()} onClick={() => chain().undo().run()}>
          ↶
        </ToolButton>
        <ToolButton label="Rétablir" disabled={!editor.can().redo()} onClick={() => chain().redo().run()}>
          ↷
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
