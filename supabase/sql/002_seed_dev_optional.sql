-- Optional dev seed data for NextStarterApp
-- Run this only in development/test environments.

begin;

-- ----------
-- Seed waitlist signups
-- ----------
insert into public.waitlist_signups (email, source, metadata)
values
  ('alex.dev@example.com', 'waitlist-page', '{"env":"dev"}'::jsonb),
  ('sam.builder@example.com', 'waitlist-page', '{"env":"dev"}'::jsonb),
  ('jordan.pm@example.com', 'waitlist-page', '{"env":"dev"}'::jsonb)
on conflict ((lower(email))) do nothing;

-- ----------
-- Seed contact submissions
-- ----------
insert into public.contact_submissions (name, email, message, source, status, metadata)
values
  (
    'Alex Developer',
    'alex.dev@example.com',
    'Love the starter. Curious if Stripe examples are planned in the next milestone.',
    'contact-page',
    'new',
    '{"env":"dev"}'::jsonb
  ),
  (
    'Sam Builder',
    'sam.builder@example.com',
    'We are evaluating this for a client project and need guidance on multi-tenant patterns.',
    'contact-page',
    'reviewed',
    '{"env":"dev"}'::jsonb
  );

commit;
