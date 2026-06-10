# 📦 Database Guide — ARQA Coffee

**Complete Reference for Migrating the localStorage Data Layer**

---

## 1. Overview

| Property | Value |
|---|---|
| Storage | `localStorage` key `arqa_db` |
| Save interval | Every 1 second (`setInterval` in `init.js:213`) |
| Load on init | `loadDB()` at top of `data/db.js:6` |
| Seed data | Provided inline in `data/db.js:24-815` |
| Cross-tab sync | `window.addEventListener('storage')` in `init.js:215-236` |
| Notifications storage | Separate key `arqa_notifications` (manually read/written) |
| Session storage | `sessionStorage` key `arqa_session` (login persistence) |

### Load / Save Functions

| Function | File:Line | Description |
|---|---|---|
| `loadDB()` | `data/db.js:6` | Reads localStorage, returns parsed object or null |
| `saveDB()` | `data/db.js:14` | Writes `JSON.stringify(DB)` to localStorage |

---

## 2. Collections

### 2.1 `users`

```js
{
  id: "u1",                    // String — "u" + number | "u" + Date.now()
  name: "Admin ARQA",          // String — full name
  email: "admin@arqa.coffee",  // String — unique identifier
  password: "admin123",        // String — plaintext (MVP)
  role: "admin",               // String — one of 9 roles
  phone: "081234567890",       // String
  avatar: "A",                 // String — first initial uppercase
  address: "",                 // String — optional
  business_name: "",           // String — optional (mitra_juru_masak only)
  mitra_position: null,        // Object | null — { lat, lng } for mitra_juru_masak
}
```

**Roles:** `admin | manager | cashier | kitchen | courier | customer | waiter | playground | mitra_juru_masak`

**Seed users (9):** u1 (admin), u2 (manager), u3 (cashier), u4 (kitchen), u5 (courier), u6 (customer), u7 (waiter), u8 (playground), u9 (mitra_juru_masak)

---

### 2.2 `tables`

```js
{
  id: "t1",                    // String — "t" + number
  number: "1",                 // String — display number
  qr_code: "ARQA-T1",          // String — QR code content
  status: "available",         // String — "available" | "occupied"
  capacity: 2,                 // Number — seat count
}
```

**Seed data:** 8 tables (t1–t8)

---

### 2.3 `menuItems`

```js
{
  id: "m1",                          // String — "m" + number | "m" + Date.now()
  name: "Espresso",                  // String
  description: "Kopi espresso...",   // String
  price: 18000,                      // Number — price in IDR
  category: "coffee",                // String — "coffee" | "non-coffee" | "food" | "snack"
  image: "https://picsum.photos/...", // String — URL
  is_available: true,                // Boolean
  tax_percentage: 0,                 // Number — tax rate percent
  is_approved: undefined,            // Boolean | undefined — mitra menu approval
  submitted_by: undefined,           // String | undefined — mitra name who submitted
}
```

**Seed data:** 15 items (m1–m15)

---

### 2.4 `orders`

```js
{
  id: "okf3a8x3b",               // String — genId() format: "o" + Date.now().toString(36) + random
  user_id: "u6",                 // String — "walk-in" for cashier manual orders
  table_id: "t3",                // String | null
  order_type: "dine-in",         // String — "dine-in" | "takeaway" | "delivery"
  status: "pending",             // String — lifecycle status
  total_amount: 54000,           // Number
  shipping_cost: 0,              // Number
  service_fee: 0,                // Number
  payment_method: "qris",        // String — "" | "qris" | "bank_transfer" | "cash" | "digital" | "cod"
  payment_status: "paid",        // String — "paid" | "unpaid"
  delivery_address: "",          // String — full address
  delivery_detail: "",           // String — extra delivery notes
  delivery_location: null,       // Object | null — { lat, lng }
  customer_name: null,           // String | null — for walk-in orders
  customer_phone: null,          // String | null
  accepted: true,                // Boolean | null — cashier acceptance
  promo_id: null,                // String | null — promo id
  promo_discount: 0,             // Number
  courier_id: null,              // String | null
  waiter_id: null,               // String | null
  created_at: "2025-01-15T08:30:00", // ISO string
  messages: [],                  // Array — chat messages
  lastReadAt: {},                // Object — { userId: timestamp }
  reject_reason: null,           // String | null
  ongkir_status: undefined,      // String | undefined — "unpaid" | "paid" | "confirmed"
  has_mitra_items: false,        // Boolean
  mitra_approved: false,         // Boolean
  items: [
    {
      menu_item_id: "m2",
      quantity: 1,
      unit_price: 28000,
      notes: "",
      status: "cooking"          // per-item status: "pending" | "cooking" | "ready" | "rejected"
    }
  ]
}
```

**Order lifecycle statuses:** `pending` → `cooking` → `ready` → `delivering` → `delivered` → `completed` | `cancelled` | `rejected`

---

### 2.5 `stockItems`

```js
{
  id: "s1",                    // String — "s" + number
  name: "Biji Kopi Arabica",   // String
  unit: "kg",                  // String
  current_quantity: 12,        // Number
  min_quantity: 5,             // Number — threshold for low-stock alert
  price: 0,                    // Number
  updated_at: "2025-01-15",    // String — date
}
```

**Seed data:** 24 items (s1–s24, all commented out)

---

### 2.6 `stockMovements`

```js
{
  id: "sm1",                   // String — "sm" + number
  stock_item_id: "s1",         // String
  user_id: "u2",               // String
  type: "out",                 // String — "in" | "out"
  quantity: 2,                 // Number
  notes: "Pemakaian harian",   // String
  created_at: "2025-01-15T08:00:00", // ISO string
}
```

**Seed data:** 9 movements (sm1–sm9, all commented out)

---

### 2.7 `attendances`

```js
{
  id: "a1",                     // String — "a" + number
  user_id: "u3",                // String
  check_in: "2025-01-15T07:55:00", // ISO string
  check_out: null,              // ISO string | null
  lat: 2.458461,                // Number
  lng: 96.3766943,              // Number
  status: "present",            // String
}
```

**Seed data:** 5 attendances (a1–a5)

---

### 2.8 `courierTracking`

```js
{
  id: "ct1",                    // String — "ct" + number
  order_id: "o2",              // String
  courier_id: "u5",            // String
  latitude: 2.458461,          // Number
  longitude: 96.3766943,       // Number
  recorded_at: "2025-01-15T09:30:00", // ISO string
}
```

**Seed data:** 1 tracking point (ct1)

---

### 2.9 `cafe` (singleton)

```js
{
  address: "Sinabang, Simeulue...",             // String
  location: { lat: 2.458461, lng: 96.3766943 }, // Object — cafe coordinates
  shipping: {
    rate_per_km: 3000,        // Number
    min: 5000,                // Number
    max: 50000                // Number
  },
  rates: {
    courier: {
      shipping: { rate_per_km: 3000, min: 5000, max: 50000 },
      service_fee: { type: "percent", value: 5 }
    },
    mitra: {
      service_fee: { type: "percent", value: 5 }
    },
    customer: {
      service_fee: { type: "fixed", value: 1000 }
    }
  },
  serviceStatus: "open",        // String — "open" | "closed" | "force_open"
  serviceSchedule: [             // Array — 7 days
    { day: 0, name: "Senin", open: "08:00", close: "22:00" },
    // ...6 more days
  ],
  specialDates: []              // Array — { id, date, closed, note }
}
```

---

### 2.10 `promos`

```js
{
  id: "p1",                     // String — "p" + number
  code: "diskon20",             // String — unique code
  title: "Diskon 20% Kopi",     // String
  icon: "fa-percent",           // String
  color: "#E07A3A",             // String — hex
  desc: "Nikmati diskon 20%...", // String
  discount_type: "percent",     // String — "percent" | "fixed"
  discount_value: 20,           // Number
  start_date: "2025-01-01",     // String | null — date
  end_date: "2025-12-31",       // String | null — date
  menu_ids: ["m1","m2",...],    // Array — empty array = all items eligible
  image: "https://picsum.photos/...", // String
  terms: ["Berlaku setiap..."], // Array of strings
  is_active: true,              // Boolean
}
```

**Seed data:** 3 promos (p1–p3)

---

### 2.11 `dailySales`

```js
{
  date: "2025-01-09",          // String — date
  revenue: 1250000,            // Number
  orders: 32,                  // Number
}
```

**Note:** Static seed data only — never updated at runtime. Revenue reports use `DB.orders` directly.

---

### 2.12 `expenses`

```js
{
  id: "e1",                     // String — "e" + number | "exp" + Date.now()
  date: "2025-01-09",           // String
  time: "08:00",                // String — optional
  category: "Operasional",      // String
  amount: 450000,               // Number
  note: "Beli kopi dan susu",  // String
  volume: 3,                    // Number — optional
  unit: "kg",                   // String — optional
  unitPrice: 150000,            // Number — optional
  source: "cafe",               // String — optional, "cafe" | "playground"
  paymentMethod: "digital",     // String — optional
}
```

**Seed data:** 7 expenses (e1–e7, all commented out)

**Note:** Also used for stock restock logging and courier ongkir expenses.

---

### 2.13 `playgroundTickets`

```js
{
  id: "pg_demo1",                                  // String
  user_id: "u6",                                   // String — customer who booked
  customer_name: "Budi Santoso",                   // String
  children: [{ name: "Andi" }, { name: "Rudi" }], // Array — { name: String }
  companions: [{ name: "Pak Rahmat" }],           // Array — { name: String }
  companion_count: 0,                              // Number
  socks_per_child: [true, false],                  // Array of booleans
  socks_total: 10000,                              // Number
  items: [                                         // Array — snack purchases
    { menu_item_id: "ps5", name: "Mie Cup", quantity: 2, unit_price: 7000 },
  ],
  hours: 3,                                        // Number — booked hours
  start_time: "2025-01-15T09:00:00",              // ISO string
  end_time: "2025-01-15T12:00:00",                // ISO string
  subtotal: 120000,                                // Number
  items_total: 24000,                              // Number
  total_amount: 144000,                            // Number
  payment_status: "paid",                          // String — "paid" | "unpaid"
  payment_method: "qris",                          // String — "qris" | "cash" | "transfer"
  status: "active",                                // String — "active" | "completed" | "cancelled"
  created_at: "2025-01-15T08:00:00",              // ISO string
  pgTransactions: [                                // Array — extra charges
    {
      id: "pgtx1",
      type: "extra_time",                          // "extra_time" | "extra_items"
      description: "+1 jam",
      amount: 40000,
      method: "cash",
      created_at: "2025-01-15T09:30:00"
    }
  ]
}
```

**Seed data:** 5 tickets (pg_demo1–pg_demo5, dynamic dates)

---

### 2.14 `pgStockItems`

```js
{
  id: "ps1",                          // String — "ps" + number
  name: "Air Mineral 600ml",          // String
  category: "Minuman",                // String
  unit: "botol",                      // String
  current_quantity: 48,               // Number
  min_quantity: 12,                   // Number
  price: 5000,                        // Number
  image: "https://picsum.photos/...", // String
  updated_at: "2025-01-15T...",      // ISO string
}
```

**Seed data:** 13 items (ps1–ps13)

---

### 2.15 `pgStockMovements`

```js
{
  // Same shape as stockMovements — tracks pgStockItems adjustments
}
```

**Seed data:** Empty array

---

### 2.16 `mitraPayouts`

```js
{
  id: "mp1712345678900abcd",        // String
  order_id: "okf3a8x3b",           // String
  mitra_name: "Rizky Mitra",       // String
  total_items: 35000,              // Number — sum of item prices
  fee: 1750,                       // Number — platform fee
  tax: 0,                          // Number — tax
  amount: 33250,                   // Number — total_items - fee - tax
  status: "unpaid",                 // String — "unpaid" | "paid"
  created_at: "2025-01-15T...",    // ISO string
  paid_at: null,                   // ISO string | null
  paid_by: null,                   // String | null — cashier id
}
```

---

### 2.17 `mitraRegistrations` (runtime only)

```js
{
  id: "mr1712345678900",           // String
  name: "Budi Mitra",              // String
  business: "Budi's Kitchen",      // String — mitra_juru_masak only
  email: "budi@example.com",       // String
  phone: "081234567898",           // String
  address: "Jl. Merdeka No. 1",   // String
  role: "mitra_juru_masak",        // String — "courier" | "mitra_juru_masak"
  status: "pending",               // String — "pending" | "approved" | "rejected"
  position: { lat: 2.458, lng: 96.376 }, // Object | null — mitra_juru_masak position
  created_at: "2025-01-15T...",    // ISO string
}
```

---

## 3. Runtime-Only State (not persisted to DB)

These live in the `State` singleton (`state/store.js:4`) or as global variables:

| Key | Type | Description |
|---|---|---|
| `State.cart` | Array | Customer/waiter cart items |
| `State.cashierCart` | Array | Cashier manual cart items |
| `State.notifications` | Array | Loaded from localStorage `arqa_notifications` |
| `State.mitraPositions` | Object | `{ mitraName: { lat, lng } }` |
| `State.currentUser` | Object/null | Currently logged-in user |
| `State.currentTab` | Object | `{ role: activeTabId }` |
| `State.currentView` | String | `"login"` or `"main"` |
| `State.selectedTable` | String/null | Selected table ID for dine-in |
| `State.orderType` | String | `"dine-in"` / `"takeaway"` / `"delivery"` |
| `State.activePromoId` | String/null | Active promo applied |
| `State.payTiming` | String | `"now"` or `"later"` |
| `State.deliveryLocation` | Object/null | `{ lat, lng }` |
| `State.sidebarOpen` | Boolean | Admin/manager drawer toggle |
| `State.courierStatus` | String | `"online"` / `"offline"` |
| `State.courierPosition` | Object/null | `{ lat, lng }` |
| `State.wizardStep` | Number | Playground ticket wizard step |
| `State.editingOrder` | Object/null | Order being edited |
| `State.editingOrderId` | String/null | ID of order being edited |
| `State.searchQuery` | String | Customer menu search |
| `State.selectedCategory` | String | Menu category filter |
| `State.cashierSearchQuery` | String | Cashier menu search |
| `State.cashierSelectedCategory` | String | Cashier menu category filter |
| `State.stockSearch` | String | Stock search query |
| `State.stockMenuFilter` | String | Stock menu filter |
| `State.expenseSearch` | String | Expense search query |
| `State.expenseCategory` | String | Expense category filter |
| `State.expenseDate` | String | Expense date filter |
| `State.adminRoleFilter` | String | Admin user management filter |
| `State.adminMenuFilter` | String | Admin menu category filter |
| `State.adminCourierFilterId` | String | Admin courier finance filter |
| `State.adminCourierDateFilter` | String | Admin courier finance date filter |
| `State.adminMitraSelectedName` | String | Admin mitra finance filter |
| `State.financeStartDate` | String | Finance report start date |
| `State.financeEndDate` | String | Finance report end date |
| `State.showRevenueTable` | Boolean | Toggle revenue detail table |
| `State.showExpenseTable` | Boolean | Toggle expense detail table |
| `State.showAvgTable` | Boolean | Toggle average detail table |
| `State.showProfitTable` | Boolean | Toggle profit detail table |
| `State._showPendapatan` | String | `"cafe"` / `"playground"` |
| `selectedPayment` | String (global) | `"qris"` / `"bank_transfer"` / `"cash"` |
| `modalQty` | Number (global) | Quantity stepper in item detail modal |
| `_promoInterval` | Number (global) | Promo carousel interval ID |
| `_selectedMitraRole` | String (global) | Mitra registration role selector |
| `_mitraRegMap` | Object (global) | Leaflet map instance for mitra registration |
| `_mitraRegMarker` | Object (global) | Leaflet marker for mitra registration |
| `_mitraRegPos` | Object (global) | `{ lat, lng }` for mitra registration |
| `_geoGranted` | Boolean (State) | Whether geolocation permission was granted |
| `_cameraGranted` | Boolean (State) | Whether camera permission was granted |
| `pendingCheckinCoords` | Object (State) | `{ lat, lng }` awaiting check-in confirmation |
| `showManagerCashTable` | Boolean (State) | Manager report: toggle cash detail table |
| `showManagerDigitalTable` | Boolean (State) | Manager report: toggle digital detail table |
| `managerReportDate` | String (State) | Manager report date filter |
| `_pengaturanOpen` | Boolean (State) | Side drawer "pengaturan" submenu open state |
| `_financialOpen` | Boolean (State) | Side drawer "financial" submenu open state |
| `_stock-groupOpen` | Boolean (State) | Side drawer "stock-group" submenu open state |

---

## 4. ID Patterns

| Collection | Pattern | Generator |
|---|---|---|
| users | `"u" + Date.now()` | Manual |
| tables | `"t" + number` | Manual |
| menuItems | `"m" + Date.now()` | Manual |
| orders | `"o" + Date.now().toString(36) + random(4)` | `genId()` |
| stockItems | `"s" + number` | Manual |
| stockMovements | `"sm" + number` | Manual |
| attendances | `"a" + Date.now()` | Manual |
| courierTracking | `"ct" + number` | Manual |
| promos | `"p" + number` | Manual |
| expenses | `"e" + Date.now()` | Manual |
| playgroundTickets | `"pg_demo" + number` | Manual |
| pgStockItems | `"ps" + number` | Manual |
| pgStockMovements | `"pg_sm" + Date.now()` | Manual |
| mitraPayouts | `"mp" + Date.now() + random(4)` | Manual |
| mitraRegistrations | `"mr" + Date.now()` | Manual |
| notifications | `"n" + Date.now() + random(6)` | `addNotification()` |

---

## 5. Relationships / Foreign Keys

| Source Field | Target Collection | Target Field |
|---|---|---|
| `orders.user_id` | `users.id` | For customer orders |
| `orders.table_id` | `tables.id` | For dine-in orders |
| `orders.courier_id` | `users.id` | For delivery orders |
| `orders.waiter_id` | `users.id` | For waiter-assisted orders |
| `orders.items[].menu_item_id` | `menuItems.id` | For order line items |
| `orders.promo_id` | `promos.id` | For promo discounts |
| `stockMovements.stock_item_id` | `stockItems.id` | For stock tracking |
| `stockMovements.user_id` | `users.id` | Who made the adjustment |
| `attendances.user_id` | `users.id` | Attendance records |
| `courierTracking.order_id` | `orders.id` | GPS tracking |
| `courierTracking.courier_id` | `users.id` | Courier tracking |
| `playgroundTickets.user_id` | `users.id` | Customer booking |
| `playgroundTickets.items[].menu_item_id` | `pgStockItems.id` | Snack purchases |
| `mitraPayouts.order_id` | `orders.id` | Mitra payout source |
| `menuItems.submitted_by` | `users.name` | Mitra who submitted menu |
| `promos.menu_ids[]` | `menuItems.id` | Eligible items for promo |

---

## 6. Data Flow

```
Browser Load
    │
    ▼
init.js → renderPermissionGate() → checkPermissions()
    │                                              │
    │  (all granted)                               │  (some denied)
    ▼                                              ▼
startApp()                                   renderPermissionGate()
    │
    ├─► loadNotifications()
    ├─► sessionStorage restore (if logged in)
    ├─► render()
    │      ├─► State.currentUser === null → renderLogin()
    │      └─► State.currentUser !== null → renderMainApp()
    │               └─► renderXxxView() ──► render()
    └─► setInterval(saveDB, 1000)
    └─► window.addEventListener('storage') — cross-tab sync
```

**Mutation pattern:**
```
User action → function modifies DB.xxx → render() → auto-saveDB (within 1s)
```

---

## 7. Migration Logic (data/db.js:818-906)

| Lines | Migration | Description |
|---|---|---|
| 818 | Initial save | Saves seed DB if localStorage is empty |
| 821-824 | `cafe.shipping` | Ensures shipping config exists |
| 827-834 | `cafe.rates` | Ensures rates config exists with courier/mitra/customer |
| 837-849 | waiter user | Adds u7 if missing |
| 852-864 | mitra_juru_masak user | Adds u9 if missing |
| 867-882 | playground user + collections | Adds u8 + playgroundTickets/pgStockItems/pgStockMovements |
| 883 | mitraPayouts | Initializes if missing |
| 885-886 | pgStockItems.image | Ensures image field exists |
| 888-889 | pgStockItems.category | Ensures category field exists |
| 891-894 | cafe.address | Ensures address field exists |
| 896-897 | stockItems.price | Ensures price field exists |
| 900-905 | orders.ongkir_status | Initializes ongkir_status for delivery orders with shipping_cost |
