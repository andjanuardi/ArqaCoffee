import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const registration = await prisma.mitraRegistration.findUnique({ where: { id } })
    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }
    return NextResponse.json(registration)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()

    const registration = await prisma.mitraRegistration.findUnique({ where: { id } })
    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    const updated = await prisma.mitraRegistration.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        business: data.business ?? undefined,
        email: data.email ?? undefined,
        phone: data.phone ?? undefined,
        address: data.address ?? undefined,
        role: data.role ?? undefined,
        status: data.status ?? undefined,
        position: data.position !== undefined ? JSON.stringify(data.position) : undefined
      }
    })

    if (data.status === 'approved') {
      const existingUser = await prisma.user.findUnique({ where: { email: updated.email } })
      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: `u${Date.now()}`,
            name: updated.name,
            email: updated.email,
            password: data.password || '123456',
            role: updated.role,
            phone: updated.phone || '',
            address: updated.address || '',
            avatar: updated.name[0].toUpperCase(),
            business_name: updated.business || null,
            mitra_position: updated.position || null
          }
        })
      }
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update mitra registration' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.mitraRegistration.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete mitra registration' }, { status: 500 })
  }
}
