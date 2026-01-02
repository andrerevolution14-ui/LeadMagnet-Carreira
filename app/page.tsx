import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { Method } from '@/components/Method'
import { WhatsInside } from '@/components/WhatsInside'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'
import { Results } from '@/components/Results'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Method />
      <WhatsInside />
      <WhoThisIsFor />
      <Results />
      <CTA />
      
      {/* Footer */}
      <footer className="bg-primary-dark py-8 px-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Kit Carreira. Todos os direitos reservados.</p>
        <p className="mt-2">@AndreCareerUpgrade</p>
      </footer>
    </main>
  )
}

