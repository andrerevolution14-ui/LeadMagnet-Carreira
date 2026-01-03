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
        {/* Base Background with fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-800 to-slate-700" />
        
        {/* Mini dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-green rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-green rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Glow behind image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div 
            className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-green rounded-full blur-[100px] animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0) 70%)',
              animationDelay: '0.5s'
            }}
          />
        </div>

        {/* Content Container - Two Column Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Column */}
            <div className="animate-fade-in-up w-full">
              <div className="relative w-full" style={{ height: 'calc(100vh - 5rem)' }}>
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-image.png"
                    alt="Kit Impulsionador de Carreira"
                    fill
                    className="object-contain"
                    style={{ 
                      filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) brightness(1.2) contrast(1.15) saturate(1.2)',
                      objectPosition: 'center top',
                      transform: 'scale(1.08) translateY(-5rem)',
                    }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Headline Column */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Headline - Bold and Polarizing */}
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[0.9]">
                Estás estagnado na carreira.
                <br />
                <span className="text-primary-green-bright drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Não é culpa tua.</span>
              </h1>

              {/* Subheadline - Pain + Promise */}
              <p className="text-xl md:text-2xl text-gray-200 leading-tight">
                Trabalhas bem. Mas és <span className="text-primary-red font-bold">invisível</span>.
                <br />
                Sem alavancagem, <span className="text-primary-red font-bold">não há progressão</span>.
                <br />
                <span className="text-primary-green-bright font-bold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
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
                <p className="text-primary-green-bright text-2xl font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                  Crescem com alavancagem.
                </p>
                <p className="text-gray-200 text-sm mt-4 leading-relaxed font-medium">
                  Alavancagem = <span className="text-primary-green-glow">Ser visto</span>. <span className="text-primary-green-glow">Ser compreendido</span>. <span className="text-primary-green-glow">Ser escolhido</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Button below grid */}
          <div className="hidden lg:flex justify-center animate-fade-in-up" style={{ marginTop: '-12rem', animationDelay: '0.4s' }}>
            <div className="text-center">
              <button
                onClick={handleGetKit}
                className="text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                style={{ backgroundColor: '#22C55E' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
              >
                Obter o Kit Gratuito de Alavancagem de Carreira
              </button>
              <p className="mt-4 text-gray-300 text-sm md:text-base font-medium">
                100% gratuito • Sem spam • Valor real
              </p>
            </div>
          </div>

          {/* Mobile: Flex column layout */}
          <div className="flex flex-col gap-8 lg:hidden">
            {/* Headline - First */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl font-bold text-white leading-[0.9]">
                Estás estagnado na carreira.
                <br />
                <span className="text-primary-green-bright drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Não é culpa tua.</span>
              </h1>
              <p className="text-xl text-gray-200 leading-tight">
                Trabalhas bem. Mas és <span className="text-primary-red font-bold">invisível</span>.
                <br />
                Sem alavancagem, <span className="text-primary-red font-bold">não há progressão</span>.
                <br />
                <span className="text-primary-green-bright font-bold text-2xl drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                  De €1.200/mês para +€2.000/mês em 120 dias.
                </span>
                <br />
                <span className="text-white font-semibold">Sem trocar de trabalho. Sem desconforto.</span>
              </p>
              <div className="bg-gradient-to-r from-primary-green-light/20 to-primary-green-dark/20 backdrop-blur-sm rounded-xl p-6 border-2 border-primary-green/50">
                <p className="text-white text-lg font-semibold mb-3">
                  As carreiras <span className="text-primary-red font-bold">não crescem</span> com esforço.
                </p>
                <p className="text-primary-green-bright text-2xl font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                  Crescem com alavancagem.
                </p>
                <p className="text-gray-200 text-sm mt-4 leading-relaxed font-medium">
                  Alavancagem = <span className="text-primary-green-glow">Ser visto</span>. <span className="text-primary-green-glow">Ser compreendido</span>. <span className="text-primary-green-glow">Ser escolhido</span>.
                </p>
              </div>
            </div>

            {/* Image - Second */}
            <div className="animate-fade-in-up w-full">
              <div className="relative w-full h-[400px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-image.png"
                    alt="Kit Impulsionador de Carreira"
                    fill
                    className="object-contain"
                    style={{ 
                      filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) brightness(1.2) contrast(1.15) saturate(1.2)',
                      objectPosition: 'center top',
                    }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Button - Third */}
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <button
                  onClick={handleGetKit}
                  className="text-white text-lg font-bold py-5 px-8 rounded-xl btn-glow hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                  style={{ backgroundColor: '#22C55E' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
                >
                  Obter o Kit Gratuito de Alavancagem de Carreira
                </button>
                <p className="mt-4 text-gray-300 text-sm font-medium">
                  100% gratuito • Sem spam • Valor real
                </p>
              </div>
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

