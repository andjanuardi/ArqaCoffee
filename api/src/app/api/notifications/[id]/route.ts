import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    
    // Biasanya hanya update "is_read"
    const notification = await prisma.notification.update({
      where: { id },
      data: {
        is_read: data.is_read
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.notification.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 })
  }
}
