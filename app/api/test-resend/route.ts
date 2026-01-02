import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function GET() {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RESEND_API_KEY não configurada no .env.local' 
        },
        { status: 500 }
      )
    }

    // Validate API key format
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey === 'your_resend_api_key' || !apiKey.startsWith('re_')) {
      return NextResponse.json(
        { 
          success: false, 
          error: `API Key inválida. Formato: ${apiKey.substring(0, 10)}... (deve começar com re_)` 
        },
        { status: 500 }
      )
    }

    // Try to send a test email
    const resend = getResend()
    
    const testEmail = 'test@example.com' // This won't actually send, just test the API
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: testEmail,
        subject: 'Test',
        html: '<p>Test</p>',
      })

      if (error) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Erro Resend: ${JSON.stringify(error, null, 2)}`,
            errorDetails: error
          },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'API Key válida! Resend está configurado corretamente.',
        data
      })
    } catch (sendError: any) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Erro ao testar envio: ${sendError.message}`,
          errorDetails: sendError
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erro desconhecido',
        errorDetails: error
      },
      { status: 500 }
    )
  }
}

