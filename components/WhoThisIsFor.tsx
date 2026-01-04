'use client'

import { useState } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function WhoThisIsFor() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'who_this_is_for', action: 'open_modal' })
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-primary-dark to-primary-dark-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Para quem é isto
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary-blue-light/20 to-primary-blue-dark/20 backdrop-blur-sm rounded-xl p-8 border-2 border-primary-blue/50 shadow-[0_0_20px_rgba(75,164,222,0.3)]">
              <h3 className="text-2xl font-bold text-primary-blue-bright mb-4 drop-shadow-[0_0_8px_rgba(75,164,222,0.5)]">
                ✓ É para ti se:
              </h3>
              <ul className="space-y-3 text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="text-primary-blue-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Tens 23-35 anos em Portugal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-blue-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Trabalhas bem mas és invisível</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-blue-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Queres alavancagem, não motivação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-blue-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Estás pronto para agir</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-red/20 to-primary-red-bright/20 backdrop-blur-sm rounded-xl p-8 border-2 border-primary-red/50 shadow-[0_0_20px_rgba(248,113,113,0.3)]">
              <h3 className="text-2xl font-bold text-primary-red-bright mb-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                ✗ NÃO é para ti se:
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-primary-red-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Procuras atalhos sem trabalho</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Queres motivação, não ação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Estás confortável onde estás</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red-bright text-xl mt-1 font-bold">•</span>
                  <span className="font-medium">Não estás disposto a mudar</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA in WhoThisIsFor Section */}
          <div className="text-center">
            <button
              onClick={handleGetKit}
              className="text-white text-lg md:text-xl font-bold py-4 px-10 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(75,164,222,0.5)]"
              style={{ backgroundColor: '#4BA4DE' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4BA4DE'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4BA4DE'}
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

