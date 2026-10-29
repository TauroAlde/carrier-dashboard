import '@testing-library/jest-dom/vitest'

// Recharts' ResponsiveContainer needs ResizeObserver, which jsdom doesn't implement.
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
