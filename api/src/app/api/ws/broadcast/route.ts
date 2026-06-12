import { NextResponse } from 'next/server'
import { broadcast } from '@/lib/ws-emitter'

export async function POST(req: Request) {
  try {
    const event = await req.json()
    broadcast(event)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
