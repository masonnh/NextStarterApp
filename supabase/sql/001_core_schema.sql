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
-- Triggers
-- ----------
drop trigger if exists contact_submissions_set_updated_at on public.contact_submissions;
create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row
execute function public.set_updated_at();

-- ----------
-- RLS
-- ----------
alter table public.waitlist_signups enable row level security;
alter table public.contact_submissions enable row level security;

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

commit;
