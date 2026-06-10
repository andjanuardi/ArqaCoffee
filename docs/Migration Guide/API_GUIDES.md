# API GUIDES — ARQA Coffee

> Universal REST API specification for porting the current JS SPA to any backend stack.
> Each endpoint documents the method, path, authorization, request/response schemas, and business logic mapped from the current implementation.

---

## Conventions

| Aspect | Standard |
|---|---|
| **Base URL** | `/api/v1` |
| **Auth** | JWT Bearer token (`Authorization: Bearer <token>`), returned from login |
| **Response envelope** | `{ "code": 200, "message": "success", "data": {...} }` |
| **Error envelope** | `{ "code": 4xx/5xx, "message": "...", "errors": [] }` |
| **Pagination** | Query params `?page=1&limit=20`, response `{ "total": N, "page": P, "limit": L, "data": [...] }` |
| **Date format** | `"2025-01-15"` (ISO 8601 `yyyy-MM-dd`) |
| **DateTime format** | `"2025-01-15T08:30:00+07:00"` (RFC 3339) |
| **Currency** | Integer in **IDR** (Rp). Formatting done client-side via `formatCurrency()` |
| **Role constants** | `admin`, `manager`, `cashier`, `kitchen`, `courier`, `waiter`, `customer`, `playground`, `mitra_juru_masak` |
| **Status constants** | `pending`, `cooking`, `ready`, `delivering`, `delivered`, `completed`, `cancelled`, `rejected` |

---

## Table of Contents

1. [Auth](#1-auth)
2. [Profile](#2-profile)
3. [Users](#3-users)
4. [Menu Items](#4-menu-items)
5. [Tables](#5-tables)
6. [Cart](#6-cart)
7. [Orders](#7-orders)
8. [Order Items](#8-order-items)
9. [Payment](#9-payment)
10. [Delivery](#10-delivery)
11. [Chat](#11-chat)
12. [Notifications](#12-notifications)
13. [Playground Tickets](#13-playground-tickets)
14. [Playground Stock](#14-playground-stock)
15. [Cafe Stock](#15-cafe-stock)
16. [Expenses](#16-expenses)
17. [Promos](#17-promos)
18. [Finance](#18-finance)
19. [Attendance](#19-attendance)
20. [Mitra Payouts](#20-mitra-payouts)
21. [Mitra Registrations](#21-mitra-registrations)
22. [Courier Finance](#22-courier-finance)
23. [Service Control](#23-service-control)
24. [Tariff Settings](#24-tariff-settings)
25. [Dashboard & Summary](#25-dashboard--summary)
26. [Appendix: Role-Tab Routes](#26-appendix-role-tab-routes)

---

## 1. Auth

### `POST /api/v1/auth/login`
**Auth**: Public | **Description**: Login with email + password

**Request**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response `200`**:
```json
{
  "token": "string (JWT)",
  "user": {
    "id": "string", "name": "string", "email": "string",
    "role": "string", "phone": "string", "avatar": "string",
    "address": "string", "position": {"lat": float, "lng": float} | null
  }
}
```

**Response `401`**: `{ "code": 401, "message": "Email atau password salah" }`

**Logic**: Match email from `users[]`. Password comparison (plaintext in current JS). Generate JWT with user ID + role claims. Return user object + token. Set `currentUser` in session.

---

### `POST /api/v1/auth/register`
**Auth**: Public | **Description**: Customer self-registration

**Request**:
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6)",
  "phone": "string (optional)",
  "address": "string (optional)"
}
```

**Response `201`**:
```json
{
  "token": "string (JWT)",
  "user": { "id": "string", "name": "string", "email": "string", "role": "customer" }
}
```

**Logic**: Check email uniqueness. Create user with role `customer`. ID pattern: `"u" + timestamp`. Notify admin of new registration. Auto-login after registration.

---

### `POST /api/v1/auth/register-mitra`
**Auth**: Public | **Description**: Mitra (courier or mitra_juru_masak) registration

**Request**:
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6)",
  "phone": "string (optional)",
  "role": "string (required, enum: courier|mitra_juru_masak)",
  "position": {
    "lat": float,
    "lng": float
  }
}
```

**Response `201`**:
```json
{
  "registration_id": "string",
  "status": "pending"
}
```

**Logic**: Does NOT create user directly. Creates `mitraRegistrations[]` entry with status `pending`. Admin must approve via `POST /api/v1/mitra/registrations/:id/approve`. `position` is the mitra's location (used for distance-based delivery routing). Notify admin of pending registration.

---

### `POST /api/v1/auth/reset-password`
**Auth**: Public | **Description**: Reset forgotten password

**Request**:
```json
{
  "email": "string (required)"
}
```

**Response `200`**: `{ "message": "Password berhasil direset. Password baru: password123" }`

**Logic**: Find user by email. Reset password to `"password123"`. In current JS, no email is sent — just resets directly. Notify user.

---

## 2. Profile

### `GET /api/v1/profile`
**Auth**: All authenticated | **Description**: Get current user's profile

**Response `200`**:
```json
{
  "id": "string", "name": "string", "email": "string",
  "role": "string", "phone": "string", "avatar": "string",
  "address": "string",
  "position": {"lat": float, "lng": float} | null,
  "attendance_today": { "id": "string", "check_in": "datetime", "check_out": "datetime|null" } | null
}
```

**Logic**: Return user object from `users[]`. If position doesn't exist, return null. Include today's attendance record if any (for staff roles). `attendance_today` is filtered by `user_id` and `check_in` date = today.

---

### `PUT /api/v1/profile`
**Auth**: All authenticated | **Description**: Update profile fields

**Request**:
```json
{
  "name": "string (optional)",
  "email": "string (optional, unique)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "avatar": "string (optional, base64 data URL or URL)"
}
```

**Response `200`**: `{ "user": { ...updated user object } }`

**Logic**: Update only provided fields. Check email uniqueness if changed. Avatar can be base64 data URL (compressed via canvas in current JS, server should validate size < 2MB).

---

### `PUT /api/v1/profile/password`
**Auth**: All authenticated | **Description**: Change password

**Request**:
```json
{
  "old_password": "string (required)",
  "new_password": "string (required, min 6)"
}
```

**Response `200`**: `{ "message": "Password berhasil diubah" }`

**Logic**: Verify `old_password` matches current user's password. Update to `new_password`. Invalid old password returns 401.

---

### `PUT /api/v1/profile/position`
**Auth**: `mitra_juru_masak`, `courier` | **Description**: Update mitra/courier position

**Request**:
```json
{
  "lat": float,
  "lng": float
}
```

**Response `200`**: `{ "position": { "lat": float, "lng": float } }`

**Logic**: Update `user.position`. Used for distance calculations (mitra → cafe distance for delivery acceptance, courier → customer distance).

---

## 3. Users

### `GET /api/v1/users`
**Auth**: `admin`, `manager` | **Description**: List all users

**Query params**: `?role=cashier` (optional filter), `?search=keyword`

**Response `200`**:
```json
{
  "users": [
    { "id": "string", "name": "string", "email": "string",
      "role": "string", "phone": "string", "avatar": "string",
      "address": "string", "position": {} | null }
  ]
}
```

**Logic**: Return all users (admin sees all roles, manager sees all except admin). Filter by role if query param provided. Search by name/email substring.

---

### `POST /api/v1/users`
**Auth**: `admin`, `manager` | **Description**: Create user

**Request**:
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "string (required, enum: cashier|kitchen|courier|waiter|manager|customer)",
  "phone": "string (optional)",
  "address": "string (optional)"
}
```

**Response `201`**:
```json
{
  "user": { "id": "string", "name": "string", "email": "string", "role": "string" }
}
```

**Logic**: Manager cannot set role `admin`. Password stored as plaintext (matching current JS behavior — recommend bcrypt for production). ID: `"u" + Date.now()`.

---

### `GET /api/v1/users/:id`
**Auth**: `admin`, `manager` | **Description**: Get user detail

**Response `200`**: Full user object.

---

### `PUT /api/v1/users/:id`
**Auth**: `admin`, `manager` | **Description**: Update user

**Request**: Same shape as POST, all fields optional.

**Logic**: Manager cannot change role to `admin`. Admin can set any role including `admin`.

---

### `DELETE /api/v1/users/:id`
**Auth**: `admin`, `manager` | **Description**: Delete user

**Response `200`**: `{ "message": "User berhasil dihapus" }`

**Logic**: Prevent self-deletion. Manager cannot delete admin users. Remove from `users[]`. No cascade to orders (orders remain with `user_id` reference).

---

## 4. Menu Items

### `GET /api/v1/menu-items`
**Auth**: All authenticated | **Description**: List menu items

**Query params**: `?category=coffee|non-coffee|food|snack`, `?search=keyword`, `?available=true|false`, `?approved=true|false`, `?submitted_by=mitra_name`

**Response `200`**:
```json
{
  "items": [
    {
      "id": "string", "name": "string", "description": "string",
      "price": int, "category": "string", "image": "string (URL)",
      "is_available": bool, "is_approved": bool,
      "submitted_by": "string|null", "tax_percentage": int
    }
  ]
}
```

**Logic**: Category filter (JS uses chip buttons). Search by name/description substring. By default only return `is_approved: true` items (except for admin/mitra views). Image uses picsum.photos fallback with seed param.

---

### `GET /api/v1/menu-items/:id`
**Auth**: All authenticated | **Description**: Get single menu item

**Response `200`**: Full menu item object.

---

### `POST /api/v1/menu-items`
**Auth**: `admin`, `manager`, `mitra_juru_masak` | **Description**: Create menu item

**Request**:
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "price": int (required, in IDR),
  "category": "string (required, enum or custom)",
  "image": "string (optional, URL or base64)",
  "is_available": bool (default: true),
  "tax_percentage": int (default: 0)
}
```

**Response `201`**:
```json
{
  "item": { "id": "string", "name": "string", "price": int, "category": "string", ... }
}
```

**Logic**: If submitted by `mitra_juru_masak`, set `is_approved: false` and `submitted_by: currentUser.name`. Only admin/manager can set `is_approved: true` directly. ID: `"m" + Date.now()`.

---

### `PUT /api/v1/menu-items/:id`
**Auth**: `admin`, `manager`, `mitra_juru_masak` | **Description**: Update menu item

**Request**: Same shape as POST, all fields optional.

**Logic**: Mitra can only edit items they submitted (`submitted_by === currentUser.name`).

---

### `DELETE /api/v1/menu-items/:id`
**Auth**: `admin`, `manager`, `mitra_juru_masak` | **Description**: Delete menu item

**Logic**: Mitra can only delete items they submitted. Manager can delete any non-mitra item.

---

### `PATCH /api/v1/menu-items/:id/availability`
**Auth**: `admin`, `manager`, `mitra_juru_masak` | **Description**: Toggle is_available

**Response `200`**: `{ "is_available": bool }`

**Logic**: Toggle `is_available` flag. If setting to `false`, send low-stock-style notification to admin/manager.

---

### `PATCH /api/v1/menu-items/:id/approve`
**Auth**: `admin` | **Description**: Approve mitra-submitted menu item

**Response `200`**: `{ "is_approved": true }`

**Logic**: Set `is_approved: true`. Only works on items where `is_approved === false`. Notify the mitra who submitted it.

---

### `PATCH /api/v1/menu-items/:id/reject`
**Auth**: `admin` | **Description**: Reject mitra-submitted menu item

**Response `200`**: `{ "message": "Item ditolak" }`

**Logic**: Remove the item from `menuItems[]`. Notify the mitra. In JS, `rejectMenuItem` calls `deleteMenuItem` after confirm.

---

## 5. Tables

### `GET /api/v1/tables`
**Auth**: All authenticated | **Description**: List all tables

**Response `200`**:
```json
{
  "tables": [
    { "id": "string", "number": int, "qr_code": "string",
      "status": "string (available|occupied)", "capacity": int }
  ]
}
```

---

### `POST /api/v1/tables`
**Auth**: `admin`, `manager` | **Description**: Add table

**Request**:
```json
{
  "capacity": int (default: 4)
}
```

**Response `201`**: Full table object.

**Logic**: Auto-assign `number` = max existing number + 1. Auto-generate `qr_code` string (used for QR scanning).

---

### `PUT /api/v1/tables/:id`
**Auth**: `admin`, `manager` | **Description**: Update table (number, capacity)

---

### `DELETE /api/v1/tables/:id`
**Auth**: `admin`, `manager` | **Description**: Delete table

---

### `PATCH /api/v1/tables/:id/status`
**Auth**: `admin`, `manager`, `waiter` | **Description**: Toggle table status

**Response `200`**: `{ "status": "available"|"occupied" }`

**Logic**: Toggle between `available` ↔ `occupied`. When waiter completes/delivers an order, table should auto-set to available.

---

### `GET /api/v1/tables/:id/qr`
**Auth**: `admin`, `manager` | **Description**: Get QR code image for table

**Response `200`**: QR code image (PNG/PDF) or data URL.

**Logic**: In JS, the QR is rendered via html5-qrcode library and downloaded as canvas composite with table number + cafe name.

---

### `GET /api/v1/tables/scan/:qr_code`
**Auth**: `customer` | **Description**: Scan table QR to identify table

**Response `200`**: `{ "table": { ...table object } }`

**Logic**: Find table by `qr_code`. Set `State.selectedTable` and `State.orderType = "dine-in"`. In JS, this is handled client-side via html5-qrcode scanner — on server, the QR code is just a unique string that identifies the table.

---

## 6. Cart

### `GET /api/v1/cart`
**Auth**: `customer`, `waiter` | **Description**: Get current cart

**Response `200`**:
```json
{
  "items": [
    { "menu_item_id": "string", "name": "string", "quantity": int,
      "unit_price": int, "notes": "string", "image": "string" }
  ],
  "summary": {
    "subtotal": int, "promo_discount": int,
    "tax": int, "shipping": int, "service_fee": int,
    "total": int
  },
  "promo": {} | null
}
```

**Logic**: Cart is session/user-scoped. In JS, cart lives in `State.cart[]`. Calculate summary using `calcCartTotal()`: subtotal from items, promo discount if `State.activePromoId` set, tax from `calcItemTax()` (10% default), shipping from `calcShippingCost()`, service fee from tariff settings. Total = subtotal - promo + tax + shipping + service_fee.

---

### `POST /api/v1/cart/add`
**Auth**: `customer`, `waiter` | **Description**: Add item to cart

**Request**:
```json
{
  "menu_item_id": "string (required)",
  "quantity": int (default: 1),
  "notes": "string (optional)"
}
```

**Response `200`**: Full cart with updated items.

**Logic**: Dedup by `menu_item_id + notes` (empty notes treated as `""`). If matching item exists, increment quantity. Otherwise push new entry. Price comes from `menuItem.price`.

---

### `PATCH /api/v1/cart/items/:index`
**Auth**: `customer`, `waiter` | **Description**: Update item quantity

**Request**:
```json
{
  "quantity": int (min 1)
}
```

**Logic**: Update quantity at index. If quantity < 1, remove item.

---

### `DELETE /api/v1/cart/items/:index`
**Auth**: `customer`, `waiter` | **Description**: Remove item from cart

---

### `DELETE /api/v1/cart`
**Auth**: `customer`, `waiter` | **Description**: Clear entire cart

---

### `POST /api/v1/cart/apply-promo`
**Auth**: `customer` | **Description**: Apply promo code to cart

**Request**:
```json
{
  "code": "string (required)"
}
```

**Response `200`**: Promo object with discount details.

**Logic**: Find promo by `code`. Validate: `is_active === true`, within date range (if `start_date`/`end_date` set), menu eligibility (`menu_ids` filter — discount only applies to items matching those IDs). Set `activePromoId` in session. Calculate discount via `calcPromoDiscount()`: percent discount reduces price by `discount_value%`, fixed discount reduces by `discount_value` amount. Tax (10%) applied after promo discount.

---

## 7. Orders

### `POST /api/v1/orders`
**Auth**: `customer`, `waiter`, `cashier` | **Description**: Place order

**Request**:
```json
{
  "order_type": "string (required, enum: dine-in|takeaway|delivery)",
  "table_id": "string (optional, required for dine-in)",
  "items": [
    { "menu_item_id": "string", "quantity": int, "unit_price": int, "notes": "string" }
  ],
  "promo_id": "string (optional)",
  "customer_name": "string (optional, for cashier walk-in orders)",
  "delivery_address": "string (optional, required for delivery)",
  "delivery_detail": "string (optional)",
  "delivery_location": { "lat": float, "lng": float } (optional, required for delivery),
  "payment_status": "string (optional, for cashier: unpaid|paid, default: unpaid)",
  "payment_method": "string (optional, for cashier: cash|digital)"
}
```

**Response `201`**:
```json
{
  "order": {
    "id": "string", "user_id": "string", "order_type": "string",
    "status": "pending", "total_amount": int,
    "items": [...], "created_at": "datetime"
  }
}
```

**Logic**:
- Generate ID via `genId()` → `Date.now().toString(36)` + random 4 chars, prefixed with `"o"`
- Calculate `total_amount` from items × prices, including tax, shipping, service fee, promo
- If `dine-in` and `table_id` provided, set table status to `occupied`
- If `delivery`, validate address + location provided
- For cashier walk-in, `user_id` = `"walk-in"`, `customer_name` required
- Set `items[].status = "pending"` for each item
- Notify: cashier, kitchen, admin, manager (via `notifyOrderPlaced`)
- Clear cart after successful creation

---

### `GET /api/v1/orders`
**Auth**: All authenticated (role-filtered) | **Description**: List orders

**Query params**: `?status=pending|cooking|ready|delivering|delivered|completed|cancelled|rejected`, `?start_date=2025-01-01&end_date=2025-01-31`, `?search=keyword`, `?role=kitchen|mitra` (for mitra filtering), `?user_id=...`, `?page=1&limit=20`

**Response `200`**:
```json
{
  "orders": [
    {
      "id": "string", "user_id": "string", "customer_name": "string",
      "order_type": "string", "status": "string",
      "total_amount": int, "payment_method": "string",
      "payment_status": "string", "accepted": bool,
      "created_at": "datetime", "items": [...],
      "courier_id": "string|null", "promo_id": "string|null",
      "promo_discount": int, "reject_reason": "string|null"
    }
  ],
  "total": int, "page": int, "limit": int
}
```

**Logic**:
- **Kitchen** view: only orders with items where `status === "pending"` or `"cooking"`, **excluding** items where `submitted_by` is set (those go to mitra view). Must have at least one non-mitra item.
- **Mitra** view: only orders containing items where `submitted_by === currentUser.name`. Filtered per-item, not per-order.
- **Courier available** view: `status === "ready"` AND `courier_id === null` AND `order_type === "delivery"`.
- **Cashier** view: orders that are pending/unpaid/ready, plus active/in-progress.
- **Customer** view: orders by `user_id`.
- Date range filters by `created_at`.

---

### `GET /api/v1/orders/:id`
**Auth**: All authenticated | **Description**: Get order detail

**Response `200`**: Full order object with all items, messages, courier tracking, promo details.

---

### `PUT /api/v1/orders/:id`
**Auth**: `cashier` | **Description**: Edit order (add/remove items)

**Request**:
```json
{
  "items": [
    { "menu_item_id": "string", "quantity": int, "unit_price": int, "notes": "string", "status": "string" }
  ]
}
```

**Logic**: Cashier edits existing order by replacing items array. Recalculate `total_amount`. Order status set back to `pending` if it was accepted. In JS, `editCashierOrder(id)` loads items into `cashierCart`, then `saveEditedCashierOrder()` replaces the order's items and recalculates.

---

### `PATCH /api/v1/orders/:id/status`
**Auth**: `admin`, `manager` | **Description**: Force-update order status

**Request**:
```json
{
  "status": "string (required)"
}
```

---

### `POST /api/v1/orders/:id/cancel`
**Auth**: `customer`, `waiter` | **Description**: Cancel pending order

**Logic**: Only if order `status === "pending"`. Set status to `"cancelled"`. If `dine-in` with `table_id`, free the table (set `status: "available"`). Notify cashier + kitchen. In JS, `cancelOrder(orderId)`.

---

### `POST /api/v1/orders/:id/accept`
**Auth**: `cashier` | **Description**: Cashier accepts order into the system

**Response `200`**: `{ "accepted": true }`

**Logic**: Set `order.accepted = true`. Order is now visible in kitchen queue. Notify kitchen. In JS, `acceptCashierOrder(id)`.

---

## 8. Order Items

### `PATCH /api/v1/orders/:id/items/:index/status`
**Auth**: `kitchen`, `mitra_juru_masak` | **Description**: Update per-item cooking status

**Request**:
```json
{
  "status": "string (required, enum: cooking|ready)"
}
```

**Logic**: Update `items[index].status`. When ALL items reach `"ready"`, auto-update `order.status = "ready"` and notify customer + cashier. Kitchen can only update non-mitra items; mitra can only update their own submitted items.

---

### `POST /api/v1/orders/:id/items/:index/reject`
**Auth**: `kitchen`, `mitra_juru_masak` | **Description**: Reject order item with reason

**Request**:
```json
{
  "reason": "string (required)"
}
```

**Logic**: Set `items[index].status = "rejected"`, set `order.reject_reason = reason`. If ALL items rejected, set `order.status = "rejected"`, free table if dine-in. Notify customer + cashier + admin.

---

## 9. Payment

### `POST /api/v1/orders/:id/pay-digital`
**Auth**: `cashier` | **Description**: Process digital payment (QRIS/transfer)

**Response `200`**: `{ "payment_status": "paid", "payment_method": "digital" }`

**Logic**: Set `payment_status = "paid"`, `payment_method = "digital"`. If delivery and COD, this just records payment. Notify via `notifyPayment(order, "digital")`. In JS, `processPayment(id)`.

---

### `POST /api/v1/orders/:id/pay-cash`
**Auth**: `cashier` | **Description**: Process cash payment

**Response `200`**: `{ "payment_status": "paid", "payment_method": "cash" }`

**Logic**: Same as digital but marks as cash. In JS, `processCashPayment(id)`.

---

### `POST /api/v1/orders/:id/pay-qris`
**Auth**: `customer` | **Description**: Customer pays via QRIS from order detail

**Response `200`**: `{ "payment_status": "paid", "payment_method": "qris" }`

**Logic**: In JS, `payOrder(id)` — shows QRIS QR code modal for customer to scan, then marks paid. On the backend, this just records the payment (the QRIS processing is external).

---

### `POST /api/v1/orders/:id/settle-delivery`
**Auth**: `cashier` | **Description**: Settle COD delivery (customer pays courier on arrival)

**Response `200`**: `{ "status": "completed", "payment_status": "paid" }`

**Logic**: Set `payment_status = "paid"`, `order.status = "completed"`. Only for delivery orders where `payment_status === "unpaid"`. In JS, `settleDelivery(id)`.

---

### `POST /api/v1/orders/:id/pay-ongkir`
**Auth**: `customer`, `cashier` | **Description**: Pay courier shipping fee

**Response `200`**: `{ "ongkir_paid": true }`

**Logic**: In JS, `payOngkir()` — marks shipping fee as paid by customer. Creates expense entry for the courier salary. Creates courier finance record.

---

### `POST /api/v1/orders/:id/pay-mitra`
**Auth**: `cashier`, `admin` | **Description**: Pay mitra for their items in the order

**Logic**: In JS, `payMitra(orderId)` — calculates mitra's share from items they submitted, creates payout. Part of `createMitraPayouts(orderId)`.

---

## 10. Delivery

### `GET /api/v1/deliveries/available`
**Auth**: `courier` | **Description**: Get available delivery orders

**Response `200`**:
```json
{
  "deliveries": [
    {
      "id": "string", "customer_name": "string",
      "delivery_address": "string", "delivery_location": {"lat": float, "lng": float},
      "total_amount": int, "items": [...]
    }
  ]
}
```

**Logic**: Filter orders where `status === "ready"`, `order_type === "delivery"`, `courier_id === null`. Calculate distance from cafe location to delivery location. In JS, `renderCourierAvailable()`.

---

### `POST /api/v1/deliveries/:id/accept`
**Auth**: `courier` | **Description**: Accept delivery job

**Request**:
```json
{
  "courier_position": { "lat": float, "lng": float }
}
```

**Response `200`**: `{ "status": "delivering", "courier_id": "string" }`

**Logic**: Validate courier is checked in today (`hasActiveCourier()` or per-courier check). Set `order.courier_id = currentUser.id`, `order.status = "delivering"`. Create initial `courierTracking[]` entry with courier position. Distance from cafe to delivery location validated (warning if > 5km in JS, optional server-side). Notify customer (`notifyDeliveryTaken`).

---

### `POST /api/v1/deliveries/:id/reject`
**Auth**: `courier` | **Description**: Reject delivery with reason

**Request**:
```json
{
  "reason": "string (required, enum: terlalu-jauh|pesanan-rusak|tidak-sanggup|lainnya)"
}
```

**Logic**: In JS, `confirmRejectCourierOrder(id)` — order remains available for other couriers (status not changed, courier_id not set). Just logs the rejection. Notify admin.

---

### `POST /api/v1/deliveries/:id/complete`
**Auth**: `courier` | **Description**: Complete delivery

**Response `200`**: `{ "status": "delivered"|"completed" }`

**Logic**:
- If `payment_status === "unpaid"` (COD): set `status = "delivered"` — waits for cashier settlement.
- If `payment_status === "paid"`: set `status = "completed"`, free table if dine-in.
- Notify via `notifyDeliveryCompleted(order)`.
- In JS, `completeDelivery(id)`.

---

### `POST /api/v1/deliveries/:id/track`
**Auth**: `courier` | **Description**: Add GPS tracking point

**Request**:
```json
{
  "latitude": float,
  "longitude": float
}
```

**Response `200`**: `{ "tracking_id": "string" }`

**Logic**: Create `courierTracking[]` entry with `order_id`, `courier_id`, coordinates, `recorded_at` (server timestamp). In JS, `simulateMove(orderId)` generates random GPS points for demo.

---

### `GET /api/v1/deliveries/:id/track`
**Auth**: `customer`, `courier`, `admin`, `manager` | **Description**: Get tracking route

**Response `200`**:
```json
{
  "tracking": [
    { "latitude": float, "longitude": float, "recorded_at": "datetime" }
  ]
}
```

**Logic**: Return all tracking points for this order, sorted by `recorded_at`.

---

### `POST /api/v1/deliveries/:id/confirm-ongkir`
**Auth**: `courier` | **Description**: Courier confirms receiving shipping fee

**Response `200`**: `{ "ongkir_status": "confirmed" }`

**Logic**: Set `order.ongkir_status = "confirmed"`. Create expense entry with category "Operasional" for the courier's ongkir amount. Create courier finance record. In JS, `confirmOngkir(id)`.

---

## 11. Chat

### `GET /api/v1/orders/:id/messages`
**Auth**: `customer`, `courier` | **Description**: Get chat messages for order

**Response `200`**:
```json
{
  "messages": [
    {
      "sender_id": "string", "sender_name": "string",
      "text": "string", "image": "string|null",
      "timestamp": "datetime"
    }
  ],
  "last_read_at": { "user_id": "timestamp_ms" }
}
```

**Logic**: Messages stored in `order.messages[]`. Only customer and assigned courier can view.

---

### `POST /api/v1/orders/:id/messages`
**Auth**: `customer`, `courier` | **Description**: Send chat message

**Request**:
```json
{
  "text": "string (optional, required if no image)",
  "image": "string (optional, base64 data URL)"
}
```

**Response `201`**: Created message object.

**Logic**: Append to `order.messages[]` with `sender_id`, `sender_name`, `timestamp`. Notify opposite role via `notifyNewChatMessage()`. At least `text` or `image` must be provided.

---

### `PUT /api/v1/orders/:id/messages/read`
**Auth**: `customer`, `courier` | **Description**: Mark messages as read for current user

**Response `200`**: `{ "last_read_at": timestamp_ms }`

**Logic**: Set `order.lastReadAt[currentUserId] = Date.now()`. In JS, `markAllChatAsRead()` does this per-order or per-user across all orders.

---

### `POST /api/v1/orders/:id/messages/media`
**Auth**: `customer`, `courier` | **Description**: Upload image for chat

**Request**: `multipart/form-data` with `image` field.

**Response `201`**: `{ "url": "string" }`

**Logic**: In JS, images are base64 data URLs stored inline. Backend should accept file upload, store (S3/local), return URL.

---

## 12. Notifications

### `GET /api/v1/notifications`
**Auth**: All authenticated | **Description**: List notifications for current role

**Query params**: `?page=1&limit=20`, `?unread_only=true`

**Response `200`**:
```json
{
  "notifications": [
    {
      "id": "string", "title": "string", "message": "string",
      "type": "string", "icon": "string",
      "target_roles": ["string"],
      "related_order_id": "string|null",
      "read": { "role": bool },
      "created_at": "datetime"
    }
  ]
}
```

**Logic**: Filter notifications where `targetRoles` includes current user's role or `"all"`. In JS, `getRoleNotifications()`. Notifications stored in separate localStorage key `arqa_notifications`.

---

### `GET /api/v1/notifications/unread-count`
**Auth**: All authenticated | **Description**: Get unread count for current role

**Response `200`**: `{ "count": int }`

**Logic**: Count notifications where `read_by[role] !== true`. In JS, `getUnreadCount()`.

---

### `PATCH /api/v1/notifications/:id/read`
**Auth**: All authenticated | **Description**: Mark notification as read

**Logic**: Set `notification.read_by[role] = true`. In JS, `markAsRead(id)`.

---

### `PUT /api/v1/notifications/read-all`
**Auth**: All authenticated | **Description**: Mark all as read for current role

**Logic**: Set `read_by[role] = true` for all notifications targeting this role. In JS, `markAllAsRead()`.

---

### `DELETE /api/v1/notifications`
**Auth**: All authenticated | **Description**: Clear all notifications (optional)

**Logic**: Not in current JS, but useful for backend cleanup.

---

## 13. Playground Tickets

### `GET /api/v1/playground/tickets`
**Auth**: `playground`, `admin`, `manager` | **Description**: List tickets

**Query params**: `?status=active|completed|cancelled`, `?start_date=&end_date=`, `?search=customer_name`

**Response `200`**:
```json
{
  "tickets": [
    {
      "id": "string", "customer_name": "string",
      "children": int, "companions": int,
      "hours": int, "start_time": "datetime",
      "end_time": "datetime", "remaining_seconds": int,
      "status": "string", "total_amount": int,
      "payment_status": "string", "items": [...],
      "extra_transactions": [...]
    }
  ]
}
```

**Logic**: Tickets from `playgroundTickets[]`. `remaining_seconds` calculated from `end_time - now()` for active tickets. Used for live timer display.

---

### `POST /api/v1/playground/tickets`
**Auth**: `playground` | **Description**: Create ticket

**Request**:
```json
{
  "customer_name": "string (required)",
  "children": int (required, number of children entering),
  "companions": int (required, number of adult companions),
  "hours": int (required, 1|2|3),
  "items": [
    { "pg_stock_item_id": "string", "quantity": int, "unit_price": int }
  ]
}
```

**Response `201`**: Full ticket object.

**Logic**: Multi-step wizard in JS (`renderCreateTicket()` → `createTicket()`). Calculate `total_amount` = child fee + companion fee + items. Set `start_time = now()`, `end_time = start_time + hours`. Status `active`. Payment initial `unpaid`. Reduce `pgStockItems[].stock` for items purchased.

---

### `GET /api/v1/playground/tickets/:id`
**Auth**: `playground`, `admin`, `manager` | **Description**: Get ticket detail

---

### `POST /api/v1/playground/tickets/:id/pay`
**Auth**: `playground` | **Description**: Process payment

**Request**:
```json
{
  "payment_method": "string (cash|digital|qris)"
}
```

**Response `200`**: `{ "payment_status": "paid", "payment_method": "..." }`

**Logic**: Set `payment_status = "paid"`. In JS, `checkoutPlaygroundTicket(id)`.

---

### `POST /api/v1/playground/tickets/:id/cancel`
**Auth**: `playground` | **Description**: Cancel active ticket

**Logic**: Set `status = "cancelled"`. No refund logic in current JS. In JS, `cancelPlaygroundTicket(id)`.

---

### `POST /api/v1/playground/tickets/:id/extra-time`
**Auth**: `playground` | **Description**: Add extra time to active ticket

**Request**:
```json
{
  "extra_hours": int (required, 1|2|3)
}
```

**Response `200`**: Updated ticket with new end_time.

**Logic**: Extend `end_time` by `extra_hours`. Create `extra_transactions[]` entry with type `"extra_time"`, amount. Update `total_amount`. In JS, `confirmPgExtraTime(id)`.

---

### `POST /api/v1/playground/tickets/:id/extra-items`
**Auth**: `playground` | **Description**: Add items to ticket

**Request**:
```json
{
  "items": [
    { "pg_stock_item_id": "string", "quantity": int }
  ]
}
```

**Logic**: Add items to `extra_transactions[]`. Reduce `pgStockItems[].stock`. Update `total_amount`. In JS, this is part of the ticket detail modal.

---

### `POST /api/v1/playground/tickets/:id/pay-later`
**Auth**: `playground` | **Description**: Mark ticket for pay-later

**Logic**: In JS, some tickets are "pay later" — set `payment_status = "unpaid"` but ticket stays active. Similar to dine-in pay-later pattern.

---

## 14. Playground Stock

### `GET /api/v1/playground/stock`
**Auth**: `playground`, `admin`, `manager` | **Description**: List PG stock items

**Response `200`**:
```json
{
  "items": [
    { "id": "string", "name": "string", "price": int,
      "unit": "string", "category": "string",
      "current_quantity": int, "min_quantity": int, "image": "string" }
  ]
}
```

---

### `POST /api/v1/playground/stock`
**Auth**: `playground`, `admin`, `manager` | **Description**: Add PG stock item

**Request**:
```json
{
  "name": "string (required)",
  "price": int (required),
  "unit": "string (required)",
  "category": "string (optional)",
  "stock": int (default: 0),
  "image": "string (optional, URL or base64)"
}
```

---

### `PUT /api/v1/playground/stock/:id`
**Auth**: `playground`, `admin`, `manager` | **Description**: Edit PG stock item

---

### `DELETE /api/v1/playground/stock/:id`
**Auth**: `playground`, `admin`, `manager` | **Description**: Delete PG stock item

---

### `POST /api/v1/playground/stock/:id/restock`
**Auth**: `playground`, `admin`, `manager` | **Description**: Restock PG item

**Request**:
```json
{
  "quantity": int (required, positive)
}
```

**Logic**: Increase `stock` by quantity. Create `pgStockMovements[]` entry with type `"in"`.

---

### `POST /api/v1/playground/stock/:id/adjust`
**Auth**: `playground`, `admin`, `manager` | **Description**: Adjust stock (positive or negative)

**Request**:
```json
{
  "quantity": int (required, can be negative)
}
```

**Logic**: Adjust `stock` by quantity. Create `pgStockMovements[]` entry. Warn if stock goes below 0 (in JS, `confirmReduceStock` warns). In JS, `adjustStock()` supports +5 or -2 quick adjustments.

---

### `GET /api/v1/playground/stock/movements`
**Auth**: `playground`, `admin`, `manager` | **Description**: Get movement history

**Query params**: `?start_date=&end_date=`, `?item_id=`

---

## 15. Cafe Stock

### `GET /api/v1/stock/items`
**Auth**: `admin`, `manager` | **Description**: List stock items

**Response `200`**:
```json
{
  "items": [
    { "id": "string", "name": "string", "unit": "string",
      "current_quantity": int, "min_quantity": int,
      "price": int, "updated_at": "datetime" }
  ]
}
```

**Logic**: Sorted by depletion ratio ascending (most depleted first). In JS, `renderStockManagement()` sorts by `current_quantity / min_quantity`.

---

### `POST /api/v1/stock/items`
**Auth**: `admin`, `manager` | **Description**: Add stock item

**Request**:
```json
{
  "name": "string (required)",
  "unit": "string (required, e.g. kg, liter, pcs)",
  "current_quantity": int (default: 0),
  "min_quantity": int (default: 0),
  "price": int (optional)
}
```

---

### `PUT /api/v1/stock/items/:id`
**Auth**: `admin`, `manager` | **Description**: Edit stock item (name, min_quantity)

---

### `DELETE /api/v1/stock/items/:id`
**Auth**: `admin`, `manager` | **Description**: Delete stock item

---

### `POST /api/v1/stock/items/:id/restock`
**Auth**: `admin`, `manager` | **Description**: Restock item

**Request**:
```json
{
  "quantity": int (required, positive),
  "price": int (optional, unit price for expense tracking),
  "create_expense": bool (default: false)
}
```

**Response `200`**: Updated stock item.

**Logic**: Increase `current_quantity`. Create `stockMovements[]` entry with type `"in"`. If `create_expense === true`, also create `expenses[]` entry with category `"Stok"` and amount = `quantity × price`.

---

### `POST /api/v1/stock/items/:id/adjust`
**Auth**: `admin`, `manager` | **Description**: Adjust stock (reduce)

**Request**:
```json
{
  "quantity": int (required, positive),
  "note": "string (optional)"
}
```

**Response `200`**: Updated stock item.

**Logic**: Decrease `current_quantity`. Create `stockMovements[]` entry with type `"out"`. Warn if new quantity < `min_quantity`. In JS, `confirmReduceStock()` triggers low stock notification.

---

### `GET /api/v1/stock/movements`
**Auth**: `admin`, `manager` | **Description**: Get stock movement history

**Query params**: `?start_date=&end_date=`, `?item_id=`, `?type=in|out`

**Response `200`**:
```json
{
  "movements": [
    { "id": "string", "stock_item_id": "string",
      "user_id": "string", "type": "in|out",
      "quantity": int, "notes": "string", "created_at": "datetime" }
  ]
}
```

---

## 16. Expenses

### `GET /api/v1/expenses`
**Auth**: `admin`, `manager`, `cashier` | **Description**: List expenses

**Query params**: `?start_date=&end_date=`, `?category=Stok|Operasional|Gaji|Lainnya`, `?search=keyword`

**Response `200`**:
```json
{
  "expenses": [
    { "id": "string", "date": "date", "category": "string",
      "amount": int, "note": "string" }
  ],
  "summary": { "Stok": int, "Operasional": int, "Gaji": int, "Lainnya": int }
}
```

**Logic**: Categories: `"Stok"`, `"Operasional"`, `"Gaji"`, `"Lainnya"`. Auto-created by restock operations (category "Stok") and courier ongkir confirmations (category "Operasional").

---

### `POST /api/v1/expenses`
**Auth**: `admin`, `manager` | **Description**: Create expense

**Request**:
```json
{
  "date": "date (optional, defaults to today)",
  "category": "string (required, enum)",
  "amount": int (required),
  "note": "string (optional)"
}
```

**Logic**: In JS, expense form has volume × unitPrice auto-calc. Backend just receives final amount.

---

### `PUT /api/v1/expenses/:id`
**Auth**: `admin`, `manager` | **Description**: Update expense

---

### `DELETE /api/v1/expenses/:id`
**Auth**: `admin`, `manager` | **Description**: Delete expense

---

## 17. Promos

### `GET /api/v1/promos`
**Auth**: All authenticated | **Description**: List active promos

**Query params**: `?all=true` (admin/manager see all including inactive)

**Response `200`**:
```json
{
  "promos": [
    { "id": "string", "code": "string", "title": "string",
      "icon": "string", "color": "string", "desc": "string",
      "discount_type": "percent|fixed", "discount_value": int,
      "start_date": "date|null", "end_date": "date|null",
      "menu_ids": ["string"], "image": "string",
      "terms": "string", "is_active": bool }
  ]
}
```

---

### `POST /api/v1/promos`
**Auth**: `admin`, `manager` | **Description**: Create promo

**Request**:
```json
{
  "code": "string (required, unique)",
  "title": "string (required)",
  "desc": "string (optional)",
  "discount_type": "string (required, percent|fixed)",
  "discount_value": int (required),
  "start_date": "date (optional)",
  "end_date": "date (optional)",
  "menu_ids": ["string"] (optional, empty = all items eligible),
  "is_active": bool (default: true),
  "image": "string (optional)",
  "icon": "string (optional, Font Awesome class)",
  "color": "string (optional, hex)",
  "terms": "string (optional)"
}
```

---

### `PUT /api/v1/promos/:id`
**Auth**: `admin`, `manager` | **Description**: Update promo

---

### `DELETE /api/v1/promos/:id`
**Auth**: `admin`, `manager` | **Description**: Delete promo

---

### `PATCH /api/v1/promos/:id/toggle`
**Auth**: `admin`, `manager` | **Description**: Toggle is_active

**Response `200`**: `{ "is_active": bool }`

**Logic**: Toggle `is_active`. Validate dates: if toggling on and `end_date` is in the past, reject (display warning in JS). In JS, `togglePromoStatus(id)`.

---

## 18. Finance

### `GET /api/v1/finance/revenue`
**Auth**: `admin`, `manager`, `cashier`, `mitra_juru_masak` | **Description**: Get revenue data

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "period": { "start": "date", "end": "date" },
  "total_revenue": int,
  "total_orders": int,
  "daily": [
    { "date": "date", "revenue": int, "orders": int }
  ]
}
```

**Logic**: Calculate from paid orders (where `payment_status === "paid"`). Uses `getFinanceData(startDate, endDate)` — aggregates paid orders by date. Excludes static `dailySales[]` (seed only, not updated at runtime). Cashier sees current day only.

---

### `GET /api/v1/finance/revenue/cafe`
**Auth**: `admin`, `manager` | **Description**: Cafe revenue detail (order-by-order breakdown)

**Query params**: `?date=2025-01-15` (required)

**Response `200`**:
```json
{
  "orders": [
    { "id": "string", "customer_name": "string",
      "order_type": "string", "total_amount": int,
      "payment_method": "string", "created_at": "datetime",
      "items": [...] }
  ],
  "summary": { "cash": int, "digital": int, "total": int }
}
```

---

### `GET /api/v1/finance/revenue/playground`
**Auth**: `playground`, `admin`, `manager` | **Description**: Playground revenue detail

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "tickets": [
    { "id": "string", "customer_name": "string",
      "total_amount": int, "payment_method": "string",
      "hours": int, "created_at": "datetime" }
  ]
}
```

**Logic**: Uses `getPlaygroundPeriodOrders()` and `getPlaygroundPeriodEntries()`.

---

### `GET /api/v1/finance/expenses`
**Auth**: `admin`, `manager` | **Description**: Expense summary for finance report

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "total": int,
  "by_category": { "Stok": int, "Operasional": int, "Gaji": int, "Lainnya": int }
}
```

---

### `GET /api/v1/finance/profit`
**Auth**: `admin`, `manager` | **Description**: Profit/Loss calculation

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "revenue": int, "expenses": int, "profit": int,
  "daily": [
    { "date": "date", "revenue": int, "expenses": int, "profit": int }
  ]
}
```

---

### `GET /api/v1/finance/average`
**Auth**: `admin`, `manager` | **Description**: Daily average revenue

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "avg_daily_revenue": float,
  "avg_daily_orders": float,
  "total_days": int,
  "daily": [...]
}
```

---

### `GET /api/v1/finance/top-products`
**Auth**: `admin`, `manager` | **Description**: Top selling products in period

**Query params**: `?start_date=&end_date=`, `?limit=10`

**Response `200`**:
```json
{
  "products": [
    { "menu_item_id": "string", "name": "string",
      "total_quantity": int, "total_revenue": int }
  ]
}
```

**Logic**: Aggregate from paid orders' items. Sort by `total_quantity` descending.

---

### `GET /api/v1/finance/combined`
**Auth**: `admin`, `manager` | **Description**: Combined daily entries (cafe + playground)

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "entries": [
    { "date": "date", "source": "cafe|playground", "revenue": int }
  ]
}
```

**Logic**: Uses `getMergedDailyEntries()` — union of cafe paid orders and playground paid tickets by date.

---

## 19. Attendance

### `POST /api/v1/attendance/check-in`
**Auth**: All staff roles (admin, manager, cashier, kitchen, courier, waiter, playground, mitra_juru_masak) | **Description**: Staff check-in

**Request**:
```json
{
  "lat": float (required),
  "lng": float (required)
}
```

**Response `200`**:
```json
{
  "attendance": { "id": "string", "user_id": "string",
    "check_in": "datetime", "status": "active" }
}
```

**Logic**: Validate distance from cafe location ≤ 200m (`ARQA_RADIUS`). Create `attendances[]` entry. Set `check_out: null`. Check for duplicate active check-in (should fail if already checked in today). In JS, `staffCheckIn()` + `modalCheckIn()`.

---

### `POST /api/v1/attendance/check-out`
**Auth**: All staff roles (with active check-in) | **Description**: Staff check-out

**Request**:
```json
{
  "lat": float (optional, current location),
  "lng": float (optional)
}
```

**Response `200`**:
```json
{
  "attendance": { "id": "string", "check_in": "datetime",
    "check_out": "datetime", "status": "completed" }
}
```

**Logic**: Find today's active attendance for user. Set `check_out = now()`. In JS, `staffCheckOut()`.

---

### `GET /api/v1/attendance`
**Auth**: `admin`, `manager` | **Description**: List attendance records

**Query params**: `?date=2025-01-15`, `?user_id=`, `?status=active|completed`

**Response `200`**:
```json
{
  "attendance": [
    { "id": "string", "user_id": "string", "user_name": "string",
      "user_role": "string", "check_in": "datetime",
      "check_out": "datetime|null", "status": "string",
      "duration": "string|null" }
  ]
}
```

**Logic**: `duration` = `check_out - check_in` formatted as "HH:MM:SS" (computed server-side).

---

### `GET /api/v1/attendance/active`
**Auth**: `admin`, `manager` | **Description**: Get currently active employees

**Response `200`**:
```json
{
  "active_employees": [
    { "user_id": "string", "name": "string", "role": "string",
      "check_in": "datetime", "since": "string (duration)" }
  ]
}
```

**Logic**: Filter where `check_out === null` and `check_in` date = today.

---

### `GET /api/v1/attendance/summary/:user_id`
**Auth**: `admin`, `manager` | **Description**: Staff attendance summary

**Query params**: `?start_date=&end_date=`

**Response `200`**:
```json
{
  "user": { "id": "string", "name": "string", "role": "string" },
  "total_days": int,
  "total_hours": float,
  "records": [...]
}
```

---

## 20. Mitra Payouts

### `GET /api/v1/mitra/payouts`
**Auth**: `cashier`, `admin`, `manager` | **Description**: List mitra payouts

**Query params**: `?status=pending|paid`, `?mitra_name=`

**Response `200`**:
```json
{
  "payouts": [
    { "id": "string", "order_id": "string", "mitra_name": "string",
      "amount": int, "status": "string (pending|paid)",
      "items": [...], "created_at": "datetime", "paid_at": "datetime|null" }
  ]
}
```

**Logic**: From `mitraPayouts[]`. Created automatically by `createMitraPayouts(orderId)` when an order containing mitra items is completed. In JS, `getMitraPendingPayouts()` and `getMitraPaidPayouts()`.

---

### `POST /api/v1/mitra/payouts/:id/settle`
**Auth**: `cashier`, `admin` | **Description**: Settle (pay) a mitra payout

**Response `200`**: `{ "status": "paid", "paid_at": "datetime" }`

**Logic**: Set `status = "paid"`, `paid_at = now()`. In JS, `settleMitraPayout(payoutId)`.

---

### `GET /api/v1/mitra/finance`
**Auth**: `admin`, `manager`, `mitra_juru_masak` | **Description**: Mitra financial summary

**Query params**: `?start_date=&end_date=`, `?mitra_name=` (admin/manager only)

**Response `200`**:
```json
{
  "total_paid": int,
  "total_pending": int,
  "by_mitra": [
    { "name": "string", "paid": int, "pending": int }
  ]
}
```

---

## 21. Mitra Registrations

### `GET /api/v1/mitra/registrations`
**Auth**: `admin` | **Description**: List pending mitra registrations

**Query params**: `?status=pending|approved|rejected`

**Response `200`**:
```json
{
  "registrations": [
    { "id": "string", "name": "string", "email": "string",
      "role": "string (courier|mitra_juru_masak)",
      "position": {"lat": float, "lng": float},
      "status": "string", "created_at": "datetime" }
  ]
}
```

---

### `POST /api/v1/mitra/registrations/:id/approve`
**Auth**: `admin` | **Description**: Approve registration → create user

**Response `200`**: `{ "user_id": "string", "password": "123456" }`

**Logic**: Create user from registration data. Role = registration role. Password = `"123456"` (should be hashed). Remove registration from `mitraRegistrations[]`. Notify applicant via notification. In JS, `approveMitraRegistration(id)`.

---

### `POST /api/v1/mitra/registrations/:id/reject`
**Auth**: `admin` | **Description**: Reject registration

**Request**:
```json
{
  "reason": "string (optional)"
}
```

**Logic**: Set `registration.status = "rejected"` with reason. Notify applicant. In JS, `rejectMitraRegistration(id)`.

---

## 22. Courier Finance

### `GET /api/v1/courier/finance`
**Auth**: `admin`, `manager`, `courier` | **Description**: Courier financial report

**Query params**: `?start_date=&end_date=`, `?courier_id=` (admin/manager filter)

**Response `200`**:
```json
{
  "total_salary": int,
  "total_ongkir": int,
  "by_courier": [
    { "courier_id": "string", "name": "string",
      "delivery_count": int, "total_salary": int,
      "total_ongkir": int, "confirmed_ongkir": int }
  ]
}
```

**Logic**: Aggregated from orders with `courier_id` set, filtered by `status === "delivered"` or `"completed"`. Ongkir is the shipping fee. Salary is per-delivery fee configured in tariff settings.

---

### `POST /api/v1/courier/ongkir/:order_id/confirm`
**Auth**: `courier` | **Description**: Courier confirms ongkir receipt

**Response `200`**: `{ "ongkir_status": "confirmed" }`

**Logic**: Alias for `POST /api/v1/deliveries/:id/confirm-ongkir`. In JS, `confirmOngkir(orderId)`.

---

### `POST /api/v1/courier/delivery/:order_id/salary`
**Auth**: `admin`, `manager` | **Description**: Add/manual adjust courier salary for delivery

**Request**:
```json
{
  "amount": int
}
```

**Logic**: Creates expense entry for courier salary. In JS, this is part of the auto-generated records when delivery is completed.

---

## 23. Service Control

### `GET /api/v1/service/status`
**Auth**: Public, `admin`, `manager` | **Description**: Get cafe open/closed status

**Response `200`**:
```json
{
  "service_status": "string (open|closed|force_open)",
  "is_closed": bool,
  "reason": "string|null",
  "schedule": { "today": { "open": "08:00", "close": "22:00" } },
  "next_open": "datetime|null"
}
```

**Logic**: `is_closed` computed by `isServiceClosed()`: checks `serviceStatus` → if `"closed"` → true; if `"force_open"` → false; if `"open"` → check schedule hours + special dates. For public, returns just `is_closed` bool. For admin/manager, returns full config.

---

### `PUT /api/v1/service/status`
**Auth**: `admin`, `manager` | **Description**: Toggle service status

**Request**:
```json
{
  "status": "string (required, open|closed|force_open)"
}
```

**Logic**: Set `DB.cafe.serviceStatus`. Cycles through open ↔ closed ↔ force_open in JS (`toggleServiceStatus()`).

---

### `GET /api/v1/service/schedule`
**Auth**: `admin`, `manager` | **Description**: Get weekly schedule

**Response `200`**:
```json
{
  "schedule": [
    { "day": 0, "name": "Senin", "open": "08:00", "close": "22:00" },
    { "day": 1, "name": "Selasa", "open": "08:00", "close": "22:00" },
    ...
  ]
}
```

---

### `PUT /api/v1/service/schedule`
**Auth**: `admin`, `manager` | **Description**: Update schedule

**Request**:
```json
{
  "schedule": [
    { "day": int, "open": "HH:MM", "close": "HH:MM" }
  ]
}
```

**Logic**: Replace `DB.cafe.serviceSchedule`. Validate time format. In JS, `saveServiceSchedule()` updates each day individually.

---

### `GET /api/v1/service/special-dates`
**Auth**: `admin`, `manager` | **Description**: List special date exceptions

---

### `POST /api/v1/service/special-dates`
**Auth**: `admin`, `manager` | **Description**: Add special date

**Request**:
```json
{
  "date": "date (required, format: 2025-12-25)",
  "closed": bool (default: true),
  "note": "string (optional, e.g. Hari Natal)"
}
```

---

### `DELETE /api/v1/service/special-dates/:id`
**Auth**: `admin`, `manager` | **Description**: Remove special date

---

## 24. Tariff Settings

### `GET /api/v1/settings/tariffs`
**Auth**: `admin`, `manager` | **Description**: Get all tariff settings

**Response `200`**:
```json
{
  "courier": {
    "shipping": { "rate_per_km": int, "min": int, "max": int },
    "service_fee": { "type": "percent|fixed", "value": float }
  },
  "mitra": {
    "service_fee": { "type": "percent|fixed", "value": float }
  },
  "customer": {
    "service_fee": { "type": "percent|fixed", "value": float }
  }
}
```

**Logic**: From `DB.cafe.rates`. In JS, this is in `DB.cafe.rates = { courier: {...}, mitra: {...}, customer: {...} }`.

---

### `PUT /api/v1/settings/tariffs/courier`
**Auth**: `admin`, `manager` | **Description**: Update courier tariff

**Request**:
```json
{
  "shipping": { "rate_per_km": int, "min": int, "max": int },
  "service_fee": { "type": "percent|fixed", "value": float }
}
```

---

### `PUT /api/v1/settings/tariffs/mitra`
**Auth**: `admin`, `manager` | **Description**: Update mitra tariff

**Request**:
```json
{
  "service_fee": { "type": "percent|fixed", "value": float }
}
```

---

### `PUT /api/v1/settings/tariffs/customer`
**Auth**: `admin`, `manager` | **Description**: Update customer tariff

**Request**:
```json
{
  "service_fee": { "type": "percent|fixed", "value": float }
}
```

**Logic**: In JS, `saveTarifPelanggan()` updates `DB.cafe.rates.customer.service_fee`.

---

### `GET /api/v1/settings/cafe`
**Auth**: All authenticated | **Description**: Get cafe configuration (location, shipping, address)

**Response `200`**:
```json
{
  "location": { "lat": float, "lng": float },
  "address": "string",
  "shipping": { "rate_per_km": int, "min": int, "max": int }
}
```

**Logic**: From `DB.cafe`. Used by `getShippingConfig()` and `CAFE_LOCATION`.

---

## 25. Dashboard & Summary

### `GET /api/v1/dashboard/overview`
**Auth**: `admin` | **Description**: Admin dashboard overview

**Response `200`**:
```json
{
  "stats": {
    "total_orders_today": int,
    "active_orders": int,
    "total_revenue_today": int,
    "active_employees": int,
    "low_stock_items": [{"id": "string", "name": "string", "current": int, "min": int}],
    "overtime_employees": [{"user_id": "string", "name": "string", "hours": float}]
  },
  "top_products": [...],
  "daily_sales_chart": [...],
  "active_tickets": int
}
```

**Logic**: Aggregates from orders, attendance, stock, PG tickets. Low stock = `current_quantity < min_quantity`. Overtime = checked in > 8 hours. In JS, `renderAdminOverview()`.

---

### `GET /api/v1/dashboard/manager`
**Auth**: `manager` | **Description**: Manager dashboard

**Response `200`**:
```json
{
  "stats": {
    "total_orders_today": int,
    "pending_orders": int,
    "active_employees": int,
    "table_summary": { "available": int, "occupied": int, "total": int }
  },
  "top_products": [...],
  "daily_sales_chart": [...]
}
```

**Logic**: In JS, `renderManagerDashboard()`.

---

### `GET /api/v1/dashboard/cashier`
**Auth**: `cashier` | **Description**: Cashier daily summary

**Response `200`**:
```json
{
  "today": {
    "total_orders": int,
    "total_revenue": int,
    "cash_revenue": int,
    "digital_revenue": int,
    "payment_breakdown": [
      { "method": "cash", "count": int, "total": int },
      { "method": "digital", "count": int, "total": int },
      { "method": "qris", "count": int, "total": int }
    ]
  }
}
```

**Logic**: In JS, `renderDoneToday()`.

---

### `GET /api/v1/dashboard/active-orders`
**Auth**: `admin`, `manager` | **Description**: Active orders + PG tickets

**Query params**: `?start_date=&end_date=`, `?search=`

**Response `200`**:
```json
{
  "orders": [...],
  "playground_tickets": [...]
}
```

**Logic**: In JS, `renderActiveOrders()` and `renderActivePlaygroundTickets()`.

---

## 26. Appendix: Role-Tab Routes

| Role | Tab | API Endpoints Required |
|---|---|---|
| **admin** | overview | `GET /api/v1/dashboard/overview` |
| admin | active-orders | `GET /api/v1/dashboard/active-orders` |
| admin | active-playground | `GET /api/v1/dashboard/active-orders?type=playground` |
| admin | menu-mgmt | `GET /api/v1/menu-items?all=true`, `POST/PUT/DELETE`, `PATCH .../approve\|reject\|availability` |
| admin | promos | `GET /api/v1/promos?all=true`, `POST/PUT/DELETE`, `PATCH .../toggle` |
| admin | finance | `GET /api/v1/finance/revenue`, `/expenses`, `/profit`, `/average`, `/top-products` |
| admin | expenses | `GET /api/v1/expenses`, `POST/PUT/DELETE` |
| admin | stock | `GET /api/v1/stock/items`, `POST/PUT/DELETE`, `POST .../restock\|adjust` |
| admin | pg-stock | `GET /api/v1/playground/stock`, `POST/PUT/DELETE`, `POST .../restock\|adjust` |
| admin | mitra-finance | `GET /api/v1/mitra/finance` |
| admin | courier-finance | `GET /api/v1/courier/finance` |
| admin | mitra-approval | `GET /api/v1/mitra/registrations`, `POST .../approve\|reject` |
| admin | tables-mgmt | `GET /api/v1/tables`, `POST/PUT/DELETE`, `PATCH .../status`, `GET .../:id/qr` |
| admin | users | `GET /api/v1/users`, `POST/PUT/DELETE` |
| admin | service-control | `GET/PUT /api/v1/service/status`, `/schedule`, `/special-dates` |
| admin | tarif-group | `GET /api/v1/settings/tariffs`, `PUT .../courier\|mitra\|customer` |
| admin | attendance | `GET /api/v1/attendance`, `/active`, `/summary/:user_id` |
| admin | profile | `GET/PUT /api/v1/profile`, `PUT .../password` |
| **manager** | dashboard | `GET /api/v1/dashboard/manager` |
| manager | report | `GET /api/v1/finance/revenue` (per-date detail) |
| manager | users | `GET /api/v1/users`, `POST/PUT/DELETE` (no admin role) |
| manager | menu-mgmt | Same as admin menu-mgmt |
| manager | promos | Same as admin promos |
| manager | finance | Same as admin finance |
| manager | stock | Same as admin stock |
| manager | pg-stock | Same as admin pg-stock |
| manager | expenses | Same as admin expenses |
| manager | tables-mgmt | Same as admin tables-mgmt |
| manager | attendance | Same as admin attendance |
| manager | tarif-kurir | `PUT /api/v1/settings/tariffs/courier` |
| manager | tarif-mitra | `PUT /api/v1/settings/tariffs/mitra` |
| manager | tarif-pelanggan | `PUT /api/v1/settings/tariffs/customer` |
| manager | active-orders | Same as admin active-orders |
| manager | active-playground | Same as admin active-playground |
| manager | profile | `GET/PUT /api/v1/profile` |
| **cashier** | orders | `GET /api/v1/orders?status=pending,ready`, `POST /api/v1/orders/:id/accept`, `PUT /api/v1/orders/:id` |
| cashier | payment | `POST /api/v1/orders/:id/pay-digital\|pay-cash\|settle-delivery` |
| cashier | report | `GET /api/v1/finance/revenue` (today only) |
| cashier | tables-mgmt | `GET /api/v1/tables` (read-only) |
| cashier | profile | `GET/PUT /api/v1/profile`, `POST /api/v1/attendance/check-in\|check-out` |
| **kitchen** | queue | `GET /api/v1/orders?role=kitchen&status=pending,cooking` |
| kitchen | history | `GET /api/v1/orders?role=kitchen&status=completed,rejected` |
| kitchen | profile | Same as cashier profile |
| **courier** | available | `GET /api/v1/deliveries/available` |
| courier | active | `GET /api/v1/deliveries/:id/track`, `POST .../accept\|complete\|track` |
| courier | history | `GET /api/v1/orders?role=courier&status=delivered,completed`, `POST .../confirm-ongkir` |
| courier | profile | Same as cashier profile + `PUT /api/v1/profile/position` |
| **waiter** | menu | `GET /api/v1/menu-items?available=true` |
| waiter | cart | `GET/POST/DELETE /api/v1/cart/*`, `POST /api/v1/orders` |
| waiter | orders | `GET /api/v1/orders?user_id=...`, `POST /api/v1/orders/:id/cancel` |
| waiter | profile | Same as cashier profile |
| **customer** | menu | `GET /api/v1/menu-items?available=true&approved=true` |
| customer | cart | Same as waiter cart |
| customer | orders | `GET /api/v1/orders?user_id=...`, `POST .../pay-qris\|cancel`, `GET/POST /api/v1/orders/:id/messages` |
| customer | profile | `GET/PUT /api/v1/profile`, `PUT .../password` |
| **playground** | tickets | `GET/POST /api/v1/playground/tickets`, `POST .../pay\|cancel\|extra-time\|extra-items` |
| playground | report | `GET /api/v1/finance/revenue/playground` |
| playground | stock | `GET/POST/PUT/DELETE /api/v1/playground/stock`, `POST .../restock\|adjust` |
| playground | profile | Same as cashier profile |
| **mitra_juru_masak** | queue | `GET /api/v1/orders?role=mitra&status=pending,cooking` |
| mitra_juru_masak | history | `GET /api/v1/orders?role=mitra&status=completed,rejected` |
| mitra_juru_masak | menu-mgmt | `GET /api/v1/menu-items?submitted_by=...`, `POST/PUT`, `DELETE ...` |
| mitra_juru_masak | finance | `GET /api/v1/finance/revenue`, `GET /api/v1/mitra/finance?mitra_name=...` |
| mitra_juru_masak | profile | Same as cashier profile + `PUT /api/v1/profile/position` |
