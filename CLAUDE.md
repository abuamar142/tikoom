# Tikoom - Project Context

A modern authentication system built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.x (App Router) | React framework |
| React | 19 | UI library |
| React Compiler | Experimental | Auto-memoization |
| TypeScript | 6.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| pnpm | 10.33.4 | Package manager |
| Node.js | 22.x | Runtime |
| Supabase | latest | Backend/auth |
| TanStack Query | 5.x | Server state caching |
| React Hook Form | 7.x | Form handling |
| Yup | 1.x | Form validation |
| Lucide React | latest | Icons |
| Vitest | 4.x | Unit testing |
| @vercel/analytics | latest | Web analytics |
| @vercel/speed-insights | latest | Performance monitoring |

## Architecture Patterns

### Atomic Design Methodology
Components are organized using Atomic Design principles:
- **atoms/** - Basic building blocks (Button, Input, Card, Spinner, Badge, Modal, JsonLd)
- **molecules/** - Composite components (AuthLayout, LoginFormFields, RegisterFormFields, EventCard, ConfirmDialog, DashboardHeader, SocialAuthButtons)
- **organisms/** - Complex UI sections (Dashboard, Footer, Navbar, LandingHero, LandingCategories, LandingEvents, Login, Register)

### Route Groups (Next.js App Router)
- **(auth)/** - Public authentication pages (login, register, forgot-password, reset-password, verify-email)
- **(public)/** - Public landing pages
- **admin/(public)/** - Public admin login
- **admin/(auth)/** - Protected admin routes (dashboard, categories, users)

### Separation of Concerns
- **UI Layer**: `src/components/` - Dumb, reusable components
- **Business Logic**: `src/hooks/` - Custom hooks per feature (TanStack Query hooks)
- **Data Layer**: `src/services/` - API calls and config
- **Types**: `src/interfaces/` + `src/types/` - Type definitions

### State Management Strategy
- **Server State**: TanStack React Query (active) - Caching, background refetch, mutations
- **Client State**: React Hook Form for forms
- **Auth State**: Supabase Auth + middleware session validation

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + metadata + providers
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Root error boundary
│   ├── global-error.tsx          # Global error boundary
│   ├── page.tsx                  # Redirects to /login
│   ├── (auth)/                   # Public auth routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (public)/                 # Public landing routes
│   ├── dashboard/                # Protected user dashboard
│   ├── admin/
│   │   ├── (public)/             # Public admin login
│   │   │   └── login/
│   │   └── (auth)/               # Protected admin routes
│   │       ├── page.tsx          # Admin dashboard
│   │       ├── categories/
│   │       ├── users/
│   │       ├── layout.tsx        # Auth check + AdminShell
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── robots.ts                 # robots.txt generation
│   ├── sitemap.ts                # sitemap.xml generation
│   ├── manifest.ts               # PWA manifest
│   ├── opengraph-image.tsx       # Dynamic OG image
│   └── twitter-image.tsx         # Dynamic Twitter image
├── components/
│   ├── admin/
│   │   └── AdminShell.tsx
│   ├── atoms/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── JsonLd/
│   │   ├── Modal/
│   │   └── Spinner/
│   ├── molecules/
│   │   ├── AuthBranding/
│   │   ├── AuthErrorAlert/
│   │   ├── AuthFormContainer/
│   │   ├── AuthLayout/
│   │   ├── ConfirmDialog/
│   │   ├── DashboardHeader/
│   │   ├── EventCard/
│   │   ├── LoginFormFields/
│   │   ├── ProfileCard/
│   │   ├── RegisterFormFields/
│   │   ├── SectionHeader/
│   │   ├── SecurityCard/
│   │   ├── SocialAuthButtons/
│   │   └── VerifyEmailContent/
│   ├── organisms/
│   │   ├── Dashboard/
│   │   ├── Footer/
│   │   ├── LandingCategories/
│   │   ├── LandingEvents/
│   │   ├── LandingHero/
│   │   ├── LandingHowItWorks/
│   │   ├── LandingSearch/
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── Register/
│   │   └── VerifyEmail/
│   └── providers/
│       └── ReactQueryProvider.tsx
├── hooks/
│   ├── auth/
│   │   ├── useAuth.ts
│   │   └── useLogin.ts
│   ├── useCategories.ts          # TanStack Query hooks
│   └── useUsers.ts
├── interfaces/
│   └── auth.ts
├── lib/
│   └── query-keys.ts             # Centralized TanStack Query keys
├── services/
│   ├── api/
│   │   ├── auth.ts               # Server Actions: login, logout, getUser, getUserRole
│   │   ├── categories.ts         # Server Actions: CRUD categories
│   │   └── users.ts              # Server Actions: getUsers, updateUserRole, toggleUserStatus
│   └── config/
│       ├── supabase.ts           # Browser client (with PKCE config)
│       ├── supabase-server.ts    # Server client (getAll/setAll cookies)
│       └── supabase-service.ts   # Service role client
├── types/
│   └── global.d.ts
└── utils/
    ├── cn.ts
    └── environment.ts
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
| `@lib/*` | `./src/lib/*` |

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

### TanStack Query Pattern
```tsx
// Custom hook for data fetching
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const { data, error } = await getCategories();
      if (error) throw new Error(error);
      return data ?? [];
    },
  });
}

// Custom hook for mutations
export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}
```

### Metadata Pattern
- **Never** export `metadata` from a `"use client"` file
- Use separate `layout.tsx` for page-specific metadata
- Root metadata uses template: `"%s | Tikoom"`

### Auth Pattern
- **Browser**: `createBrowserSupabaseClient()` for client-side auth (PKCE flow)
- **Server**: `createServerSupabaseClient()` for Server Components/Actions
- **Middleware**: `@supabase/ssr` cookie-based session validation with `getUser()`
- Protected routes redirect to `/login`, authenticated users redirected from `/login` to `/dashboard`

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (defaults to development)
NEXT_PUBLIC_APP_ENV=development|staging|production
NEXT_PUBLIC_APP_URL=https://your-domain.com
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

# Testing
pnpm test         # Run Vitest
pnpm coverage     # Run tests with coverage
pnpm analyze      # Bundle analysis

# Linting
pnpm lint

# Pre-commit
# Husky + lint-staged automatically runs on commit
```

## Security Configuration

Configured in `next.config.ts`:
- `poweredByHeader: false` - Hides Next.js signature
- `compiler.removeConsole` - Removes console.log in production
- **Content Security Policy (CSP)** - Strict CSP with nonce support
- **Strict-Transport-Security (HSTS)** - `max-age=63072000; includeSubDomains; preload`
- **X-Frame-Options: DENY** - Clickjacking protection
- **Permissions-Policy** - Restricts camera, microphone, geolocation
- **Referrer-Policy: strict-origin-when-cross-origin**

## SEO Configuration

- **Dynamic OG Images**: `opengraph-image.tsx` + `twitter-image.tsx` (1200x630)
- **PWA Manifest**: `manifest.ts` with icons, theme color
- **Structured Data**: JSON-LD Organization + WebSite schemas
- **Vercel Analytics**: `@vercel/analytics` + `@vercel/speed-insights`
- **Metadata**: Complete metadata on all pages (title, description, OpenGraph, Twitter Cards)
- **Sitemap**: Dynamic sitemap.ts with all routes
- **Robots.txt**: Configured via `robots.ts`

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

## RBAC Architecture (Permission-Based)

This project implements **granular permission-based RBAC** using Supabase custom claims.

### Schema Overview

| Object | Type | Purpose |
|--------|------|---------|
| `public.roles` | Table | Flexible role definitions (super_admin, admin, user) |
| `public.app_permission` | Enum | Permission names: `categories.select`, `categories.insert`, etc. |
| `public.role_permissions` | Table | Permission matrix — which roles have which permissions |
| `public.user_roles` | Table | User-to-role assignments |

### How It Works

1. **User Registration** → User signs up via Supabase Auth (stored in `auth.users`)
2. **Role Assignment** → Admin assigns role via `public.user_roles` (links to `roles` table)
3. **Role-Permission Mapping** → Defined in `public.role_permissions` table
4. **Login Hook** → `custom_access_token_hook` injects `user_role` + `user_permissions` array into JWT claims
5. **API Requests** → JWT contains `user_role` and `user_permissions` claims
6. **RLS Enforcement** → `authorize('permission.name')` checks role_permissions matrix with fast path via JWT permissions array

### Default Roles & Permissions

| Role | Permissions |
|------|-------------|
| `super_admin` | `categories.*`, `user_roles.manage` |
| `admin` | `categories.select`, `categories.insert`, `categories.update` |
| `user` | (no permissions) |

### Adding a New Protected Table

```sql
-- 1. Add permission to enum
ALTER TYPE public.app_permission ADD VALUE 'my_table.select';

-- 2. Grant permission to roles
INSERT INTO public.role_permissions (role_id, permission)
SELECT id, 'my_table.select'::public.app_permission
FROM public.roles WHERE name IN ('super_admin', 'admin');

-- 3. Create table
CREATE TABLE public.my_table (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 4. Enable RLS
ALTER TABLE public.my_table ENABLE ROW LEVEL SECURITY;

-- 5. Create policy using authorize()
CREATE POLICY "Allow authorized select on my_table"
    ON public.my_table
    FOR SELECT
    TO authenticated
    USING ((SELECT authorize('my_table.select')));

-- 6. Grant table access
GRANT ALL ON public.my_table TO authenticated;
```

### Assigning Roles to Users

```sql
-- Via SQL (e.g., in seed or manually)
-- First get the role_id
INSERT INTO public.user_roles (user_id, role_id)
SELECT 'user-uuid-here', id FROM public.roles WHERE name = 'admin';
```

### Key Database Functions

**`public.custom_access_token_hook(event jsonb)`**
- Runs on every login/signup
- Queries `user_roles` + `roles` to get user's role name
- Pre-fetches permissions array into JWT claims (`user_permissions`)
- Located in: `supabase/migrations/*_update_hook_and_create_authorize.sql`

**`public.authorize(requested_permission app_permission)`**
- Centralized permission checker used in ALL RLS policies
- **Fast path**: Checks `user_permissions` array in JWT first (no DB roundtrip)
- **Fallback**: Database lookup via role_permissions + roles join
- Returns `true`/`false`
- Located in: `supabase/migrations/*_update_hook_and_create_authorize.sql`

### Important Notes

- **Role = Table** (flexible): Can add/remove/rename roles via SQL. Use `is_active` to soft-delete.
- **Permission = Enum** (stable): Permission names rarely change. Add new values with `ALTER TYPE ... ADD VALUE`.
- **Never** modify migrations that have already been committed and applied. Always create new migrations.
- `supabase db reset` re-runs ALL migrations + seed. Use with caution on shared databases.

## When Working on This Project

### DO
- Follow Atomic Design for new components
- Place business logic in hooks, not components
- Use Server Components by default (add `"use client"` only when needed)
- Validate forms with React Hook Form + Yup
- Use `cn()` for className composition
- Export metadata from layout.tsx, not page.tsx
- Use TanStack Query for server state (caching, mutations)
- Write unit tests with Vitest for reusable components
- Run `pnpm build` before committing

### DON'T
- Mix UI and data fetching in the same component
- Use `use client` in files that export metadata
- Skip type definitions for props
- Use `any` type without justification
- Add console.log in production code
- Use `getSession()` for authorization (use `getUser()` instead)
- Modify committed migrations
- Commit `.env.local` or service role keys
