import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const user = await prisma.user.create({
      data: {
        id: data.id || `u${Date.now()}`,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
        avatar: data.avatar,
        address: data.address
      }
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
