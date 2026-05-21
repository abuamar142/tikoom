# Tikoom - Project Context

A modern authentication system built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.0.0 (App Router) | React framework |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| pnpm | 10.33.4 | Package manager |
| Node.js | 22.x | Runtime |
| Supabase | latest | Backend/auth |
| React Hook Form | 7.x | Form handling |
| Yup | 1.x | Form validation |
| Lucide React | latest | Icons |

## Architecture Patterns

### Atomic Design Methodology
Components are organized using Atomic Design principles:
- **atoms/** - Basic building blocks (Button, Input, Card, Spinner)
- **molecules/** - Composite components (not yet implemented)
- **organisms/** - Complex UI sections (not yet implemented)

### Separation of Concerns
- **UI Layer**: `src/components/` - Dumb, reusable components
- **Business Logic**: `src/hooks/` - Custom hooks per feature
- **Data Layer**: `src/services/` - API calls and config
- **Types**: `src/interfaces/` + `src/types/` - Type definitions

### State Management Strategy
- **Server State**: TanStack React Query (planned) / Supabase realtime
- **Client State**: React Hook Form for forms
- **Auth State**: Supabase Auth + middleware session validation

## Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + metadata + ToastContainer
│   ├── loading.tsx         # Global loading UI
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Redirects to /login
│   ├── login/
│   │   ├── layout.tsx      # Login metadata (Server Component)
│   │   └── page.tsx        # Login form (Client Component)
│   └── dashboard/
│       └── page.tsx        # Protected dashboard (Server Component)
├── components/
│   └── atoms/
│       ├── Button/         # Variant system: primary/secondary/outline/ghost/danger
│       ├── Card/           # Variants: default/glass/elevated
│       ├── Input/          # With label, error, leftIcon, password toggle
│       └── Spinner/        # Size variants: xs/sm/md/lg/xl
├── hooks/
│   └── auth/
│       ├── useAuth.ts      # Auth state + onAuthStateChange listener
│       └── useLogin.ts     # Login mutation with loading/error states
├── interfaces/
│   └── auth.ts             # LoginCredentials, User, AuthState
├── services/
│   ├── api/
│   │   └── auth.ts         # Server Actions: login, logout, getSession, getUser
│   └── config/
│       └── supabase.ts     # Browser & Server client factories
├── types/
│   └── global.d.ts         # CSS/SCSS module declarations
└── utils/
    ├── cn.ts               # clsx + tailwind-merge utility
    └── environment.ts      # Environment detection helpers

supabase/
├── migrations/             # Database migrations (versioned SQL files)
│   ├── YYYYMMDDHHMMSS_create_rbac_schema.sql
│   └── YYYYMMDDHHMMSS_create_custom_access_token_hook.sql
├── config.toml             # Supabase CLI configuration
└── seed.sql                # Seed data for local development
```

## Path Aliases

Configured in `tsconfig.json`:

| Alias | Maps to |
|-------|---------|
| `@/*` | `./src/*` |
| `@assets/*` | `./src/assets/*` |
| `@components/*` | `./src/components/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@interfaces/*` | `./src/interfaces/*` |
| `@services/*` | `./src/services/*` |
| `@store/*` | `./src/store/*` |
| `@types/*` | `./src/types/*` |
| `@utils/*` | `./src/utils/*` |

## Code Conventions

### Component Structure
- Use `forwardRef` for atoms that wrap HTML elements
- Export components with `displayName` for DevTools
- Variants defined as objects (e.g., `variants[variant]`, `sizes[size]`)
- Use `cn()` utility for conditional className merging

### Form Pattern
```tsx
// Client Component form
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
});

// Server Action for form submission
// Located in src/services/api/auth.ts
```

### Metadata Pattern
- **Never** export `metadata` from a `"use client"` file
- Use separate `layout.tsx` for page-specific metadata
- Root metadata uses template: `"%s | Tikoom"`

### Auth Pattern
- **Browser**: `createBrowserSupabaseClient()` for client-side auth
- **Server**: `createServerSupabaseClient()` for Server Components/Actions
- **Middleware**: `@supabase/ssr` cookie-based session validation
- Protected routes redirect to `/login`, authenticated users redirected from `/login` to `/dashboard`

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (defaults to development)
NEXT_PUBLIC_APP_ENV=development|staging|production
```

## Commands

```bash
# Node version
nvm use

# Dependencies
pnpm install

# Development
pnpm dev          # http://localhost:4000

# Production build
pnpm build
pnpm start

# Linting
pnpm lint

# Docker
docker build -t tikoom .
docker run -p 8080:8080 tikoom
```

## Security Configuration

Configured in `next.config.ts`:
- `poweredByHeader: false` - Hides Next.js signature
- `compiler.removeConsole` - Removes console.log in production
- Security headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy

## Database Migrations

All database schema changes **must** go through migrations. Never modify schema manually via SQL console.

### Workflow

```bash
# Create a new migration
pnpm supabase migration new nama_migration

# Edit the generated file in supabase/migrations/

# Reset database and apply all migrations + seed
pnpm supabase db reset

# Check current migration status
pnpm supabase migration list

# Generate migration from schema diff
pnpm supabase db diff -f nama_migration
```

### Migration Rules

- Use `IF NOT EXISTS` / `IF EXISTS` for idempotency (migrations run on db reset)
- One migration per logical change (e.g., create table, add RLS, create function)
- Name migrations descriptively: `create_profiles_table`, `add_categories_rls`
- Always include RLS policies in the same migration as table creation
- Seed data goes in `supabase/seed.sql`

## RBAC Architecture

This project implements Role-Based Access Control (RBAC) using Supabase custom claims.

### How It Works

1. **User Registration** → User signs up via Supabase Auth (stored in `auth.users`)
2. **Role Assignment** → Super admin assigns roles via `public.user_roles` table
3. **Login Hook** → `custom_access_token_hook` injects user roles into JWT claims
4. **API Requests** → JWT contains `app_metadata.user_roles` array
5. **RLS Enforcement** → Postgres RLS policies check `auth.jwt()->'app_metadata'->'user_roles'`

### Roles

| Role | Permissions |
|------|-------------|
| `super_admin` | Full access. Manage users, roles, categories. Can delete. |
| `admin` | Manage categories (CRUD except delete). Read roles. |
| `user` | Standard access. Cannot access categories. |

### Adding a New Protected Table

```sql
-- 1. Create table
CREATE TABLE public.my_table (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.my_table ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Admins can view my_table"
    ON public.my_table
    FOR SELECT
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ?| array['super_admin', 'admin']
    );

-- 4. Grant permissions
GRANT ALL ON public.my_table TO authenticated;
```

### Assigning Roles to Users

```sql
-- Via SQL (e.g., in seed or manually)
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

## When Working on This Project

### DO
- Follow Atomic Design for new components
- Place business logic in hooks, not components
- Use Server Components by default (add `"use client"` only when needed)
- Validate forms with React Hook Form + Yup
- Use `cn()` for className composition
- Export metadata from layout.tsx, not page.tsx

### DON'T
- Mix UI and data fetching in the same component
- Use `use client` in files that export metadata
- Skip type definitions for props
- Use `any` type without justification
- Add console.log in production code
