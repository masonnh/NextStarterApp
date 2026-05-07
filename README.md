# NextStarterApp

Lightweight Next.js starter with Supabase auth and Stripe payments.

## What this repo provides

- Written in TypeScript
- Next.js (app router) frontend with Tailwind + Shadcn.
- Supabase client + server helpers (auth + DB scaffolding).
- Google OAuth for one-click signups
- Prettier and ESLint for code formatting and correctness.

## In progress

- Stripe Checkout API route and a webhook route to verify events.
- GitHub Actions to automate the CI/CD pipeline

## Quickstart

1. Copy environment variables:

```bash
cp .env.example .env.local
# then edit .env.local with your keys
```

2. Install and run locally:

```bash
npm install
npm run dev
```

3. Open http://localhost:3000

## Required environment variables

See `.env.example` for the full list. Key ones:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BASE_URL` (e.g. `http://localhost:3000`)

## Supabase

- Client and server helpers live under `src/lib/supabase/`.
- Provide the public anon keys for client-side use and the service role key for server-only operations.

## Styling & Design System

- We use Tailwind and Shadcn for our UI

## CI / Formatting

- GitHub Actions workflow in `.github/workflows/ci.yml` runs build and basic checks.
- Formatting: `npm run format` (Prettier).
- Linting: `npm run lint:fix` (ESLint).

## Notes / Next steps

- Need to add Stripe support for tiered memberships
- Recommended deployment: Vercel. Set env vars in the Vercel dashboard and point the Stripe webhook to your production URL.
