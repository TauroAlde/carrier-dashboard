import type { CarrierStat } from '../types/carrier'
import { formatPercent, summarize } from '../lib/carrierStats'

export function SummaryStats({ stats }: { stats: CarrierStat[] }) {
  const { totalShipments, overallSuccessRate, bestCarrier } = summarize(stats)

  const items = [
    { label: 'Carriers', value: stats.length.toString() },
    { label: 'Total shipments', value: totalShipments.toLocaleString() },
    { label: 'Overall success', value: formatPercent(overallSuccessRate) },
    { label: 'Top performer', value: bestCarrier?.toUpperCase() ?? '—' },
  ]

  return (
    <section aria-label="Summary" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
        </div>
      ))}
    </section>
  )
}
