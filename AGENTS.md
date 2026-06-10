# ARQA Coffee — Agent Guide

## Project
Vanilla JS SPA (no bundler/framework). Café management with **9 roles**: admin, manager, cashier, kitchen, courier, customer, waiter, playground, mitra_juru_masak. All UI in Indonesian, dark theme. No test runner, no lint/typecheck config.

## How to run
Open `index.html` in a browser. No build step, no dev server, no npm install.

## CDN deps (loaded in index.html before app scripts)
Tailwind 3, Leaflet 1.9.4, Chart.js, html5-qrcode, Font Awesome 6, Google Fonts (Poppins + Playfair Display).

## Entry flow
1. `init.js` checks Notification/Geo/Camera permissions — shows permission gate if denied
2. On all-granted: `startApp()` restores session from `sessionStorage('arqa_session')`, calls `render()`, starts `setInterval(saveDB, 1000)` (every 1s)
3. Cross-tab sync via `window.addEventListener('storage', ...)` — detects `arqa_db` and `arqa_notifications` changes from other tabs, re-renders if no modal is open

## Script load order (55 sequential `<script src="">`)
Order matters — no module system, all functions are global:
`data/db.js` → `state/store.js` → `helpers.js` → `components/toast.js` → `components/notifications.js` → `components/modal.js` → `view/core/render.js` → `view/core/login.js` → `view/core/shell.js` → `view/shared/finance.js` → `view/shared/stock.js` → `view/shared/expense.js` → `view/shared/attendance.js` → `view/shared/table-detail.js` → `view/shared/menu-mgmt.js` → `view/shared/image-helpers.js` → `view/shared/menu-crud.js` → `view/shared/tables-mgmt.js` → `view/shared/promos.js` → `view/customer/*` (11 files) → `view/waiter/menu.js` → `view/playground/*` (5 files) → `view/cashier/*` (5 files) → `view/kitchen/*` (3 files) → `view/cook/mitra.js` → `view/courier/*` (4 files) → `view/manager/index.js` → `view/admin/*` (2 files) → `view/core/profile.js` → `components/hooks.js` → `init.js`

## Render flow
1. `render()` (render.js): `State.currentUser` null → `renderLogin()` + `afterLoginRender()`; defined → `renderMainApp()` then `afterRender()`
2. `renderMainApp()` (shell.js) delegates to `renderXxxView()` by `State.currentUser.role`
3. Each view checks `State.currentTab[role]` and delegates to a tab function
4. `afterRender()` (hooks.js): `initCharts()`, `initMaps()`, `initPromoCarousel()`, `initPlaygroundTimer()`, `initServiceStatusTimer()`
5. **Call `render()` after every data mutation** to refresh UI

## State (`store.js`)
```js
const State = {
  currentUser: null, currentView: "login", currentTab: {},
  cart: [], selectedTable: null, orderType: "dine-in",
  notifications: [], mapInstances: {}, chartInstances: {},
  wizardStep: 0, searchQuery: "", selectedCategory: "all",
  editingOrder: null, sidebarOpen: false,
  courierStatus: "offline", courierPosition: null, mitraPositions: {},
};
// Runtime-only keys set ad-hoc: activePromoId, payTiming, deliveryAddress/Location/Detail
// cashierCart[], cashierSearchQuery, cashierSelectedCategory, editingOrderId
// adminRoleFilter, adminMenuFilter, adminCourierFilterId, adminCourierDateFilter, adminMitraSelectedName
// stockSearch, stockMenuFilter, expenseSearch, expenseCategory, expenseDate
// financeStartDate, financeEndDate, showRevenueTable, showExpenseTable, showAvgTable, showProfitTable
// showManagerCashTable, showManagerDigitalTable, managerReportDate, _showPendapatan
// pendingCheckinCoords, _geoGranted, _cameraGranted, _pengaturanOpen, _financialOpen, _stock-groupOpen
// Globals: selectedPayment, modalQty, _promoInterval, _selectedMitraRole, _mitraRegMap, _mitraRegMarker, _mitraRegPos
```

## DB data structures (`data/db.js`)
- **Seed with migration**: `loadDB()` reads `localStorage.arqa_db`. Falls back to seed data. Runs migrations (cafe.shipping, cafe.rates, waiter/playground/mitra users, cafe.address, stockItems.price, pgStockItems.image, pgStockItems.category, ongkir_status, etc.). `saveDB()` is called on the `setInterval` timer.
- **Notifications** are stored separately under `localStorage.arqa_notifications`.

| Key | Shape | Notes |
|---|---|---|
| `users` | `[{id, name, email, password, role, phone, avatar, address, business_name?, mitra_position?}]` | 9 seed users |
| `tables` | `[{id, number, qr_code, status, capacity}]` | status: available\|occupied |
| `menuItems` | `[{id, name, description, price, category, image, is_available, is_approved?, tax_percentage, submitted_by?}]` | categories: coffee\|non-coffee\|food\|snack; is_approved controls mitra menu visibility |
| `orders` | `[{id, user_id, table_id, order_type, status, total_amount, shipping_cost, service_fee, payment_method, payment_status, delivery_address, delivery_detail, delivery_location, customer_name, customer_phone?, accepted, waiter_id?, promo_id, promo_discount, items, courier_id?, reject_reason?, messages?, lastReadAt?, ongkir_status?, has_mitra_items, mitra_approved}]` | items `[{menu_item_id, quantity, unit_price, notes, status}]`, status: pending→cooking→ready→delivering→delivered→completed\|cancelled\|rejected |
| `stockItems` | `[{id, name, unit, current_quantity, min_quantity, price}]` | price added by migration |
| `stockMovements` | `[{id, stock_item_id, user_id, type, quantity, notes}]` | type: in\|out |
| `attendances` | `[{id, user_id, check_in, check_out?, lat, lng, status}]` | check_out null = still working |
| `courierTracking` | `[{id, order_id, courier_id, latitude, longitude, recorded_at}]` | |
| `promos` | `[{id, code, title, icon, color, desc, discount_type, discount_value, start_date?, end_date?, menu_ids, image, terms, is_active}]` | discount_type: percent\|fixed |
| `dailySales` | `[{date, revenue, orders}]` | **static seed only** — never updated at runtime |
| `expenses` | `[{id, date, category, amount, note, volume?, unit?, unitPrice?}]` | updated at runtime (stock restock, manual entry, courier ongkir) |
| `cafe` | `{address, location: {lat, lng}, shipping: {rate_per_km, min, max}, rates: {courier, mitra, customer}, serviceStatus, serviceSchedule, specialDates}` | runtime config; rates include service_fee configs; serviceStatus: open\|closed\|force_open; serviceSchedule: 7-day weekly hours; specialDates: date exceptions |
| `playgroundTickets` | `[{id, user_id, customer_name, children, companions, companion_count, socks_per_child, socks_total, hours, start_time, end_time, items, subtotal, items_total, total_amount, payment_status, payment_method, status, created_at, pgTransactions}]` | children: `[{name}]`, companions: `[{name}]`, pgTransactions: `[{id, type, description, amount, method, created_at}]` |
| `pgStockItems` | `[{id, name, price, unit, category, stock, image}]` | playground inventory |
| `pgStockMovements` | `[{id, pg_stock_item_id, user_id, type, quantity, notes}]` | |
| `mitraPayouts` | `[{id, order_id, mitra_name, total_items, fee, tax, amount, status, created_at, paid_at, paid_by}]` | status: unpaid\|paid |
| `mitraRegistrations` | `[{id, name, business, email, phone, address, role, status, position, created_at}]` | role: courier\|mitra_juru_masak; status: pending\|approved\|rejected |

## ID patterns
- Predefined: `u1..uN`, `o1..oN`, `m1..mN`, `s1..sN`, `t1..tN`, `p1..pN`, `a1..aN`, `sm1..smN`, `ct1..ctN`, `ps1..psN`
- New IDs: `'u' + Date.now()`, `'m' + Date.now()`, `'o' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)` (`genId()`)
- Notification IDs: `'n' + Date.now() + Math.random()`

## Key helpers (`helpers.js`)
- `formatCurrency(n)` → `"Rp 18.000"` (id-ID locale)
- `formatDate(d)` / `formatTime(d)` — Indonesian locale
- `getMenuItem(id)`, `getTable(id)`, `getUser(id)`
- `genId()` → order ID like `"okf3a8x3b"`
- `getStatusLabel(s)` / `getStatusBadge(s)` — status → Indonesian / CSS class
- `getOrderTypeName(t)` → `"Dine-In"` / `"Takeaway"` / `"Delivery"`
- `getRoleLabel(r)` / `getDefaultTab(role)` — in shell.js
- `calcItemTax(items)` — per-item tax from `menuItem.tax_percentage`
- `getShippingConfig()` — returns `{rate_per_km, min, max}` from `cafe.shipping`
- `calcShippingCost(lat, lng)` — haversine distance × rate_per_km, clamped to [min, max]
- `calcCustomerFee(subtotal, orderType)` — service fee for delivery orders
- `calcCourierFee(shippingCost)` — courier service fee percentage from `cafe.rates.courier`
- `calcMitraFee(total)` — mitra service fee percentage from `cafe.rates.mitra`
- `effectiveAmount(o)` — order total minus unpaid ongkir share (for reports)
- `isCheckedIn()` / `hasActiveCourier()` / `isMitraActive(name)` — today's attendance checks
- `createMitraPayouts(orderId)` — auto-generates payouts per mitra when order is paid
- `getMitraPendingPayouts()` / `getMitraPaidPayouts()`
- `CAFE_LOCATION` = `DB.cafe.location`

## Rendering conventions
- **All functions are global** — no imports/exports. Template literals → `.innerHTML`.
- Tab nav: `State.currentTab[role] = 'tabName'` + `render()`.
- `event.stopPropagation()` on any button inside a clickable card/row.
- Admin & manager use **side drawer**; all other roles use **bottom nav**.
- Top-level view container: `class="animate-fade-up"`.
- Menu images use picsum.photos (seed param) + `onerror` fallback.
- Admin profile hides attendance card (`showAbsen = u.role !== 'admin'`).

## Admin side drawer tabs
`overview`, `active-services` (active-orders, active-playground), `menu-mgmt`, `promos`, `financial` (finance, expenses, mitra-finance, courier-finance), `stock-group` (stock, pg-stock), `pengaturan` (tables-mgmt, users, service-control, tarif-group), `mitra-approval`, `attendance`, profile.

## Manager side drawer tabs
`dashboard`, `active-services` (active-orders, active-playground), `menu-mgmt`, `promos`, `tarif-group` (tarif-kurir, tarif-mitra, tarif-pelanggan), `finance`, `stock-group` (stock, pg-stock), `pengaturan` (tables-mgmt, users), `expenses`, `attendance`, profile.

## Bottom nav tabs
| Role | Tabs |
|---|---|
| customer | menu, cart, orders, profile |
| waiter | menu, cart, orders, profile |
| cashier | create-order, orders, payment (selesai), report, tables-mgmt, profile |
| kitchen | queue, history, profile |
| courier | available, active, history, profile |
| playground | tickets, report (finance), stock, profile |
| mitra_juru_masak | queue, history, menu-mgmt, finance, profile |

## Credentials
| Role | Email | Password |
|---|---|---|
| admin | admin@arqa.coffee | admin123 |
| manager | manager@arqa.coffee | manager123 |
| cashier | kasir@arqa.coffee | kasir123 |
| kitchen | dapur@arqa.coffee | dapur123 |
| courier | kurir@arqa.coffee | kurir123 |
| customer | customer@arqa.coffee | customer123 |
| waiter | waiter@arqa.coffee | waiter123 |
| playground | playground@arqa.coffee | playground123 |
| mitra_juru_masak | mitra@arqa.coffee | mitra123 |

## Order lifecycle
1. Customer places order → status `pending`, `notifyOrderPlaced()` notifies cashier+kitchen
2. Cashier accepts (`acceptCashierOrder`) → `o.accepted=true`, notifies kitchen
3. Kitchen cooks items (per-item `status`); can reject with reason → status `rejected`, frees table
4. `updateItemStatus()` checks if ALL items "ready" → `o.status = "ready"`, notifies customer+cashier
5. Cashier processes payment → `payment_status="paid"`
6. Delivery: courier picks up (`acceptDelivery` → `delivering`), tracks GPS, completes → if unpaid+COD → `delivered` (cashier settles with `settleDelivery`); if paid → `completed`

## Payment flow
- `processPayment(id)` → digital (paid)
- `processCashPayment(id)` → cash (paid)
- `settleDelivery(id)` → COD (paid + completed)
- `payOrder(id)` → customer pays via qris from order detail modal

## Cart system
- **Customer/waiter cart**: `State.cart[]`, cleared on logout & after order
- **Cashier cart**: `State.cashierCart[]` (separate)
- Cart dedup: `addToCart()` matches by `menu_item_id + notes` → increments qty
- Dine-in pay-later: cart items append to existing unpaid order for same table+user → status back to `pending`

## Promo system
- `State.activePromoId` set at customer cart view
- `calcPromoDiscount()`: applies percent/fixed discount on eligible items (filtered by `promo.menu_ids`), then 10% tax on discounted subtotal
- Promo carousel: auto-rotates 5s, pauses on hover, draggable. Recreated by `afterRender()`.

## Charts (hooks.js)
8 chart IDs: `chart-cashier`, `chart-revenue`, `chart-admin-revenue`, `chart-finance-detail`, `chart-orders`, `chart-playground`, `chart-expense-category`, `chart-cashflow`. All dark-themed. Stale instances destroyed before recreation.

## Leaflet maps
- Used in: courier active view, customer tracking modal, delivery location picker, check-in preview
- Tiles: Google satellite (`mt1.google.com/vt/lyrs=y`) or Esri satellite for courier
- Re-init after render (DOM replaced). Stale instances in `State.mapInstances`, destroyed before recreation.
- `closeModal()` cleans map keys starting with `"modal-"` or equal `"tracking"`.
- Check-in uses geo-fence radius (`ARQA_RADIUS = 200m` from `ARQA_COORDS`).

## Shared views (`view/shared/*.js`)
All defined in individual files under `view/shared/`: `finance.js` (renderFinanceReport), `stock.js` (renderStockManagement), `expense.js` (renderExpenseManagement), `attendance.js` (renderAttendance), `promos.js` (renderAdminPromos), `tables-mgmt.js` (renderAdminTablesMgmt), `menu-mgmt.js` (renderAdminMenuMgmt), `menu-crud.js`, `table-detail.js`, `image-helpers.js`.

## Modal system (`modal.js`)
- `showModal(html, callback)` — callback fires 50ms after append (for chart/map init)
- `closeModal()` — stops QR scanner, destroys modal-scoped map instances
- `modalQty` global tracks quantity; reset to 1 after addToCart

## Toast system (`toast.js`)
- `showToast(msg, type)` where type: success|warning|error|info. Auto-dismiss 3.5s.

## Key behavior notes
- `DB.dailySales` is **static seed data** — never updated at runtime. Revenue reports use `DB.orders` directly.
- `DB.expenses` IS updated at runtime (stock restock, manual entry, courier ongkir).
- `renderStockManagement()` sorts items by depletion ratio ascending.
- Manager `tab` parameter in stock view filters by which menu items use the stock.
- Admin & manager share `view/admin/users.js` for user CRUD.
- `view/cook/mitra.js` (`renderMitraView`) is a filtered kitchen view: only sees orders containing menu items where `submitted_by === State.currentUser.name`.
- Service open/close controlled via `isServiceClosed()` in `view/admin/overview.js:355`, polled every 15s by `initServiceStatusTimer()`. Service control includes weekly schedule (`cafe.serviceSchedule`), manual override (`cafe.serviceStatus`), and date exceptions (`cafe.specialDates`).
- Playground timer (`initPlaygroundTimer()`) updates countdown every 1s on tickets view.
- Mitra payouts auto-created in `createMitraPayouts()` when an order involving mitra items is paid.
- Pricing rates in `cafe.rates`: courier service_fee (5% of shipping), mitra service_fee (5% of item total), customer service_fee (fixed Rp 1000).
- **Self-registration**: Customers can register via `registerCustomer()` in login flow. Mitra/courier registrations go through `submitMitraRegistration()` → `mitraRegistrations[]` admin approval → user creation.
- **Forgot password**: `resetPassword()` resets to `"password123"` — no email, instant reset.
- **Ongkir tracking**: Orders can have `ongkir_status` (`unpaid`/`paid`/`confirmed`). Courier confirms ongkir via `confirmOngkir()`, cashier settles via `confirmPayOngkir()` and `confirmSettleDelivery()`.
- **Walk-in orders**: Cashier creates manual orders with `user_id = "walk-in"`, default name `"Pelanggan Offline"`, auto-set `accepted = true` (skip cashier acceptance).
- **Invoice printing**: 5 invoice print functions — `printCashierInvoice`, `printOngkirInvoice`, `printMitraInvoice`, `printPlaygroundInvoice`, `printInvoice` (customer) — each opens a new window with print dialog.
- **Cashier cart**: Separate `State.cashierCart[]` for manual orders, with `renderCashierCreateOrder()` and `editCashierOrder()` flows. Editing loads items into cashier cart, resets items to `pending`.
- **Waiter flow**: Waiter-assisted orders record `waiter_id` on the order. Waiters must check-in before accessing menu.
