# ARQA Coffee — repo guide

## Structure

This repo has **two isolated projects** under one root:

| Location | Type | Stack | Run |
|----------|------|-------|-----|
| root `/` | SPA frontend | Vanilla JS, Tailwind CDN, Leaflet, Chart.js | Open `index.html` directly (no build step) |
| `api/` | REST API backend | Next.js 16.2.9 App Router, Prisma + SQLite | `npm run dev` inside `api/` |

## Frontend (root)

- **No package manager, no bundler.** All dependencies loaded via CDN in `index.html`.
- **Data layer**: `localStorage` key `arqa_db`. Global `DB` object seeded in `data/db.js`. Auto-saves every 1s via `setInterval(saveDB, 1000)`. Cross-tab sync via `storage` event.
- **Session**: `sessionStorage` key `arqa_session` (stores `{userId, currentTab}`).
- **State**: Global `State` object in `state/store.js`.
- **All code is global-scope** — no modules, no imports. Script load order in `index.html` matters.
- **Views** organized by role under `view/` (customer, waiter, kitchen, cashier, courier, manager, admin, playground, cook). `view/shared/` has 10 cross-role modules (finance, stock, expense, attendance, menu-crud, table-mgmt, promos, etc.).
- **Permissions gate** (`init.js`): requests geolocation + camera + notification before loading app.
- **Login accounts** (hardcoded seed): `data/db.js` lines 26–116. E.g. `admin@arqa.coffee` / `admin123`.
- **Helpers** (`helpers.js`): `formatCurrency()` uses `Rp` + `toLocaleString('id-ID')`. `genId()` prefix: `'o'` for orders.

## API backend (`api/`)

- Next.js **16.2.9** — read `api/AGENTS.md` inside for version-specific guidance. Scraped docs also at `nextjs-docs.md` (repo root).
- Commands (from `api/`): `npm run dev`, `npm run build`, `npm run lint`, `npm run seed`.
- Seed script is `prisma/seed.ts`, run via `npx tsx` (not `npx prisma db seed`). Reads root `data/db.js` via `vm.runInContext` — updating frontend seed requires updating Prisma schema + seed too.
- Prisma + SQLite (`DATABASE_URL="file:./dev.db"` in `api/.env`).
- Routes in `api/src/app/api/` organized by role (admin/, cashier/, courier/, customer/, kitchen/, waiter/, mitra/, playground/, auth/, notifications/).
- Prisma client singleton in `api/src/lib/prisma.ts`. `@/*` alias maps to `./src/*`.
- **No auth middleware** — passwords compared as plaintext in route handlers. No JWT, no NextAuth, no hashing.
