import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as vm from 'vm'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Read db.js file
  const dbPath = path.join(__dirname, '../../data/db.js')
  const dbScript = fs.readFileSync(dbPath, 'utf8')

  // Create a context to evaluate db.js
  const context = {
    localStorage: {
      getItem: () => null,
      setItem: () => {}
    },
    DB: {} as any
  }

  vm.createContext(context)
  
  // We want to extract the DB object. Since db.js has a bunch of functions and ends up setting DB,
  // we can run the script in the context.
  try {
    vm.runInContext(dbScript, context)
  } catch (e) {
    // some DOM/browser specific errors might occur (like Notification), we can ignore them as long as DB is populated
    console.log('Some errors occurred while evaluating db.js, proceeding with DB object...')
  }

  const DB = context.DB

  if (!DB || !DB.users) {
    console.error('Failed to extract DB object from db.js')
    return
  }

  // Seed Users
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
      }
    })
  }

  // Seed Tables
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

  // Seed Menu Items
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
        submitted_by: menu.submitted_by
      }
    })
  }

  // Seed Cafe
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
        shipping: JSON.stringify(DB.cafe.shipping || {})
      }
    })
  }

  // Seed Promos
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
        menu_ids: JSON.stringify(promo.menu_ids || []),
        image: promo.image,
        terms: JSON.stringify(promo.terms || []),
        is_active: promo.is_active
      }
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
