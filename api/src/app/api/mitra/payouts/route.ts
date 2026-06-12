import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const payouts = await prisma.mitraPayout.findMany()
    return NextResponse.json(payouts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mitra payouts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const payout = await prisma.mitraPayout.create({
      data: {
        id: data.id || `mp${Date.now()}`,
        order_id: data.order_id,
        mitra_name: data.mitra_name,
        total_items: data.total_items,
        fee: data.fee,
        tax: data.tax,
        amount: data.amount,
        status: data.status || 'unpaid',
        created_at: data.created_at || new Date().toISOString(),
        paid_at: data.paid_at || null,
        paid_by: data.paid_by || null,
        confirmed_at: data.confirmed_at || null
      }
    })
    return NextResponse.json(payout, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mitra payout' }, { status: 500 })
  }
}
