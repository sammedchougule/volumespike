"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StockTicker from '@/components/stock-ticker'
import Navbar from '@/components/navbar'


const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'VolumeSpike',
//   description: 'Your comprehensive stock market analysis platform',
//   openGraph: {
//     title: 'VolumeSpike',
//     description: 'Your comprehensive stock market analysis platform',
//     url: 'https://www.volumespike.in', // Your website URL
//     images: [
//       {
//         url: '/images/volumespike.jpg', // Path to the image inside the public folder
//         width: 200, // Image width
//         height: 200, // Image height
//         alt: 'VolumeSpike stock market analysis', // Image alt text
//       },
//     ],
//     siteName: 'VolumeSpike',
//   },
// }

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
        <div className="mt-40 md:mt-28 lg:mt-30">
          {children}
        </div>
      </body>
    </html>
  )
}
