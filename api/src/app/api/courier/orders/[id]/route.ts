import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const order = await prisma.order.findUnique({ 
      where: { id },
      include: { items: true }
    })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const { items, ...orderData } = data

    if (items && Array.isArray(items)) {
      await prisma.orderItem.deleteMany({ where: { order_id: id } })
      for (const item of items) {
        await prisma.orderItem.create({
          data: {
            id: item.id || `oi${Date.now()}${Math.random()}`,
            order_id: id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            notes: item.notes,
            status: item.status,
            claimed_by: item.claimed_by,
          }
        })
      }
    }

    const order = await prisma.order.update({
      where: { id },
      data: orderData,
      include: { items: true }
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    // Delete items first
    await prisma.orderItem.deleteMany({ where: { order_id: id } })
    await prisma.order.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
