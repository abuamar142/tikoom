# Tikoom

A modern event aggregation platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Features granular permission-based RBAC, server-side rendering, and a clean component architecture.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Forms**: React Hook Form + Yup
- **Package Manager**: pnpm

## Features

- Event aggregation and management
- Role-based access control (RBAC) with granular permissions
- Secure authentication via Supabase Auth
- Responsive UI with Tailwind CSS
- Form validation with React Hook Form + Yup
- Toast notifications

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.0.0
- Docker (optional)

## Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd tikoom
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) to view the app.

### 4. Database Setup

```bash
# Reset database and apply all migrations + seed
pnpm supabase db reset
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 4000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Docker

```bash
# Build image
docker build -t tikoom .

# Run container
docker run -p 8080:8080 tikoom
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # UI components (Atomic Design)
├── hooks/            # Feature-specific custom hooks
├── interfaces/       # TypeScript interfaces
├── services/         # API calls & Supabase config
├── types/            # Global type declarations
└── utils/            # Utility functions

supabase/
├── migrations/       # Database schema migrations
└── seed.sql          # Development seed data
```

## RBAC Architecture

This project implements granular permission-based access control:

- **Roles**: Flexible definitions stored in `public.roles`
- **Permissions**: Enum-based (`public.app_permission`)
- **Assignment**: `public.user_roles` links users to roles
- **Enforcement**: Row Level Security (RLS) policies via `authorize()` function

Default roles: `super_admin`, `admin`, `user`

## License

[MIT](LICENSE)
