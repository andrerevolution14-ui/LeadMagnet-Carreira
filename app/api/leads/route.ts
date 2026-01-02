import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase não configurado. Por favor, configure as variáveis de ambiente em .env.local' 
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingLead, error: checkError } = await getSupabaseAdmin()
      .from('leads')
      .select('id, email, kit_sent')
      .eq('email', email.toLowerCase().trim())
      .single()

    // If error is not "not found", it's a real error
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Supabase check error:', checkError)
      return NextResponse.json(
        { success: false, error: 'Erro ao verificar email' },
        { status: 500 }
      )
    }

    if (existingLead) {
      // Email already exists, return existing lead
      return NextResponse.json({
        success: true,
        lead_id: existingLead.id,
        email: existingLead.email,
        kit_sent: existingLead.kit_sent,
        message: 'Email já cadastrado',
      })
    }

    // Insert new lead
    const { data: newLead, error } = await getSupabaseAdmin()
      .from('leads')
      .insert({
        email: email.toLowerCase().trim(),
        status: 'pending',
        kit_sent: false,
        download_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar lead: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      lead_id: newLead.id,
      email: newLead.email,
    })
  } catch (error) {
    console.error('Error in /api/leads:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

