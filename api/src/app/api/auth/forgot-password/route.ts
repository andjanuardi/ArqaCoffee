import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { email } = data

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return 200 anyway for security reasons (menghindari email enumeration)
      return NextResponse.json({ 
        success: true, 
        message: 'If the email exists, a password reset link has been sent.' 
      })
    }

    // TODO: Di aplikasi nyata, generate token reset password dan kirim via Email/WhatsApp
    // Untuk saat ini, kita bisa mensimulasikan berhasil mengirim email
    console.log(`Simulasi pengiriman link reset password ke: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent.'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
