'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, LayoutGrid, Table } from 'lucide-react'
import { StockCard } from '@/components/universal/stock-card'
import { fetchStockData } from '@/utils/fetchStockData'
import { Stock } from '@/types/stock'

export default function ItrabuzzPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [isTableView, setIsTableView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStocks() {
      try {
        const data = await fetchStockData()
        setStocks(data)
        setFilteredStocks(data)
        const uniqueSectors = Array.from(new Set(data.map(stock => stock.sector)))
        setSectors(['All', ...uniqueSectors])
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching stocks:', err)
        setError('Failed to load stocks. Please try again later.')
        setIsLoading(false)
      }
    }
    loadStocks()
  }, [])

  useEffect(() => {
    filterAndSortStocks()
  }, [selectedSector, sortBy])

  const filterAndSortStocks = () => {
    let result = [...stocks]
    
    if (selectedSector && selectedSector !== 'All') {
      result = result.filter(stock => stock.sector === selectedSector)
    }

    switch (sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.stock_name.localeCompare(b.stock_name))
        break
      case 'percentageInc':
        result.sort((a, b) => parseFloat(b.chg_percentage) - parseFloat(a.chg_percentage))
        break
      case 'percentageDec':
        result.sort((a, b) => parseFloat(a.chg_percentage) - parseFloat(b.chg_percentage))
        break
      case 'volumeSpike':
        result.sort((a, b) => {
          const spikeA = parseFloat(a.volume_spike.replace('▲', '').replace('%', ''))
          const spikeB = parseFloat(b.volume_spike.replace('▲', '').replace('%', ''))
          return spikeB - spikeA
        })
        break
    }

    setFilteredStocks(result)
  }

  if (isLoading) return <div className="text-white text-center py-8">Loading stocks...</div>
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>

  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Itrabuzz</h1>
        <p className="mt-4 text-gray-300 mb-6">Latest market buzz and trending stories.</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          

          <Button variant="outline" onClick={() => setIsTableView(!isTableView)}>
            {isTableView ? <LayoutGrid className="h-4 w-4" /> : <Table className="h-4 w-4" />}
          </Button>
        </div>

        {isTableView ? (
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th className="px-3 py-2 sticky left-0 z-10 bg-gray-700">Symbol</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Change %</th>
                  <th className="px-3 py-2">Volume Spike</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b border-gray-700">
                    <td className="px-3 py-2 font-medium whitespace-nowrap sticky left-0 z-10 bg-gray-800">{stock.symbol}</td>
                    <td className="px-3 py-2">{stock.stock_name}</td>
                    <td className="px-3 py-2">₹{stock.price.toFixed(2)}</td>
                    <td className={`px-3 py-2 ${parseFloat(stock.chg_percentage) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.chg_percentage}%
                    </td>
                    <td className="px-3 py-2">{stock.volume_spike}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredStocks.map((stock) => (
              <Link href={`/stockdetail/${stock.symbol}`} key={stock.symbol}>
                <StockCard
                  name={stock.stock_name}
                  symbol={stock.symbol}
                  price={stock.price}
                  change={parseFloat(stock.chg_rs)}
                  changePercent={parseFloat(stock.chg_percentage)}
                />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Featured Indices</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/itrabuzz/nifty50" className="text-blue-400 hover:text-blue-300">
                Nifty 50 Stocks
              </Link>
            </li>
            <li>
              <Link href="/heatmap" className="text-blue-400 hover:text-blue-300">
                Stock Heatmap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

