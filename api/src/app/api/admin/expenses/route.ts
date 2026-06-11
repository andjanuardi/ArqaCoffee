import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany()
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const expense = await prisma.expense.create({
      data: {
        id: data.id || `e${Date.now()}`,
        date: data.date,
        category: data.category,
        amount: data.amount,
        note: data.note,
        volume: data.volume,
        unit: data.unit,
        unitPrice: data.unitPrice
      }
    })
    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 })
  }
}
