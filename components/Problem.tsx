'use client'

import { useState } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function Problem() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'problem', action: 'open_modal' })
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-12">
            Porque é que o trabalho duro <span className="text-primary-red">não resulta</span> em crescimento?
          </h2>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <div className="bg-white rounded-xl p-6 border-l-4 border-primary-red shadow-md">
              <p className="font-bold text-primary-red text-xl mb-2">
                Não é culpa tua.
              </p>
              <p className="text-gray-800">
                O sistema está mal desenhado. Trabalhas bem. Mas és <span className="font-bold text-primary-red">invisível</span>. 
                Os teus resultados não são vistos. O teu valor não é compreendido.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-primary-red shadow-md">
              <p className="font-bold text-primary-red text-xl mb-2">
                A maioria das pessoas fica invisível.
              </p>
              <p className="text-gray-800">
                Fazem o trabalho. Esperam que alguém note. <span className="font-bold text-primary-red">Ninguém nota</span>. 
                Anos passam. O salário não muda. A frustração cresce.
              </p>
            </div>

            <div className="bg-red-50 border-4 border-primary-red rounded-xl p-6 shadow-lg">
              <p className="font-bold text-primary-red-bright text-2xl mb-4">
                O custo real de não fazer nada:
              </p>
              <ul className="list-disc list-inside space-y-3 text-primary-dark">
                <li className="text-xl font-bold text-primary-red-bright">€15.000+ perdidos por ano (diferença salarial)</li>
                <li className="text-lg font-semibold text-gray-800">Anos de carreira desperdiçados</li>
                <li className="text-lg font-semibold text-gray-800">Oportunidades que nunca chegam</li>
              </ul>
              <p className="mt-6 font-bold text-primary-red-bright text-xl">
                Se nada mudar, nada muda.
              </p>
            </div>
          </div>

          {/* CTA in Problem Section */}
          <div className="mt-12 text-center">
            <button
              onClick={handleGetKit}
              className="text-white text-lg md:text-xl font-bold py-4 px-10 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              style={{ backgroundColor: '#22C55E' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
            >
              Obter o Kit Gratuito de Alavancagem de Carreira
            </button>
            <p className="mt-3 text-gray-600 text-sm">
              100% gratuito • Sem spam • Valor real
            </p>
          </div>
        </div>
      </section>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
