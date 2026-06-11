import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, password, phone, role } = data

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 })
    }

    // Buat user baru (Default role 'customer' jika tidak disertakan)
    const newUser = await prisma.user.create({
      data: {
        id: `u${Date.now()}`,
        name,
        email,
        password, // Pada aplikasi nyata, gunakan bcrypt untuk hash password
        role: role || 'customer',
        phone: phone || '',
      }
    })

    // Hindari mengembalikan password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: userWithoutPassword
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
