import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const promos = await prisma.promo.findMany()
    return NextResponse.json(promos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const promo = await prisma.promo.create({
      data: {
        id: data.id || `p${Date.now()}`,
        code: data.code,
        title: data.title,
        icon: data.icon,
        color: data.color,
        desc: data.desc,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
        start_date: data.start_date,
        end_date: data.end_date,
        menu_ids: data.menu_ids ? JSON.stringify(data.menu_ids) : '[]',
        image: data.image,
        terms: data.terms ? JSON.stringify(data.terms) : '[]',
        is_active: data.is_active ?? true
      }
    })
    return NextResponse.json(promo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo' }, { status: 500 })
  }
}
