import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const payout = await prisma.mitraPayout.update({
      where: { id },
      data
    })
    return NextResponse.json(payout)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update mitra payout' }, { status: 500 })
  }
}
