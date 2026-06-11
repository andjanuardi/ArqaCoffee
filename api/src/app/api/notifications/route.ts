import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')
    const target_role = searchParams.get('target_role')
    const unread_only = searchParams.get('unread_only') === 'true'

    const notifications = await prisma.notification.findMany({
      where: {
        ...(user_id ? { user_id } : {}),
        ...(target_role ? { target_role } : {}),
        ...(unread_only ? { is_read: false } : {})
      },
      orderBy: { created_at: 'desc' }
    })

    return NextResponse.json(notifications)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { user_id, target_role, title, message } = data

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and message are required' }, { status: 400 })
    }

    const notification = await prisma.notification.create({
      data: {
        id: `notif_${Date.now()}`,
        user_id,
        target_role,
        title,
        message
      }
    })

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}
