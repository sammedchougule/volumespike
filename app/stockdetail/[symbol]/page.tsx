'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, Share2 } from 'lucide-react'
import { fetchStockData } from '@/utils/fetchStockData'
import Link from 'next/link'
import { Stock } from '@/types/stock'
import { StockChart } from '@/components/universal/stock-chart'

//const timeRanges = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX']

const news = [
  {
    source: 'Moneycontrol',
    time: '4 days ago',
    title: 'CDSL – Valuation full, but earnings growth can drive stock upside',
    image: '/placeholder.svg?height=80&width=120'
  },
  {
    source: 'Trade Brains',
    time: '4 days ago',
    title: 'CDSL: Revenue split of CDSL from each of its business operations',
    image: '/placeholder.svg?height=80&width=120'
  },
  {
    source: 'ET Now',
    time: '3 days ago',
    title: 'CDSL Share: Price action reinforces momentum and strength; check target price',
    image: '/placeholder.svg?height=80&width=120'
  }
]

export default function StockDetailPage() {
  //const [selectedRange, setSelectedRange] = useState('1D')
  const [stock, setStock] = useState<Stock | null>(null)
  const [sectorStocks, setSectorStocks] = useState<Stock []>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const symbol = params.symbol as string

  useEffect(() => {
    async function loadStockData() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchStockData(symbol)
        setStock(data)
        const allStocks = await fetchStockData()
        const relatedStocks = allStocks.filter((s: Stock) => s.sector === data.sector && s.symbol !== symbol).slice(0, 5)
        setSectorStocks(relatedStocks)
      } catch (err) {
        console.error('Error fetching stock data:', err)
        setError('Failed to load stock data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    loadStockData()
  }, [symbol])

  if (isLoading) return <div className="text-white text-center py-8">Loading stock data...</div>
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>
  if (!stock) return <div className="text-white text-center py-8">No stock data available</div>

  const stats = [
    { label: 'PREVIOUS CLOSE', value: `₹${stock.closeyest}` },
    { label: 'DAY RANGE', value: `₹${stock.low} - ₹${stock.high}` },
    { label: 'YEAR RANGE', value: `₹${stock.low52} - ₹${stock.high52}` },
    { label: 'MARKET CAP', value: `${stock.marketcap} INR` },
    { label: 'AVG VOLUME', value: stock.volumeavg },
    { label: 'P/E RATIO', value: stock.eps ? (stock.price / stock.eps).toFixed(2) : 'N/A' },
    { label: 'DIVIDEND YIELD', value: 'N/A' }, 
    { label: 'PRIMARY EXCHANGE', value: stock.exchange },
  ]

  return (

    <main className="min-h-screen bg-[#0d1117] text-white">
  <div className="container mx-auto px-4 py-8">
    {/* Header */}
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{stock.companyname}</h1>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Stock</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{stock.exchange}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 border-gray-800 text-white bg-gray-800 hover:bg-gray-900 hover:border-gray-400">
          Following
        </Button>
        <Button variant="outline" className="gap-2 border-gray-800 text-white bg-gray-800 hover:bg-gray-900 hover:border-gray-400">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>

    {/* Content Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content (2 Columns on Desktop) */}
      <div className="lg:col-span-2 order-1 lg:order-1">
        {/* Stock Info */}
        <div className="mb-6">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-4xl font-bold">₹{stock.price.toFixed(2)}</h2>
            <div className={`flex items-center ${(stock.changepct) >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
              {(stock.changepct) >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              <span className="font-semibold">{Math.abs((stock.changepct)).toFixed(2)}%</span>
              <span className="text-[#c9d1d9] ml-2">{(stock.change) >= 0 ? '+' : ''}{stock.change} Today</span>
            </div>
          </div>
          <p className="text-white">
            {new Date().toLocaleString()} · INR · {stock.exchange} · Disclaimer
          </p>
        </div>

        {/* Chart */}
        <StockChart symbol={stock.symbol} />

        {/* Similar Stocks */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Similar Stocks</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {sectorStocks.map((relatedStock) => (
              <Link href={`/stockdetail/${relatedStock.symbol}`} key={relatedStock.symbol}>
                <Card className="bg-[#161b22] border-gray-700 w-40 h-32 flex-shrink-0">
                  <CardContent className="p-3 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1 truncate">{relatedStock.symbol}</h3>
                      <p className="text-xs text-gray-400 truncate">{relatedStock.companyname}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">₹{relatedStock.price.toFixed(2)}</span>
                      <span
                        className={`text-xs ${
                          (relatedStock.changepct) >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                        }`}
                      >
                        {(relatedStock.changepct) >= 0 ? '+' : ''}
                        {relatedStock.changepct}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="order-4 mb-8">
          <h2 className="text-xl font-bold mb-4">In the News</h2>
          <div className="space-y-4">
            {news.map((item, index) => (
              <Card key={index} className="bg-[#161b22] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-sm text-white mb-2">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                      <h3 className="font-medium text-white hover:text-blue-400 cursor-pointer">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <div className="lg:col-span-1 order-3 lg:order-2 mb-8 lg:mb-0">
        <Card className="bg-[#161b22] border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white text-sm">{stat.label}</span>
                  <span className="text-white font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <div className="order-5 lg:order-3 mb-8">
        <h2 className="text-xl font-bold mb-4">About</h2>
        <Card className="bg-[#161b22] border-gray-700">
          <CardContent className="p-6">
            <p className="text-white">
              {stock.companyname} is a company listed on the {stock.exchange}. It operates in the {stock.sector} sector, specifically in the {stock.industry} industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-white mb-1">SECTOR</p>
                <p className="text-white">{stock.sector}</p>
              </div>
              <div>
                <p className="text-white mb-1">INDUSTRY</p>
                <p className="text-white">{stock.industry}</p>
              </div>
              <div>
                <p className="text-white mb-1">VOLUME</p>
                <p className="text-white">{stock.volume}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</main>




  )
}

