import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { SUBMISSION_STATUS, SUBMISSION_TYPE } from '../constants'
import { formatDateTime } from '../hooks'
import { Badge, Button, Card, EmptyState, ErrorBox, Modal, PageHeader, Spinner, confirmDelete } from '../components/ui'
import { useToast } from '../components/Toast'

const FILTERS_TYPE = [
  ['', 'Tous'],
  ['contact', 'Contact'],
  ['quote', 'Devis'],
]
const FILTERS_STATUS = [
  ['', 'Tous'],
  ['new', 'Nouveaux'],
  ['read', 'Lus'],
  ['done', 'Traités'],
]

function Chips({ options, value, onChange, label }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            value === v ? 'bg-blue-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50'
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

function Row({ label, children }) {
  if (!children) return null
  return (
    <div className="grid gap-1 py-2 sm:grid-cols-[10rem_1fr]">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="break-words text-sm text-slate-900">{children}</dd>
    </div>
  )
}

export default function SubmissionsPage() {
  const toast = useToast()
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    const qs = new URLSearchParams({ page })
    if (type) qs.set('type', type)
    if (status) qs.set('status', status)
    api
      .get(`/admin/submissions?${qs}`)
      .then((res) => {
        setList(res)
        setError(null)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [page, type, status])

  useEffect(() => load(), [load])

  async function open(item) {
    try {
      const res = await api.get(`/admin/submissions/${item.id}`) // marque comme lu
      setSelected(res.data)
      load()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function setItemStatus(next) {
    try {
      const res = await api.patch(`/admin/submissions/${selected.id}`, { status: next })
      setSelected(res.data)
      load()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function remove() {
    if (!confirmDelete('ce message')) return
    try {
      await api.del(`/admin/submissions/${selected.id}`)
      setSelected(null)
      toast('Message supprimé')
      load()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const rows = list?.data || []

  return (
    <>
      <PageHeader
        title="Messages & demandes de devis"
        subtitle="Tout ce qui est envoyé depuis les formulaires du site."
        actions={
          <a
            href="/api/admin/submissions/export"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Exporter en CSV
          </a>
        }
      />

      <div className="mb-4 flex flex-wrap gap-x-8 gap-y-3">
        <Chips label="Type" options={FILTERS_TYPE} value={type} onChange={(v) => (setType(v), setPage(1))} />
        <Chips label="Statut" options={FILTERS_STATUS} value={status} onChange={(v) => (setStatus(v), setPage(1))} />
      </div>

      {loading && !list && <Spinner />}
      <ErrorBox error={error} onRetry={load} />

      {list && (
        <Card className="overflow-hidden">
          {rows.length === 0 ? (
            <EmptyState>Aucun message ne correspond à ces filtres.</EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {rows.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => open(s)}
                    className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 sm:px-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className={`truncate ${s.status === 'new' ? 'font-bold' : 'font-medium'} text-slate-900`}>{s.name}</p>
                      <p className="truncate text-sm text-slate-500">{s.message}</p>
                    </div>
                    <Badge className="bg-slate-100 text-slate-700">{SUBMISSION_TYPE[s.type] || s.type}</Badge>
                    <Badge className={SUBMISSION_STATUS[s.status]?.cls}>{SUBMISSION_STATUS[s.status]?.label}</Badge>
                    <span className="w-36 text-xs text-slate-500">{formatDateTime(s.created_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {list && list.last_page > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            ← Précédent
          </Button>
          <span>
            Page {list.current_page} / {list.last_page}
          </span>
          <Button variant="secondary" size="sm" disabled={page >= list.last_page} onClick={() => setPage(page + 1)}>
            Suivant →
          </Button>
        </div>
      )}

      {selected && (
        <Modal title={selected.type === 'quote' ? 'Demande de devis' : 'Message de contact'} onClose={() => setSelected(null)} wide>
          <dl className="divide-y divide-slate-100">
            <Row label="Reçu le">{formatDateTime(selected.created_at)}</Row>
            <Row label="Nom">{selected.name}</Row>
            <Row label="E-mail">
              <a className="text-blue-700 underline" href={`mailto:${selected.email}`}>
                {selected.email}
              </a>
            </Row>
            <Row label="Téléphone">
              {selected.phone && (
                <a className="text-blue-700 underline" href={`tel:${selected.phone.replace(/\s+/g, '')}`}>
                  {selected.phone}
                </a>
              )}
            </Row>
            <Row label="Organisation">{selected.organisation}</Row>
            <Row label="Profil">{selected.profile}</Row>
            <Row label="Service souhaité">{selected.service}</Row>
            <Row label="Budget estimatif">{selected.budget}</Row>
            <Row label="Date souhaitée">{selected.desired_date}</Row>
            <Row label="Pièce jointe">
              {selected.has_attachment && (
                <a
                  href={`/api/admin/submissions/${selected.id}/attachment`}
                  className="font-medium text-blue-700 underline"
                >
                  {selected.attachment_name || 'Télécharger'}
                </a>
              )}
            </Row>
            <Row label="Langue du site">{selected.lang?.toUpperCase()}</Row>
            <Row label="Message">
              <span className="whitespace-pre-line">{selected.message}</span>
            </Row>
          </dl>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent('Votre demande — IVC Nexus')}`}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Répondre par e-mail
              </a>
              {selected.status !== 'done' ? (
                <Button variant="secondary" onClick={() => setItemStatus('done')}>
                  Marquer comme traité
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setItemStatus('read')}>
                  Remettre en « lu »
                </Button>
              )}
            </div>
            <Button variant="danger" onClick={remove}>
              Supprimer
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
