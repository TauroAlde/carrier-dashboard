import type { CarrierStat } from '../types/carrier'
import { formatDays, formatPercent } from '../lib/carrierStats'
import { StatusBadge } from './StatusBadge'

type Props = {
  stat: CarrierStat
  rank: number
}

export function CarrierCard({ stat, rank }: Props) {
  return (
    <article
      aria-label={stat.carrier}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <header className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-500">#{rank}</p>
          <h3 className="text-lg font-bold uppercase text-slate-900">{stat.carrier}</h3>
        </div>
        <StatusBadge status={stat.status} />
      </header>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">Success rate</dt>
          <dd className="font-semibold text-slate-900">{formatPercent(stat.success_rate)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Avg. days</dt>
          <dd className="font-semibold text-slate-900">{formatDays(stat.avg_days)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Shipments</dt>
          <dd className="font-semibold text-slate-900">{stat.total_shipments}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Failures</dt>
          <dd className="font-semibold text-slate-900">{stat.failures}</dd>
        </div>
      </dl>

      {/* Cancellations are the user's doing, not the carrier's, so they are
          shown as a footnote instead of a metric next to the success rate. */}
      {(stat.cancelled ?? 0) > 0 && (
        <p className="mt-3 text-xs text-slate-500">{stat.cancelled} cancelled by the user (not counted)</p>
      )}

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>Performance score</span>
          <span>{stat.performance_score.toFixed(2)}</span>
        </div>
        {/* The score is 0–1 (see StatsController#performance_score), so it maps directly to a width. */}
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-indigo-500"
            style={{ width: `${Math.min(stat.performance_score, 1) * 100}%` }}
          />
        </div>
      </div>
    </article>
  )
}
