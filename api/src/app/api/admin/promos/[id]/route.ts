import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const promo = await prisma.promo.findUnique({ where: { id } })
    if (!promo) return NextResponse.json({ error: 'Promo not found' }, { status: 404 })
    return NextResponse.json(promo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promo' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const promo = await prisma.promo.update({
      where: { id },
      data: {
        ...data,
        menu_ids: data.menu_ids ? JSON.stringify(data.menu_ids) : undefined,
        terms: data.terms ? JSON.stringify(data.terms) : undefined
      }
    })
    return NextResponse.json(promo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promo' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.promo.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promo' }, { status: 500 })
  }
}
