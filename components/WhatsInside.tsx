'use client'

import { useState } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function WhatsInside() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'whats_inside', action: 'open_modal' })
    setIsModalOpen(true)
  }

  const items = [
    {
      title: 'Scanner 90s de Valor Invisível',
      outcome: 'Identifica o teu valor real em 90 segundos. Isto resolve a confusão sobre o que realmente importa.',
      value: 97,
    },
    {
      title: 'Script de Iniciação de Relatórios',
      outcome: 'Comunica resultados de forma clara. Isto evita que o teu trabalho seja ignorado.',
      value: 99,
    },
    {
      title: 'Template de Email Bi-semanal',
      outcome: 'Mantém-te visível sem ser chato. Isto poupa tempo e aumenta a tua presença.',
      value: 97,
    },
    {
      title: 'Matriz Multiplicador',
      outcome: 'Liga tarefas a impacto financeiro. Isto mostra o teu valor real ao chefe.',
      value: 104,
    },
    {
      title: 'Sprint de 120 Dias',
      outcome: 'Plano claro de ação. Isto evita procrastinação e garante progresso.',
      value: 100,
    },
  ]

  const totalValue = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <>
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
            O que está dentro do kit
          </h2>
          <div className="text-center mb-16">
            <p className="text-gray-600 font-semibold mb-8 text-lg">
              Foco em <span className="text-primary-green-bright">resultados</span>. Não em ferramentas.
            </p>
            <div className="bg-white rounded-xl px-6 py-4 border-2 border-primary-green shadow-[0_0_30px_rgba(5,150,105,0.3)] mb-8 max-w-sm mx-auto">
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                  Valor Total
                </p>
                <p className="text-3xl md:text-4xl font-bold line-through drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" style={{ color: '#EF4444' }}>
                  {totalValue}€
                </p>
                <div className="mt-2 pt-2 border-t border-primary-green/30 w-full">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Agora
                  </p>
                  <p className="text-2xl md:text-3xl font-bold drop-shadow-[0_0_20px_rgba(5,150,105,0.8)]" style={{ color: '#059669' }}>
                    0€
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-primary-green/30 shadow-lg hover:shadow-xl hover:border-primary-green/60 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-primary-dark">
                    <span className="text-primary-green-bright">✓</span> {item.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold line-through" style={{ color: '#EF4444' }}>{item.value}€</p>
                    <p className="text-lg font-bold text-primary-green-bright">Grátis</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {item.outcome}
                </p>
              </div>
            ))}
          </div>

          {/* CTA in WhatsInside Section */}
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

