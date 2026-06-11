import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const item = await prisma.menuItem.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const item = await prisma.menuItem.update({
      where: { id },
      data
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.menuItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}
