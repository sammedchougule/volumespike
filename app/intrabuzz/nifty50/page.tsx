'use client'

import { useState, useEffect } from "react"
import { StockCard } from "@/components/universal/stock-card"
import { Button } from "@/components/ui/button"
import { fetchStockData } from "@/utils/fetchStockData"
import { Stock } from "@/types/stock"


export default function Nifty50Page() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [activeFilter, setActiveFilter] = useState<"all" | "long" | "short">("all")

  useEffect(() => {
    async function loadStocks() {
      try {
        const data = await fetchStockData()
        setStocks(data)
        setFilteredStocks(data)
      } catch (err) {
        console.error("Error fetching stocks:", err)
      }
    }
    loadStocks()
  }, [])

  const applyFilter = (filter: "all" | "long" | "short") => {
    setActiveFilter(filter)
    if (filter === "all") {
      setFilteredStocks(stocks)
    } else if (filter === "long") {
      setFilteredStocks([...stocks].sort((a, b) => b.chg_percentage - a.chg_percentage))
    } else {
      setFilteredStocks([...stocks].sort((a, b) => a.chg_percentage - b.chg_percentage))
    }
  }

  const getBackgroundColor = (changePercent: number) => {
    const intensity = Math.min(Math.abs(changePercent) * 15, 100)

    if (changePercent > 2) {
      return `rgba(0, 128, 0, ${intensity / 100})` // Rich Green
    } else if (changePercent > 0) {
      return `rgba(144, 238, 144, ${intensity / 100})` // Light Green
    } else if (changePercent < -2) {
      return `rgba(178, 34, 34, ${intensity / 100})` // Rich Red
    } else if (changePercent < 0) {
      return `rgba(255, 102, 102, ${intensity / 100})` // Light Red
    } else {
      return `rgba(255, 215, 0, ${intensity / 100})` // Yellow
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Nifty 50 Stocks</h1>

      <div className="mb-6 flex space-x-4">
        <Button
          onClick={() => applyFilter("all")}
          variant={activeFilter === "all" ? "default" : "outline"}
        >
          All Stocks
        </Button>
        <Button
          onClick={() => applyFilter("long")}
          variant={activeFilter === "long" ? "default" : "outline"}
        >
          Long Build Up
        </Button>
        <Button
          onClick={() => applyFilter("short")}
          variant={activeFilter === "short" ? "default" : "outline"}
        >
          Short Build Up
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
              chg_rs={stock.chg_rs}
              chg_percentage={stock.chg_percentage}
            />

          </div>
        ))}
      </div>
    </div>
  )
}
