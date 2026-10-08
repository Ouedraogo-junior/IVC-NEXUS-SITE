import { useState } from 'react'
import { api } from '../../lib/api'
import { useApi } from '../hooks'
import {
  Button, Card, EmptyState, ErrorBox, Field, Input, Modal, PageHeader, Spinner, Textarea, Toggle, confirmDelete,
} from '../components/ui'
import { useToast } from '../components/Toast'

/**
 * Page "liste + formulaire dans une fenêtre" réutilisée pour les témoignages et les chiffres clés.
 * fields : [{ name, label, type: 'text'|'textarea'|'number'|'toggle', required, help, default }]
 */
export default function SimpleCrud({ title, subtitle, endpoint, fields, renderRow, addLabel, nounDelete, emptyText }) {
  const toast = useToast()
  const { data, loading, error, reload } = useApi(endpoint)
  const [editing, setEditing] = useState(null) // null | { id?, ...values }
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.default ?? (f.type === 'toggle' ? false : '')]))
  const open = (item) => {
    setErrors({})
    setEditing(item ? { ...blank(), ...Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? blank()[f.name]])), id: item.id } : blank())
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    const payload = {}
    for (const f of fields) {
      const v = editing[f.name]
      if (f.type === 'number') payload[f.name] = v === '' || v === null ? null : Number(v)
      else if (f.type === 'toggle') payload[f.name] = !!v
      else payload[f.name] = typeof v === 'string' && v.trim() === '' && !f.required ? null : v
    }
    try {
      if (editing.id) await api.put(`${endpoint}/${editing.id}`, payload)
      else await api.post(endpoint, payload)
      toast('Enregistré')
      setEditing(null)
      reload()
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.errors)
        toast('Vérifiez les champs signalés', 'error')
      } else toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item) {
    if (!confirmDelete(nounDelete(item))) return
    try {
      await api.del(`${endpoint}/${item.id}`)
      toast('Supprimé')
      reload()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const items = data?.data || []

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} actions={<Button onClick={() => open(null)}>{addLabel}</Button>} />
      {loading && <Spinner />}
      <ErrorBox error={error} onRetry={reload} />
      {data && (
        <Card className="overflow-hidden">
          {items.length === 0 ? (
            <EmptyState>{emptyText}</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">{renderRow(item)}</div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => open(item)}>
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => remove(item)}>
                      Supprimer
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {editing && (
        <Modal title={editing.id ? 'Modifier' : addLabel} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="space-y-4">
            {fields.map((f) =>
              f.type === 'toggle' ? (
                <Toggle key={f.name} label={f.label} checked={editing[f.name]} onChange={(v) => setEditing({ ...editing, [f.name]: v })} />
              ) : (
                <Field key={f.name} label={f.label} required={f.required} help={f.help} error={errors[f.name]}>
                  {(fid) =>
                    f.type === 'textarea' ? (
                      <Textarea id={fid} rows={4} value={editing[f.name]} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} />
                    ) : (
                      <Input
                        id={fid}
                        type={f.type === 'number' ? 'number' : 'text'}
                        min={f.type === 'number' ? 0 : undefined}
                        required={f.required}
                        value={editing[f.name] ?? ''}
                        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      />
                    )
                  }
                </Field>
              )
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Annuler
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
