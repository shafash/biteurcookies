import { NextResponse } from 'next/server'
import { getCookieById, updateCookie, deleteCookie } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookie = await getCookieById(id)
    
    if (!cookie) {
      return NextResponse.json({ error: 'Cookie not found' }, { status: 404 })
    }
    
    return NextResponse.json(cookie)
  } catch (error) {
    console.error('Error fetching cookie:', error)
    return NextResponse.json({ error: 'Failed to fetch cookie' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const cookie = await updateCookie(id, body)
    
    if (!cookie) {
      return NextResponse.json({ error: 'Cookie not found' }, { status: 404 })
    }
    
    return NextResponse.json(cookie)
  } catch (error) {
    console.error('Error updating cookie:', error)
    return NextResponse.json({ error: 'Failed to update cookie' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteCookie(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting cookie:', error)
    return NextResponse.json({ error: 'Failed to delete cookie' }, { status: 500 })
  }
}
