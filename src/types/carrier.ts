// Mirrors the JSON returned by shipping_api_2 at GET /stats/carriers.
// Status values come from StatsController#status_label in the Rails API.
export type CarrierStatus = 'excellent' | 'good' | 'warning' | 'bad' | 'unknown'

export type CarrierStat = {
  carrier: string
  success_rate: number
  // The API returns null when a carrier has no delivered shipments yet.
  avg_days: number | null
  total_shipments: number
  deliveries: number
  failures: number
  // Cancelled by the user: shown for context, not part of the success rate.
  // Optional so the dashboard still works with an API that doesn't send it.
  cancelled?: number
  status: CarrierStatus
  performance_score: number
}
