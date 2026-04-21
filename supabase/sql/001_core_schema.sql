-- NextStarterApp core schema
-- Apply this first in every environment.

begin;

create extension if not exists pgcrypto;

-- ----------
-- Utilities
-- ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------
-- Growth funnels
-- ----------
create table if not exists public.waitlist_signups (
  id bigint generated always as identity primary key,
  email text not null,
  source text not null default 'waitlist-page',
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  check (position('@' in email) > 1)
);

-- Case-insensitive uniqueness by email.
create unique index if not exists waitlist_signups_email_lower_uidx
  on public.waitlist_signups (lower(email));

create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'contact-page',
  status text not null default 'new' check (status in ('new', 'reviewed', 'resolved')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(trim(name)) >= 2),
  check (char_length(trim(message)) >= 10),
  check (position('@' in email) > 1)
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- ----------
-- Feedback board
-- ----------
create table if not exists public.feature_requests (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  status text not null default 'open' check (status in ('open', 'planned', 'in-progress', 'completed', 'declined')),
  created_at timestamptz not null default now(),
  check (char_length(trim(title)) between 5 and 120),
  check (char_length(trim(description)) between 10 and 3000),
  check (char_length(trim(author_name)) between 2 and 80)
);

create index if not exists feature_requests_created_at_idx
  on public.feature_requests (created_at desc);

create index if not exists feature_requests_status_idx
  on public.feature_requests (status);

create table if not exists public.feature_request_votes (
  id bigint generated always as identity primary key,
  request_id bigint not null references public.feature_requests(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote_value smallint not null check (vote_value in (-1, 1)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (request_id, user_id)
);

create index if not exists feature_request_votes_request_id_idx
  on public.feature_request_votes (request_id);

create index if not exists feature_request_votes_user_id_idx
  on public.feature_request_votes (user_id);

create table if not exists public.feature_request_comments (
  id bigint generated always as identity primary key,
  request_id bigint not null references public.feature_requests(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now(),
  check (char_length(trim(author_name)) between 2 and 80),
  check (char_length(trim(content)) between 2 and 2000)
);

create index if not exists feature_request_comments_request_id_created_at_idx
  on public.feature_request_comments (request_id, created_at asc);

-- ----------
-- Triggers
-- ----------
drop trigger if exists contact_submissions_set_updated_at on public.contact_submissions;
create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row
execute function public.set_updated_at();

drop trigger if exists feature_request_votes_set_updated_at on public.feature_request_votes;
create trigger feature_request_votes_set_updated_at
before update on public.feature_request_votes
for each row
execute function public.set_updated_at();

-- ----------
-- RLS
-- ----------
alter table public.waitlist_signups enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.feature_requests enable row level security;
alter table public.feature_request_votes enable row level security;
alter table public.feature_request_comments enable row level security;

-- waitlist_signups: public insert allowed (supports anonymous waitlist form).
drop policy if exists waitlist_signups_insert_public on public.waitlist_signups;
create policy waitlist_signups_insert_public
on public.waitlist_signups
for insert
to anon, authenticated
with check (true);

-- waitlist_signups: service role read/manage.
drop policy if exists waitlist_signups_service_role_manage on public.waitlist_signups;
create policy waitlist_signups_service_role_manage
on public.waitlist_signups
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- contact_submissions: public insert allowed (supports anonymous contact form).
drop policy if exists contact_submissions_insert_public on public.contact_submissions;
create policy contact_submissions_insert_public
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

-- contact_submissions: service role read/manage.
drop policy if exists contact_submissions_service_role_manage on public.contact_submissions;
create policy contact_submissions_service_role_manage
on public.contact_submissions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- feature_requests: public read for board visibility.
drop policy if exists feature_requests_select_public on public.feature_requests;
create policy feature_requests_select_public
on public.feature_requests
for select
to anon, authenticated
using (true);

-- feature_requests: authenticated users can create their own requests.
drop policy if exists feature_requests_insert_authenticated on public.feature_requests;
create policy feature_requests_insert_authenticated
on public.feature_requests
for insert
to authenticated
with check (author_id = auth.uid());

-- feature_requests: service role can manage.
drop policy if exists feature_requests_service_role_manage on public.feature_requests;
create policy feature_requests_service_role_manage
on public.feature_requests
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- feature_request_votes: public read for aggregate counts.
drop policy if exists feature_request_votes_select_public on public.feature_request_votes;
create policy feature_request_votes_select_public
on public.feature_request_votes
for select
to anon, authenticated
using (true);

-- feature_request_votes: authenticated users can write their own votes.
drop policy if exists feature_request_votes_insert_authenticated on public.feature_request_votes;
create policy feature_request_votes_insert_authenticated
on public.feature_request_votes
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists feature_request_votes_update_authenticated on public.feature_request_votes;
create policy feature_request_votes_update_authenticated
on public.feature_request_votes
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists feature_request_votes_delete_authenticated on public.feature_request_votes;
create policy feature_request_votes_delete_authenticated
on public.feature_request_votes
for delete
to authenticated
using (user_id = auth.uid());

-- feature_request_votes: service role can manage.
drop policy if exists feature_request_votes_service_role_manage on public.feature_request_votes;
create policy feature_request_votes_service_role_manage
on public.feature_request_votes
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

-- feature_request_comments: public read for thread visibility.
drop policy if exists feature_request_comments_select_public on public.feature_request_comments;
create policy feature_request_comments_select_public
on public.feature_request_comments
for select
to anon, authenticated
using (true);

-- feature_request_comments: authenticated users can post comments.
drop policy if exists feature_request_comments_insert_authenticated on public.feature_request_comments;
create policy feature_request_comments_insert_authenticated
on public.feature_request_comments
for insert
to authenticated
with check (author_id = auth.uid());

-- feature_request_comments: service role can manage.
drop policy if exists feature_request_comments_service_role_manage on public.feature_request_comments;
create policy feature_request_comments_service_role_manage
on public.feature_request_comments
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

commit;
