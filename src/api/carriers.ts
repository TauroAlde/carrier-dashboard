import type { CarrierStat } from '../types/carrier'

// Read the base URL from the environment so the same build can point to
// local, staging or production APIs without touching the code.
// Falls back to the deployed API so `npm run dev` works out of the box.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://shipping-api-2.onrender.com'

export async function fetchCarrierStats(): Promise<CarrierStat[]> {
  const response = await fetch(`${API_URL}/stats/carriers`)

  // fetch() only rejects on network errors; a 4xx/5xx still resolves,
  // so we have to check `ok` ourselves to surface it as an error.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<CarrierStat[]>
}
