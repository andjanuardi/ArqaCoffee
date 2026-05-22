# ARQA Coffee — Agent Guide

## Project
Vanilla JS SPA (no bundler/framework). Café management with 6 roles: admin, manager, cashier, kitchen, courier, customer. All UI in Indonesian, dark theme. No test runner, no lint/typecheck config, no persistence (data resets on reload).

## How to run
Open `index.html` in a browser. No build step, no dev server, no npm install.

## Script load order (18 scripts via `<script src="">`)
data.js → helpers.js → toast.js → notifications.js → render.js → login.js → shell.js → customer.js → cashier.js → kitchen.js → courier.js → manager.js → admin.js → profile.js → modal.js → hooks.js → init.js

CDN deps (loaded before app scripts): Tailwind 3, Leaflet 1.9.4, Chart.js, Font Awesome 6, Google Fonts (Poppins + Playfair Display).

## Entry & render flow
1. `init.js` calls `render()`.
2. `render()` (render.js) switches on `State.currentUser`:
   - `null` → `renderLogin()`, then `afterLoginRender()` (no-op)
   - defined → `renderMainApp()`, then `afterRender()`
3. `renderMainApp()` (shell.js) delegates to `renderXxxView()` based on `State.currentUser.role`.
4. Each `renderXxxView()` checks `State.currentTab[role]` and delegates to a tab-specific function.
5. `afterRender()` (hooks.js) calls `initCharts()`, `initMaps()`, `initPromoCarousel()`.
6. **Always call `render()` after any data mutation** to refresh the UI.

## State (data.js:700)
```js
const State = {
  currentUser: null,   // obj from DB.users
  currentView: "login",
  currentTab: {},      // { admin: 'overview', customer: 'menu', ... }
  cart: [],            // [{ menu_item_id, quantity, unit_price, notes, menu_item }]
  selectedTable: null, // table id string or null
  orderType: "dine-in", // "dine-in" | "delivery"
  notifications: [],   // pushed by addNotification()
  mapInstances: {},    // { orderId: L.map, 'tracking': L.map }
  chartInstances: {},  // { 'chart-revenue': Chart, ... }
  wizardStep: 0,
  searchQuery: "",
  selectedCategory: "all",
  editingOrder: null,
  sidebarOpen: false,
  // Runtime-only (set from customer.js): activePromoId, payTiming, deliveryAddress, deliveryLocation, deliveryDetail
  // Runtime-only (set from cashier.js): cashierCart[], cashierSearchQuery, cashierSelectedCategory, editingOrderId
  // Runtime-only (set from admin.js): adminMenuFilter, stockSearch, stockMenuFilter
};
```

## DB data structures (data.js)
| Property | Shape | Notes |
|---|---|---|
| `DB.users` | `[{id, name, email, password, role, phone, avatar}]` | IDs `u1..uN` |
| `DB.tables` | `[{id, number, qr_code, status}]` | status: "available"\|"occupied". IDs `t1..tN` |
| `DB.menuItems` | `[{id, name, description, price, category, image, is_available}]` | categories: coffee/non-coffee/food/snack. IDs `m1..mN` |
| `DB.orders` | `[{id, user_id, table_id, order_type, status, total_amount, payment_method, payment_status, delivery_address, items, courier_id?, customer_name?, promo_id?, promo_discount?, accepted?, reject_reason?}]` | status: pending→cooking→ready→delivering→delivered→completed\|cancelled\|rejected. Items `[{menu_item_id, quantity, unit_price, notes, status}]` |
| `DB.stockItems` | `[{id, name, unit, current_quantity, min_quantity, updated_at}]` | IDs `s1..sN` |
| `DB.menuStockMapping` | `{menuId: [stockId, ...]}` | Used by autoUpdateMenuAvailability() |
| `DB.stockMovements` | `[{id, stock_item_id, user_id, type, quantity, notes, created_at}]` | type: "in"\|"out" |
| `DB.attendances` | `[{id, user_id, check_in, check_out?, lat?, lng?, status}]` | check_out null = still working |
| `DB.courierTracking` | `[{id, order_id, courier_id, latitude, longitude, recorded_at}]` | |
| `DB.promos` | `[{id, code, title, icon, color, desc, discount_type?, discount_value?, start_date?, end_date?, menu_ids?, terms, is_active}]` | discount_type: "percent"\|"fixed" |
| `DB.dailySales` | `[{date, revenue, orders}]` | 7-day rolling window |
| `DB.expenses` | `[{date, category, amount, note}]` | categories: Bahan Baku/Operasional/Gaji/Lainnya |

## ID patterns & generation
- Predefined IDs: `u1..uN`, `o1..oN`, `m1..mN`, `s1..sN`, `t1..tN`, `p1..pN`, `a1..aN`, `sm1..smN`, `ct1..ctN`
- New IDs: use `'u' + Date.now()`, `'m' + Date.now()`, `'o' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)` (wrapped in `genId()`)
- Notification IDs: `'n' + Date.now() + Math.random()...`

## Key helper functions (helpers.js & data.js)
- `formatCurrency(n)` → `"Rp 18.000"` (uses `toLocaleString('id-ID')`)
- `formatDate(d)` / `formatTime(d)` — Indonesian locale
- `getMenuItem(id)`, `getTable(id)`, `getUser(id)`
- `genId()` → order ID like `"okf3a8x3b"`
- `getStatusLabel(s)` — maps English status → Indonesian: pending→Menunggu, cooking→Dimasak, ready→Siap Saji, delivering→Diantar, delivered→Telah Diantar, completed→Selesai, cancelled→Dibatalkan
- `getStatusBadge(s)` — maps status → CSS class: pending→badge-pending, cooking→badge-cooking, ready→badge-ready, delivering→badge-delivering, completed→badge-completed
- `getOrderTypeName(t)` → `"Dine-In"` or `"Delivery"`
- `getRoleLabel(r)` → Indonesian role name
- `getDefaultTab(role)` → maps role to first tab id (admin→overview, manager→dashboard, cashier→orders, kitchen→queue, courier→available, customer→menu)

## Rendering conventions
- **All functions are global** — no `import`/`export` or module system.
- Template literals → `.innerHTML` assignment. Never use createElement for view building.
- Tab nav pattern: `State.currentTab[role] = 'tabname'` + `render()`.
- Clickable cards with nested buttons: **always** call `event.stopPropagation()` on buttons inside cards (promo toggle, menu avail toggle, table delete).
- Admin & manager use **side drawer** (nav items in shell.js). All other roles use **bottom nav**.
- Animations: `animate-fade-up` class on top-level container div per view.
- After render, `initCharts()` looks for DOM elements by known IDs (`chart-cashier`, `chart-revenue`, `chart-admin-revenue`, `chart-finance-detail`, `chart-orders`, `chart-expense-category`, `chart-cashflow`) and creates Chart.js instances. It destroys all stale instances first.

## Navigation (shell.js)
**Bottom nav tabs per role:**
- customer: menu, cart (`notif-dot` when cart non-empty), orders, profile
- cashier: orders, payment, report, tables-mgmt, profile
- kitchen: queue, history, profile
- courier: available, active, history, profile
- admin: overview, promos, attendance, profile
- manager: dashboard, promos, attendance, profile

**Side drawer tabs (admin):** overview, users, menu-mgmt, tables-mgmt, promos, finance, stock, attendance
**Side drawer tabs (manager):** dashboard, users, menu-mgmt, tables-mgmt, promos, finance, stock, attendance, profile

**Switch tab:** `switchTab(id)` sets `State.currentTab[role] = id` then `render()`.
**Logout:** `handleLogout()` clears user, cart, sidebar, destroys all map/chart instances, then `render()`.

## Login flow (login.js)
- `renderLogin()` shows 6 role cards → each calls `quickLogin(role)`.
- `quickLogin(role)` finds the user by role, sets `State.currentUser`, `State.currentView='main'`, sets default tab, calls `render()`, shows toast.
- `handleLogin()` reads email/password from DOM inputs, matches against `DB.users`.
- `registerCustomer()` adds a new user with role "customer" to `DB.users`.
- `resetPassword()` sets password to `"password123"` for any email match.

## Credentials
| Role | Email | Password |
|---|---|---|
| admin | admin@arqa.coffee | admin123 |
| manager | manager@arqa.coffee | manager123 |
| cashier | kasir@arqa.coffee | kasir123 |
| kitchen | dapur@arqa.coffee | dapur123 |
| courier | kurir@arqa.coffee | kurir123 |
| customer | customer@arqa.coffee | customer123 |

## Order lifecycle
1. **Customer** places order → status: "pending", notification sent to cashier+kitchen
2. **Cashier** can accept (`acceptCashierOrder`) or cancel; accepting sets `o.accepted=true`, notifies kitchen
3. **Kitchen** sees items. Can reject with reason (sets `o.status="rejected"`, frees table) or cook each item
4. When cooking starts (`updateItemStatus` with `'cooking'`): stock is deducted per `DB.menuStockMapping`, `autoUpdateMenuAvailability()` runs, low-stock notifications fire
5. When all items are "ready" → `o.status = "ready"`, notifies customer+cashier
6. **Cashier** processes payment → `o.payment_status="paid"`, or marks as completed for paid orders
7. **Delivery** orders: after ready, **courier** picks up (`acceptDelivery` → status "delivering"), adds tracking
8. Courier completes → if unpaid+COD → status "delivered" (waits for cashier settlement). If already paid → "completed"
9. **Cashier** settles delivery (`settleDelivery` → status "completed", payment confirmed)

## Payment flow
- `processPayment(id)`: sets `payment_status="paid"`, `payment_method="digital"`, calls `notifyPayment(o, 'Digital')`
- `processCashPayment(id)`: sets `payment_status="paid"`, `payment_method="cash"`, calls `notifyPayment(o, 'Tunai')`
- `settleDelivery(id)`: sets `payment_status="paid"`, `payment_method="cod"`, `status="completed"`, calls `notifyPayment(o, 'COD (Setoran Kurir)')`
- Customer can also `payOrder(id)` directly from order detail modal → sets paid via qris

## Cart system
- **Customer cart**: `State.cart[]` — global, cleared on logout and after order placement
- **Cashier cart**: `State.cashierCart[]` — separate from customer cart
- Cart item dedup: `addToCart()` finds existing item by `menu_item_id + notes` match; if found, increments quantity
- Cart merging for dine-in pay-later: if an existing unpaid order for the same table+user exists, items are appended rather than creating a new order

## Order merging (customer.js:643-681)
When `orderType === "dine-in"` and `payTiming === "later"`, the system checks for an existing unpaid order at the same table for the same user:
- If found: **appends** new cart items to existing order, adds to total_amount, sets status back to "pending" (if it was "served"/"ready"), clears cart
- This means the customer can keep ordering and items are accumulated into one tab

## Promo system
- Promos are applied at the customer view level: `State.activePromoId`
- `calcPromoDiscount()`: checks `activePromoId`, finds promo, checks date validity, calculates discount (fixed or percent) on eligible items
- Eligibility: if `promo.menu_ids` is non-empty, only those items; otherwise all items qualify
- Discount is subtracted from subtotal, then 10% tax is applied on the discounted amount
- Promo is applied on the cart view, discount is shown in order confirmation
- Promo data is stored on the order (`promo_id`, `promo_discount`)
- Promo carousel: auto-rotates every 5s, pauses on hover, draggable with touch+mouse. Destroyed/recreated by `afterRender()` via `initPromoCarousel()`

## Promo data model
Promo objects can have fields beyond the base `id, code, title, icon, color, desc, terms, is_active`:
- `discount_type`: "percent" | "fixed" (added by admin/mgr promo modals)
- `discount_value`: number
- `start_date` / `end_date`
- `menu_ids`: array of menu item IDs this promo applies to (empty = all menus)
- `image`: promo banner image URL

## Kitchen stock deduction (kitchen.js:95-133)
When an item status is set to "cooking":
1. Look up `DB.menuStockMapping[menuItemId]`
2. For each ingredient: `recipeQty × orderQty`, deduct from `stockItem.current_quantity`
3. Push a `stockMovement` record
4. If stock drops to or below `min_quantity`, call `notifyLowStock(s)` — notifies manager+admin
5. Call `autoUpdateMenuAvailability()` — checks each menu item's stock dependencies and marks as unavailable if any ingredient is insufficient

## Auto availability (admin.js:275-303)
`autoUpdateMenuAvailability()` is called:
- After stock adjustments (`adjustStock()`)
- After stock deduction from cooking
- At the start of `renderAdminMenuMgmt()`
- It iterates `DB.menuItems`, checks `DB.menuStockMapping[m.id]`, verifies stock sufficiency, toggles `is_available`, and notifies cashier+kitchen if auto-marked unavailable

## Notification types & routing (notifications.js)
| Function | targetRoles |
|---|---|
| `notifyOrderPlaced(order, customerName)` | cashier, kitchen (order) + customer (confirmation) |
| `notifyStatusChange(order, newStatus)` | varies: cooking→customer+cashier, ready→customer+cashier, delivering→customer+cashier+courier, completed→customer+cashier+courier |
| `notifyPayment(order, method)` | cashier, manager, admin (payment) + customer (confirmation) |
| `notifyRejected(order, reason)` | customer, cashier |
| `notifyDeliveryTaken(order, courierName)` | customer, cashier |
| `notifyDeliveryCompleted(order)` | customer, cashier, courier |
| `notifyLowStock(stockItem)` | manager, admin |

`addNotification(opts)`: accepts `{title, message, type, icon, targetRoles, relatedOrderId}`. Types: order, payment, stock, delivery, warning, info.

## Cashier manual order flow (cashier.js:282-528)
- `State.cashierCart[]`, `State.cashierSearchQuery`, `State.cashierSelectedCategory`, `State.editingOrderId`
- `renderCashierCreateOrder()`: menu grid, cart sidebar with qty controls, order type (dine-in/takeaway), table selection, payment status
- `submitCashierOrder()`: opens modal with customer name, order type, table, payment status options
- `finalizeManualOrder()`: creates order with `user_id: "walk-in"`, `customer_name` field (not from DB.users), supports editing existing orders via `State.editingOrderId`
- Payment: cashier can set "Sudah Lunas" (status="paid") or "Belum Bayar" (status="unpaid")
- `editCashierOrder(id)`: loads existing order items into cashier cart, sets `State.editingOrderId`, switches to create tab

## Courier flow (courier.js)
- Available tab: shows delivery orders with status "ready" (no courier assigned)
- `acceptDelivery(id)`: sets `courier_id`, `status="delivering"`, adds initial tracking point
- Active tab: shows deliveries for current courier with map (Leaflet + Esri satellite tiles)
- `simulateMove(orderId)`: adds a random tracking point near the last one (simulates GPS)
- `completeDelivery(id)`: if unpaid+COD → status "delivered" (cashier must settle). If paid → "completed"
- Courier can reject: reason dialog, clears courier_id, notifies manager+admin

## Leaflet maps
- Used in: courier active view, customer tracking modal, delivery location picker
- Tiles: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}` (Esri satellite)
- Maps must be re-initialized after render because DOM is replaced. Stale map instances are stored in `State.mapInstances` and destroyed before recreation.
- `closeModal()` cleans up any `mapInstances` whose keys start with "modal-" or equal "tracking"

## Profile & attendance (profile.js)
- All roles use `renderGenericProfile()` (except customer which has its own)
- Staff (manager, cashier, kitchen, courier) see a geo-attendance card
- `staffCheckIn()`: uses `navigator.geolocation` to capture lat/lng, creates attendance record with `check_out: null`
- `staffCheckOut()`: finds today's active record, sets `check_out` timestamp. Falls back gracefully if geolocation fails
- Attendance records persist in `DB.attendances[]`

## Shared views (reused between admin.js and manager.js)
All defined in admin.js, callable from manager.js:
- `renderFinanceReport()` — revenue/expense/profit stats, 4 charts (finance-detail, expense-category, cashflow, orders), top products, daily transactions
- `renderStockManagement()` — stock CRUD, search/filter/by-menu, auto-sorted by depletion ratio, progress bars, adjust in/out buttons
- `renderAttendance()` — staff list with check-in status, click to view daily+monthly report modal
- `renderAdminPromos()` — promo list, toggle active/inactive, edit/delete
- `renderAdminTablesMgmt()` — table grid with delete and status toggle
- `renderAdminMenuMgmt()` — menu list with category filter, availability toggle, add/edit/delete menu (with image upload/URL)

## Modal system (modal.js)
- `showModal(html, callback)`: creates overlay with content, appends to body. Callback fires 50ms after (for chart/map init).
- `closeModal()`: removes overlay, nullifies callback, destroys modal-scoped map instances (key starts with "modal-" or equals "tracking")
- Modal content is a `<div class="modal-content">` inside `<div class="modal-overlay">`. Clicking overlay outside content closes.
- `modalQty` (global) tracks quantity in item detail modal. Reset to 1 after addToCart.

## Toast system (toast.js)
- `showToast(msg, type)` where type = "success"|"warning"|"error"|"info"
- Toasts auto-dismiss after 3.5s with slide-out animation
- Container: `<div class="toast-container" id="toasts">` in index.html

## CSS conventions (style.css)
- CSS variables: `--bg` (#0a1a1f), `--bg2`, `--card`, `--card2`, `--accent` (#e07a3a), `--accent2`, `--accent3`, `--text`, `--muted` (#7a9ba5), `--border` (#1f3d4a), `--success` (#27ae60), `--warning` (#f39c12), `--danger` (#e74c3c)
- Fonts: Poppins (body), Playfair Display (`.font-display` class for headings)
- Animation classes: `.animate-fade-up`, `.animate-float`, `.animate-breathe` (pulsing glow for pending items)
- Badge classes: `.badge-pending` (yellow), `.badge-cooking` (orange), `.badge-ready` (green), `.badge-delivering` (blue), `.badge-completed` (gray), `.badge-paid`, `.badge-unpaid`
- Buttons: `.btn-primary` (accent gradient), `.btn-secondary` (card bg+border), `.btn-sm`, `.btn-danger`
- `.card` — standard container with border+hover
- `.stat-card` — small stat display with hover lift
- `.menu-card` — menu grid item with image
- `.order-card` — clickable order display
- `.input-field` — dark input with accent focus
- `.stock-bar` / `.stock-bar-fill` — horizontal stock progress bar
- `.qty-btn` — quantity +/- button
- `.category-chip` — pill-shaped filter button
- Promo carousel styles: `.promo-carousel`, `.promo-track`, `.promo-card`, `.promo-dots`, `.promo-dot`
- Side drawer: `.side-drawer` (hidden by default, `.open` to show + `.drawer-overlay` backdrop)
- Bottom nav: `.bottom-nav` fixed at bottom, `.nav-item.active` with accent color
- QR scanner: `.qr-scanner-area` with animated `.qr-line` and corner brackets
- Responsive: 768px breakpoint reduces drawer width, adds modal margin
- `prefers-reduced-motion`: disables all animations

## Chart configs (hooks.js)
All Chart.js instances created from DOM elements by id. IDs and types:
| DOM ID | Type | Data |
|---|---|---|
| `chart-cashier` | bar | daily revenue |
| `chart-revenue` | line | daily revenue |
| `chart-admin-revenue` | line | daily revenue |
| `chart-finance-detail` | bar | revenue + order count dual dataset |
| `chart-orders` | doughnut | dine-in active / delivery active / completed |
| `chart-expense-category` | horizontal bar | expense by category (aggregated) |
| `chart-cashflow` | bar | revenue vs expense per day (green/red) |

All charts use dark theme colors (tick color #7a9ba5, grid rgba(31,61,74,0.5), legend color #f0ebe3 where applicable).

## Table detail modal (admin.js:83-113, manager.js:409-448)
Admin version: shows table status, orders (avoids "rejected"), no stats grid
Manager version (`showTableDetail`): shows table status, total orders count + revenue stats grid, active orders. Both callable from their respective scopes.

## Important behavior notes
- `event.stopPropagation()` required on: promo active toggle, menu availability toggle inside Edit/Add modals, table delete button, any button rendered inside a clickable card/row
- `render()` after EVERY mutation: orders, menu edits, stock changes, promo toggles, attendance, user CRUD, cart changes, table status
- `DB.dailySales` and `DB.expenses` are static seed data — they are never updated by runtime operations. Revenue calculations in reports use `DB.orders` directly.
- Customer order addresses are stored in `State.deliveryAddress`/`State.deliveryDetail`/`State.deliveryLocation` before submission
- Delivery location picker uses a Leaflet map in a modal — the picked coordinates are stored but actual location saving logic appears to use a placeholder
- Menu item images use picsum.photos with seed param for consistency, plus `onerror` fallback
- The `tab` parameter menu (manager.js:144-157) filters stock items by which menu they're used in
- `renderStockManagement()` sorts items by depletion ratio ascending (lowest first)
- `updateItemStatus()` checks if ALL order items are "ready" to set order-level status to "ready"
