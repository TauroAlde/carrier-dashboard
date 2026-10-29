import type { CarrierStatus } from '../types/carrier'
import { STATUS_STYLES } from '../lib/carrierStats'

export function StatusBadge({ status }: { status: CarrierStatus }) {
  // Fall back to "unknown" in case the API adds a status we don't know yet,
  // so the UI degrades instead of crashing on an undefined lookup.
  const { label, className } = STATUS_STYLES[status] ?? STATUS_STYLES.unknown

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {label}
    </span>
  )
}
