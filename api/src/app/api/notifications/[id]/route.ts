import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    
    const updateData: any = {}
    if (data.read !== undefined) updateData.read = data.read
    if (data.is_read !== undefined) updateData.read = data.is_read ? JSON.stringify({}) : undefined
    if (data.type !== undefined) updateData.type = data.type
    if (data.icon !== undefined) updateData.icon = data.icon
    if (data.target_roles !== undefined) updateData.target_roles = data.target_roles
    if (data.related_order_id !== undefined) updateData.related_order_id = data.related_order_id
    if (data.title !== undefined) updateData.title = data.title
    if (data.message !== undefined) updateData.message = data.message

    const notification = await prisma.notification.update({
      where: { id },
      data: updateData
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
