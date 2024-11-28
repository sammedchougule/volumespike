'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

const tabData = [
  { id: 'gainers', label: 'Gainers', icon: '📈', color: 'bg-green-500' },
  { id: 'losers', label: 'Losers', icon: '📉', color: 'bg-red-500' },
  { id: 'most-active', label: 'Most Active', icon: '⚡', color: 'bg-yellow-500' },
  { id: '52w-high', label: '52W High', icon: '🔝', color: 'bg-blue-500' },
  { id: '52w-low', label: '52W Low', icon: '🔻', color: 'bg-purple-500' },
]

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const data = await res.json()
  if (!data.stocks || !Array.isArray(data.stocks)) {
    throw new Error('Invalid data format')
  }
  return data
}

export default function TodayStocks() {
  const [activeTab, setActiveTab] = useState('gainers')
  const { data, error } = useSWR<{ stocks: Stock[] }>('/api/stocks', fetcher)

  if (error) return <div className="text-red-500">Failed to load stocks</div>
  if (!data) return <div className="text-white">Loading...</div>

  const filteredStocks = (() => {
    switch (activeTab) {
      case 'gainers':
        return data.stocks
          .filter((stock) => stock.change > 0)
          .sort((a, b) => b.change - a.change)
          .slice(0, 5) // Top 5 gainers
      case 'losers':
        return data.stocks
          .filter((stock) => stock.change < 0)
          .sort((a, b) => a.change - b.change)
          .slice(0, 5) // Top 5 losers
      case 'most-active':
        return data.stocks
          .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
          .slice(0, 5) // Top 5 most active
      case '52w-high':
        return data.stocks
          .filter((stock) => stock.price > 3000) // Mock logic
          .slice(0, 5) // Top 5 by 52w-high
      case '52w-low':
        return data.stocks
          .filter((stock) => stock.price < 100) // Mock logic
          .slice(0, 5) // Top 5 by 52w-low
      default:
        return data.stocks.slice(0, 5) // Default fallback
    }
  })()

  return (
    <Card className="shadow-lg bg-gray-800">
      <CardHeader className="flex flex-col space-y-4">
        <CardTitle className="text-white">Today's stocks</CardTitle>
        <div className="flex flex-wrap gap-2">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === tab.id ? `${tab.color} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  {stock.symbol[0]}
                </div>
                <div>
                  <p className="text-white font-medium">{stock.name}</p>
                  <p className="text-gray-400 text-sm">{stock.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">₹{stock.price.toFixed(2)}</p>
                <p className={`text-sm flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                  {Math.abs(stock.change)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
