-- ToolLocker schema. Run once in the Supabase SQL editor.
-- One workshop owner per account; RLS keeps every owner to their own rows.

create table if not exists public.loans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool_name text not null check (char_length(tool_name) between 1 and 100),
  borrower_name text not null check (char_length(borrower_name) between 1 and 100),
  phone text not null check (char_length(phone) between 1 and 30),
  borrow_date date not null,
  expected_date date not null,
  return_date date,
  created_at timestamptz not null default now()
);

alter table public.loans enable row level security;

drop policy if exists "owners manage own loans" on public.loans;
create policy "owners manage own loans" on public.loans
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
