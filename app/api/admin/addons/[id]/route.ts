import { NextResponse } from 'next/server'
import { getAddOnById, updateAddOn, deleteAddOn } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const addon = await getAddOnById(id)
    
    if (!addon) {
      return NextResponse.json({ error: 'Add-on not found' }, { status: 404 })
    }
    
    return NextResponse.json(addon)
  } catch (error) {
    console.error('Error fetching add-on:', error)
    return NextResponse.json({ error: 'Failed to fetch add-on' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const addon = await updateAddOn(id, body)
    
    if (!addon) {
      return NextResponse.json({ error: 'Add-on not found' }, { status: 404 })
    }
    
    return NextResponse.json(addon)
  } catch (error) {
    console.error('Error updating add-on:', error)
    return NextResponse.json({ error: 'Failed to update add-on' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteAddOn(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting add-on:', error)
    return NextResponse.json({ error: 'Failed to delete add-on' }, { status: 500 })
  }
}
