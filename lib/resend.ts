import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { join } from 'path'

let resendInstance: Resend | null = null

// Lazy initialization
export function getResend(): Resend {
  if (resendInstance) {
    return resendInstance
  }

  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable. Please configure it in .env.local')
  }

  // Validate API key format
  if (resendApiKey === 'your_resend_api_key' || resendApiKey.trim() === '') {
    throw new Error(
      'RESEND_API_KEY não configurada. Por favor:\n' +
      '1. Acesse https://resend.com/api-keys\n' +
      '2. Crie uma API Key\n' +
      '3. Copie a key (começa com re_)\n' +
      '4. Cole no arquivo .env.local: RESEND_API_KEY=re_sua_key_aqui\n' +
      '5. Reinicie o servidor (Ctrl+C e npm run dev)'
    )
  }

  if (!resendApiKey.startsWith('re_')) {
    throw new Error(
      `API Key inválida. A key do Resend deve começar com "re_".\n` +
      `Valor atual: ${resendApiKey.substring(0, 10)}...\n` +
      'Verifique se copiou a key completa de https://resend.com/api-keys'
    )
  }

  resendInstance = new Resend(resendApiKey)
  return resendInstance
}

// Export for backward compatibility
export const resend = getResend

export interface SendKitEmailParams {
  to: string
  email: string
}

export async function sendKitEmail({ to, email }: SendKitEmailParams) {
  try {
    // Try to read PDF file from public directory (optional)
    let pdfAttachment = null
    const pdfPath = join(process.cwd(), 'public', 'kit.pdf')
    
    try {
      const pdfBuffer = readFileSync(pdfPath)
      pdfAttachment = {
        filename: 'Kit-Impulsionador-Carreira.pdf',
        content: pdfBuffer,
      }
    } catch (pdfError) {
      console.warn('PDF não encontrado em public/kit.pdf. Email será enviado sem anexo.')
      // Continue without PDF attachment
    }

    // Use Resend's default domain for testing (no verification needed)
    // For production, verify your domain at https://resend.com/domains
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    
    console.log('Sending email from:', fromEmail)
    console.log('Sending email to:', to)
    
    const emailData: any = {
      from: fromEmail,
      to: [to],
      subject: 'Kit enviado! 🎁 Seu Kit Impulsionador de Carreira',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Inter, system-ui, sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #10B981; margin: 0; font-size: 28px;">🎉 Kit Enviado!</h1>
            </div>
            
            <div style="background: #ffffff; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <p style="font-size: 18px; margin-top: 0;">Olá!</p>
              
              <p>Obrigado por se inscrever no <strong>Kit Impulsionador de Carreira</strong>!</p>
              
              <p>Em anexo, você encontrará o seu kit completo com:</p>
              
              <ul style="padding-left: 20px;">
                <li>Scanner 90s valor invisível</li>
                <li>Script iniciação relatórios</li>
                <li>Template email bi-semanal</li>
                <li>Matriz multiplicador</li>
                <li>Sprint 120 dias</li>
              </ul>
              
              <p style="margin-top: 30px;">Este kit foi criado especialmente para profissionais entre 23-35 anos que querem acelerar sua progressão interna e aumentar sua visibilidade no trabalho.</p>
              
              <p><strong>Próximos passos:</strong></p>
              <ol style="padding-left: 20px;">
                <li>Baixe o PDF anexo</li>
                <li>Comece pelo Scanner 90s</li>
                <li>Implemente as ferramentas no seu dia a dia</li>
              </ol>
              
              <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                Boa sorte na sua jornada! 🚀<br>
                <strong>Equipe Kit Carreira</strong>
              </p>
            </div>
          </body>
        </html>
      `,
    }

    // Add attachment only if PDF exists
    if (pdfAttachment) {
      emailData.attachments = [pdfAttachment]
    }

    const resendClient = getResend()
    console.log('Resend client initialized')
    
    const { data, error } = await resendClient.emails.send(emailData)

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2))
      
      // Provide more specific error messages
      const errorMessage = error.message || String(error)
      const statusCode = (error as any).statusCode
      
      // Check for testing email restriction (403 error)
      if (statusCode === 403 && errorMessage.includes('testing emails to your own email address')) {
        const accountEmail = errorMessage.match(/\(([^)]+)\)/)?.[1] || 'seu email'
        throw new Error(
          `⚠️ Limitação da conta Resend Free:\n\n` +
          `Com a conta free/teste, você só pode enviar emails para: ${accountEmail}\n\n` +
          `Para enviar para qualquer email, você precisa:\n` +
          `1. Verificar um domínio em: https://resend.com/domains\n` +
          `2. Adicionar no .env.local: RESEND_FROM_EMAIL=noreply@seu-dominio.com\n` +
          `3. Ou fazer upgrade da conta Resend\n\n` +
          `Passo a passo para verificar domínio:\n` +
          `- Acesse https://resend.com/domains\n` +
          `- Clique em "Add Domain"\n` +
          `- Adicione seu domínio (ex: kitcarreira.pt)\n` +
          `- Configure os registros DNS conforme instruções\n` +
          `- Aguarde a verificação (pode levar algumas horas)`
        )
      }
      
      // Check for domain-related errors
      if (errorMessage.includes('domain') || errorMessage.includes('Domain') || errorMessage.includes('not verified') || errorMessage.includes('verify a domain')) {
        throw new Error(
          `Erro de domínio: ${errorMessage}\n\n` +
          'Soluções:\n' +
          '1. Verifique um domínio em https://resend.com/domains\n' +
          '2. Configure RESEND_FROM_EMAIL no .env.local com seu domínio verificado\n' +
          '3. Ou use uma conta Resend paga que permite envio para qualquer email'
        )
      }
      
      // Check for API key errors
      if (errorMessage.includes('API key') || errorMessage.includes('Invalid') || errorMessage.includes('Unauthorized')) {
        throw new Error(
          `API key inválida: ${errorMessage}\n\n` +
          'Verifique:\n' +
          '1. RESEND_API_KEY no .env.local começa com "re_"\n' +
          '2. A key foi copiada completamente\n' +
          '3. O servidor foi reiniciado após alterar .env.local\n' +
          '4. Obtenha uma nova key em https://resend.com/api-keys'
        )
      }
      
      throw new Error(`Erro Resend: ${errorMessage}`)
    }
    
    console.log('Email sent successfully:', data)

    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    // Re-throw with more context
    if (error instanceof Error) {
      // Check for common errors
      if (error.message.includes('ENOENT')) {
        throw new Error('PDF não encontrado. Coloque o arquivo kit.pdf em public/kit.pdf')
      }
      if (error.message.includes('Invalid API key')) {
        throw new Error('API key do Resend inválida. Verifique RESEND_API_KEY no .env.local')
      }
      if (error.message.includes('domain')) {
        throw new Error('Domínio não verificado no Resend. Use "onboarding@resend.dev" para testes ou verifique seu domínio.')
      }
      throw error
    }
    throw new Error('Erro desconhecido ao enviar email')
  }
}

