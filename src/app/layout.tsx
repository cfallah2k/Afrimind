import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { MobileAppWrapper } from '@/components/mobile-app-wrapper'
import { ResponsiveNavigation } from '@/components/responsive-navigation'
import { EnvChecker } from '@/components/env-checker'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'AfriMind Platform - African Digital Sovereignty',
  description: 'Empowering Africa through AI-driven agricultural intelligence, cross-border trade, cultural preservation, and financial inclusion.',
  keywords: ['Africa', 'AI', 'Agriculture', 'Trade', 'Culture', 'Financial Inclusion', 'MCP', 'Digital Sovereignty'],
  authors: [{ name: 'AfriMind Team' }],
  openGraph: {
    title: 'AfriMind Platform - African Digital Sovereignty',
    description: 'Empowering Africa through AI-driven solutions for agriculture, trade, culture, and finance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AfriMind Platform - African Digital Sovereignty',
    description: 'Empowering Africa through AI-driven solutions for agriculture, trade, culture, and finance.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <EnvChecker />
          <ResponsiveNavigation />
          <MobileAppWrapper>
            {children}
          </MobileAppWrapper>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
