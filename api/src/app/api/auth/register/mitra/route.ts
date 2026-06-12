import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, business, email, phone, address, role, position } = await req.json()

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required' }, { status: 400 })
    }

    if (!['courier', 'mitra_juru_masak'].includes(role)) {
      return NextResponse.json({ error: 'Role must be "courier" or "mitra_juru_masak"' }, { status: 400 })
    }

    if (role === 'mitra_juru_masak' && !business) {
      return NextResponse.json({ error: 'Business name is required for mitra_juru_masak' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (phone) {
      const phoneClean = phone.replace(/[\s\-]/g, '')
      if (!/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(phoneClean)) {
        return NextResponse.json({ error: 'Invalid phone number. Use Indonesian format (08xx or +628xx)' }, { status: 400 })
      }
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered as a user' }, { status: 409 })
    }

    const existingReg = await prisma.mitraRegistration.findFirst({
      where: { email, status: { in: ['pending', 'approved'] } }
    })
    if (existingReg) {
      return NextResponse.json({ error: 'Email already has an active registration' }, { status: 409 })
    }

    const registration = await prisma.mitraRegistration.create({
      data: {
        id: `mr${Date.now()}`,
        name,
        business: business || null,
        email,
        phone: phone || null,
        address: address || null,
        role,
        status: 'pending',
        position: position ? JSON.stringify(position) : null,
        created_at: new Date().toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Registration submitted, waiting for admin approval',
      registration
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
