---
name: html-to-nextjs-migration
description: Migrate a vanilla HTML/JS project to Next.js App Router. Uses reference docs (nextjs-docs.md, zustand-docs.md, tailwindcss-docs.md, motion-docs.md, prisma-docs.md, better-auth-docs.md). Follows frontend-first → backend → integration order. Every step is verified with a linter before proceeding.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: migration
---

# HTML to Next.js Migration Skill

Migrate a vanilla HTML + JavaScript project into a production-ready **Next.js 15+ (App Router)** application with the following stack:

| Layer     | Reference                    |
| --------- | ---------------------------- |
| Framework | `nextjs-docs.md`             |
| State     | `zustand-docs.md`            |
| Styling   | `tailwindcss-docs.md`        |
| Animation | `motion-docs.md`             |
| ORM       | `prisma-docs.md`             |
| Auth      | `better-auth-docs.md`        |

## Reference Documentation

Each technology has a full docs file in `/content/`. Before implementing any feature, **search the corresponding docs file** for the current API, config options, and best practices — avoid outdated patterns.

| File | Covers |
|------|--------|
| `nextjs-docs.md` (1.2 MB) | App Router, file conventions, configuration, CLI, components, functions, guides (auth, caching, deployment, testing, upgrading, etc.) |
| `zustand-docs.md` (361 KB) | Store creation, middlewares (persist, devtools, immer), TypeScript, SSR/hydration, migration v4→v5 |
| `tailwindcss-docs.md` (1.7 MB) | Installation, every utility class (layout, flex, grid, typography, backgrounds, borders, effects, filters, transforms, etc.), responsive, dark mode, theme, v3→v4 upgrade |
| `motion-docs.md` (269 KB) | `<motion>` component, gestures, scroll/layout/SVG animations, hooks (useAnimate, useScroll, useInView, etc.), integrations (Tailwind, Radix, Base UI, Figma) |
| `prisma-docs.md` (3.1 MB) | CLI, schema language, Prisma Client (CRUD, relations, transactions), migrations, Accelerate, framework integrations |
| `better-auth-docs.md` (1.8 MB) | 30+ providers, database adapters (Prisma, Drizzle, MongoDB), plugins (2FA, admin, organization, API keys, billing), Next.js integration, migration from Clerk/Auth0/Auth.js/Supabase |

## Core Principles

1. **Frontend-first**: Build all UI components and pages before any backend work.
2. **Backend-second**: Set up database schema, API routes, and auth after frontend is complete.
3. **Integration-last**: Connect frontend to backend, wire up state and auth.
4. **Modular files**: Every file must stay **≤200 lines**. If it grows, split it.
5. **Lint-verify every step**: After completing each numbered step, run the linter. **Do not proceed** until the linter passes with zero errors.
6. **Docs-driven**: Every step below includes doc references. Search them for full details — only the key points are summarized here.

---

## Phase 1 — Project Scaffolding

### Step 1: Initialize Next.js Project

**Docs reference**: `nextjs-docs.md` → _Getting Started: Installation, CLI: create-next-app, File-system conventions: (layout.js, page.js)_

```bash
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --import-alias "@/*" \
  --use-npm
```

Do NOT use `--src-dir`. The `app` directory lives at the project root, not inside `src/`.

**Verify**: `npm run lint` must pass. `npm run dev` must render default page.

### Step 2: Install Core Dependencies

```bash
npm install zustand framer-motion
```

**Verify**: `npm run build` succeeds without errors.

### Step 3: Install Backend Dependencies

```bash
npm install prisma @prisma/client better-auth
npm install -D @types/node
```

**Verify**: `npm run build` succeeds without errors.

### Step 4: Configure ESLint Strictly

**Docs reference**: `nextjs-docs.md` → _Configuration: ESLint_

Create or update `eslint.config.mjs`:

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "max-lines": [
        "error",
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },
];

export default eslintConfig;
```

**Verify**: `npm run lint` passes. Deliberately create a 201-line file and confirm lint fails, then delete it.

### Step 5: Establish Folder Structure

**Docs reference**: `nextjs-docs.md` → _Getting Started: Project Structure_

Create the following empty structure. Per Next.js convention, `app/` is at the project root (no `src/`). Shared code lives in top-level folders outside `app/`:

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (protected)/
│   ├── layout.tsx
│   └── dashboard/page.tsx
├── api/
│   └── auth/
│       └── [...all]/route.ts
├── layout.tsx
├── page.tsx
├── globals.css
│
components/
├── ui/
├── layout/
└── features/
│
hooks/
│
lib/
├── auth.ts
├── auth-client.ts
└── db.ts
│
stores/
├── index.ts
│
types/
├── index.ts
│
utils/
├── index.ts
│
prisma/
├── schema.prisma
├── dev.db
│
middleware.ts
```

> **Note**: Per Next.js docs, `app/` is purely for routing. Shared folders (`components/`, `hooks/`, `lib/`, etc.) live at the project root alongside `app/`. Only files inside `app/` that are `page.tsx` or `route.ts` are publicly routable — everything else is safe colocation.

**Verify**: `npm run lint` passes. No import errors.

---

## Phase 2 — Frontend Migration

### Step 6: Audit and Catalog Source Project

- List every HTML file in the source project.
- For each file, document: URL path, UI components used, JS interactions, external API calls, and DOM state.
- Output a `migration-map.md` file mapping each HTML page → Next.js route.

**Verify**: File `migration-map.md` exists and covers all source pages.

### Step 7: Migrate Global Layout

**Docs reference**:
- `nextjs-docs.md` → _File-system conventions: layout.js, Functions: metadata/generateMetadata, Components: Font_
- `tailwindcss-docs.md` → _Styling with utility classes, Font family, Colors, Dark mode_

Convert the source `<head>`, `<nav>`, `<footer>` into:

- `app/layout.tsx` — Root layout with `<html>`, `<body>`, fonts, metadata.
- `components/layout/Header.tsx` — Navigation component.
- `components/layout/Footer.tsx` — Footer component.
- `components/layout/Sidebar.tsx` — If applicable.

Each file ≤200 lines. Use Tailwind CSS for all styling (no CSS files unless global resets in `globals.css`).

**Verify**: `npm run lint` passes. `npm run dev` renders layout shell at `/`.

### Step 8: Migrate Static Pages

**Docs reference**:
- `nextjs-docs.md` → _File-system conventions: page.js, Linking and Navigating (Link/useRouter), Metadata_
- `tailwindcss-docs.md` → _all utility class sections: Layout (display, position, overflow), Flexbox & Grid, Spacing (padding, margin), Typography, Backgrounds, Borders, Effects_

For each static HTML page in the source (homepage, about, landing, etc.):

1. Create the corresponding `page.tsx` under `app/`.
2. Convert HTML markup → JSX with Tailwind classes.
3. Extract repeated UI patterns into `components/ui/` components (Button, Card, Input, Badge, Modal, etc.).
4. Each component file ≤200 lines.

**Verify**: `npm run lint` passes. All static pages render at correct routes. Visually compare with source.

### Step 9: Migrate Interactive Components with Motion

**Docs reference**:
- `motion-docs.md` → _Motion component (all props: animate, initial, exit, variants, layoutId), Gesture animation (whileHover, whileTap, whileDrag, whileFocus, whileInView), Layout animation (layout prop, LayoutGroup, shared layout animations), React scroll animation (useInView, useScroll), Transitions (spring, tween, damping, stiffness), AnimatePresence, SVG animation, Enter/exit animations_
- `nextjs-docs.md` → _Functions: useRouter, useSearchParams (for route-driven animation triggers)_

For every animated or interactive UI element:

1. Create `components/features/` components.
2. Replace CSS animations / JS-animated elements with Motion:
   - Use `<motion.div>` for enter/exit animations.
   - Use `useInView` for scroll-triggered animations.
   - Use `<AnimatePresence>` for list animations.
   - Use `useMotionValue` / `useTransform` for parallax and drag.
3. See `motion-docs.md` → _Motion component_ for the full list of supported props and value types (CSS values, transforms, colors, CSS variables).

**Verify**: `npm run lint` passes. Animations match source behavior.

### Step 10: Set Up Zustand Stores

**Docs reference**: `zustand-docs.md` → _First create a store, Updating state, Slices Pattern (for splitting large stores), Middlewares (persist for localStorage, devtools for debugging, immer for nested state), TypeScript guide (beginner + advanced), SSR and Hydration (for Next.js), How to reset state_

For every piece of client-side state (form state, UI toggles, filters, etc.):

1. Create a store in `stores/`:

```typescript
// stores/useUIStore.ts
import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
```

2. Replace all `localStorage` / global variable state with Zustand stores.
3. Keep each store file ≤200 lines. Split if needed.

**Verify**: `npm run lint` passes. Interactive UI works with Zustand. No direct DOM state manipulation.

### Step 11: Migrate Client-Side Logic to Custom Hooks

**Docs reference**: `nextjs-docs.md` → _Functions: useRouter, useSearchParams, usePathname, useParams, useReportWebVitals_

For every JS logic block (event listeners, calculations, formatters):

1. Create custom hooks in `hooks/`:

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

2. Each hook file ≤200 lines.
3. Ensure all hooks follow `use*` naming convention.

**Verify**: `npm run lint` passes. No `useEffect` directly in page components longer than 30 lines — all extracted to hooks.

### Step 12: Create TypeScript Type Definitions

- Define all interfaces and types in `types/`:

```typescript
// types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
```

- Replace all `any` types with proper types.
- Each file ≤200 lines.

**Verify**: `npm run lint` passes. No `any` types remain.

### Step 13: Frontend Review Gate

Before moving to backend:

- [ ] All source HTML pages have a corresponding Next.js page.
- [ ] All UI components migrated and render correctly.
- [ ] All animations implemented with Framer Motion.
- [ ] All client state managed by Zustand.
- [ ] All logic extracted into custom hooks.
- [ ] All types defined, no `any`.
- [ ] Every file ≤200 lines.
- [ ] `npm run lint` passes with zero errors.
- [ ] `npm run build` succeeds.

**Do NOT proceed to Phase 3 until every checkbox is confirmed.**

---

## Phase 3 — Backend Setup

### Step 14: Initialize Prisma with SQLite

**Docs reference**:
- `prisma-docs.md` → _CLI Overview (init), Concepts (Prisma schema language: models, enums, relations, attributes), Getting Started (Quickstart)_
- For more complex schemas: `prisma-docs.md` → _Data modeling, Best practices_

```bash
npx prisma init --datasource-provider sqlite
```

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @cuid()
  email     String   @unique
  name      String
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sessions Session[]
}

model Session {
  id        String   @id @cuid()
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

**Verify**: `npx prisma validate` passes. `npx prisma generate` succeeds.

### Step 15: Run Initial Migration

**Docs reference**: `prisma-docs.md` → _CLI Overview (migrate dev, migrate deploy)_

```bash
npx prisma migrate dev --name init
```

**Verify**: `prisma/dev.db` file exists. `npx prisma studio` opens successfully.

### Step 16: Create Prisma Client Singleton

**Docs reference**: `prisma-docs.md` → _Prisma Client (Getting started, Connection management)_

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

**Verify**: `npm run lint` passes. `npm run build` succeeds.

### Step 17: Set Up Better Auth

**Docs reference**:
- `better-auth-docs.md` → _Basic Usage, Database (Prisma adapter), Options (emailAndPassword, session), Next.js (Next.js integration guide)_
- `prisma-docs.md` → _Prisma Schema (if adding auth models beyond default)_

Create `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});
```

Create `lib/auth-types.ts`:

```typescript
import type { betterAuth } from "better-auth";
import type { auth } from "./auth";

export type Auth = typeof auth;
```

**Verify**: `npm run lint` passes. `npm run build` succeeds.

### Step 18: Create Auth API Route

**Docs reference**: `better-auth-docs.md` → _Next.js (API route setup, toNextJsHandler)_

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

**Verify**: `npm run lint` passes. `npm run dev` responds to `/api/auth/*` routes.

### Step 19: Create Auth Client Utility

**Docs reference**: `better-auth-docs.md` → _Client (createAuthClient, useSession, signIn, signOut)_

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signOut, signUp, useSession } = authClient;
```

**Verify**: `npm run lint` passes.

### Step 20: Build Auth Pages (Login & Register)

**Docs reference**:
- `better-auth-docs.md` → _Email & Password (signIn/signUp with email+password), Client (useSession, error handling)_
- `zustand-docs.md` → _First create a store (for form loading state)_
- `tailwindcss-docs.md` → _Typography, Borders, Backgrounds, Flexbox & Grid (form layout)_

- `app/(auth)/login/page.tsx` — Login form component.
- `app/(auth)/register/page.tsx` — Registration form component.
- Extract form components into `components/features/AuthForm.tsx`.
- Use Zustand for form loading state.
- Each file ≤200 lines.

**Verify**: `npm run lint` passes. Login and register forms render. Form submission calls Better Auth client methods.

### Step 21: Create Protected Route Layout

```typescript
// app/(protected)/layout.tsx
'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) return null;

  return <>{children}</>;
}
```

**Verify**: `npm run lint` passes. Unauthenticated users redirect to `/login`.

### Step 22: Build API Routes (CRUD)

**Docs reference**:
- `nextjs-docs.md` → _File-system conventions: route.js, Route Handlers_
- `prisma-docs.md` → _Prisma Client (CRUD operations, filtering/sorting, pagination, relation queries, transactions, raw SQL)_

For each data entity, create API routes following this pattern:

```
app/api/
├── users/
│   └── route.ts          (GET list, POST create)
│   └── [id]/route.ts     (GET one, PUT update, DELETE)
├── sessions/
│   └── route.ts
```

Each route handler file ≤200 lines. Use Prisma client for all DB operations.

```typescript
// Example: app/api/users/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.user.findMany({
    select: { id: true, email: true, name: true },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

**Verify**: `npm run lint` passes. Test each endpoint with curl or browser.

### Step 23: Server Actions (Alternative to API Routes)

**Docs reference**: `nextjs-docs.md` → _Directives: 'use server', Mutating Data (Server Actions), Revalidating (revalidatePath, revalidateTag)_

For forms, prefer Next.js Server Actions:

```typescript
// app/actions/createUser.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await db.user.create({ data: { name, email } });
  revalidatePath("/users");
}
```

Each action file ≤200 lines. Group related actions in one file.

**Verify**: `npm run lint` passes.

### Step 24: Backend Review Gate

Before moving to integration:

- [ ] Prisma schema is complete for all entities.
- [ ] Migrations run without errors.
- [ ] Better Auth configured and API routes respond.
- [ ] Auth pages (login/register) functional.
- [ ] Protected layout redirects unauthenticated users.
- [ ] All CRUD API routes or Server Actions created.
- [ ] Every file ≤200 lines.
- [ ] `npm run lint` passes with zero errors.
- [ ] `npm run build` succeeds.

**Do NOT proceed to Phase 4 until every checkbox is confirmed.**

---

## Phase 4 — Integration

### Step 25: Connect Frontend Forms to Auth

**Docs reference**:
- `better-auth-docs.md` → _Client (useSession hook, signIn/signOut, session management)_
- `zustand-docs.md` → _First create a store (for UI auth state like loading/error)_

- Replace Zustand mock auth state with Better Auth client.
- Update login/register pages to call `signIn` / `signUp`.
- Create `stores/useAuthStore.ts` for UI-specific auth state (e.g., loading indicators):

```typescript
// stores/useAuthStore.ts
import { create } from "zustand";

interface AuthUIState {
  isAuthLoading: boolean;
  authError: string | null;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  isAuthLoading: false,
  authError: null,
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  setAuthError: (authError) => set({ authError }),
}));
```

**Verify**: `npm run lint` passes. Login → session created → redirect to dashboard. Logout → clear session → redirect to login.

### Step 26: Replace Mock Data with API Calls

**Docs reference**: `nextjs-docs.md` → _Getting Started: Fetching Data, Route Handlers_

For every component that uses hardcoded/mock data:

1. Create a data-fetching hook in `hooks/`:

```typescript
// hooks/useUsers.ts
import { useState, useEffect } from "react";
import type { User } from "@/types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}
```

2. Replace mock data imports with hook calls.
3. Add loading skeletons using Framer Motion.

**Verify**: `npm run lint` passes. All data comes from API routes. No hardcoded data remains.

### Step 27: Add TanStack Query (Optional but Recommended)

```bash
npm install @tanstack/react-query
```

Create `lib/query-client.tsx`:

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

Wrap root layout with `<QueryProvider>`. Refactor data hooks to use `useQuery` / `useMutation`.

**Verify**: `npm run lint` passes. `npm run build` succeeds.

### Step 28: Wire Zustand Stores to API Data

**Docs reference**: `zustand-docs.md` → _Updating state, Slices Pattern_

For stores that need server data:

```typescript
// stores/useUserStore.ts
import { create } from "zustand";
import type { User } from "@/types";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((s) => ({ users: [...s.users, user] })),
  removeUser: (id) =>
    set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
}));
```

Call `setUsers()` from data hooks/API responses.

**Verify**: `npm run lint` passes. UI updates reactively from store state.

### Step 29: Add Error Boundaries

**Docs reference**: `nextjs-docs.md` → _File-system conventions: error.js (convention-based error boundary per route segment)_

```typescript
// components/ui/ErrorBoundary.tsx
'use client';

import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div className="p-4 text-red-500">Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

Wrap each route segment with `<ErrorBoundary>`.

**Verify**: `npm run lint` passes.

### Step 30: Add Loading States and Suspense Boundaries

**Docs reference**: `nextjs-docs.md` → _File-system conventions: loading.js, Streamings (Suspense boundaries)_

- Create `loading.tsx` for each route segment.
- Use `Suspense` with Motion fallbacks:

```typescript
// app/(protected)/dashboard/loading.tsx
import { motion } from 'framer-motion';

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <div className="h-8 w-8 border-2 border-gray-300 border-t-blue-500 rounded-full" />
      </motion.div>
    </div>
  );
}
```

**Verify**: `npm run lint` passes. Loading states display during data fetch.

### Step 31: Middleware for Auth Protection

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
```

**Verify**: `npm run lint` passes. Protected routes redirect without session. Public routes accessible.

### Step 32: Final Integration Review Gate

- [ ] All frontend components connected to real API data.
- [ ] Auth flow (register → login → protected routes → logout) works end-to-end.
- [ ] Zustand stores synchronized with server data.
- [ ] Framer Motion animations work on all interactive elements.
- [ ] Error boundaries catch and display errors gracefully.
- [ ] Loading states show for all async operations.
- [ ] Middleware protects routes correctly.
- [ ] Every file ≤200 lines.
- [ ] `npm run lint` passes with zero errors.
- [ ] `npm run build` succeeds.
- [ ] `npm start` serves a functional application.

---

## Phase 5 — Polish & Optimization

### Step 33: Performance Optimization

**Docs reference**:
- `nextjs-docs.md` → _Getting Started: Server and Client Components, Image Optimization, Lazy Loading, Caching, Metadata and OG images_
- `motion-docs.md` → _Reduce bundle size (LazyMotion, useAnimate as lightweight alternative to `<motion>`)_

- Add `'use client'` only where needed (prefer Server Components).
- Lazy-load heavy components with `next/dynamic`.
- Optimize images with `next/image`.
- Add proper `metadata` and `generateMetadata` for SEO.

**Verify**: `npm run lint` passes. Lighthouse score ≥ 80 on all metrics.

### Step 34: Environment Variables & Configuration

```env
# .env.local
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

Ensure no secrets are committed. Validate `.gitignore` includes `.env*`.

**Verify**: `npm run lint` passes. `npm run build` succeeds with env vars.

### Step 35: Final Validation

- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — succeeds
- [ ] `npm start` — production build runs
- [ ] Every file ≤200 lines
- [ ] No `any` types
- [ ] No `console.log` left in code (eslint catches this)
- [ ] All source HTML pages have migrated Next.js routes
- [ ] Source project features match migrated project behavior
- [ ] README.md updated with new project structure and commands

---

## File Size Enforcement Rule

**Critical Rule**: If any file exceeds 200 lines during any step:

1. Stop immediately.
2. Refactor by splitting into smaller modules:
   - Extract sub-components to separate files.
   - Extract utility functions to `utils/`.
   - Extract types to `types/`.
   - Extract constants to their own files.
3. Re-run `npm run lint`.
4. Proceed only after lint passes.

## Linter Verification Protocol

After completing **every numbered step**, execute:

```bash
npm run lint
```

- ✅ **Zero errors** → proceed to next step.
- ❌ **Any errors** → fix immediately, then re-run `npm run lint`. Do NOT proceed until clean.

At milestone steps (Step 13, Step 24, Step 32, Step 35), also run:

```bash
npm run build
```

Both must pass with zero errors before proceeding.

## When to Use This Skill

- When migrating a vanilla HTML/JS project to Next.js.
- When starting a new Next.js project with the same stack and wanting a step-by-step guide.
- When asked to refactor or modularize an existing Next.js project.
- When setting up auth, database, or state management in a Next.js project.
- When you encounter a file exceeding 200 lines and need to split it.

## Important Notes

- **Always use App Router** (`app/` at project root), NOT Pages Router and NOT inside `src/`.
- **Always use `'use client'`** directive only when necessary (interactivity, hooks, browser APIs).
- **Prefer Server Components** by default. Only add `'use client'` when needed.
- **Zustand stores** must only be used in Client Components.
- **Motion** must only be used in Client Components.
- **Prisma client** is a server-only module — never import in Client Components.
- **Better Auth** server utilities are server-only. Use `authClient` (from `lib/auth-client.ts`) on the client.
- **Every step must be lint-verified** before proceeding. No exceptions.
- **Project structure**: `app/` for routing, top-level folders (`components/`, `hooks/`, `lib/`, `stores/`, `types/`, `utils/`) for shared code — no `src/` directory.
- **Search docs before coding**: Before implementing any feature, search the corresponding `*.docs.md` file for the current API and best practices. These docs files are comprehensive — they cover the latest version of each library with all config options, migration notes, and examples. Using them ensures you don't rely on outdated patterns or deprecated APIs.
