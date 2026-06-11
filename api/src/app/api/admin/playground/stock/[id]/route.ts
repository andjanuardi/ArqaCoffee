import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const item = await prisma.pgStockItem.update({
      where: { id },
      data
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update playground stock item' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.pgStockItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete playground stock item' }, { status: 500 })
  }
}
