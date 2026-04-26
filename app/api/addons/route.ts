import { NextResponse } from 'next/server'
import { getAddOns } from '@/lib/db'

export async function GET() {
  try {
    const addons = await getAddOns()
    return NextResponse.json(addons)
  } catch (error) {
    console.error('Error fetching add-ons:', error)
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 })
  }
}
