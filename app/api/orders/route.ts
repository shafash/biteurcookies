import { NextResponse } from 'next/server'
import { createOrder, type CreateOrderInput } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateOrderInput
    
    // Validate required fields
    if (!body.customerName || !body.customerPhone || !body.paymentMethod || !body.items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const order = await createOrder(body)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
