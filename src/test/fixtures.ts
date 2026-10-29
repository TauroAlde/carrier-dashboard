import type { CarrierStat } from '../types/carrier'

// Sorted by performance_score desc, same as the real API.
export const carrierStats: CarrierStat[] = [
  {
    carrier: 'dhl',
    success_rate: 0.96,
    avg_days: 2.1,
    total_shipments: 100,
    deliveries: 96,
    failures: 4,
    status: 'excellent',
    performance_score: 0.81,
  },
  {
    carrier: 'estafeta',
    success_rate: 0.8,
    avg_days: 3.5,
    total_shipments: 50,
    deliveries: 40,
    failures: 10,
    status: 'warning',
    performance_score: 0.65,
  },
  {
    carrier: 'fedex',
    success_rate: 0,
    avg_days: null,
    total_shipments: 0,
    deliveries: 0,
    failures: 0,
    status: 'unknown',
    performance_score: 0.15,
  },
]
