import { NextResponse } from 'next/server'
import { getSettings, updateSetting } from '@/lib/db'

export async function GET() {
  try {
    const settings = await getSettings()
    // Don't expose password hash
    delete settings.admin_password_hash
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      // Don't allow updating password through this endpoint
      if (key === 'admin_password_hash') continue
      await updateSetting(key, value as string)
    }
    
    const settings = await getSettings()
    delete settings.admin_password_hash
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
