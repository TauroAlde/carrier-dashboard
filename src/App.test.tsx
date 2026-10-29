import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { carrierStats } from './test/fixtures'

function renderApp() {
  // A fresh client per test so cached data never leaks between tests,
  // and no retries so error tests fail fast instead of waiting on backoff.
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>,
  )
}

function mockFetch(response: Partial<Response>) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, ...response }))
}

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('shows the carriers once the API responds (regression: used to stay on "Loading")', async () => {
    mockFetch({ json: () => Promise.resolve(carrierStats) })
    renderApp()

    expect(screen.getByRole('status')).toHaveTextContent(/loading/i)
    expect(await screen.findByRole('article', { name: 'dhl' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows an error with a retry button when the API fails', async () => {
    mockFetch({ ok: false, status: 500 })
    renderApp()

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('status 500')
    expect(within(alert).getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('keeps the original rank when filtering', async () => {
    mockFetch({ json: () => Promise.resolve(carrierStats) })
    renderApp()
    await screen.findByRole('article', { name: 'dhl' })

    await userEvent.type(screen.getByPlaceholderText(/search carrier/i), 'estafeta')

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('#2')
  })

  it('notes user cancellations without counting them as failures', async () => {
    mockFetch({ json: () => Promise.resolve(carrierStats) })
    renderApp()

    const estafeta = await screen.findByRole('article', { name: 'estafeta' })
    expect(estafeta).toHaveTextContent('3 cancelled by the user')
    // Carriers with no cancellations don't show the note at all.
    expect(screen.getByRole('article', { name: 'dhl' })).not.toHaveTextContent('cancelled')
  })
})
