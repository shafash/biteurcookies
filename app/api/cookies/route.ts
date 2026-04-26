import { NextResponse } from 'next/server'
import { getCookies } from '@/lib/db'

export async function GET() {
  try {
    const cookies = await getCookies()
    return NextResponse.json(cookies)
  } catch (error) {
    console.error('Error fetching cookies:', error)
    return NextResponse.json({ error: 'Failed to fetch cookies' }, { status: 500 })
  }
}
