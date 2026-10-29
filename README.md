# Carrier Dashboard

A React dashboard that shows delivery performance by shipping carrier: success rate, average delivery time, failures and an overall performance score. It consumes the `/stats/carriers` endpoint of [shipping_api_2](https://github.com/TauroAlde/shipping_api_2), a Rails API that integrates with Skydropx.

## Features

- Summary of total shipments, overall success rate and top performer
- Bar chart of success rate by carrier
- Search and status filters (ranks are preserved while filtering)
- Loading, empty and error states, with a retry button
- Responsive layout

## Tech stack

- **React 19 + TypeScript**, built with **Vite**
- **TanStack Query** for data fetching, caching and request state
- **Tailwind CSS v4** for styling
- **Recharts** for the chart
- **Vitest + Testing Library** for unit and component tests

## Getting started

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env   # optional: point to another API
npm run dev
```

The app runs at http://localhost:5173.

### Environment variables

| Variable       | Description                              | Default                               |
| -------------- | ---------------------------------------- | ------------------------------------- |
| `VITE_API_URL` | Base URL of the API (no trailing slash)  | `https://shipping-api-2.onrender.com` |

## Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Start the dev server            |
| `npm test`           | Run the test suite once         |
| `npm run test:watch` | Run tests in watch mode         |
| `npm run lint`       | Lint the project with ESLint    |
| `npm run build`      | Type-check and build for production |

## Project structure

```
src/
├── api/          # HTTP calls to the backend
├── components/   # Presentational components (cards, chart, filters…)
├── hooks/        # React Query hooks
├── lib/          # Pure functions: formatting, filtering, summaries
├── test/         # Test setup and fixtures
└── types/        # Types that mirror the API contract
```

Business logic lives in `src/lib` as pure functions, so it can be tested without rendering components.

## API contract

`GET /stats/carriers` returns carriers sorted by `performance_score` (descending):

```json
[
  {
    "carrier": "dhl",
    "success_rate": 0.96,
    "avg_days": 2.1,
    "total_shipments": 100,
    "deliveries": 96,
    "failures": 4,
    "status": "excellent",
    "performance_score": 0.81
  }
]
```

`status` is one of `excellent`, `good`, `warning`, `bad` or `unknown`. `avg_days` is `null` when a carrier has no delivered shipments yet.
