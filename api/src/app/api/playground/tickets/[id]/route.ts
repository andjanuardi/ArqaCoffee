import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const ticket = await prisma.playgroundTicket.findUnique({ 
      where: { id },
      include: { items: true, transactions: true }
    })
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    return NextResponse.json(ticket)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const { items, transactions, ...ticketData } = data
    const ticket = await prisma.playgroundTicket.update({
      where: { id },
      data: {
        ...ticketData,
        children: ticketData.children ? JSON.stringify(ticketData.children) : undefined,
        companions: ticketData.companions ? JSON.stringify(ticketData.companions) : undefined,
        socks_per_child: ticketData.socks_per_child ? JSON.stringify(ticketData.socks_per_child) : undefined
      },
      include: { items: true, transactions: true }
    })
    return NextResponse.json(ticket)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update playground ticket' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.playgroundTicketItem.deleteMany({ where: { ticket_id: id } })
    await prisma.pgTransaction.deleteMany({ where: { ticket_id: id } })
    await prisma.playgroundTicket.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete playground ticket' }, { status: 500 })
  }
}
