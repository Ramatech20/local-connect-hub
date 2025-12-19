-- Supabase schema for Local Connect Hub (basic)

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  name text,
  role text,
  phone text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  business_name text,
  description text,
  location jsonb,
  verified boolean default false,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references providers(id) on delete cascade,
  title text,
  description text,
  price numeric,
  duration_minutes int,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  provider_id uuid references providers(id) on delete cascade,
  customer_id uuid references users(id) on delete set null,
  start_time timestamptz,
  end_time timestamptz,
  status text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  tx_ref text,
  status text,
  amount numeric,
  provider_cut numeric,
  provider_id uuid references providers(id),
  raw jsonb,
  received_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  customer_id uuid references users(id) on delete set null,
  rating int,
  comment text,
  created_at timestamptz default now()
);
