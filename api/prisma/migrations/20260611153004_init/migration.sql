-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "tax_percentage" REAL NOT NULL DEFAULT 0,
    "submitted_by" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "table_id" TEXT,
    "order_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "total_amount" REAL NOT NULL,
    "shipping_cost" REAL NOT NULL DEFAULT 0,
    "payment_method" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'unpaid',
    "delivery_address" TEXT,
    "delivery_detail" TEXT,
    "delivery_location" TEXT,
    "customer_name" TEXT,
    "accepted" BOOLEAN,
    "promo_id" TEXT,
    "promo_discount" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courier_id" TEXT,
    "ongkir_status" TEXT
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "menu_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "notes" TEXT,
    "status" TEXT,
    CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "current_quantity" REAL NOT NULL,
    "min_quantity" REAL NOT NULL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "check_in" DATETIME NOT NULL,
    "check_out" DATETIME,
    "lat" REAL,
    "lng" REAL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CourierTracking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "courier_id" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "recorded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cafe" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT '1',
    "address" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "rates" TEXT NOT NULL,
    "shipping" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "discount_value" REAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "menu_ids" TEXT NOT NULL,
    "image" TEXT,
    "terms" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "DailySale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "revenue" REAL NOT NULL,
    "orders" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "note" TEXT,
    "volume" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "PlaygroundTicket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "children" TEXT NOT NULL,
    "companions" TEXT NOT NULL,
    "companion_count" INTEGER NOT NULL,
    "socks_per_child" TEXT NOT NULL,
    "socks_total" REAL NOT NULL,
    "hours" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "subtotal" REAL NOT NULL,
    "items_total" REAL NOT NULL,
    "total_amount" REAL NOT NULL,
    "payment_status" TEXT NOT NULL,
    "payment_method" TEXT,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PlaygroundTicketItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticket_id" TEXT NOT NULL,
    "menu_item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    CONSTRAINT "PlaygroundTicketItem_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "PlaygroundTicket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PgTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticket_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "method" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    CONSTRAINT "PgTransaction_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "PlaygroundTicket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PgStockItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "current_quantity" REAL NOT NULL,
    "min_quantity" REAL NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT,
    "updated_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PgStockMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "notes" TEXT,
    "created_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MitraPayout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "mitra_name" TEXT NOT NULL,
    "total_items" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "paid_at" TEXT,
    "paid_by" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DailySale_date_key" ON "DailySale"("date");
