import { useQuery } from '@tanstack/react-query'
import { fetchCarrierStats } from '../api/carriers'

// React Query handles loading/error state, caching and retries for us.
// This replaces the manual useEffect + useState combo, which is where the
// original "stuck on Loading..." bug came from (loading was never reset on success).
export function useCarrierStats() {
  return useQuery({
    queryKey: ['carrier-stats'],
    queryFn: fetchCarrierStats,
    // Stats change slowly; avoid refetching on every window focus.
    staleTime: 60_000,
  })
}
