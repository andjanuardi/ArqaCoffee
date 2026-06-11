import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const movements = await prisma.stockMovement.findMany({
      orderBy: { created_at: 'desc' }
    })
    return NextResponse.json(movements)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock movements' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const movement = await prisma.stockMovement.create({
      data: {
        id: data.id || `sm${Date.now()}`,
        stock_item_id: data.stock_item_id,
        user_id: data.user_id,
        type: data.type,
        quantity: data.quantity,
        notes: data.notes,
        created_at: data.created_at ? new Date(data.created_at) : new Date()
      }
    })
    return NextResponse.json(movement, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stock movement' }, { status: 500 })
  }
}
