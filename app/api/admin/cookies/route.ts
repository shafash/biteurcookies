import { NextResponse } from 'next/server'
import { getAllCookies, createCookie } from '@/lib/db'

export async function GET() {
  try {
    const cookies = await getAllCookies()
    return NextResponse.json(cookies)
  } catch (error) {
    console.error('Error fetching cookies:', error)
    return NextResponse.json({ error: 'Failed to fetch cookies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id || !body.name || !body.description || body.price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const cookie = await createCookie({
      id: body.id,
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image || '/images/default-cookie.jpg',
      color: body.color || '#4A3728',
      bgColor: body.bgColor || '#F5E6D3',
      isLimitedStock: body.isLimitedStock ?? false,
      isAvailable: body.isAvailable ?? true,
      displayOrder: body.displayOrder ?? 0,
    })
    
    return NextResponse.json(cookie, { status: 201 })
  } catch (error) {
    console.error('Error creating cookie:', error)
    return NextResponse.json({ error: 'Failed to create cookie' }, { status: 500 })
  }
}
