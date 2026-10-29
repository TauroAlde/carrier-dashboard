import { filterStats, formatDays, formatPercent, summarize } from './carrierStats'
import { carrierStats } from '../test/fixtures'

describe('summarize', () => {
  it('weights the overall success rate by shipments', () => {
    // (96 + 40) / (100 + 50) = 0.9066…, not the simple average of 0.96, 0.8 and 0.
    expect(summarize(carrierStats).overallSuccessRate).toBeCloseTo(136 / 150)
  })

  it('picks the carrier with the highest performance score', () => {
    expect(summarize(carrierStats).bestCarrier).toBe('dhl')
  })

  it('handles an empty list without dividing by zero', () => {
    expect(summarize([])).toEqual({ totalShipments: 0, overallSuccessRate: 0, bestCarrier: null })
  })
})

describe('filterStats', () => {
  it('filters by search term, ignoring case and spaces', () => {
    const result = filterStats(carrierStats, { search: '  ESTA ', status: 'all' })
    expect(result.map((s) => s.carrier)).toEqual(['estafeta'])
  })

  it('filters by status', () => {
    const result = filterStats(carrierStats, { search: '', status: 'unknown' })
    expect(result.map((s) => s.carrier)).toEqual(['fedex'])
  })
})

describe('formatters', () => {
  it('formats rates as rounded percentages', () => {
    expect(formatPercent(0.956)).toBe('96%')
  })

  it('shows a dash when there is no delivery time yet', () => {
    expect(formatDays(null)).toBe('—')
    expect(formatDays(2.14)).toBe('2.1 d')
  })
})
