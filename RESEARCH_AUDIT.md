# Deep Research Audit: Tikoom Project
**Date:** 2026-05-23
**Scope:** Full-stack audit covering Security, Performance, SEO, Architecture, DX

---

## Executive Summary

Tikoom memiliki fondasi arsitektur yang sangat solid dengan RBAC granular, Atomic Design, dan Server Actions. Namun, terdapat **3 critical security issues** yang harus diperbaiki segera, serta puluhan improvement di area performa, SEO, DX, dan best practices.

| Category | Critical | Warning | Suggestion |
|----------|----------|---------|------------|
| Security | 3 | 3 | 2 |
| Performance | 1 | 4 | 5 |
| SEO | 1 | 3 | 6 |
| Architecture | 0 | 3 | 4 |
| DX / Maintainability | 1 | 2 | 6 |

---

## CRITICAL ISSUES (Fix Immediately)

### C1. `.env.local` Ter-Commit ke Repository
- **File:** `.env.local`
- **Impact:** SUPABASE_SERVICE_ROLE_KEY terexpose → full database access
- **Action:**
  1. Rotate keys di Supabase Dashboard sekarang
  2. `git rm --cached .env.local && git commit`
  3. Pastikan `.env.local` ada di `.gitignore`
  4. Jangan pernah commit env files

### C2. `getSession()` Digunakan untuk Authorization
- **File:** `src/services/api/auth.ts`
- **Impact:** Session bisa di-spoof → bypass auth checks
- **Fix:** Selalu gunakan `getUser()` untuk authorization decisions
  ```ts
  // HAPUS:
  const { data: { session } } = await supabase.auth.getSession();

  // GANTI DENGAN:
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  ```

### C3. `metadataBase` Hardcoded ke Localhost
- **File:** `src/app/layout.tsx:31`
- **Impact:** OG images, canonical URLs broken di production
- **Fix:**
  ```ts
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"
  ),
  ```

### C4. Supabase SSR Cookie Handler Menggunakan API Lama
- **File:** `src/services/config/supabase-server.ts`
- **Impact:** Cookie handling tidak optimal, potensi session issues
- **Fix:** Gunakan `getAll`/`setAll` pattern (v0.10.x)

---

## SECURITY HARDENING

### Current State
- Security headers: Good (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- RLS policies: Comprehensive
- RBAC: Granular permission-based

### Recommendations

1. **Content Security Policy (CSP)**
   ```ts
   // next.config.ts
   const cspHeader = `
     default-src 'self';
     script-src 'self'${isDev ? " 'unsafe-eval'" : ""};
     style-src 'self' 'unsafe-inline';
     img-src 'self' blob: data: https://*.supabase.co;
     font-src 'self';
     connect-src 'self' https://*.supabase.co;
     object-src 'none';
     base-uri 'self';
     form-action 'self';
     frame-ancestors 'none';
     upgrade-insecure-requests;
   `;
   ```

2. **HSTS Header**
   ```
   Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
   ```

3. **Remove X-XSS-Protection**
   Header ini deprecated dan bisa cause vulnerability. Hapus saja.

4. **Permissions-Policy**
   ```
   camera=(), microphone=(), geolocation=(), interest-cohort=()
   ```

5. **Rate Limiting pada Auth**
   Implementasi Upstash Ratelimit atau Redis:
   ```ts
   import { Ratelimit } from "@upstash/ratelimit";
   const ratelimit = new Ratelimit({ limiter: Ratelimit.slidingWindow(5, "1m") });
   ```

6. **RBAC Hook Security**
   - Hapus `SECURITY DEFINER` dari custom access token hook
   - Pre-compute permissions array di JWT untuk fast RLS
   - Revoke execute permissions dari public/anon

---

## ARCHITECTURE MODERNIZATION

### React 19 + Next.js 15 Patterns

1. **Migrate dari Custom Hooks ke `useActionState`**
   ```tsx
   // Ganti useLogin hook dengan:
   const [state, formAction, pending] = useActionState(loginAction, null);
   ```
   Keuntungan: Progressive enhancement, built-in pending state, less boilerplate.

2. **Enable React Compiler**
   ```ts
   // next.config.ts
   experimental: { reactCompiler: true }
   ```
   Menghapus kebutuhan manual `useMemo`/`useCallback`.

3. **Optimistic Updates dengan `useOptimistic`**
   Gunakan untuk admin CRUD operations (categories, users) untuk UI yang responsif.

4. **Suspense Boundaries untuk Data Fetching**
   Saat ini data fetching di admin layout blocking. Pindahkan ke page dengan Suspense:
   ```tsx
   <Suspense fallback={<StatsSkeleton />}>
     <StatsSection />
   </Suspense>
   ```

5. **Granular Loading States**
   Buat `loading.tsx` di setiap route:
   - `app/dashboard/loading.tsx`
   - `app/admin/loading.tsx`
   - `app/admin/categories/loading.tsx`
   - `app/admin/users/loading.tsx`

### Supabase Best Practices

1. **Update Cookie Handler**
   ```ts
   cookies: {
     getAll() { return cookieStore.getAll(); },
     setAll(cookiesToSet) {
       cookiesToSet.forEach(({ name, value, options }) => {
         cookieStore.set(name, value, options);
       });
     },
   }
   ```

2. **Optimize RBAC**
   Pre-fetch permissions di JWT claim (bukan hanya role name):
   ```sql
   claims := jsonb_set(claims, '{user_permissions}', to_jsonb(user_permissions));
   ```

3. **Fast Authorize Function**
   ```sql
   IF (auth.jwt()->'user_permissions') ? requested_permission::text THEN
     RETURN true;
   END IF;
   ```

---

## SEO & PERFORMANCE

### Metadata Foundation

1. **Perbaiki metadataBase** → production URL
2. **Tambahkan viewport export** (terpisah dari metadata di Next.js 15)
3. **Tambahkan Twitter card metadata**
4. **Tambahkan alternates canonical**
5. **Tambahkan Search Console verification**

### Dynamic OG Images

Buat `src/app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (<div style={{...}}>Tikoom</div>)
  );
}
```

### Core Web Vitals

| Metric | Current | Target | Action |
|--------|---------|--------|--------|
| LCP | Good (no hero image) | < 2.5s | Maintain, add `priority` when images added |
| INP | Unknown | < 200ms | Debounce search, add `useLinkStatus` |
| CLS | Unknown | < 0.1 | Add explicit dimensions to images |
| TTFB | Unknown | < 800ms | Add Suspense, streaming |

### PWA Setup

- Buat `app/manifest.ts`
- Tambahkan icons ke `public/` (192x192, 512x512)
- Buat `public/sw.js` atau gunakan Serwist

### Analytics

Install monitoring:
```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

---

## DEVELOPER EXPERIENCE

### Testing (Currently None)

Setup stack testing:
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

| Type | Tool | Priority |
|------|------|----------|
| Unit | Vitest + RTL | High |
| E2E | Playwright | High |

### Pre-commit Hooks

```bash
pnpm add -D husky lint-staged
# .husky/pre-commit
npx lint-staged
```

### TypeScript Strictness

Update `tsconfig.json`:
```json
{
  "target": "ES2022",
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "exactOptionalPropertyTypes": true,
  "verbatimModuleSyntax": true
}
```

### Bundle Analysis

```bash
pnpm add -D @next/bundle-analyzer
# Run: ANALYZE=true pnpm build
```

---

## UX / UI ISSUES

1. **Mix Bahasa Indonesia & Inggris** → Pilih satu atau implement i18n
2. **Social Auth Buttons** → Hanya UI placeholder, belum terhubung
3. **Forgot Password** → Link ke `#`, tidak ada flow
4. **Footer Links** → Semua ke `/` atau `#`
5. **Mock Data di Dashboard** → `QUICK_STATS`, `SAVED_EVENTS` hardcoded
6. **Hardcoded Landing Stats** → "500+ Event Aktif" tidak real
7. **No Error Boundaries** → Tambahkan `error.tsx` di root dan per route

---

## IMPLEMENTATION ROADMAP

### Phase 1: Security & Critical (Week 1)
- [ ] Rotate Supabase keys, remove `.env.local` dari repo
- [ ] Fix `getSession()` → `getUser()` di semua auth checks
- [ ] Fix `metadataBase` ke production URL
- [ ] Update Supabase SSR cookie handlers
- [ ] Add CSP, HSTS, Permissions-Policy headers
- [ ] Add `error.tsx` di root app router

### Phase 2: Architecture Modernization (Week 2)
- [ ] Migrate forms ke `useActionState` pattern
- [ ] Update RBAC: remove SECURITY DEFINER, pre-compute permissions
- [ ] Add Suspense boundaries + granular loading.tsx
- [ ] Enable React Compiler
- [ ] Add React.cache() untuk deduplikasi fetch

### Phase 3: SEO & Performance (Week 3)
- [ ] Fix metadata di semua page (title + description)
- [ ] Buat opengraph-image.tsx + twitter-image.tsx
- [ ] Buat manifest.ts
- [ ] Install Vercel Analytics + Speed Insights
- [ ] Add JSON-LD structured data
- [ ] Setup PWA icons

### Phase 4: DX & Quality (Week 4)
- [ ] Setup Vitest + Playwright
- [ ] Add husky + lint-staged
- [ ] Update TypeScript strict flags
- [ ] Add bundle analyzer
- [ ] Standardisasi bahasa UI

### Phase 5: Features (Ongoing)
- [ ] Implementasi social auth (Google/GitHub)
- [ ] Forgot password flow
- [ ] Real event images (Supabase Storage)
- [ ] Server-side pagination + search
- [ ] Audit logging
- [ ] TanStack Query untuk server state

---

## STRENGTHS TO MAINTAIN

1. **RBAC Architecture** - Permission-based RBAC dengan custom JWT claims adalah implementasi yang sangat baik dan scalable
2. **Atomic Design** - Konsisten, terstruktur, mudah dipelihara
3. **Server Actions Pattern** - Penggunaan Next.js 15 Server Actions yang tepat
4. **RLS Policies** - Semua tabel memiliki RLS dengan policies yang proper
5. **TypeScript Strict** - Strict mode dengan path aliases yang baik
6. **Docker Support** - Multi-stage build yang efisien
7. **Migration Management** - Versioned migrations dengan idempotency

---

## REFERENCES

- [Next.js 15 App Router Best Practices](https://nextjs.org/docs/app)
- [Supabase SSR Advanced Guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
- [Supabase Security Retro 2025](https://supabase.com/blog/supabase-security-2025-retro)
- [React 19 useActionState](https://react.dev/reference/react/useActionState)
- [Tailwind CSS v4 Migration](https://tailwindcss.com/docs/v4-beta)
- [CSP in Next.js](https://nextjs.org/docs/app/guides/content-security-policy)
