# NextStarterApp

NextStarterApp is a Next.js app router starter built with Supabase, Tailwind CSS, and shadcn/ui. The current codebase includes a marketing landing page, Google OAuth login, a protected profile route, and Supabase-backed contact, waitlist, and feedback flows.

## Getting Started

### Prerequisites

- Node.js
- npm
- A Supabase project

### Setup

Copy the example environment file and fill in your values:

```bash
copy .env.example .env.local
```

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Open http://localhost:3000.

## Features

- Next.js 16 app router frontend written in TypeScript.
- Landing page composed from reusable section components.
- Google OAuth login through Supabase.
- Protected profile route guarded by the app proxy.
- Feedback board with feature requests, voting, commenting, sorting, filtering, and search.
- Contact form that stores submissions in Supabase.
- Waitlist signup form that stores email addresses in Supabase.
- Legal pages for privacy and terms.
- Shared UI primitives built with shadcn/ui and Radix components.

## Application Secrets and Environment Variables

The example environment file is [`.env.example`](.env.example).

Required values for the current app:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Google OAuth is configured through Supabase. See [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) for the provider setup flow.

## Scripts

Available npm scripts from [package.json](package.json):

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
npm run format
npm run typecheck
```

## Project Structure

```text
src/
|-- app/                 # Routes, pages, and server actions
|   |-- auth/callback    # OAuth callback route
|   |-- contact          # Contact form page and action
|   |-- feedback         # Feedback board page and actions
|   |-- login            # Google login page
|   |-- profile          # Protected profile page
|   |-- waitlist         # Waitlist page and action
|   |-- (legal)          # Privacy and terms pages
|-- components/          # Layout, auth, landing, and UI components
|-- lib/supabase/        # Supabase client, server, and middleware helpers
|-- proxy.ts             # Auth session refresh and route protection
supabase/sql/            # Database schema and seed SQL
```

## Supabase Data Model

The core schema is defined in [supabase/sql/001_core_schema.sql](supabase/sql/001_core_schema.sql).

It currently creates these tables:

- `waitlist_signups`
- `contact_submissions`
- `feature_requests`
- `feature_request_votes`
- `feature_request_comments`

The schema also enables row-level security and defines policies for the current form and feedback flows.

## Route Overview

- `/` renders the landing page.
- `/login` starts Google OAuth sign-in.
- `/auth/callback` exchanges the OAuth code for a Supabase session and redirects to `/profile`.
- `/profile` is protected and redirects unauthenticated users to `/login`.
- `/contact` submits contact messages to Supabase.
- `/waitlist` saves waitlist emails to Supabase.
- `/feedback` loads the feedback board and its related data from Supabase.
- `/comingsoon` exists as a standalone page.
- `/privacy` and `/terms` are available under the legal route group.

## Current Notes

- The login flow uses Google via Supabase, not a local email/password auth flow.
- The profile page is currently a placeholder.
- Stripe billing and CI/CD automation will be added in the future.
