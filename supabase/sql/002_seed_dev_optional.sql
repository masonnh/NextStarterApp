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

-- ----------
-- Optional feedback board seeds
-- ----------
-- Requires real auth users in auth.users. Replace the UUIDs first.
-- with demo_users as (
--   select
--     '<REQUEST_AUTHOR_UUID>'::uuid as request_author,
--     '<SECOND_USER_UUID>'::uuid as second_user
-- ), inserted_requests as (
--   insert into public.feature_requests (
--     title,
--     description,
--     author_id,
--     author_name
--   )
--   select
--     'Bulk edit customer attributes',
--     'Need a bulk action panel so admins can update lifecycle stage and owner in one pass.',
--     demo_users.request_author,
--     'Alex Developer'
--   from demo_users
--   returning id
-- )
-- insert into public.feature_request_votes (request_id, user_id, vote_value)
-- select
--   inserted_requests.id,
--   demo_users.second_user,
--   1
-- from inserted_requests
-- cross join demo_users
-- on conflict (request_id, user_id) do update set
--   vote_value = excluded.vote_value,
--   updated_at = now();
--
-- with target_request as (
--   select id
--   from public.feature_requests
--   where title = 'Bulk edit customer attributes'
--   order by id desc
--   limit 1
-- )
-- insert into public.feature_request_comments (request_id, author_id, author_name, content)
-- select
--   target_request.id,
--   '<SECOND_USER_UUID>'::uuid,
--   'Sam Builder',
--   'This would save us hours every week. A CSV import hook would be great too.'
-- from target_request;

commit;
