import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tables = await prisma.table.findMany()
    return NextResponse.json(tables)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const table = await prisma.table.create({
      data: {
        id: data.id || `t${Date.now()}`,
        number: data.number,
        qr_code: data.qr_code,
        status: data.status || 'available',
        capacity: data.capacity
      }
    })
    return NextResponse.json(table, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create table' }, { status: 500 })
  }
}
