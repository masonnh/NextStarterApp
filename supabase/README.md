# Supabase Database Template

This folder contains environment-portable SQL templates for NextStarterApp.

## Files

- [supabase/sql/001_core_schema.sql](supabase/sql/001_core_schema.sql)
  - Creates all baseline tables used by the app right now.
  - Enables RLS and adds starter policies.
  - Adds useful indexes and update triggers.
- [supabase/sql/002_seed_dev_optional.sql](supabase/sql/002_seed_dev_optional.sql)
  - Optional sample records for local/dev testing.
  - Safe to skip in staging/prod.

## Current app table dependencies

- `public.waitlist_signups`
  - Written by waitlist form server action.
- `public.contact_submissions`
  - Written by contact form server action.

## How to apply in a Supabase project

1. Open Supabase SQL editor for your target project.
2. Run [supabase/sql/001_core_schema.sql](supabase/sql/001_core_schema.sql).
3. Optional (dev only): run [supabase/sql/002_seed_dev_optional.sql](supabase/sql/002_seed_dev_optional.sql).

## Recommended migration workflow while app is evolving

1. Keep `001_core_schema.sql` as your canonical baseline template.
2. For each schema change, create a new numbered SQL file in `supabase/sql/`:
   - Example: `003_add_feature_flags.sql`
3. Prefer additive changes when possible:
   - Add nullable columns first, then backfill, then tighten constraints.
4. Keep destructive changes (drop/rename) in separate, explicit migration files.
5. Re-run in fresh environments from 001 upward to verify reproducibility.

## Notes on RLS policies

- Public insert is enabled for waitlist/contact submissions (to support non-auth form usage).
- Consider adding anti-spam controls for production:
  - rate limits, captcha, honeypots, or Edge Function validation.
- Management policies are scoped to `service_role` for admin-style operations.
