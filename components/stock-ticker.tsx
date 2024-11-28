'use client'

import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch('/api/stocks')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        if (!data.stocks || !Array.isArray(data.stocks)) {
          throw new Error('Invalid data format')
        }
        setStocks(data.stocks)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching stocks:', err)
        setError('Failed to load stocks. Please try again later.')
        setIsLoading(false)
      }
    }
    fetchStocks()
  }, [])

  if (isLoading) return <div className="h-8 bg-[#0c0e14] text-white flex items-center justify-center">Loading stocks...</div>
  if (error) return <div className="h-8 bg-[#0c0e14] text-red-500 flex items-center justify-center">{error}</div>

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0c0e14] text-white border-b border-gray-800 h-8">
      <Marquee speed={40} gradient={false} className="h-full">
        {stocks.map((stock, index) => (
          <div key={stock.symbol} className="flex items-center mx-1 h-full">
            <span className="">{stock.symbol}</span>
            <span className="ml-1">{stock.price.toFixed(2)}</span>
            <span 
              className={`ml-1 font-semibold ${
                stock.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change)}%
            </span>
            {index < stocks.length - 1 && (
              <span className="mx-3 text-gray-600">|</span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

