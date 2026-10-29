import type { CarrierStatus } from '../types/carrier'
import { STATUS_STYLES, type Filters } from '../lib/carrierStats'

type Props = {
  filters: Filters
  onChange: (filters: Filters) => void
}

const STATUS_OPTIONS = Object.keys(STATUS_STYLES) as CarrierStatus[]

// Controlled component: the parent owns the filter state so it can use it
// to filter the list and the chart from a single source of truth.
export function CarrierFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Search carrier</span>
        <input
          type="search"
          placeholder="Search carrier…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

      <label>
        <span className="sr-only">Filter by status</span>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as Filters['status'] })}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:w-48"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {STATUS_STYLES[status].label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
