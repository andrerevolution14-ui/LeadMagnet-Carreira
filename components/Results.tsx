'use client'

import { useEffect, useState } from 'react'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function Results() {
  const [animated, setAnimated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'results', action: 'open_modal' })
    setIsModalOpen(true)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('results-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const milestones = [
    {
      week: 'Semana 4',
      title: 'Visibilidade',
      description: 'O teu trabalho é visto. Os teus resultados são notados. Não és mais invisível.',
      progress: 25,
    },
    {
      week: 'Mês 4',
      title: 'Conversa de Promoção',
      description: 'Estás pronto para negociar o teu aumento. De €1.200 para +€2.000/mês.',
      progress: 100,
    },
  ]

  return (
    <>
    <section id="results-section" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-700 mb-8 text-lg md:text-xl font-medium">
          De €1.200/mês para +€2.000/mês. Sem trocar de trabalho. Sem desconforto.
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-primary-dark mb-16">
          Resultados em 120 dias
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 hidden md:block" />
          <div
            className={`absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary-green-light to-primary-green-dark transform -translate-y-1/2 hidden md:block transition-all duration-1000 ${
              animated ? 'w-full' : 'w-0'
            }`}
          />

          <div className="grid md:grid-cols-2 gap-12 relative">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 border-primary-green/40 shadow-lg hover:shadow-2xl hover:border-primary-green transition-all animate-fade-in-up ${
                  animated ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  transition: 'opacity 0.6s ease-in-out',
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white border-2 border-primary-green rounded-full flex items-center justify-center text-primary-dark font-bold text-xl mr-4 shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold text-sm mb-1">
                      {milestone.week}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-dark">
                      {milestone.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  {milestone.description}
                </p>
                <div className="mt-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: animated ? `${milestone.progress}%` : '0%',
                        backgroundColor: '#059669',
                        minWidth: animated && milestone.progress > 0 ? '2px' : '0px',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA in Results Section */}
        <div className="mt-12 text-center">
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

