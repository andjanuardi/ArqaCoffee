import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany()
    return NextResponse.json(attendances)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendances' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const attendance = await prisma.attendance.create({
      data: {
        id: data.id || `a${Date.now()}`,
        user_id: data.user_id,
        check_in: new Date(data.check_in),
        check_out: data.check_out ? new Date(data.check_out) : null,
        lat: data.lat,
        lng: data.lng,
        status: data.status || 'present'
      }
    })
    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create attendance record' }, { status: 500 })
  }
}
