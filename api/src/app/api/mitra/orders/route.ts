import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { items, ...orderData } = data
    
    const order = await prisma.order.create({
      data: {
        id: orderData.id || `o${Date.now()}`,
        user_id: orderData.user_id,
        table_id: orderData.table_id,
        order_type: orderData.order_type,
        status: orderData.status || 'pending',
        total_amount: orderData.total_amount,
        shipping_cost: orderData.shipping_cost || 0,
        service_fee: orderData.service_fee || 0,
        payment_method: orderData.payment_method,
        payment_status: orderData.payment_status || 'unpaid',
        delivery_address: orderData.delivery_address,
        delivery_detail: orderData.delivery_detail,
        delivery_location: orderData.delivery_location,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        accepted: orderData.accepted,
        promo_id: orderData.promo_id,
        promo_discount: orderData.promo_discount || 0,
        courier_id: orderData.courier_id,
        ongkir_status: orderData.ongkir_status,
        waiter_id: orderData.waiter_id,
        has_mitra_items: orderData.has_mitra_items || false,
        mitra_approved: orderData.mitra_approved || false,
        reject_reason: orderData.reject_reason,
        messages: orderData.messages,
        lastReadAt: orderData.lastReadAt,
        items: items ? {
          create: items.map((item: any) => ({
            id: item.id || `oi${Date.now()}${Math.random()}`,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            notes: item.notes,
            status: item.status,
            claimed_by: item.claimed_by,
          }))
        } : undefined
      },
      include: { items: true }
    })
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
