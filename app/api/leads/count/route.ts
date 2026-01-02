import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // If Supabase is not configured, return default count
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ count: 347 }, { status: 200 })
    }

    const { count, error } = await getSupabaseAdmin()
      .from('leads')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { count: 347 }, // Default fallback
        { status: 200 }
      )
    }

    return NextResponse.json({ count: count || 347 })
  } catch (error) {
    console.error('Error in /api/leads/count:', error)
    return NextResponse.json({ count: 347 }, { status: 200 })
  }
}

