import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const attendance = await prisma.attendance.update({
      where: { id },
      data: {
        ...data,
        check_out: data.check_out ? new Date(data.check_out) : undefined
      }
    })
    return NextResponse.json(attendance)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 })
  }
}
