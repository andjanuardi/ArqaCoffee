import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const stockItems = await prisma.pgStockItem.findMany()
    return NextResponse.json(stockItems)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch playground stock' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const item = await prisma.pgStockItem.create({
      data: {
        id: data.id || `ps${Date.now()}`,
        name: data.name,
        category: data.category || 'Makanan',
        unit: data.unit,
        current_quantity: data.current_quantity,
        min_quantity: data.min_quantity,
        price: data.price || 0,
        image: data.image || '',
        updated_at: data.updated_at || new Date().toISOString()
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create playground stock item' }, { status: 500 })
  }
}
