import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const where = status ? { status } : {}

    const registrations = await prisma.mitraRegistration.findMany({
      where,
      orderBy: { created_at: 'desc' }
    })

    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mitra registrations' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const existing = await prisma.mitraRegistration.findFirst({
      where: { email: data.email }
    })

    if (existing) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 })
    }

    const registration = await prisma.mitraRegistration.create({
      data: {
        id: data.id || `mr${Date.now()}`,
        name: data.name,
        business: data.business || null,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        role: data.role,
        status: data.status || 'pending',
        position: data.position ? JSON.stringify(data.position) : null,
        created_at: data.created_at || new Date().toISOString()
      }
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mitra registration' }, { status: 500 })
  }
}
