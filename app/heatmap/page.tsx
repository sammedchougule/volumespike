'use client'

import { useState, useEffect } from 'react'
import { Stock } from '@/types/stock'
import { StockCard } from "@/components/universal/stock-card"
import { Button } from '@/components/ui/button'
import { HeatmapLegend } from '@/components/heatmap-legend'
import { fetchStockData } from '@/utils/fetchStockData'

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

  const getBackgroundColor = (changePercent: number): string => {
    const intensity = Math.min(Math.abs(changePercent) * 20, 100)
    return changePercent >= 0
      ? `rgba(0, 255, 0, ${intensity / 100})`
      : `rgba(255, 0, 0, ${intensity / 100})`
  }

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
        
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300"></div>
            <span className="text-white">Market cap</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              <div className="w-3 h-6 bg-red-500"></div>
              <div className="w-3 h-6 bg-green-500"></div>
            </div>
            <span className="text-white">Performance D, %</span>
          </div>
        </div>

        <HeatmapLegend />

        <div className="mb-6 flex flex-wrap gap-4">
          {sectors.map((sector) => (
            <Button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              variant={selectedSector === sector ? 'default' : 'outline'}
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
              <div
                key={stock.symbol}
                style={{ backgroundColor: getBackgroundColor(stock.chg_percentage) }}
                className="rounded-lg transition-colors"
              >
                <StockCard
                  name={stock.name}
                  symbol={stock.symbol}
                  price={stock.price}
                  change={stock.chg_rs}
                  changePercent={stock.chg_percentage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
