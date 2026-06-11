import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany()
    return NextResponse.json(menuItems)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const item = await prisma.menuItem.create({
      data: {
        id: data.id || `m${Date.now()}`,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image,
        is_available: data.is_available ?? true,
        tax_percentage: data.tax_percentage ?? 0,
        submitted_by: data.submitted_by
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}
