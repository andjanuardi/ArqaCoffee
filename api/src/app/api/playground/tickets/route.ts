import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tickets = await prisma.playgroundTicket.findMany({
      include: { items: true, transactions: true }
    })
    return NextResponse.json(tickets)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch playground tickets' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { items, transactions, ...ticketData } = data

    const ticket = await prisma.playgroundTicket.create({
      data: {
        id: ticketData.id || `pg_${Date.now()}`,
        user_id: ticketData.user_id,
        customer_name: ticketData.customer_name,
        children: JSON.stringify(ticketData.children || []),
        companions: JSON.stringify(ticketData.companions || []),
        companion_count: ticketData.companion_count || 0,
        socks_per_child: JSON.stringify(ticketData.socks_per_child || []),
        socks_total: ticketData.socks_total || 0,
        hours: ticketData.hours,
        start_time: ticketData.start_time,
        end_time: ticketData.end_time,
        subtotal: ticketData.subtotal,
        items_total: ticketData.items_total || 0,
        total_amount: ticketData.total_amount,
        payment_status: ticketData.payment_status || 'unpaid',
        payment_method: ticketData.payment_method,
        status: ticketData.status || 'active',
        items: items ? {
          create: items.map((item: any) => ({
            id: item.id || `pgi_${Date.now()}${Math.random()}`,
            menu_item_id: item.menu_item_id,
            name: item.name,
            quantity: item.quantity,
            unit_price: item.unit_price
          }))
        } : undefined,
        transactions: transactions ? {
          create: transactions.map((tx: any) => ({
            id: tx.id || `pgtx_${Date.now()}${Math.random()}`,
            type: tx.type,
            description: tx.description,
            amount: tx.amount,
            method: tx.method,
            created_at: tx.created_at || new Date().toISOString()
          }))
        } : undefined
      },
      include: { items: true, transactions: true }
    })
    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create playground ticket' }, { status: 500 })
  }
}
