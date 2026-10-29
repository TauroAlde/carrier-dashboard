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
  status: CarrierStatus
  performance_score: number
}
