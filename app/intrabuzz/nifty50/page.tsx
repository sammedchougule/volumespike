// app/itrabuzz/nifty50/page.tsx
"use client";

import { useState, useEffect } from 'react'
import { fetchStockData } from '@/utils/fetchStockData'
import { Stock } from '@/types/stock'

export default function Nifty50Page() {
  // Explicitly declare stocks as Stock[] (array of Stock objects)
  const [stocks, setStocks] = useState<Stock[]>([]) 

  useEffect(() => {
    async function loadStocks() {
      try {
        const data = await fetchStockData()
        setStocks(data)
      } catch (err) {
        console.error('Error fetching stocks:', err)
      }
    }
    loadStocks()
  }, [])

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white">Nifty 50 Stocks</h1>
        <div className="mt-8">
          {/* Render your stocks here */}
          {stocks.length === 0 ? (
            <p className="text-gray-300">Loading stocks...</p>
          ) : (
            <ul>
              {stocks.map((stock) => (
                <li key={stock.symbol} className="text-gray-300">
                  {stock.name} ({stock.symbol}): {stock.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
