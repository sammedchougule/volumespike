'use client'

import { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { StockPreviewModal } from './stock-preview-modal'
import { Stock } from '@/types/stock'


const tabData = [
  { id: 'gainers', label: 'Gainers', icon: '📈', color: 'bg-green-500' },
  { id: 'losers', label: 'Losers', icon: '📉', color: 'bg-red-500' },
  { id: 'most-active', label: 'Most Active', icon: '⚡', color: 'bg-yellow-500' },
  { id: '52w-high', label: '52W High', icon: '🔝', color: 'bg-blue-500' },
  { id: '52w-low', label: '52W Low', icon: '🔻', color: 'bg-purple-500' },
]

const fetcher = async (url: string): Promise<{ stocks: Stock[] }> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Invalid data format')
  return { stocks: data }
}

export default function TodayStocks() {
  const [activeTab, setActiveTab] = useState('gainers')
  const { data, error } = useSWR<{ stocks: Stock[] }>('/api/stocks', fetcher, {
    refreshInterval: 5000, // 5 seconds
  })
  const prevData = useRef<{ stocks: Stock[] } | null>(null)

  // Track which stocks have changed
  const changedStocks = new Set<string>()
  if (data && prevData.current) {
    data.stocks.forEach((stock, index) => {
      const prevStock = prevData.current?.stocks[index]
      if (prevStock && (stock.price !== prevStock.price || stock.changepct !== prevStock.changepct)) {
        changedStocks.add(stock.symbol)
      }
    })
  }

  useEffect(() => {
    if (data) {
      prevData.current = data // Update the previous data
    }
  }, [data])

  const filteredStocks = (() => {
    if (!data) return []
    switch (activeTab) {
      case 'gainers':
        return data.stocks
          .filter((stock) => stock.changepct > 0)
          .sort((a, b) => b.changepct - a.changepct)
          .slice(0, 6)
      case 'losers':
        return data.stocks
          .filter((stock) => stock.changepct < 0)
          .sort((a, b) => a.changepct - b.changepct)
          .slice(0, 6)
      case 'most-active':
        return data.stocks
          .sort((a, b) => Math.abs(b.changepct) - Math.abs(a.changepct))
          .slice(0, 6)
      case '52w-high':
        return data.stocks
          .filter((stock) => stock.price >= stock.high52)
          .slice(0, 6)
      case '52w-low':
        return data.stocks
          .filter((stock) => stock.price <= stock.low52)
          .slice(0, 6)
      default:
        return data.stocks.slice(0, 5)
    }
  })()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock)
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="shadow-lg bg-gray-800 min-h-[500px]">
        <CardHeader className="flex flex-col space-y-4">
          <CardTitle className="text-white">Today&apos;s Top</CardTitle>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id ? `${tab.color} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="min-h-[500px] flex flex-col justify-between">
          {error ? (
            <div className="text-red-500">Failed to load stocks</div>
          ) : !data ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-600 animate-pulse rounded-md"></div>
                      <div className="w-16 h-3 bg-gray-600 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="w-16 h-4 bg-gray-600 animate-pulse rounded-md"></div>
                    <div className="w-12 h-3 bg-gray-600 animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer`}
                  onClick={() => handleStockClick(stock)}
                >
                  <div className="flex items-center gap-3">
                    {stock.logo && stock.logo !== '0' ? (
                      <img src={stock.logo} alt={`${stock.companyname} logo`} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">{stock.symbol[0]}</div>
                    )}
                    <div>
                      <p className="text-white font-medium">{stock.companyname}</p>
                      <p className="text-gray-400 text-sm">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-white font-medium ${changedStocks.has(stock.symbol) ? 'animate-blink' : ''}`}>
                      ₹{stock.price.toFixed(2)}
                    </p>
                    <p className={`text-sm flex items-center ${stock.changepct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.changepct >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                      {Math.abs(stock.changepct)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStock && (
        <StockPreviewModal
          stock={selectedStock}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
