# ARQA Coffee API Documentation

Base URL: `http://localhost:3000/api`

## Environment Variables (`.env`)

The API requires a `.env` file in the project root. Copy or create `api/.env`:

```bash
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-key-change-in-production"
CORS_ORIGIN="*"
```

| Variable | Required | Description |
|----------|:---:|-------------|
| `DATABASE_URL` | Yes | SQLite database path. Default: `file:./dev.db` |
| `AUTH_SECRET` | Yes | Secret key for JWT signing. Generate a strong random value in production (e.g., `openssl rand -base64 32`). Used by `src/lib/auth.ts` and `src/proxy.ts` |
| `CORS_ORIGIN` | Yes | Allowed CORS origin. Use `*` to allow all origins, or set to a specific domain in production (e.g., `https://arqa.coffee`) |

If the `.env` file is missing, the server will fail to start with `Environment variable not found: DATABASE_URL` or `AUTH_SECRET is not set`.

## Authentication

The API uses JWT (JSON Web Token) Bearer authentication. Tokens are signed with HS256 and expire after 24 hours.

**How it works:**
1. Call `POST /api/auth/login` with email and password to receive a JWT token
2. Include the token in all subsequent requests via the `Authorization` header: `Authorization: Bearer <token>`
3. The proxy verifies the token on every protected request and injects `x-user-id` and `x-user-role` headers for route handlers

**Public routes** (no token required):
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/register/mitra`
- `POST /api/auth/forgot-password`

**Protected routes** (token required):
- All other `/api/*` endpoints

**CORS:** The API allows cross-origin requests from any origin. Preflight `OPTIONS` requests return `204 No Content` with CORS headers.

---

## Auth

### `POST /api/auth/login`

Login with email and password.

**Body:**
```json
{ "email": "admin@arqa.coffee", "password": "admin123" }
```

**Response `200`:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": { "id": "u1", "name": "Admin ARQA", "email": "admin@arqa.coffee", "role": "admin", "phone": "081234567890", "avatar": "A", "address": "" }
}
```
Store the `token` and send it as `Authorization: Bearer <token>` on all protected requests. The token payload contains `{ userId, role, iat, exp }`.

**Response `401`:** `{ "error": "Invalid credentials" }`

---

### `POST /api/auth/register`

Register a new customer account.

**Body:**
```json
{ "name": "Budi", "email": "budi@example.com", "password": "123456", "phone": "081234567890", "role": "customer" }
```
`phone` and `role` are optional. `role` defaults to `"customer"`.

**Response `201`:**
```json
{ "success": true, "message": "Registration successful", "user": { "id": "u...", "name": "Budi", ... } }
```

**Response `409`:** `{ "error": "Email is already registered" }`

---

### `POST /api/auth/register/mitra`

Register a new mitra (courier or kitchen partner). Creates a pending registration for admin approval.

**Body:**
```json
{
  "name": "Andi Kurir",
  "business": "Andi Delivery",
  "email": "andi@example.com",
  "phone": "081234567890",
  "address": "Jl. Mawar No. 5",
  "role": "courier",
  "position": { "lat": -6.2, "lng": 106.8 }
}
```
`role` must be `"courier"` or `"mitra_juru_masak"`. `business` is required for `mitra_juru_masak`. `phone`, `address`, `position` are optional.

**Response `201`:**
```json
{ "success": true, "message": "Registration submitted, waiting for admin approval", "registration": { ... } }
```

---

### `POST /api/auth/forgot-password`

Request a password reset. Always returns success to prevent email enumeration (no actual email is sent).

**Body:**
```json
{ "email": "admin@arqa.coffee" }
```

**Response `200`:** `{ "success": true, "message": "If the email exists, a password reset link has been sent." }`

---

## Users

### `GET /api/admin/users`

List all users. Passwords are excluded from the response.

**Response `200`:** Array of user objects (without `password` field).

---

### `POST /api/admin/users`

Create a new user.

**Body:**
```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456",
  "role": "cashier",
  "phone": "081234567890",
  "avatar": "J",
  "address": "Jl. Example No. 1",
  "business_name": "Optional business name",
  "mitra_position": "Optional position data"
}
```
Only `name`, `email`, `password`, `role`, `phone` are required.

**Response `201`:** Created user (without `password`).

---

### `GET /api/admin/users/[id]`

Get a single user by ID. Password is excluded.

**Response `200`:** User object.

**Response `404`:** `{ "error": "User not found" }`

---

### `PUT /api/admin/users/[id]`

Update a user. Pass only the fields to update. Password is excluded from the response.

**Response `200`:** Updated user object.

---

### `DELETE /api/admin/users/[id]`

Delete a user.

**Response `200`:** `{ "success": true }`

---

## Tables

### `GET /api/admin/tables` / `GET /api/cashier/tables` / `GET /api/waiter/tables`

List all tables.

**Response `200`:** Array of table objects:
```json
[{ "id": "t1", "number": "1", "qr_code": "ARQA-T1", "status": "available", "capacity": 2 }]
```

---

### `POST /api/admin/tables` / `POST /api/cashier/tables` / `POST /api/waiter/tables`

Create a table.

**Body:**
```json
{ "number": "9", "qr_code": "ARQA-T9", "capacity": 4 }
```
`status` defaults to `"available"`.

**Response `201`:** Created table.

---

### `GET /api/admin/tables/[id]` / `GET /api/cashier/tables/[id]` / `GET /api/waiter/tables/[id]`

Get a single table.

---

### `PUT /api/admin/tables/[id]` / `PUT /api/cashier/tables/[id]` / `PUT /api/waiter/tables/[id]`

Update a table.

**Body (partial):**
```json
{ "status": "occupied" }
```

---

### `DELETE /api/admin/tables/[id]` / `DELETE /api/cashier/tables/[id]` / `DELETE /api/waiter/tables/[id]`

Delete a table.

---

## Menu

### `GET /api/admin/menu` / `GET /api/customer/menu`

List all menu items.

**Response `200`:** Array of menu item objects:
```json
[{ "id": "m1", "name": "Espresso", "description": "Kopi espresso murni", "price": 18000, "category": "coffee", "image": "https://...", "is_available": true, "is_approved": null, "tax_percentage": 0, "submitted_by": null }]
```

---

### `POST /api/admin/menu` / `POST /api/customer/menu`

Create a menu item.

**Body:**
```json
{
  "name": "Latte",
  "description": "Caffe latte",
  "price": 26000,
  "category": "coffee",
  "image": "https://...",
  "is_available": true,
  "is_approved": null,
  "tax_percentage": 0,
  "submitted_by": "Mitra Name"
}
```
`description`, `image`, `is_available`, `is_approved`, `tax_percentage`, `submitted_by` are optional.

**Response `201`:** Created menu item.

---

### `GET /api/admin/menu/[id]` / `GET /api/customer/menu/[id]`

Get a single menu item.

---

### `PUT /api/admin/menu/[id]` / `PUT /api/customer/menu/[id]`

Update a menu item. Pass only the fields to update.

**Body (partial):**
```json
{ "is_available": false, "is_approved": true }
```

---

### `DELETE /api/admin/menu/[id]` / `DELETE /api/customer/menu/[id]`

Delete a menu item.

---

## Orders

Available under: `admin`, `customer`, `cashier`, `kitchen`, `waiter`, `courier`, `mitra` — all use identical endpoints.

### `GET /api/*/orders`

List all orders with their items.

**Response `200`:** Array of order objects with nested `items[]`:
```json
[{
  "id": "o1",
  "user_id": "u6",
  "table_id": "t3",
  "order_type": "dine-in",
  "status": "pending",
  "total_amount": 54000,
  "shipping_cost": 0,
  "service_fee": 0,
  "payment_method": "qris",
  "payment_status": "unpaid",
  "delivery_address": "",
  "delivery_detail": "",
  "delivery_location": null,
  "customer_name": null,
  "customer_phone": null,
  "accepted": null,
  "promo_id": null,
  "promo_discount": 0,
  "created_at": "2025-01-15T08:30:00.000Z",
  "courier_id": null,
  "ongkir_status": null,
  "waiter_id": null,
  "has_mitra_items": false,
  "mitra_approved": false,
  "reject_reason": null,
  "messages": null,
  "lastReadAt": null,
  "items": [{
    "id": "uuid",
    "order_id": "o1",
    "menu_item_id": "m2",
    "quantity": 1,
    "unit_price": 28000,
    "notes": "",
    "status": "pending",
    "claimed_by": null
  }]
}]
```

---

### `POST /api/*/orders`

Create an order with items.

**Body:**
```json
{
  "user_id": "u6",
  "table_id": "t3",
  "order_type": "dine-in",
  "status": "pending",
  "total_amount": 54000,
  "shipping_cost": 0,
  "service_fee": 0,
  "payment_method": "qris",
  "payment_status": "unpaid",
  "delivery_address": "",
  "delivery_detail": "",
  "delivery_location": null,
  "customer_name": null,
  "customer_phone": null,
  "accepted": null,
  "promo_id": null,
  "promo_discount": 0,
  "courier_id": null,
  "ongkir_status": null,
  "waiter_id": null,
  "has_mitra_items": false,
  "mitra_approved": false,
  "reject_reason": null,
  "messages": null,
  "lastReadAt": null,
  "items": [
    { "menu_item_id": "m2", "quantity": 1, "unit_price": 28000, "notes": "", "status": "pending", "claimed_by": null }
  ]
}
```
`id` auto-generates if omitted. `status` defaults to `"pending"`. `payment_status` defaults to `"unpaid"`.

**Response `201`:** Created order with items.

---

### `GET /api/*/orders/[id]`

Get a single order with items.

**Response `404`:** `{ "error": "Order not found" }`

---

### `PUT /api/*/orders/[id]`

Update an order. If `items` array is provided, existing items are replaced.

**Body (partial update):**
```json
{ "status": "cooking" }
```

**Body (with items replacement):**
```json
{
  "status": "cooking",
  "items": [
    { "menu_item_id": "m2", "quantity": 1, "unit_price": 28000, "notes": "", "status": "cooking", "claimed_by": "Mitra Name" }
  ]
}
```

**Order status values:** `pending`, `cooking`, `ready`, `delivering`, `delivered`, `completed`, `cancelled`, `rejected`

**Item status values:** `pending`, `cooking`, `ready`, `rejected`

---

### `DELETE /api/*/orders/[id]`

Delete an order and its items.

**Response `200`:** `{ "success": true }`

---

## Stock (Cafe)

### `GET /api/admin/stock`

List all stock items.

---

### `POST /api/admin/stock`

Create a stock item.

**Body:**
```json
{ "name": "Biji Kopi", "unit": "kg", "current_quantity": 12, "min_quantity": 5, "price": 150000 }
```
`price` defaults to `0`.

---

### `PUT /api/admin/stock/[id]`

Update a stock item. Pass only the fields to update.

---

### `DELETE /api/admin/stock/[id]`

Delete a stock item.

---

### `GET /api/admin/stock/movements` / `GET /api/kitchen/stock/movements`

List stock movements (ordered by newest first).

---

### `POST /api/admin/stock/movements` / `POST /api/kitchen/stock/movements`

Record a stock movement.

**Body:**
```json
{ "stock_item_id": "s1", "user_id": "u2", "type": "in", "quantity": 10, "notes": "Restok dari supplier" }
```
`type` must be `"in"` or `"out"`.

---

## Stock (Playground)

### `GET /api/admin/playground/stock` / `GET /api/playground/stock`

List all playground stock items.

---

### `POST /api/admin/playground/stock` / `POST /api/playground/stock`

Create a playground stock item.

**Body:**
```json
{ "name": "Air Mineral 600ml", "category": "Minuman", "unit": "botol", "current_quantity": 48, "min_quantity": 12, "price": 5000, "image": "https://..." }
```
`category` defaults to `"Makanan"`. `image` defaults to `""`.

---

### `PUT /api/admin/playground/stock/[id]` / `PUT /api/playground/stock/[id]`

Update a playground stock item.

---

### `DELETE /api/admin/playground/stock/[id]` / `DELETE /api/playground/stock/[id]`

Delete a playground stock item.

---

### `GET /api/admin/playground/stock/movements` / `GET /api/playground/stock/movements`

List playground stock movements.

---

### `POST /api/admin/playground/stock/movements` / `POST /api/playground/stock/movements`

Record a playground stock movement.

**Body:**
```json
{ "stock_item_id": "ps1", "user_id": "u8", "type": "out", "quantity": 2, "notes": "Terjual" }
```

---

## Promos

### `GET /api/admin/promos` / `GET /api/customer/promos`

List all promos.

---

### `POST /api/admin/promos` / `POST /api/customer/promos`

Create a promo.

**Body:**
```json
{
  "code": "diskon20",
  "title": "Diskon 20%",
  "icon": "fa-percent",
  "color": "#E07A3A",
  "desc": "Diskon 20% untuk semua kopi",
  "discount_type": "percent",
  "discount_value": 20,
  "start_date": "2025-01-01",
  "end_date": "2025-12-31",
  "menu_ids": ["m1", "m2", "m3"],
  "image": "https://...",
  "terms": ["Berlaku setiap Senin", "Maks 2 transaksi"],
  "is_active": true
}
```
`discount_type`: `"percent"` or `"fixed"`. `menu_ids` and `terms` are arrays serialized to JSON strings internally.

---

### `GET /api/admin/promos/[id]` / `GET /api/customer/promos/[id]`

Get a single promo.

---

### `PUT /api/admin/promos/[id]` / `PUT /api/customer/promos/[id]`

Update a promo. `menu_ids` and `terms` are re-serialized if present.

---

### `DELETE /api/admin/promos/[id]` / `DELETE /api/customer/promos/[id]`

Delete a promo.

---

## Cafe Settings

### `GET /api/admin/cafe` / `GET /api/customer/cafe`

Get cafe settings. `rates` and `shipping` are returned as parsed objects.

**Response `200`:**
```json
{
  "id": "1",
  "address": "Sinabang, Simeulue Timur, ...",
  "lat": 2.458461,
  "lng": 96.3766943,
  "rates": {
    "courier": { "shipping": { "rate_per_km": 3000, "min": 5000, "max": 50000 }, "service_fee": { "type": "percent", "value": 5 } },
    "mitra": { "service_fee": { "type": "percent", "value": 5 } },
    "customer": { "service_fee": { "type": "fixed", "value": 1000 } }
  },
  "shipping": { "rate_per_km": 3000, "min": 5000, "max": 50000 }
}
```

---

### `PUT /api/admin/cafe` / `PUT /api/customer/cafe`

Update cafe settings. Uses upsert on id `"1"`.

**Body (partial):**
```json
{
  "address": "New address",
  "lat": -6.2,
  "lng": 106.8,
  "rates": { "courier": { ... } },
  "shipping": { "rate_per_km": 4000, "min": 5000, "max": 60000 }
}
```
`rates` and `shipping` are JSON-stringified internally.

---

## Sales

### `GET /api/admin/sales` / `GET /api/cashier/sales`

List daily sales (ordered by date descending).

---

### `POST /api/admin/sales` / `POST /api/cashier/sales`

Record a daily sale.

**Body:**
```json
{ "date": "2025-01-15", "revenue": 1250000, "orders": 32 }
```

---

## Expenses

### `GET /api/admin/expenses` / `GET /api/cashier/expenses`

List all expenses.

---

### `POST /api/admin/expenses` / `POST /api/cashier/expenses`

Record an expense.

**Body:**
```json
{
  "date": "2025-01-15",
  "time": "14:30",
  "category": "Operasional",
  "amount": 450000,
  "note": "Beli kopi dan susu",
  "volume": 3,
  "unit": "kg",
  "unitPrice": 150000,
  "source": "Cafe",
  "orderType": null,
  "paymentMethod": "cash"
}
```
All fields except `id`, `date`, `category`, `amount`, `volume`, `unit`, `unitPrice` are optional.

---

### `PUT /api/admin/expenses/[id]` / `PUT /api/cashier/expenses/[id]`

Update an expense. Pass only the fields to update.

---

### `DELETE /api/admin/expenses/[id]` / `DELETE /api/cashier/expenses/[id]`

Delete an expense.

---

## Attendances

### `GET /api/admin/attendances`

List all attendance records.

---

### `POST /api/admin/attendances`

Record a check-in.

**Body:**
```json
{ "user_id": "u3", "check_in": "2025-01-15T07:55:00", "lat": 2.458461, "lng": 96.3766943, "status": "present" }
```
`status` defaults to `"present"`. `check_in` is ISO 8601 string.

---

### `PUT /api/admin/attendances/[id]`

Update an attendance record (e.g., check-out).

**Body (partial):**
```json
{ "check_out": "2025-01-15T17:00:00" }
```
`check_out` is parsed as a Date.

---

## Courier

### `GET /api/courier/orders` / `POST /api/courier/orders` / `GET|PUT|DELETE /api/courier/orders/[id]`

Identical to the standard Orders endpoints above.

---

### `GET /api/admin/courier/tracking` / `GET /api/courier/tracking`

List courier tracking records. Optional query filters:

| Query param | Description |
|-------------|-------------|
| `courier_id` | Filter by courier user ID |
| `order_id` | Filter by order ID |

**Response `200`:** Array of tracking records (ordered by `recorded_at` desc).

---

### `POST /api/admin/courier/tracking` / `POST /api/courier/tracking`

Record a courier location update.

**Body:**
```json
{ "order_id": "o2", "courier_id": "u5", "latitude": 2.458461, "longitude": 96.3766943 }
```
`recorded_at` defaults to now.

---

## Mitra

### `GET /api/mitra/orders` / `POST /api/mitra/orders` / `GET|PUT|DELETE /api/mitra/orders/[id]`

Identical to the standard Orders endpoints above.

---

### `GET /api/admin/mitra/payouts` / `GET /api/mitra/payouts`

List mitra payouts.

---

### `POST /api/admin/mitra/payouts` / `POST /api/mitra/payouts`

Create a mitra payout.

**Body:**
```json
{
  "order_id": "o1",
  "mitra_name": "Rizky Mitra",
  "total_items": 54000,
  "fee": 2700,
  "tax": 0,
  "amount": 51300,
  "status": "unpaid",
  "paid_at": null,
  "paid_by": null,
  "confirmed_at": null
}
```
`status` defaults to `"unpaid"`. Values: `"unpaid"`, `"paid"`, `"confirmed"`.

---

### `PUT /api/admin/mitra/payouts/[id]` / `PUT /api/mitra/payouts/[id]`

Update a mitra payout (e.g., mark as paid, confirm receipt).

**Body (partial):**
```json
{ "status": "paid", "paid_at": "2025-01-15T10:00:00", "paid_by": "u1" }
```

---

### `DELETE /api/admin/mitra/payouts/[id]` / `DELETE /api/mitra/payouts/[id]`

Delete a mitra payout.

---

### `GET /api/admin/mitra/registrations`

List mitra registrations. Optional query filter:

| Query param | Description |
|-------------|-------------|
| `status` | Filter by `"pending"`, `"approved"`, or `"rejected"` |

---

### `POST /api/admin/mitra/registrations`

Create a mitra registration (admin-side).

**Body:**
```json
{ "name": "New Mitra", "email": "new@example.com", "role": "courier", "status": "pending" }
```

---

### `GET /api/admin/mitra/registrations/[id]`

Get a single mitra registration.

---

### `PUT /api/admin/mitra/registrations/[id]`

Update a mitra registration. When `status` is set to `"approved"`, a `User` is automatically created from the registration data.

**Body:**
```json
{ "status": "approved", "password": "mitra123" }
```
`password` defaults to `"123456"` if not provided during approval.

---

### `DELETE /api/admin/mitra/registrations/[id]`

Delete a mitra registration.

---

## Playground

### `GET /api/admin/playground/tickets` / `GET /api/playground/tickets`

List playground tickets with items and transactions.

---

### `POST /api/admin/playground/tickets` / `POST /api/playground/tickets`

Create a playground ticket.

**Body:**
```json
{
  "user_id": "u6",
  "customer_name": "Budi Santoso",
  "children": [{ "name": "Andi" }, { "name": "Rudi" }],
  "companions": [],
  "companion_count": 0,
  "socks_per_child": [true, false],
  "socks_total": 10000,
  "hours": 3,
  "start_time": "2025-01-15T08:00:00",
  "end_time": "2025-01-15T11:00:00",
  "subtotal": 120000,
  "items_total": 24000,
  "total_amount": 144000,
  "payment_status": "paid",
  "payment_method": "qris",
  "status": "active",
  "cancel_reason": null,
  "was_overtime": false,
  "overtime_minutes": 0,
  "items": [
    { "menu_item_id": "ps5", "name": "Mie Cup", "quantity": 2, "unit_price": 7000 }
  ],
  "transactions": [
    { "type": "extra_time", "description": "+1 jam", "amount": 40000, "method": "cash" }
  ]
}
```
`children`, `companions`, `socks_per_child` are arrays serialized to JSON strings internally. `items` and `transactions` are optional nested creates.

---

### `GET /api/admin/playground/tickets/[id]` / `GET /api/playground/tickets/[id]`

Get a single playground ticket with items and transactions.

---

### `PUT /api/admin/playground/tickets/[id]` / `PUT /api/playground/tickets/[id]`

Update a playground ticket. If `items` or `transactions` arrays are provided, existing records are replaced.

**Body (partial):**
```json
{ "status": "completed" }
```

---

### `DELETE /api/admin/playground/tickets/[id]` / `DELETE /api/playground/tickets/[id]`

Delete a playground ticket, its items, and its transactions.

---

## Notifications

### `GET /api/notifications`

List notifications. Optional query filters:

| Query param | Description |
|-------------|-------------|
| `user_id` | Filter by user ID |
| `target_role` | Filter by role (e.g., `"cashier"`) — also matches inside `target_roles` JSON |

**Response `200`:** Array of notifications (ordered by `created_at` desc):
```json
[{
  "id": "uuid",
  "user_id": null,
  "target_role": "cashier",
  "target_roles": "[\"cashier\",\"admin\"]",
  "title": "Pesanan Baru",
  "message": "#DEMO01 — Pelanggan demo memesan 3 item",
  "type": "order",
  "icon": "fa-shopping-bag",
  "related_order_id": null,
  "read": "{}",
  "created_at": "2025-01-15T08:00:00.000Z"
}]
```
`type` values: `"order"`, `"payment"`, `"stock"`, `"delivery"`, `"warning"`, `"info"`. `read` is a JSON string of per-role read status `{"cashier":true}`.

---

### `POST /api/notifications`

Create a notification.

**Body:**
```json
{
  "title": "Stok Rendah",
  "message": "Biji Kopi Arabika tersisa 2 kg",
  "target_role": "manager",
  "target_roles": "[\"manager\",\"admin\"]",
  "type": "stock",
  "icon": "fa-exclamation-triangle",
  "related_order_id": null,
  "read": { "manager": false, "admin": false }
}
```
`title` and `message` are required. `target_role`, `target_roles`, `type`, `icon`, `related_order_id`, `read` are optional. `read` accepts either a JSON string or an object.

---

### `PUT /api/notifications/[id]`

Update a notification (e.g., mark as read).

**Body (partial):**
```json
{ "read": { "cashier": true } }
```
`read` accepts an object (auto-stringified) or a string. Legacy `is_read` boolean is also supported.

---

### `DELETE /api/notifications/[id]`

Delete a notification.

---

## Common Response Patterns

| Status | Body |
|--------|------|
| `200` | Requested resource(s) |
| `201` | Created resource |
| `400` | `{ "error": "..." }` — validation error |
| `401` | `{ "error": "Invalid credentials" }` — login only; or `{ "error": "Unauthorized — missing token" }` / `{ "error": "Unauthorized — invalid or expired token" }` — protected routes |
| `404` | `{ "error": "... not found" }` |
| `409` | `{ "error": "Email is already registered" }` |
| `500` | `{ "error": "Internal server error" }` / `{ "error": "Failed to ..." }` |

## Notes

- All IDs are strings (e.g., `"u1"`, `"o1"`, `"m1"`). If omitted on POST, an ID is auto-generated from the current timestamp.
- Fields containing arrays or objects that don't have dedicated relation tables are stored as JSON strings: `delivery_location`, `messages`, `lastReadAt`, `menu_ids`, `terms`, `children`, `companions`, `socks_per_child`, `rates`, `shipping`, `target_roles`, `read`, `mitra_position`.
- Date fields accept ISO 8601 strings (e.g., `"2025-01-15T08:30:00"`).
- Currency amounts are in Indonesian Rupiah (integer/float — no decimal precision enforced).
