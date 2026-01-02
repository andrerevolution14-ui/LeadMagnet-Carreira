'use client'

import { useState, useEffect } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leadCount, setLeadCount] = useState(347)
  const maxLeads = 500

  useEffect(() => {
    // Fetch lead count from Supabase
    const fetchLeadCount = async () => {
      try {
        const response = await fetch('/api/leads/count')
        if (response.ok) {
          // Check if response is JSON
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            setLeadCount(data.count || 347)
          }
        }
      } catch (error) {
        console.error('Error fetching lead count:', error)
        // Keep default count on error
      }
    }

    fetchLeadCount()
    // Refresh count every 30 seconds
    const interval = setInterval(fetchLeadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'cta_final', action: 'open_modal' })
    setIsModalOpen(true)
  }

  const progress = (leadCount / maxLeads) * 100

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-primary-dark to-primary-dark-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Porque é gratuito agora?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Este kit é a entrada para um sistema maior de alavancagem de carreira. 
            <br />
            Agora é gratuito. Mais tarde, será parte de um ecossistema pago.
            <br />
            <span className="text-primary-green font-semibold">
              Obtém agora. Sem compromisso. Sem spam.
            </span>
          </p>


          <button
            onClick={handleGetKit}
            className="text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_30px_rgba(5,150,105,0.6)]"
            style={{ backgroundColor: '#059669' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            Obter o Kit Gratuito de Alavancagem de Carreira
          </button>

          <p className="mt-6 text-gray-300 text-sm font-medium">
            100% gratuito • Sem spam • Valor real
          </p>
        </div>
      </section>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

