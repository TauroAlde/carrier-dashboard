import { useMemo, useState } from 'react'
import { useCarrierStats } from './hooks/useCarrierStats'
import { filterStats, type Filters } from './lib/carrierStats'
import { SummaryStats } from './components/SummaryStats'
import { PerformanceChart } from './components/PerformanceChart'
import { CarrierFilters } from './components/CarrierFilters'
import { CarrierCard } from './components/CarrierCard'

function App() {
  const { data, isPending, isError, error, refetch } = useCarrierStats()
  const [filters, setFilters] = useState<Filters>({ search: '', status: 'all' })

  // The API already returns carriers sorted by performance_score (desc),
  // so the index in the unfiltered list is the carrier's real rank.
  // We compute ranks before filtering so a filtered view still shows #1, #3, etc.
  const ranked = useMemo(
    () => (data ?? []).map((stat, index) => ({ stat, rank: index + 1 })),
    [data],
  )

  const visible = useMemo(() => {
    const allowed = new Set(filterStats(data ?? [], filters).map((s) => s.carrier))
    return ranked.filter(({ stat }) => allowed.has(stat.carrier))
  }, [data, filters, ranked])

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Carrier Dashboard</h1>
          <p className="text-sm text-slate-500">Delivery performance by shipping carrier</p>
        </header>

        {isPending && <p role="status" className="text-slate-500">Loading carrier stats…</p>}

        {isError && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <p className="font-semibold">Could not load carrier stats.</p>
            <p className="text-sm">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Try again
            </button>
          </div>
        )}

        {data && data.length === 0 && (
          <p className="text-slate-500">No carrier stats yet. Create some shipments first.</p>
        )}

        {data && data.length > 0 && (
          <>
            <SummaryStats stats={data} />
            <PerformanceChart stats={visible.map(({ stat }) => stat)} />
            <CarrierFilters filters={filters} onChange={setFilters} />

            {visible.length === 0 ? (
              <p className="text-slate-500">No carriers match your filters.</p>
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map(({ stat, rank }) => (
                  <CarrierCard key={stat.carrier} stat={stat} rank={rank} />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
