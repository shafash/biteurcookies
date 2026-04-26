import { NextResponse } from 'next/server'
import { getAllAddOns, createAddOn } from '@/lib/db'

export async function GET() {
  try {
    const addons = await getAllAddOns()
    return NextResponse.json(addons)
  } catch (error) {
    console.error('Error fetching add-ons:', error)
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id || !body.name || body.price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const addon = await createAddOn({
      id: body.id,
      name: body.name,
      price: body.price,
      icon: body.icon || '🍪',
      isAvailable: body.isAvailable ?? true,
      displayOrder: body.displayOrder ?? 0,
    })
    
    return NextResponse.json(addon, { status: 201 })
  } catch (error) {
    console.error('Error creating add-on:', error)
    return NextResponse.json({ error: 'Failed to create add-on' }, { status: 500 })
  }
}
