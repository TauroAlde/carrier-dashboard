import type { CarrierStat, CarrierStatus } from '../types/carrier'

export const STATUS_STYLES: Record<CarrierStatus, { label: string; className: string }> = {
  excellent: { label: 'Excellent', className: 'bg-emerald-100 text-emerald-800' },
  good: { label: 'Good', className: 'bg-sky-100 text-sky-800' },
  warning: { label: 'Warning', className: 'bg-amber-100 text-amber-800' },
  bad: { label: 'Bad', className: 'bg-rose-100 text-rose-800' },
  unknown: { label: 'No data', className: 'bg-slate-100 text-slate-600' },
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`
}

export function formatDays(days: number | null): string {
  return days === null ? '—' : `${days.toFixed(1)} d`
}

export type Summary = {
  totalShipments: number
  overallSuccessRate: number
  bestCarrier: string | null
}

// The overall success rate is weighted by shipments (total deliveries / total
// shipments), not an average of each carrier's rate. Otherwise a carrier with
// 2 shipments would weigh the same as one with 2,000.
export function summarize(stats: CarrierStat[]): Summary {
  const totalShipments = stats.reduce((sum, s) => sum + s.total_shipments, 0)
  const totalDeliveries = stats.reduce((sum, s) => sum + s.deliveries, 0)

  const best = stats.reduce<CarrierStat | null>(
    (top, s) => (top === null || s.performance_score > top.performance_score ? s : top),
    null,
  )

  return {
    totalShipments,
    overallSuccessRate: totalShipments === 0 ? 0 : totalDeliveries / totalShipments,
    bestCarrier: best?.carrier ?? null,
  }
}

export type Filters = {
  search: string
  status: CarrierStatus | 'all'
}

export function filterStats(stats: CarrierStat[], { search, status }: Filters): CarrierStat[] {
  const term = search.trim().toLowerCase()

  return stats.filter(
    (s) =>
      (status === 'all' || s.status === status) &&
      (term === '' || s.carrier.toLowerCase().includes(term)),
  )
}
