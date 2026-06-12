import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as vm from 'vm'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

function parseDate(v: any): Date | undefined {
  if (!v) return undefined
  const d = new Date(v)
  return isNaN(d.getTime()) ? undefined : d
}

function jsonArr(v: any): string {
  return JSON.stringify(v || [])
}

function asStr(v: any): string | undefined {
  return v != null ? String(v) : undefined
}

async function main() {
  console.log('Seeding database...')

  const dbPath = path.join(__dirname, '../../data/db.js')
  const dbScript = fs.readFileSync(dbPath, 'utf8')

  const context = {
    localStorage: {
      getItem: () => null,
      setItem: () => {}
    },
    extracted: null as any
  }

  vm.createContext(context)

  const wrappedScript = dbScript + '\nextracted = DB;'

  try {
    vm.runInContext(wrappedScript, context)
  } catch (e) {
    console.log('Some errors occurred while evaluating db.js, proceeding with DB object...')
  }

  const DB = context.extracted

  if (!DB || !DB.users) {
    console.error('Failed to extract DB object from db.js')
    return
  }

  // ──────────────────────────────────────────────
  // Users
  // ──────────────────────────────────────────────
  for (const user of DB.users || []) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        business_name: user.business_name || null,
        mitra_position: user.mitra_position || null,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Tables
  // ──────────────────────────────────────────────
  for (const table of DB.tables || []) {
    await prisma.table.upsert({
      where: { id: table.id },
      update: {},
      create: {
        id: table.id,
        number: table.number,
        qr_code: table.qr_code,
        status: table.status,
        capacity: table.capacity,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Menu Items
  // ──────────────────────────────────────────────
  for (const menu of DB.menuItems || []) {
    await prisma.menuItem.upsert({
      where: { id: menu.id },
      update: {},
      create: {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        category: menu.category,
        image: menu.image,
        is_available: menu.is_available,
        tax_percentage: menu.tax_percentage || 0,
        submitted_by: menu.submitted_by,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Orders + OrderItems
  // ──────────────────────────────────────────────
  for (const o of DB.orders || []) {
    const items = (o.items || []).map((item: any) => ({
      id: item.id || crypto.randomUUID(),
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      notes: item.notes || null,
      status: item.status || null,
    }))

    await prisma.order.upsert({
      where: { id: o.id },
      update: {},
      create: {
        id: o.id,
        user_id: o.user_id,
        table_id: o.table_id || null,
        order_type: o.order_type,
        status: o.status,
        total_amount: o.total_amount,
        shipping_cost: o.shipping_cost || 0,
        payment_method: o.payment_method || null,
        payment_status: o.payment_status || 'unpaid',
        delivery_address: o.delivery_address || null,
        delivery_detail: o.delivery_detail || null,
        delivery_location: o.delivery_location ? JSON.stringify(o.delivery_location) : null,
        customer_name: o.customer_name || null,
        accepted: o.accepted ?? null,
        promo_id: o.promo_id || null,
        promo_discount: o.promo_discount || 0,
        created_at: parseDate(o.created_at) || new Date(),
        courier_id: o.courier_id || null,
        ongkir_status: o.ongkir_status || null,
        items: { create: items },
      }
    })
  }

  // ──────────────────────────────────────────────
  // Stock Items
  // ──────────────────────────────────────────────
  for (const s of DB.stockItems || []) {
    await prisma.stockItem.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        name: s.name,
        unit: s.unit,
        current_quantity: s.current_quantity,
        min_quantity: s.min_quantity,
        updated_at: parseDate(s.updated_at) || new Date(),
        price: s.price || 0,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Stock Movements
  // ──────────────────────────────────────────────
  for (const sm of DB.stockMovements || []) {
    await prisma.stockMovement.upsert({
      where: { id: sm.id },
      update: {},
      create: {
        id: sm.id,
        stock_item_id: sm.stock_item_id,
        user_id: sm.user_id,
        type: sm.type,
        quantity: sm.quantity,
        notes: sm.notes || null,
        created_at: parseDate(sm.created_at) || new Date(),
      }
    })
  }

  // ──────────────────────────────────────────────
  // Attendances
  // ──────────────────────────────────────────────
  for (const a of DB.attendances || []) {
    await prisma.attendance.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        user_id: a.user_id,
        check_in: parseDate(a.check_in) || new Date(),
        check_out: a.check_out ? parseDate(a.check_out) : null,
        lat: a.lat ?? null,
        lng: a.lng ?? null,
        status: a.status || 'present',
      }
    })
  }

  // ──────────────────────────────────────────────
  // Courier Tracking
  // ──────────────────────────────────────────────
  for (const ct of DB.courierTracking || []) {
    await prisma.courierTracking.upsert({
      where: { id: ct.id },
      update: {},
      create: {
        id: ct.id,
        order_id: ct.order_id,
        courier_id: ct.courier_id,
        latitude: ct.latitude,
        longitude: ct.longitude,
        recorded_at: parseDate(ct.recorded_at) || new Date(),
      }
    })
  }

  // ──────────────────────────────────────────────
  // Cafe
  // ──────────────────────────────────────────────
  if (DB.cafe) {
    await prisma.cafe.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        address: DB.cafe.address || "",
        lat: DB.cafe.location?.lat || 0,
        lng: DB.cafe.location?.lng || 0,
        rates: JSON.stringify(DB.cafe.rates || {}),
        shipping: JSON.stringify(DB.cafe.shipping || {}),
      }
    })
  }

  // ──────────────────────────────────────────────
  // Promos
  // ──────────────────────────────────────────────
  for (const promo of DB.promos || []) {
    await prisma.promo.upsert({
      where: { id: promo.id },
      update: {},
      create: {
        id: promo.id,
        code: promo.code,
        title: promo.title,
        icon: promo.icon,
        color: promo.color,
        desc: promo.desc,
        discount_type: promo.discount_type,
        discount_value: promo.discount_value,
        start_date: promo.start_date,
        end_date: promo.end_date,
        menu_ids: jsonArr(promo.menu_ids),
        image: promo.image || null,
        terms: jsonArr(promo.terms),
        is_active: promo.is_active,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Daily Sales
  // ──────────────────────────────────────────────
  for (const ds of DB.dailySales || []) {
    const id = ds.id || crypto.randomUUID()
    await prisma.dailySale.upsert({
      where: { id },
      update: {},
      create: {
        id,
        date: ds.date,
        revenue: ds.revenue,
        orders: ds.orders,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Expenses
  // ──────────────────────────────────────────────
  for (const ex of DB.expenses || []) {
    await prisma.expense.upsert({
      where: { id: ex.id },
      update: {},
      create: {
        id: ex.id,
        date: ex.date,
        category: ex.category,
        amount: ex.amount,
        note: ex.note || null,
        volume: ex.volume,
        unit: ex.unit,
        unitPrice: ex.unitPrice,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Playground Tickets + Items + Transactions
  // ──────────────────────────────────────────────
  for (const t of DB.playgroundTickets || []) {
    const ticketItems = (t.items || []).map((item: any) => ({
      id: item.id || crypto.randomUUID(),
      menu_item_id: item.menu_item_id,
      name: item.name,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }))

    const transactions = (t.pgTransactions || []).map((tx: any) => ({
      id: tx.id || `pgtx${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      type: tx.type,
      description: tx.description,
      amount: tx.amount,
      method: tx.method,
      created_at: tx.created_at || new Date().toISOString(),
    }))

    await prisma.playgroundTicket.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        user_id: t.user_id,
        customer_name: t.customer_name,
        children: jsonArr(t.children),
        companions: jsonArr(t.companions),
        companion_count: t.companion_count || 0,
        socks_per_child: jsonArr(t.socks_per_child),
        socks_total: t.socks_total || 0,
        hours: t.hours,
        start_time: t.start_time,
        end_time: t.end_time,
        subtotal: t.subtotal,
        items_total: t.items_total || 0,
        total_amount: t.total_amount,
        payment_status: t.payment_status || 'unpaid',
        payment_method: t.payment_method || null,
        status: t.status || 'active',
        created_at: parseDate(t.created_at) || new Date(),
        items: { create: ticketItems },
        transactions: { create: transactions },
      }
    })
  }

  // ──────────────────────────────────────────────
  // Playground Stock Items
  // ──────────────────────────────────────────────
  for (const ps of DB.pgStockItems || []) {
    await prisma.pgStockItem.upsert({
      where: { id: ps.id },
      update: {},
      create: {
        id: ps.id,
        name: ps.name,
        category: ps.category,
        unit: ps.unit,
        current_quantity: ps.current_quantity,
        min_quantity: ps.min_quantity,
        price: ps.price,
        image: ps.image || null,
        updated_at: asStr(ps.updated_at) || new Date().toISOString(),
      }
    })
  }

  // ──────────────────────────────────────────────
  // Playground Stock Movements
  // ──────────────────────────────────────────────
  for (const pm of DB.pgStockMovements || []) {
    await prisma.pgStockMovement.upsert({
      where: { id: pm.id },
      update: {},
      create: {
        id: pm.id,
        stock_item_id: pm.stock_item_id,
        user_id: pm.user_id,
        type: pm.type,
        quantity: pm.quantity,
        notes: pm.notes || null,
        created_at: asStr(pm.created_at) || new Date().toISOString(),
      }
    })
  }

  // ──────────────────────────────────────────────
  // Mitra Payouts
  // ──────────────────────────────────────────────
  for (const mp of DB.mitraPayouts || []) {
    await prisma.mitraPayout.upsert({
      where: { id: mp.id },
      update: {},
      create: {
        id: mp.id,
        order_id: mp.order_id,
        mitra_name: mp.mitra_name,
        total_items: mp.total_items || 0,
        fee: mp.fee || 0,
        tax: mp.tax || 0,
        amount: mp.amount,
        status: mp.status || 'unpaid',
        created_at: asStr(mp.created_at) || new Date().toISOString(),
        paid_at: asStr(mp.paid_at) || null,
        paid_by: mp.paid_by || null,
      }
    })
  }

  // ──────────────────────────────────────────────
  // Notifications
  // ──────────────────────────────────────────────
  const sampleNotifs = [
    {
      id: 'notif_seed_1',
      target_role: 'admin',
      target_roles: JSON.stringify(['admin', 'manager']),
      title: 'Selamat Datang di ARQA Coffee',
      message: 'Sistem manajemen ARQA Coffee siap digunakan',
      type: 'info',
      icon: 'fa-bell',
      read: JSON.stringify({}),
      created_at: new Date(),
    },
    {
      id: 'notif_seed_2',
      target_role: 'cashier',
      target_roles: JSON.stringify(['cashier', 'admin', 'manager']),
      title: 'Pesanan Baru Demo',
      message: '#DEMO01 — Pelanggan demo memesan 3 item',
      type: 'order',
      icon: 'fa-shopping-bag',
      related_order_id: null,
      read: JSON.stringify({}),
      created_at: new Date(),
    },
    {
      id: 'notif_seed_3',
      target_role: 'kitchen',
      target_roles: JSON.stringify(['kitchen']),
      title: 'Pesanan Masuk Dapur',
      message: '#DEMO01 — 3 item perlu dimasak',
      type: 'order',
      icon: 'fa-fire',
      read: JSON.stringify({}),
      created_at: new Date(),
    },
    {
      id: 'notif_seed_4',
      target_role: 'manager',
      target_roles: JSON.stringify(['manager', 'admin']),
      title: 'Stok Rendah',
      message: 'Biji Kopi Arabika tersisa 2 kg (min: 5 kg)',
      type: 'stock',
      icon: 'fa-exclamation-triangle',
      read: JSON.stringify({}),
      created_at: new Date(),
    },
    {
      id: 'notif_seed_5',
      target_role: 'admin',
      target_roles: JSON.stringify(['admin']),
      title: 'Sistem Siap',
      message: 'Seed database berhasil, semua model tersedia',
      type: 'info',
      icon: 'fa-check-circle',
      read: JSON.stringify({}),
      created_at: new Date(),
    },
  ]

  for (const n of sampleNotifs) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: {},
      create: n,
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
