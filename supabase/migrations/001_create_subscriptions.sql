-- Create subscriptions table to store Stripe subscriptions linked to Supabase users
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  supabase_user_id uuid references auth.users(id) on delete cascade,
  stripe_subscription_id text not null,
  stripe_customer_id text,
  stripe_price_id text,
  stripe_product_id text,
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_subscriptions_supabase_user_id on subscriptions(supabase_user_id);
create index if not exists idx_subscriptions_stripe_subscription_id on subscriptions(stripe_subscription_id);
