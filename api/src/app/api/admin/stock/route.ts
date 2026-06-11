import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const stockItems = await prisma.stockItem.findMany()
    return NextResponse.json(stockItems)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock items' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const item = await prisma.stockItem.create({
      data: {
        id: data.id || `s${Date.now()}`,
        name: data.name,
        unit: data.unit,
        current_quantity: data.current_quantity,
        min_quantity: data.min_quantity,
        price: data.price || 0
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stock item' }, { status: 500 })
  }
}
