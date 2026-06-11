import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const cafe = await prisma.cafe.findFirst()
    if (!cafe) return NextResponse.json({ error: 'Cafe settings not found' }, { status: 404 })
    
    // Parse JSON fields
    return NextResponse.json({
      ...cafe,
      rates: JSON.parse(cafe.rates),
      shipping: JSON.parse(cafe.shipping)
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cafe settings' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const cafe = await prisma.cafe.upsert({
      where: { id: "1" },
      update: {
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        rates: data.rates ? JSON.stringify(data.rates) : undefined,
        shipping: data.shipping ? JSON.stringify(data.shipping) : undefined
      },
      create: {
        id: "1",
        address: data.address || "",
        lat: data.lat || 0,
        lng: data.lng || 0,
        rates: data.rates ? JSON.stringify(data.rates) : "{}",
        shipping: data.shipping ? JSON.stringify(data.shipping) : "{}"
      }
    })
    return NextResponse.json(cafe)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cafe settings' }, { status: 500 })
  }
}
