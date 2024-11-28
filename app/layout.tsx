import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StockTicker from '@/components/stock-ticker'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stock Insights',
  description: 'Your comprehensive stock market analysis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StockTicker />
        <Navbar />
        <div className="pt-32">
          {children}
        </div>
      </body>
    </html>
  )
}

