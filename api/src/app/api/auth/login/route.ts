import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user
    const token = await signToken({ userId: user.id, role: user.role })

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
