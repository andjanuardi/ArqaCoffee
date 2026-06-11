import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const item = await prisma.stockItem.update({
      where: { id },
      data
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stock item' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.stockItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete stock item' }, { status: 500 })
  }
}
