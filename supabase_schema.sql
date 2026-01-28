-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Public profile info for each user)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  role text default 'user', -- 'admin' or 'user'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table profiles enable row level security;

-- Policies for Profiles
-- Everyone can read profiles (to see team members)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Users can insert their own profile (usually triggered by a function, but good to have)
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Users can update own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- 2. LEADS TABLE
create table leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'new',
  name text not null,
  email text,
  phone text,
  value numeric,
  observations text,
  assigned_to uuid references profiles(id),
  user_id uuid references auth.users not null -- The creator
);

alter table leads enable row level security;

-- Policies for Leads
-- Everyone in the authenticated team can read/write leads (Simple CRM logic)
create policy "Enable access for authenticated users"
  on leads for all
  using ( auth.role() = 'authenticated' );

-- 3. INTERACTIONS TABLE
create table interactions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  lead_id uuid references leads(id) on delete cascade not null,
  type text default 'note',
  note text,
  user_id uuid references auth.users default auth.uid()
);

alter table interactions enable row level security;

create policy "Enable access for authenticated users"
  on interactions for all
  using ( auth.role() = 'authenticated' );

-- 4. TRIGGER TO CREATE PROFILE ON SIGNUP
-- This ensures every new user gets a row in 'profiles'
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. FUNCTION TO DELETE USER (Admin Only)
-- Note: Deleting from auth.users via SQL requires elevated privileges (Service Role)
-- usually done via the Supabase Dashboard or Admin API. 
-- For this demo, we rely on the Dashboard for user deletion.
