import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const courier_id = searchParams.get('courier_id')
    const order_id = searchParams.get('order_id')

    const tracking = await prisma.courierTracking.findMany({
      where: {
        ...(courier_id ? { courier_id } : {}),
        ...(order_id ? { order_id } : {})
      },
      orderBy: { recorded_at: 'desc' }
    })
    return NextResponse.json(tracking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courier tracking' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const tracking = await prisma.courierTracking.create({
      data: {
        id: data.id || `ct${Date.now()}`,
        order_id: data.order_id,
        courier_id: data.courier_id,
        latitude: data.latitude,
        longitude: data.longitude,
        recorded_at: data.recorded_at ? new Date(data.recorded_at) : new Date()
      }
    })
    return NextResponse.json(tracking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tracking record' }, { status: 500 })
  }
}
