type Carrier = {
  carrier: string
  success_rate: number
  avg_days: number
  total_shipments: number
  deliveries: number
  failures: number
  status: string
  performance_score: number
}

import { useEffect, useState } from "react"

function App() {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://shipping-api-2.onrender.com/stats/carriers")
      .then(res => res.json())
      .then(data => {
        console.log("DATA 👉", data)
        setCarriers(data)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚚 Carrier Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {carriers.map((c, index) => (
          <div
            key={c.carrier}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              width: "220px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h2>{c.carrier.toUpperCase()}</h2>

            <p>🥇 Rank: #{index + 1}</p>
            <p>📊 Success: {(c.success_rate * 100).toFixed(0)}%</p>
            <p>⚡ Avg Days: {c.avg_days}</p>

            <p>
              Status:{" "}
              <span
                style={{
                  color:
                    c.status === "excellent"
                      ? "green"
                      : c.status === "good"
                      ? "orange"
                      : "red",
                  fontWeight: "bold"
                }}
              >
                {c.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
