'use client'

import { useState, useEffect } from 'react'
import { Stock } from '@/types/stock'
import { StockCard } from "@/components/universal/stock-card"
import { Button } from '@/components/ui/button'
import { fetchStockData } from '@/utils/fetchStockData'
import Link from 'next/link'


export default function HeatmapPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStocks() {
      try {
        const data: Stock[] = await fetchStockData()
        setStocks(data)

        // Get unique sectors and set default sector
        const uniqueSectors = Array.from(new Set(data.map(stock => stock.sector)))
        setSectors(['All', ...uniqueSectors])

        setSelectedSector('All')
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching stocks:', err)
        setError('Failed to load stocks. Please try again later.')
        setIsLoading(false)
      }
    }
    loadStocks()
  }, [])

    // Coolor coding for the card according to chg_percentage
  const getBackgroundColor = (changePercent: number) => {
    const maxPercent = 10; // Max percentage for full transition (10%)
  
    // Clamp the changePercent between -10 and 10 to avoid out-of-bound colors
    const clampedPercent = Math.max(-maxPercent, Math.min(changePercent, maxPercent));
  
    if (clampedPercent === 0) {
      // Zero change - Neutral Yellow
      return `rgba(255, 215, 0, 1)`; // Constant Yellow for no change
    }
  
    const intensity = Math.abs(clampedPercent) / maxPercent; // Calculate intensity (0 to 1)
  
    if (clampedPercent > 0) {
      // Positive changes - Transition from Yellow to Green
      const red = Math.round(255 - 255 * intensity); // Decrease red
      const green = Math.round(215 + (128 - 215) * intensity); // Increase green
      const blue = Math.round(0 + (0 - 0) * intensity); // Blue stays the same
      return `rgba(${red}, ${green}, ${blue}, 1)`;
    } else {
      // Negative changes - Transition from Yellow to Red
      const red = Math.round(255 - (255 - 178) * intensity); // Increase red
      const green = Math.round(215 - 215 * intensity); // Decrease green
      const blue = Math.round(0 + (34 - 0) * intensity); // Increase blue
      return `rgba(${red}, ${green}, ${blue}, 1)`;
    }
  };
  

  if (isLoading) return <div className="text-white text-center py-8">Loading stocks...</div>
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>
  if (stocks.length === 0) return <div className="text-white text-center py-8">No stock data available</div>

  // Filter stocks based on selected sector
  const filteredStocks = selectedSector === 'All' 
    ? stocks 
    : stocks.filter(stock => stock.sector === selectedSector)

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Stock Heatmap</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          {sectors.map((sector) => (
            <Button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-2 py-2 rounded-md font-medium ${
                selectedSector === sector
                  ? "bg-gray-900 text-white border border-gray-200"
                  : "bg-gray-900 text-gray-200 border border-gray-700"
              }`}
            >
              {sector}
            </Button>
          
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {selectedSector === 'All' ? 'All Sectors' : selectedSector}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredStocks.map((stock) => (
            <Link href={`/stockdetail/${stock.symbol}`} key={stock.symbol}>
              <div
                key={stock.symbol}
                style={{ backgroundColor: getBackgroundColor(stock.chg_percentage) }}
                className="rounded-lg transition-colors"
              >
                <StockCard 
                  name={stock.name}
                  symbol={stock.symbol}
                  price={stock.price}
                  chg_rs={stock.chg_rs}
                  chg_percentage={stock.chg_percentage}
                />
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
