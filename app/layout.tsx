
import { Inter } from 'next/font/google'
import './globals.css'
import StockTicker from '@/components/stock-ticker'
import Navbar from '@/components/navbar'
import { defaultMetadata } from '@/utils/metadata';

export const metadata = defaultMetadata; // Use the default metadata

const inter = Inter({ subsets: ['latin'] })

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
        <div className="mt-20 md:mt-30 lg:mt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
