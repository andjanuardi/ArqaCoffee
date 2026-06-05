# ARQA Coffee — Agent Guide

## Project
Vanilla JS SPA (no bundler/framework). Café management with **9 roles**: admin, manager, cashier, kitchen, courier, customer, waiter, playground, mitra_juru_masak. All UI in Indonesian, dark theme. No test runner, no lint/typecheck config.

**Data persisted to localStorage** (key `arqa_db`) — auto-saves every 3s via `setInterval` in `init.js`. Clear with `localStorage.clear()`.

## How to run
Open `index.html` in a browser. No build step, no dev server, no npm install.

## CDN deps (loaded in index.html before app scripts)
Tailwind 3, Leaflet 1.9.4, Chart.js, html5-qrcode, Font Awesome 6, Google Fonts (Poppins + Playfair Display).

## Script load order (55 scripts via sequential `<script src="">`)
Order matters — no module system, all functions are global:
`data/db.js` → `state/store.js` → `helpers.js` → `components/toast.js` → `components/notifications.js` → `components/modal.js` → `view/core/render.js` → `view/core/login.js` → `view/core/shell.js` → `view/shared/finance.js` → `view/shared/stock.js` → `view/shared/expense.js` → `view/shared/attendance.js` → `view/shared/table-detail.js` → `view/shared/menu-mgmt.js` → `view/shared/image-helpers.js` → `view/shared/menu-crud.js` → `view/shared/tables-mgmt.js` → `view/shared/promos.js` → `view/customer/*` (11 files) → `view/waiter/menu.js` → `view/playground/*` (5 files) → `view/cashier/*` (5 files) → `view/kitchen/*` (3 files) → `view/cook/mitra.js` → `view/courier/*` (4 files) → `view/manager/index.js` → `view/admin/*` (2 files) → `view/core/profile.js` → `components/hooks.js` → `init.js`

## Entry & render flow
1. `init.js` → `render()`
2. `render()` (render.js): `State.currentUser` null → `renderLogin()`; defined → `renderMainApp()` then `afterRender()`
3. `renderMainApp()` (shell.js) delegates to `renderXxxView()` by `State.currentUser.role`
4. Each view checks `State.currentTab[role]` and delegates to a tab function
5. `afterRender()` (hooks.js): `initCharts()`, `initMaps()`, `initPromoCarousel()`
6. **Call `render()` after every data mutation** to refresh UI

## State (`store.js:1`)
```js
const State = {
  currentUser: null, currentView: "login", currentTab: {},
  cart: [], selectedTable: null, orderType: "dine-in",
  notifications: [], mapInstances: {}, chartInstances: {},
  wizardStep: 0, searchQuery: "", selectedCategory: "all",
  editingOrder: null, sidebarOpen: false,
  courierStatus: "offline", courierPosition: null,
  // Runtime-only: activePromoId, payTiming, deliveryAddress/Location/Detail
  // cashierCart[], cashierSearchQuery, cashierSelectedCategory, editingOrderId
  // adminMenuFilter, stockSearch, stockMenuFilter, expenseSearch, expenseCategory, expenseDate
};
```

## DB data structures (`data/db.js`)
| Key | Shape | Notes |
|---|---|---|
| `users` | `[{id, name, email, password, role, phone, avatar, address}]` | roles: admin\|manager\|cashier\|kitchen\|courier\|customer\|waiter\|playground\|mitra_juru_masak |
| `tables` | `[{id, number, qr_code, status, capacity}]` | status: available\|occupied |
| `menuItems` | `[{id, name, description, price, category, image, is_available}]` | categories: coffee\|non-coffee\|food\|snack |
| `orders` | `[{id, user_id, table_id, order_type, status, total_amount, payment_method, payment_status, delivery_address, delivery_detail, delivery_location, customer_name, accepted, promo_id, promo_discount, items, courier_id?, reject_reason?, messages?, lastReadAt?}]` | items `[{menu_item_id, quantity, unit_price, notes, status}]`, status: pending→cooking→ready→delivering→delivered→completed\|cancelled\|rejected |
| `stockItems` | `[{id, name, unit, current_quantity, min_quantity}]` | |
| `stockMovements` | `[{id, stock_item_id, user_id, type, quantity, notes}]` | type: in\|out |
| `attendances` | `[{id, user_id, check_in, check_out?, lat, lng, status}]` | check_out null = still working |
| `courierTracking` | `[{id, order_id, courier_id, latitude, longitude, recorded_at}]` | |
| `promos` | `[{id, code, title, icon, color, desc, discount_type, discount_value, start_date?, end_date?, menu_ids, image, terms, is_active}]` | discount_type: percent\|fixed |
| `dailySales` | `[{date, revenue, orders}]` | static seed (7-day rolling) |
| `expenses` | `[{date, category, amount, note}]` | static seed |
| `cafe` | `{location: {lat, lng}, shipping: {rate_per_km, min, max}}` | runtime config |
| `playgroundTickets` | `[{id, customer_name, children, companions, hours, start_time, end_time, status, total_amount, payment_status, ...}]` | playground ticketing |
| `pgStockItems` | `[{id, name, price, unit, category, stock, image}]` | playground inventory |

## ID patterns & generation
- Predefined: `u1..uN`, `o1..oN`, `m1..uN`, `s1..sN`, `t1..tN`, `p1..pN`, `a1..aN`, `sm1..smN`, `ct1..ctN`
- New IDs: `'u' + Date.now()`, `'m' + Date.now()`, `'o' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)` (`genId()`)
- Notification IDs: `'n' + Date.now() + Math.random()`

## Key helpers (`helpers.js`)
- `formatCurrency(n)` → `"Rp 18.000"` (id-ID locale)
- `formatDate(d)` / `formatTime(d)` — Indonesian locale
- `getMenuItem(id)`, `getTable(id)`, `getUser(id)`
- `genId()` → order ID like `"okf3a8x3b"`
- `getStatusLabel(s)` / `getStatusBadge(s)` — status → Indonesian / CSS class
- `getOrderTypeName(t)` → `"Dine-In"` / `"Takeaway"` / `"Delivery"`
- `getRoleLabel(r)` / `getDefaultTab(role)`
- `calcItemTax(items)` — per-item tax from `menuItem.tax_percentage`
- `hasActiveCourier()` / `isMitraActive(name)` — checks today's attendance
- `getShippingConfig()` / `calcShippingCost(lat, lng)` — distance-based shipping fee

## Rendering conventions
- **All functions are global** — no imports/exports. Template literals → `.innerHTML`.
- Tab nav: `State.currentTab[role] = 'tabName'` + `render()`.
- `event.stopPropagation()` on any button inside a clickable card/row (promo toggle, menu avail toggle, delete buttons, etc.).
- Admin & manager use **side drawer**; all other roles use **bottom nav**.
- Top-level view container: `class="animate-fade-up"`.
- Menu images use picsum.photos (seed param) + `onerror` fallback.

## Navigation tabs (shell.js)
| Role | Tabs |
|---|---|
| customer | menu, cart, orders, profile |
| waiter | menu, cart, orders, profile |
| cashier | orders, payment, report, tables-mgmt, profile |
| kitchen | queue, history, profile |
| courier | available, active, history, profile |
| admin | side drawer: overview, users, menu-mgmt, tables-mgmt, promos, finance, stock, attendance, profile |
| manager | side drawer: dashboard, users, menu-mgmt, tables-mgmt, promos, finance, stock, attendance, profile |
| playground | bottom nav: tickets, report (finance), stock, profile |
| mitra_juru_masak | bottom nav: queue, history, menu-mgmt, finance, profile |

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
1. Customer places order → status `pending`, notification to cashier+kitchen
2. Cashier accepts (`acceptCashierOrder`) → `o.accepted=true`, notifies kitchen
3. Kitchen cooks items (per-item status); can reject with reason → status `rejected`, frees table
4. All items "ready" → `o.status = "ready"`, notifies customer+cashier
5. Cashier processes payment → `payment_status="paid"`
6. Delivery: courier picks up (`acceptDelivery` → `delivering`), tracks GPS, completes → if unpaid+COD → `delivered` (cashier settles with `settleDelivery`); if paid → `completed`

## Payment flow
- `processPayment(id)` → digital (paid)
- `processCashPayment(id)` → cash (paid)
- `settleDelivery(id)` → COD (paid + completed)
- `payOrder(id)` → customer pays via qris from order detail modal

## Cart system
- **Customer/waiter cart**: `State.cart[]` (global), cleared on logout & after order
- **Cashier cart**: `State.cashierCart[]` (separate)
- Cart dedup: `addToCart()` matches by `menu_item_id + notes` → increments qty
- Dine-in pay-later: cart items append to existing unpaid order for same table+user → status back to `pending`

## Promo system
- `State.activePromoId` set at customer cart view
- `calcPromoDiscount()`: applies percent/fixed discount on eligible items (filtered by `promo.menu_ids`), then 10% tax on discounted subtotal
- Promo carousel: auto-rotates 5s, pauses on hover, draggable. Recreated by `afterRender()`.

## Notification types (`notifications.js`)
Functions: `notifyOrderPlaced`, `notifyStatusChange`, `notifyPayment`, `notifyRejected`, `notifyDeliveryTaken`, `notifyDeliveryCompleted`, `notifyLowStock`. Target roles vary per function. `addNotification({title, message, type, icon, targetRoles, relatedOrderId})`.

## Cashier manual order flow (`cashier.js`)
- `State.cashierCart[]` — separate from customer cart
- `submitCashierOrder()` → modal for customer name, type, table, payment status
- `finalizeManualOrder()`: creates order with `user_id: "walk-in"`, `customer_name` field
- `editCashierOrder(id)`: loads existing order items into cashier cart, sets `State.editingOrderId`

## Courier flow (`courier.js`)
- Available tab: delivery orders with status `ready` (no courier)
- `acceptDelivery(id)`: sets `courier_id`, status → `delivering`, adds initial tracking point
- Active tab: Leaflet map with Esri satellite tiles + `simulateMove(orderId)` (random GPS point)
- `completeDelivery(id)`: if unpaid+COD → `delivered` (waits for cashier settlement); if paid → `completed`

## Leaflet maps
- Used in: courier active view, customer tracking modal, delivery location picker
- Tiles: Esri satellite (`server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/...`)
- Re-init after render (DOM replaced). Stale instances in `State.mapInstances`, destroyed before recreation.
- `closeModal()` cleans map keys starting with `"modal-"` or equal `"tracking"`.

## Profile & attendance (`profile.js`)
- All roles use `renderGenericProfile()` except customer (own profile)
- Staff roles see geo-attendance card: `staffCheckIn()` / `staffCheckOut()` via `navigator.geolocation`

## Shared views (`view/shared/*.js`, admin.js, manager.js)
All defined in admin.js, callable from manager.js: `renderFinanceReport`, `renderStockManagement`, `renderAttendance`, `renderAdminPromos`, `renderAdminTablesMgmt`, `renderAdminMenuMgmt`. Plus `renderExpenseManagement()` in expense.js.

## Modal system (`modal.js`)
- `showModal(html, callback)` — callback fires 50ms after append (for chart/map init)
- `closeModal()` — destroys modal-scoped map instances
- `modalQty` global tracks quantity in item detail modal; reset to 1 after addToCart

## Toast system (`toast.js`)
- `showToast(msg, type)` where type: success|warning|error|info. Auto-dismiss 3.5s.

## Important behavior notes
- `DB.dailySales` and `DB.expenses` are static seed data — never updated at runtime. Revenue reports use `DB.orders` directly.
- Delivery location picker stores coordinates in `State.deliveryLocation` but actual saving uses a placeholder.
- `renderStockManagement()` sorts items by depletion ratio ascending.
- `updateItemStatus()` checks if ALL order items are "ready" to set order status to "ready".
- The `tab` parameter in manager.js filters stock items by which menu they're used in.
- Charts (hooks.js): 7 chart IDs (`chart-cashier`, `chart-revenue`, `chart-admin-revenue`, `chart-finance-detail`, `chart-orders`, `chart-expense-category`, `chart-cashflow`), all dark-themed. Destroy stale instances before creation.
- Admin & manager share `view/admin/users.js` for user CRUD.
- `view/cook/mitra.js` (`renderMitraView`) is a filtered kitchen view: only sees orders containing menu items where `submitted_by === State.currentUser.name`.
