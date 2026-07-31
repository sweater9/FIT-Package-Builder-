# Global Holidayz FIT Package Builder

A production migration of the Global Holidayz FIT proposal experience.

## Current migration state

The existing customer proposal is preserved at `public/builder.html` and displayed through the Next.js application shell. This keeps the current experience working while persistent quotations, agent authentication and database-backed workflows are introduced.

## Stack

- Next.js 16 with TypeScript
- React 19
- Supabase PostgreSQL, Auth and Row Level Security
- Existing proposal UI retained during migration

## Local setup

1. Install Node.js 20.9 or newer.
2. Copy `.env.example` to `.env.local`.
3. Create a Supabase project.
4. Add the Supabase URL and anon key to `.env.local`.
5. Run the SQL migration in `supabase/migrations`.
6. Install and start:

```bash
npm install
npm run dev
```

Open http://localhost:3000. Health status is available at `/api/health`.

## Database foundation

The initial schema includes:

- Organizations and staff profiles
- Clients
- Permanent Global Holidayz quotation numbers
- Quote versions and immutable snapshots
- Day-by-day itinerary items
- Internal cost and customer selling price lines
- Customer change requests
- Customer approvals
- Public token-based proposal retrieval
- Organization-level Row Level Security

## Security

- Supplier costs are removed from the public quote response.
- Staff data is protected by organization membership policies.
- The service-role key must only be used on the server and must never be exposed with a `NEXT_PUBLIC_` prefix.
- Public proposals are retrieved through a limited database function using an unguessable token.

## Next implementation slice

- Staff sign-in and organization onboarding
- Client and quotation dashboard
- Create/edit quotation API
- Migrate the embedded builder state into React components
- Replace browser-only quote saving with database persistence
