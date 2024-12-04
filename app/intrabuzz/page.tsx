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
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadStocks() {
      try {
        setLoading(true)
        const data = await fetchStockData()
        setStocks(data)
        setFilteredStocks(data)
      } catch (err) {
        console.error("Error fetching stocks:", err)
      } finally {
        setLoading(false)
      }
    }
    loadStocks()
  }, [])

  const applyFilter = (filter: 'all' | 'long' | 'short') => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredStocks(stocks);
    } else if (filter === 'long') {
      setFilteredStocks(
        stocks.filter((stock) => stock.chg_percentage > 0)
          .sort((a, b) => b.chg_percentage - a.chg_percentage)
      );
    } else {
      setFilteredStocks(
        stocks.filter((stock) => stock.chg_percentage < 0)
          .sort((a, b) => a.chg_percentage - b.chg_percentage)
      );
    }
  };

  const getBackgroundColor = (changePercent: number) => {
    const maxPercent = 10;
    const clampedPercent = Math.max(-maxPercent, Math.min(changePercent, maxPercent));
    if (clampedPercent === 0) return `rgba(255, 215, 0, 1)`;

    const intensity = Math.abs(clampedPercent) / maxPercent;
    if (clampedPercent > 0) {
      const red = Math.round(255 - 255 * intensity);
      const green = Math.round(215 + (128 - 215) * intensity);
      const blue = Math.round(0);
      return `rgba(${red}, ${green}, ${blue}, 1)`;
    } else {
      const red = Math.round(255 - (255 - 178) * intensity);
      const green = Math.round(215 - 215 * intensity);
      const blue = Math.round(0 + 34 * intensity);
      return `rgba(${red}, ${green}, ${blue}, 1)`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">
        {loading ? <div className="skeleton h-8 w-48"></div> : "Nifty 50 Stocks"}
      </h1>

      <div className="mb-6 flex space-x-4">
        {["all", "long", "short"].map((filter) => (
          <Button
            key={filter}
            onClick={() => applyFilter(filter as "all" | "long" | "short")}
            className={`px-2 py-2 rounded-md font-medium ${
              activeFilter === filter
                ? "bg-gray-900 text-white border border-gray-200"
                : "bg-gray-900 text-gray-200 border border-gray-700"
            }`}
          >
            {loading ? <div className="skeleton h-6 w-24"></div> : filter === "all" ? "All Stocks" : filter === "long" ? "Long Build Up" : "Short Build Up"}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg p-4 bg-gray-700 skeleton"
              >
                <div className="skeleton h-6 w-full mb-2"></div>
                <div className="skeleton h-4 w-2/3"></div>
              </div>
            ))
          : filteredStocks.map((stock) => (
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
