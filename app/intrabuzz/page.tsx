
'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StockCard } from "@/components/universal/stock-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, LayoutGrid, Table } from "lucide-react"
import { fetchStockData } from "@/utils/fetchStockData"
import { Stock } from "@/types/stock"
import Skeleton from "@/components/ui/skeleton"

export default function Nifty50Page() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [isTableView, setIsTableView] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sectors, setSectors] = useState<string[]>([])


  
  useEffect(() => {
    async function loadStocks() {
      try {
        setLoading(true)
        const data = await fetchStockData()
        setStocks(data)
        setFilteredStocks(data)
        const uniqueSectors: string[] = Array.from(
          new Set(data.map((stock: Stock) => stock.sector))
        )
        setSectors(["All", ...uniqueSectors])
      } catch (err) {
        console.error("Error fetching stocks:", err)
        setError("Failed to load stocks. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadStocks()
  }, [])


  
  const filterAndSortStocks = () => {
    let result = [...stocks];
  
    // Filter by Sector
    if (selectedSector && selectedSector !== "All") {
      result = result.filter((stock) => stock.sector === selectedSector);
    }
  
    // Sort by Selected Option
    if (sortBy) {
      switch (sortBy) {
        case "alphabetical":
          result.sort((a, b) => a.companyname.localeCompare(b.companyname));
          break;
        case "percentageInc":
          result.sort((a, b) => b.changepct - a.changepct);
          break;
        case "percentageDec":
          result.sort((a, b) => a.changepct - b.changepct);
          break;
      }
    }


    setFilteredStocks(result);
  };
  

  const toggleView = () => setIsTableView(!isTableView)


  // Function to get background color based on percentage change
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Nifty 50 Stocks</h1>
        
        {/* Skeleton for dropdowns and buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-[160px] h-[40px] rounded-md">
            <Skeleton />
          </div>
          <div className="w-[120px] h-[40px] rounded-md">
            <Skeleton />
          </div>
          <div className="w-[40px] h-[40px] rounded-full">
            <Skeleton />
          </div>
          <div className="w-[40px] h-[40px] rounded-full">
            <Skeleton />
          </div>
        </div>



        {/* Skeleton for Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <Skeleton width="100%" height="160px" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Nifty 50 Stocks</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter by Sector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedSector ? selectedSector : "Filter by Sector"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sectors.map((sector) => (
              <DropdownMenuItem key={sector} onSelect={() => setSelectedSector(sector)}>
                {sector}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort by Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {sortBy ? sortBy : "Sort by"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setSortBy("alphabetical")}>
            A - Z
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSortBy("percentageInc")}>
            % High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSortBy("percentageDec")}>
            % Low to High
          </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("Volume Spike")}>
              Volume Spike
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle View Button */}
        <Button variant="outline" onClick={toggleView}>
          {isTableView ? <LayoutGrid className="h-4 w-4" /> : <Table className="h-4 w-4" />}
        </Button>

      </div>

      {/* Cards or Table View */}
      {isTableView ? (
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-3 py-2">Symbol</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Change %</th>
                <th className="px-3 py-2">Sector</th>
                <th className="px-3 py-2">Volume Spike</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length === 0 ? (
                // Skeleton Loader for Table when no data is available
                [...Array(10)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-3 py-2"><Skeleton width="50px" height="20px" /></td>
                    <td className="px-3 py-2"><Skeleton width="150px" height="20px" /></td>
                    <td className="px-3 py-2"><Skeleton width="50px" height="20px" /></td>
                    <td className="px-3 py-2"><Skeleton width="50px" height="20px" /></td>
                    <td className="px-3 py-2"><Skeleton width="50px" height="20px" /></td>
                    <td className="px-3 py-2"><Skeleton width="50px" height="20px" /></td>
                  </tr>
                ))
              ) : (
                // Render Data After Loading
                filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b border-gray-700">
                    <td className="px-3 py-2 font-medium whitespace-nowrap">{stock.symbol}</td>
                    <td className="px-3 py-2">{stock.companyname}</td>
                    <td className="px-3 py-2">₹{stock.price.toFixed(2)}</td>
                    <td className={`px-3 py-2 ${stock.changepct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.changepct}%
                    </td>
                    <td className="px-3 py-2">{stock.sector}</td>
                    <td className="px-3 py-2">{stock.changepct}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredStocks.map((stock) => (
            <Link href={`/stockdetail/${stock.symbol}`} key={stock.symbol}>
              <div
                key={stock.symbol}
                style={{ backgroundColor: getBackgroundColor(stock.changepct) }}
                className="rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <StockCard
                  companyname={stock.companyname}
                  symbol={stock.symbol}
                  price={stock.price}
                  changepct={stock.changepct}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}