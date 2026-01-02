import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kit Carreira Grátis – Progressão Interna PT',
  description: 'Transforme €1.200/mês em €3.500+ em 120 dias. Kit completo com 5 ferramentas para acelerar sua progressão interna e aumentar sua visibilidade no trabalho.',
  keywords: 'progressão de carreira, aumento salarial, desenvolvimento profissional, carreira Portugal',
  authors: [{ name: 'Andre Career Upgrade' }],
  openGraph: {
    title: 'Kit Carreira Grátis – Progressão Interna PT',
    description: 'Transforme €1.200/mês em €3.500+ em 120 dias. Kit completo com 5 ferramentas.',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Kit Carreira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kit Carreira Grátis – Progressão Interna PT',
    description: 'Transforme €1.200/mês em €3.500+ em 120 dias.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

