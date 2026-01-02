import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendKitEmail } from '@/lib/resend'

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

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Resend não configurado. Por favor, configure RESEND_API_KEY em .env.local' 
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Find lead in database
    const { data: lead, error: findError } = await getSupabaseAdmin()
      .from('leads')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (findError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead não encontrado' },
        { status: 404 }
      )
    }

    // Check if kit was already sent
    if (lead.kit_sent) {
      return NextResponse.json({
        success: true,
        message: 'Kit já foi enviado anteriormente',
        kit_sent: true,
      })
    }

    // Send email with PDF
    try {
      await sendKitEmail({
        to: lead.email,
        email: lead.email,
      })

      // Update lead status
      const { error: updateError } = await getSupabaseAdmin()
        .from('leads')
        .update({
          kit_sent: true,
          status: 'completed',
          download_count: (lead.download_count || 0) + 1,
        })
        .eq('id', lead.id)

      if (updateError) {
        console.error('Error updating lead:', updateError)
        // Email was sent but update failed - still return success
      }

      return NextResponse.json({
        success: true,
        message: 'Kit enviado com sucesso',
        kit_sent: true,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)

      // Update status to failed
      try {
        await getSupabaseAdmin()
          .from('leads')
          .update({
            status: 'failed',
          })
          .eq('id', lead.id)
      } catch (updateErr) {
        console.error('Error updating lead status:', updateErr)
      }

      // Return more specific error message
      const errorMessage = emailError instanceof Error 
        ? emailError.message 
        : 'Erro ao enviar email'

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in /api/send-kit:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

