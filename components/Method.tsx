'use client'

import { useState } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function Method() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'method', action: 'open_modal' })
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-primary-dark to-primary-dark-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            <span className="text-primary-green-bright drop-shadow-[0_0_10px_rgba(5,150,105,0.5)]">Sistema de Alavancagem de Carreira</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg font-semibold">
            Prático. Não motivacional.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary-green-light/20 to-primary-green-dark/20 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-green/50 shadow-[0_0_20px_rgba(5,150,105,0.3)]">
              <div className="text-5xl font-bold text-primary-green-bright mb-3 drop-shadow-[0_0_10px_rgba(5,150,105,0.6)]">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Visibilidade</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                O teu trabalho é <span className="text-primary-green-glow font-bold">visto</span>. Os teus resultados são <span className="text-primary-green-glow font-bold">notados</span>. 
                Não és mais invisível.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-green-light/20 to-primary-green-dark/20 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-green/50 shadow-[0_0_20px_rgba(5,150,105,0.3)]">
              <div className="text-5xl font-bold text-primary-green-bright mb-3 drop-shadow-[0_0_10px_rgba(5,150,105,0.6)]">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Clareza</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                O teu valor é <span className="text-primary-green-glow font-bold">compreendido</span>. O teu impacto é <span className="text-primary-green-glow font-bold">medido</span>. 
                Não há mais confusão.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-green-light/20 to-primary-green-dark/20 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-green/50 shadow-[0_0_20px_rgba(5,150,105,0.3)]">
              <div className="text-5xl font-bold text-primary-green-bright mb-3 drop-shadow-[0_0_10px_rgba(5,150,105,0.6)]">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Escolha</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                És <span className="text-primary-green-glow font-bold">escolhido</span> para oportunidades. És <span className="text-primary-green-glow font-bold">considerado</span> para promoções. 
                Não és mais ignorado.
              </p>
            </div>
          </div>

          {/* CTA in Method Section */}
          <div className="text-center">
            <button
              onClick={handleGetKit}
              className="text-white text-lg md:text-xl font-bold py-4 px-10 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(5,150,105,0.5)]"
              style={{ backgroundColor: '#059669' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            >
              Obter o Kit Gratuito de Alavancagem de Carreira
            </button>
            <p className="mt-3 text-gray-300 text-sm">
              100% gratuito • Sem spam • Valor real
            </p>
          </div>
        </div>
      </section>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

