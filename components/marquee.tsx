'use client'

import Marquee from 'react-fast-marquee'

interface Stock {
  symbol: string
  price: number
  change: number
}

const stocks: Stock[] = [
  { symbol: 'RELIANCE', price: 1293.70, change: -0.15 },
  { symbol: 'TCS', price: 3012.35, change: 0.33 },
  { symbol: 'HDFCBANK', price: 1788.15, change: 0.15 },
  { symbol: 'INFY', price: 1919.20, change: -0.26 },
  { symbol: 'ICICIBANK', price: 1302.65, change: -0.18 },
  { symbol: 'HINDUNILVR', price: 2471.50, change: -0.31 },
  { symbol: 'SBIN', price: 837.90, change: -0.18 },
  { symbol: 'BHARTIARTL', price: 892.45, change: 0.22 },
  { symbol: 'ITC', price: 448.10, change: -0.05 },
  { symbol: 'KOTAKBANK', price: 1756.80, change: -0.42 },
  { symbol: 'LT', price: 3012.35, change: 0.33 },
  { symbol: 'AXISBANK', price: 962.15, change: -0.24 },
  { symbol: 'MARUTI', price: 10234.55, change: 0.18 },
  { symbol: 'ASIANPAINT', price: 3145.70, change: -0.09 },
  { symbol: 'TATAMOTORS', price: 678.90, change: 0.41 },
]

export default function StockTicker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-white border-b border-gray-800">
      <Marquee speed={40} gradient={false} className="py-1 text-sm">
        {stocks.map((stock, index) => (
          <div key={stock.symbol} className="flex items-center mx-3">
            <span className="font-semibold">{stock.symbol}</span>
            <span className="ml-1">{stock.price.toFixed(2)}</span>
            <span 
              className={`ml-1 ${
                stock.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {stock.change > 0 ? '▲' : '▼'} {Math.abs(stock.change)}%
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

