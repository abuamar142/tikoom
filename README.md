# Tikoom

A modern authentication system built with Next.js 15, TypeScript, and Supabase.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form + Yup
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # Atomic Design components
│   ├── atoms/        # Basic UI components
│   ├── molecules/    # Composite components
│   └── organisms/    # Complex components
├── hooks/            # Custom React hooks
├── interfaces/       # TypeScript interfaces
├── services/         # API services & config
├── store/            # State management
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 22+ (managed via nvm)
- pnpm 10+
- Supabase CLI (for local development)

### Node Version Management

This project uses `.nvmrc` to lock Node version:

```bash
# Install and use correct Node version
nvm install
nvm use
```

### Installation

```bash
pnpm install
```

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_ENV=development
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser.

### Build for Production

```bash
pnpm build
```

### Docker Build

```bash
docker build -t tikoom .
docker run -p 8080:8080 tikoom
```

## Features

- Modern login UI with split-screen design
- Form validation with React Hook Form + Yup
- Password visibility toggle
- Supabase authentication integration
- Protected routes with middleware
- Responsive design
- Security headers
- Toast notifications

## CI/CD

- GitHub Actions workflows for dev, staging, and production
- Branch-based deployment
- Docker multi-stage builds

## License

MIT
