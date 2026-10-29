import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { CarrierStat } from '../types/carrier'

export function PerformanceChart({ stats }: { stats: CarrierStat[] }) {
  // Recharts reads plain objects, so we shape the data here instead of
  // leaking chart concerns into the API types.
  const data = stats.map((s) => ({
    carrier: s.carrier.toUpperCase(),
    success: Math.round(s.success_rate * 100),
  }))

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Success rate by carrier</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="carrier" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Success']} />
            <Bar dataKey="success" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
