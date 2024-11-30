'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Stock } from '@/types/stock'
import { StockTile } from './stock-tile'

interface SectorGroupProps {
  name: string
  stocks: Stock[]
}

export function SectorGroup({ name, stocks }: SectorGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getTileSize = (marketCap: number) => {
    const maxMarketCap = Math.max(...stocks.map(s => s.marketCap))
    const ratio = marketCap / maxMarketCap
    return ratio > 0.7 ? 'lg' : ratio > 0.3 ? 'md' : 'sm'
  }

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xl font-bold text-white mb-4"
      >
        <ChevronRight
          className={`transform transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
        {name}
      </button>
      {isExpanded && (
        <div className="grid gap-4 grid-flow-dense auto-rows-auto">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="transform transition-all duration-200 hover:scale-105"
            >
              <StockTile stock={stock} size={getTileSize(stock.marketCap)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

