'use client'

import { useState } from 'react'
import Image from 'next/image'
import { EmailModal } from './EmailModal'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetKit = () => {
    trackEvent('button_click', { location: 'hero', action: 'open_modal' })
    setIsModalOpen(true)
  }

  const benefits = [
    'Scanner 90s valor invisível',
    'Script iniciação relatórios',
    'Template email bi-semanal',
    'Matriz multiplicador',
    'Sprint 120 dias',
  ]

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark to-primary-dark-light" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-green rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-green rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content Container - Two Column Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Image */}
            <div className="animate-fade-in-up">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-image.png"
                    alt="Kit Impulsionador de Carreira"
                    fill
                    className="object-contain hero-image-no-bg"
                    style={{ 
                      filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                    }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Headline - Bold and Polarizing */}
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[0.9]">
                Estás estagnado na carreira.
                <br />
                <span className="text-primary-green-bright drop-shadow-[0_0_10px_rgba(5,150,105,0.5)]">Não é culpa tua.</span>
              </h1>

              {/* Subheadline - Pain + Promise */}
              <p className="text-xl md:text-2xl text-gray-200 leading-tight">
                Trabalhas bem. Mas és <span className="text-primary-red font-bold">invisível</span>.
                <br />
                Sem alavancagem, <span className="text-primary-red font-bold">não há progressão</span>.
                <br />
                <span className="text-primary-green-bright font-bold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(5,150,105,0.4)]">
                  De €1.200/mês para +€2.000/mês em 120 dias.
                </span>
                <br />
                <span className="text-white font-semibold">Sem trocar de trabalho. Sem desconforto.</span>
              </p>

              {/* Core Reframe */}
              <div className="bg-gradient-to-r from-primary-green-light/20 to-primary-green-dark/20 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-green/50">
                <p className="text-white text-lg font-semibold mb-3">
                  As carreiras <span className="text-primary-red font-bold">não crescem</span> com esforço.
                </p>
                <p className="text-primary-green-bright text-2xl font-bold drop-shadow-[0_0_8px_rgba(5,150,105,0.5)]">
                  Crescem com alavancagem.
                </p>
                <p className="text-gray-200 text-sm mt-4 leading-relaxed font-medium">
                  Alavancagem = <span className="text-primary-green-glow">Ser visto</span>. <span className="text-primary-green-glow">Ser compreendido</span>. <span className="text-primary-green-glow">Ser escolhido</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button - Centered below both columns */}
          <div className="mt-12 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <button
                onClick={handleGetKit}
                className="text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_30px_rgba(5,150,105,0.6)]"
                style={{ backgroundColor: '#059669' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              >
                Obter o Kit Gratuito de Alavancagem de Carreira
              </button>

              {/* Trust Signals */}
              <p className="mt-4 text-gray-300 text-sm md:text-base font-medium">
                100% gratuito • Sem spam • Valor real
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

