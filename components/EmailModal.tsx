'use client'

import { useState, useEffect, FormEvent } from 'react'
import { trackEvent } from '@/lib/analytics'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      trackEvent('modal_open')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      trackEvent('email_submit', { email })

      // Step 1: Save lead
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      // Check if response is JSON
      const contentType = leadResponse.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await leadResponse.text()
        throw new Error('Resposta inválida do servidor. Verifique se as variáveis de ambiente estão configuradas.')
      }

      const leadData = await leadResponse.json()

      if (!leadData.success) {
        throw new Error(leadData.error || 'Erro ao salvar email')
      }

      // Step 2: Send kit email
      const kitResponse = await fetch('/api/send-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      // Check if response is JSON
      const kitContentType = kitResponse.headers.get('content-type')
      if (!kitContentType || !kitContentType.includes('application/json')) {
        const text = await kitResponse.text()
        throw new Error('Resposta inválida do servidor. Verifique se as variáveis de ambiente estão configuradas.')
      }

      const kitData = await kitResponse.json()

      if (!kitData.success) {
        throw new Error(kitData.error || 'Erro ao enviar kit')
      }

      trackEvent('kit_sent', { email })
      trackEvent('conversion', { email })

      setSuccess(true)

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setEmail('')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar solicitação')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-primary-dark mb-2">
                Receba seu Kit Grátis
              </h2>
              <p className="text-gray-600 mb-6">
                Digite seu email para receber o Kit Impulsionador de Carreira
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-primary-dark disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                  style={{ backgroundColor: '#4BA4DE' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#4BA4DE')}
                  onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#4BA4DE')}
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </form>

              <button
                onClick={onClose}
                className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                Fechar
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                Kit Enviado!
              </h2>
              <p className="text-gray-600">
                Verifique sua caixa de entrada. O kit foi enviado para{' '}
                <strong>{email}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

