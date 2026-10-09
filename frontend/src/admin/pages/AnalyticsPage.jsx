import { useState } from 'react'
import { useApi } from '../hooks'
import { Card, EmptyState, ErrorBox, PageHeader, Spinner } from '../components/ui'

const PERIODS = [
  { days: 7, label: '7 jours' },
  { days: 30, label: '30 jours' },
  { days: 90, label: '90 jours' },
]

const DEVICES = [
  { key: 'mobile', label: 'Téléphone' },
  { key: 'desktop', label: 'Ordinateur' },
  { key: 'tablet', label: 'Tablette' },
]

const nf = new Intl.NumberFormat('fr-FR')
const dayLabel = (iso, long = false) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', long ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'short' })

function Figure({ label, value, accent }) {
  return (
    <Card className="p-5">
      <p className={`text-3xl font-bold ${accent ? 'text-blue-700' : 'text-slate-900'}`}>{nf.format(value)}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </Card>
  )
}

/** Barres fines : un visiteur par jour. Survol ou clavier pour lire la valeur d'un jour. */
function DailyChart({ series }) {
  const [active, setActive] = useState(null)
  const max = Math.max(1, ...series.map((d) => d.visitors))
  const shown = active ?? series.length - 1
  const day = series[shown]

  return (
    <div>
      <p className="mb-3 min-h-[1.25rem] text-sm text-slate-700" aria-live="polite">
        <span className="font-semibold capitalize">{dayLabel(day.date, true)}</span>
        {' · '}
        {nf.format(day.visitors)} visiteur{day.visitors > 1 ? 's' : ''}
        {' · '}
        {nf.format(day.views)} page{day.views > 1 ? 's' : ''} vue{day.views > 1 ? 's' : ''}
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-slate-100" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-slate-100" />
        <span className="pointer-events-none absolute -top-2 left-0 bg-white pr-1 text-xs text-slate-500">{nf.format(max)}</span>
        <div
          className="relative flex h-48 items-end gap-0.5 border-b border-slate-300 sm:gap-1"
          onMouseLeave={() => setActive(null)}
        >
          {series.map((d, i) => (
            <button
              key={d.date}
              type="button"
              aria-label={`${dayLabel(d.date, true)} : ${d.visitors} visiteur(s), ${d.views} page(s) vue(s)`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group flex h-full min-w-0 flex-1 items-end focus:outline-none"
            >
              <span
                className={`block w-full rounded-t-[3px] transition-colors group-focus-visible:ring-2 group-focus-visible:ring-blue-700/40 ${
                  shown === i ? 'bg-blue-800' : 'bg-blue-600'
                }`}
                style={{ height: `${(d.visitors / max) * 100}%`, minHeight: d.visitors > 0 ? 2 : 0 }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>{dayLabel(series[0].date)}</span>
        <span>{dayLabel(series[Math.floor((series.length - 1) / 2)].date)}</span>
        <span>{dayLabel(series[series.length - 1].date)}</span>
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer font-medium text-blue-700">Voir les chiffres jour par jour</summary>
        <div className="mt-2 max-h-64 overflow-auto rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">Jour</th>
                <th className="px-3 py-2 text-right">Visiteurs</th>
                <th className="px-3 py-2 text-right">Pages vues</th>
              </tr>
            </thead>
            <tbody>
              {[...series].reverse().map((d) => (
                <tr key={d.date} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{dayLabel(d.date, true)}</td>
                  <td className="px-3 py-1.5 text-right">{nf.format(d.visitors)}</td>
                  <td className="px-3 py-1.5 text-right">{nf.format(d.views)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  )
}

function RankedList({ title, rows, empty, unit }) {
  const top = Math.max(1, ...rows.map((r) => r.value))
  return (
    <Card className="p-5">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      {rows.length === 0 ? (
        <EmptyState>{empty}</EmptyState>
      ) : (
        <ul className="mt-3 space-y-3">
          {rows.map((r) => (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate text-slate-800">{r.label}</span>
                <span className="shrink-0 font-semibold text-slate-900">
                  {nf.format(r.value)} <span className="font-normal text-slate-500">{unit}</span>
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${(r.value / top) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30)
  const { data, loading, error, reload } = useApi(`/admin/analytics?days=${days}`)
  const stats = data?.data

  const sources = stats
    ? [
        ...(stats.direct > 0 ? [{ label: 'Accès direct (adresse tapée, favoris, messagerie)', value: stats.direct }] : []),
        ...stats.referrers.map((r) => ({ label: r.source, value: r.visitors })),
      ].sort((a, b) => b.value - a.value)
    : []

  const deviceTotal = stats ? DEVICES.reduce((sum, d) => sum + stats.devices[d.key], 0) : 0

  return (
    <>
      <PageHeader
        title="Fréquentation"
        subtitle="Combien de personnes visitent le site, et quelles pages elles consultent."
        actions={
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5" role="group" aria-label="Période">
            {PERIODS.map((p) => (
              <button
                key={p.days}
                type="button"
                aria-pressed={days === p.days}
                onClick={() => setDays(p.days)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                  days === p.days ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />

      {loading && !stats && <Spinner />}
      <ErrorBox error={error} onRetry={reload} />

      {stats && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Figure accent label={`Visiteurs (${days} jours)`} value={stats.totals.visitors} />
            <Figure label="Pages vues" value={stats.totals.views} />
            <Figure label="Visiteurs aujourd’hui" value={stats.totals.today.visitors} />
          </div>

          {stats.totals.views === 0 ? (
            <Card>
              <EmptyState>
                Aucune visite enregistrée sur cette période. Les visites sont comptées dès que le site est en ligne.
              </EmptyState>
            </Card>
          ) : (
            <>
              <Card className="p-5">
                <h2 className="mb-3 font-semibold text-slate-900">Visiteurs par jour</h2>
                <DailyChart series={stats.series} />
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <RankedList
                  title="Pages les plus consultées"
                  unit="vues"
                  empty="Aucune page pour le moment."
                  rows={stats.pages.map((p) => ({ label: p.path === '/' ? 'Accueil' : p.path, value: p.views }))}
                />
                <RankedList title="D’où viennent les visiteurs" unit="visiteurs" empty="Aucune donnée." rows={sources} />
              </div>

              <Card className="p-5">
                <h2 className="font-semibold text-slate-900">Appareils</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {DEVICES.map((d) => (
                    <li key={d.key} className="rounded-lg bg-slate-50 p-3">
                      <p className="text-2xl font-bold text-slate-900">
                        {deviceTotal ? Math.round((stats.devices[d.key] / deviceTotal) * 100) : 0} %
                      </p>
                      <p className="text-sm text-slate-600">{d.label}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}

          <p className="text-xs leading-relaxed text-slate-500">
            Une personne qui revient un autre jour est comptée de nouveau. Les robots des moteurs de recherche, les visites
            de l’équipe depuis l’espace d’administration et les visiteurs qui refusent le suivi ne sont pas comptés. Aucun
            cookie n’est utilisé et aucune adresse IP n’est conservée.
          </p>
        </div>
      )}
    </>
  )
}
