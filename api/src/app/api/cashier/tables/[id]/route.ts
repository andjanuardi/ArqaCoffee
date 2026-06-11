import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const table = await prisma.table.findUnique({ where: { id } })
    if (!table) return NextResponse.json({ error: 'Table not found' }, { status: 404 })
    return NextResponse.json(table)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const table = await prisma.table.update({
      where: { id },
      data
    })
    return NextResponse.json(table)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update table' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.table.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete table' }, { status: 500 })
  }
}
