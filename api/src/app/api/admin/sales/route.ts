import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const sales = await prisma.dailySale.findMany({
      orderBy: { date: 'desc' }
    })
    return NextResponse.json(sales)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch daily sales' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const sale = await prisma.dailySale.create({
      data: {
        id: data.id || `ds${Date.now()}`,
        date: data.date,
        revenue: data.revenue,
        orders: data.orders
      }
    })
    return NextResponse.json(sale, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create daily sale record' }, { status: 500 })
  }
}
