create extension if not exists pgcrypto;

create type public.quote_status as enum (
  'draft', 'published', 'viewed', 'changes_requested',
  'revised', 'approved', 'booked', 'cancelled'
);

create type public.request_status as enum ('open', 'in_progress', 'resolved', 'declined');

create type public.pricing_basis as enum (
  'per_booking', 'per_person', 'per_adult', 'per_child',
  'per_infant', 'per_room_night', 'per_vehicle', 'included'
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  default_currency char(3) not null default 'AED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  role text not null default 'agent' check (role in ('owner', 'manager', 'agent', 'viewer')),
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence public.quote_number_seq;

create or replace function public.next_quote_number()
returns text
language sql
volatile
as $$
  select 'GH-' || to_char(current_date, 'YYYY') || '-' ||
         lpad(nextval('public.quote_number_seq')::text, 6, '0')
$$;

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  quote_number text not null unique default public.next_quote_number(),
  title text not null,
  destination text not null,
  start_date date not null,
  end_date date not null,
  adults integer not null default 2 check (adults > 0),
  children integer not null default 0 check (children >= 0),
  infants integer not null default 0 check (infants >= 0),
  rooms integer not null default 1 check (rooms > 0),
  currency char(3) not null default 'AED',
  status public.quote_status not null default 'draft',
  current_version integer not null default 1,
  public_token uuid not null unique default gen_random_uuid(),
  expires_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_travel_dates check (end_date > start_date)
);

create table public.quote_versions (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  version_number integer not null,
  snapshot jsonb not null default '{}'::jsonb,
  subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  change_note text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (quote_id, version_number)
);

create table public.itinerary_days (
  id uuid primary key default gen_random_uuid(),
  quote_version_id uuid not null references public.quote_versions(id) on delete cascade,
  day_number integer not null check (day_number > 0),
  travel_date date,
  title text not null,
  description text,
  sort_order integer not null default 0,
  unique (quote_version_id, day_number)
);

create table public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references public.itinerary_days(id) on delete cascade,
  item_type text not null check (item_type in (
    'arrival', 'departure', 'hotel', 'activity', 'transfer',
    'meal', 'car_rental', 'visa', 'insurance', 'note'
  )),
  time_label text,
  title text not null,
  description text,
  supplier_name text,
  confirmation_status text,
  included boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0
);

create table public.price_lines (
  id uuid primary key default gen_random_uuid(),
  quote_version_id uuid not null references public.quote_versions(id) on delete cascade,
  category text not null,
  description text not null,
  pricing_basis public.pricing_basis not null,
  quantity numeric(12,2) not null default 1,
  unit_cost numeric(14,2) not null default 0,
  unit_sell numeric(14,2) not null default 0,
  cost_total numeric(14,2) generated always as (quantity * unit_cost) stored,
  sell_total numeric(14,2) generated always as (quantity * unit_sell) stored,
  customer_visible boolean not null default true,
  sort_order integer not null default 0
);

create table public.change_requests (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  status public.request_status not null default 'open',
  category text,
  message text not null,
  customer_name text,
  customer_email text,
  resolved_by uuid references auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  quote_version integer not null,
  approved_by_name text not null,
  approved_by_email text,
  approval_ip inet,
  approved_at timestamptz not null default now(),
  unique (quote_id, quote_version)
);

create index quotes_organization_idx on public.quotes(organization_id);
create index quotes_client_idx on public.quotes(client_id);
create index quote_versions_quote_idx on public.quote_versions(quote_id);
create index itinerary_days_version_idx on public.itinerary_days(quote_version_id);
create index itinerary_items_day_idx on public.itinerary_items(itinerary_day_id);
create index price_lines_version_idx on public.price_lines(quote_version_id);
create index change_requests_quote_idx on public.change_requests(quote_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_touch_updated_at
before update on public.organizations
for each row execute function public.touch_updated_at();

create trigger clients_touch_updated_at
before update on public.clients
for each row execute function public.touch_updated_at();

create trigger quotes_touch_updated_at
before update on public.quotes
for each row execute function public.touch_updated_at();

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and organization_id = target_org
  )
$$;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_versions enable row level security;
alter table public.itinerary_days enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.price_lines enable row level security;
alter table public.change_requests enable row level security;
alter table public.approvals enable row level security;

create policy "members read organization"
on public.organizations for select
using (public.is_org_member(id));

create policy "members read profiles"
on public.profiles for select
using (public.is_org_member(organization_id));

create policy "members manage clients"
on public.clients for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "members manage quotes"
on public.quotes for all
using (public.is_org_member(organization_id))
with check (public.is_org_member(organization_id));

create policy "members manage quote versions"
on public.quote_versions for all
using (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
);

create policy "members manage itinerary days"
on public.itinerary_days for all
using (
  exists (
    select 1 from public.quote_versions v
    join public.quotes q on q.id = v.quote_id
    where v.id = quote_version_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.quote_versions v
    join public.quotes q on q.id = v.quote_id
    where v.id = quote_version_id and public.is_org_member(q.organization_id)
  )
);

create policy "members manage itinerary items"
on public.itinerary_items for all
using (
  exists (
    select 1 from public.itinerary_days d
    join public.quote_versions v on v.id = d.quote_version_id
    join public.quotes q on q.id = v.quote_id
    where d.id = itinerary_day_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.itinerary_days d
    join public.quote_versions v on v.id = d.quote_version_id
    join public.quotes q on q.id = v.quote_id
    where d.id = itinerary_day_id and public.is_org_member(q.organization_id)
  )
);

create policy "members manage price lines"
on public.price_lines for all
using (
  exists (
    select 1 from public.quote_versions v
    join public.quotes q on q.id = v.quote_id
    where v.id = quote_version_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.quote_versions v
    join public.quotes q on q.id = v.quote_id
    where v.id = quote_version_id and public.is_org_member(q.organization_id)
  )
);

create policy "members manage change requests"
on public.change_requests for all
using (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
);

create policy "members manage approvals"
on public.approvals for all
using (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
)
with check (
  exists (
    select 1 from public.quotes q
    where q.id = quote_id and public.is_org_member(q.organization_id)
  )
);

create or replace function public.get_public_quote(token uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'quote', to_jsonb(q) - 'public_token' - 'created_by',
    'version', to_jsonb(v),
    'days', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'day', to_jsonb(d),
          'items', coalesce((
            select jsonb_agg(to_jsonb(i) order by i.sort_order, i.id)
            from public.itinerary_items i
            where i.itinerary_day_id = d.id
          ), '[]'::jsonb)
        )
        order by d.day_number
      )
      from public.itinerary_days d
      where d.quote_version_id = v.id
    ), '[]'::jsonb),
    'prices', coalesce((
      select jsonb_agg(
        to_jsonb(p) - 'unit_cost' - 'cost_total'
        order by p.sort_order, p.id
      )
      from public.price_lines p
      where p.quote_version_id = v.id and p.customer_visible
    ), '[]'::jsonb)
  )
  from public.quotes q
  join public.quote_versions v
    on v.quote_id = q.id and v.version_number = q.current_version
  where q.public_token = token
    and q.status in ('published', 'viewed', 'changes_requested', 'revised', 'approved')
    and (q.expires_at is null or q.expires_at > now())
$$;

revoke all on function public.get_public_quote(uuid) from public;
grant execute on function public.get_public_quote(uuid) to anon, authenticated;
