# NextStarterApp
Lightweight Next.js starter with Supabase auth and Stripe payments.

## What this repo provides
- Next.js (app router) frontend with Tailwind + a simple Shadcn-style UI component.
- Supabase client + server helpers (auth + DB scaffolding).
- Stripe Checkout API route and a webhook route to verify events.
- Design tokens and global styles in `src/styles/style.css` (dark-mode-first).
- Prettier and a GitHub Actions CI workflow.

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
- `NEXT_PUBLIC_SUPABASE_URL_DEV` / `NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_BASE_URL_DEV` (e.g. `http://localhost:3000`)

## Stripe
- Checkout: The app exposes `POST /api/stripe/checkout` to create a Checkout Session (send `priceId`).
- Webhook: `POST /api/stripe/webhook` verifies `stripe-signature` with `STRIPE_WEBHOOK_SECRET` and handles `checkout.session.completed` (scaffolded). Configure this endpoint in your Stripe dashboard or use `stripe listen` during development.

Example to test webhooks locally with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Supabase
- Client and server helpers live under `src/lib/supabase/`.
- Provide the public anon keys for client-side use and the service role key for server-only operations.

## Styling & Design System
- Design tokens are in `src/styles/style.css`. Dark-mode is default; `light-mode` class toggles light theme.
- Tailwind is configured in `tailwind.config.cjs` and used across components.

## CI / Formatting
- GitHub Actions workflow in `.github/workflows/ci.yml` runs build and basic checks.
- Formatting: `npm run format` (Prettier).

## Notes / Next steps
- Supabase and Stripe are scaffolded but the webhook handler currently logs events — implement persistence (e.g., create subscription records in Supabase) as needed.
- ESLint was removed from the repo to avoid local engine/peer warnings; you can enable linting in your editor or re-add ESLint later.
- Recommended deployment: Vercel. Set env vars in the Vercel dashboard and point the Stripe webhook to your production URL.
