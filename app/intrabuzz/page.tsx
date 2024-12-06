// 'use client'

// import { useState, useEffect } from "react"
// import { StockCard } from "@/components/universal/stock-card"
// import { Button } from "@/components/ui/button"
// import { fetchStockData } from "@/utils/fetchStockData"
// import { Stock } from "@/types/stock"

// export default function Nifty50Page() {
//   const [stocks, setStocks] = useState<Stock[]>([])
//   const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
//   const [activeFilter, setActiveFilter] = useState<"all" | "long" | "short">("all")
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     async function loadStocks() {
//       try {
//         setLoading(true)
//         const data = await fetchStockData()
//         setStocks(data)
//         setFilteredStocks(data)
//       } catch (err) {
//         console.error("Error fetching stocks:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadStocks()
//   }, [])

//   const applyFilter = (filter: 'all' | 'long' | 'short') => {
//     setActiveFilter(filter);
//     if (filter === 'all') {
//       setFilteredStocks(stocks);
//     } else if (filter === 'long') {
//       setFilteredStocks(
//         stocks.filter((stock) => stock.chg_percentage > 0)
//           .sort((a, b) => b.chg_percentage - a.chg_percentage)
//       );
//     } else {
//       setFilteredStocks(
//         stocks.filter((stock) => stock.chg_percentage < 0)
//           .sort((a, b) => a.chg_percentage - b.chg_percentage)
//       );
//     }
//   };

  // const getBackgroundColor = (changePercent: number) => {
  //   const maxPercent = 10;
  //   const clampedPercent = Math.max(-maxPercent, Math.min(changePercent, maxPercent));
  //   if (clampedPercent === 0) return `rgba(255, 215, 0, 1)`;

  //   const intensity = Math.abs(clampedPercent) / maxPercent;
  //   if (clampedPercent > 0) {
  //     const red = Math.round(255 - 255 * intensity);
  //     const green = Math.round(215 + (128 - 215) * intensity);
  //     const blue = Math.round(0);
  //     return `rgba(${red}, ${green}, ${blue}, 1)`;
  //   } else {
  //     const red = Math.round(255 - (255 - 178) * intensity);
  //     const green = Math.round(215 - 215 * intensity);
  //     const blue = Math.round(0 + 34 * intensity);
  //     return `rgba(${red}, ${green}, ${blue}, 1)`;
  //   }
  // };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-white">
//         {loading ? <div className="skeleton h-8 w-48"></div> : "Nifty 50 Stocks"}
//       </h1>

//       <div className="mb-6 flex space-x-4">
//         {["all", "long", "short"].map((filter) => (
//           <Button
//             key={filter}
//             onClick={() => applyFilter(filter as "all" | "long" | "short")}
//             className={`px-2 py-2 rounded-md font-medium ${
//               activeFilter === filter
//                 ? "bg-gray-700 text-white border border-gray-200"
//                 : "bg-gray-900 text-gray-200 border border-gray-700"
//             }`}
//           >
//             {loading ? <div className="skeleton h-6 w-24"></div> : filter === "all" ? "All Stocks" : filter === "long" ? "Long Build Up" : "Short Build Up"}
//           </Button>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//         {loading
//           ? Array.from({ length: 12 }).map((_, index) => (
//             ))
//           : filteredStocks.map((stock) => (
//               <div
//                 key={stock.symbol}
//                 style={{ backgroundColor: getBackgroundColor(stock.chg_percentage) }}
//                 className="rounded-lg transition-colors">
//                 <StockCard
//                   stock_name={stock.stock_name}
//                   symbol={stock.symbol}
//                   price={stock.price}
//                   chg_rs={stock.chg_rs}
//                   chg_percentage={stock.chg_percentage}
//                 />
//               </div>
//             ))}
//       </div>
//     </div>
//   )
// }









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
import { ChevronDown, LayoutGrid, Table, Flame } from "lucide-react"
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

  const [volumeSpikeOrder, setVolumeSpikeOrder] = useState<"asc" | "desc" | null>(null)

  
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

  useEffect(() => {
    filterAndSortStocks()
  }, [selectedSector, sortBy, volumeSpikeOrder])

  const filterAndSortStocks = () => {
    let result = [...stocks]

    if (selectedSector && selectedSector !== "All") {
      result = result.filter((stock) => stock.sector === selectedSector)
    }

    if (sortBy) {
      switch (sortBy) {
        case "alphabetical":
          result.sort((a, b) => a.stock_name.localeCompare(b.stock_name))
          break
        case "percentageInc":
          result.sort((a, b) => b.chg_percentage - a.chg_percentage)
          break
        case "percentageDec":
          result.sort((a, b) => a.chg_percentage - b.chg_percentage)
          break
        case "volumeSpike":
          result.sort((a, b) => (b.volume_spike) - (a.volume_spike))
          break
      }
    }

    // Sorting based on volume spike order (ascending or descending)
    if (volumeSpikeOrder) {
      result.sort((a, b) => {
        const spikeA = (a.volume_spike)
        const spikeB = (b.volume_spike)
        return volumeSpikeOrder === "asc" ? spikeA - spikeB : spikeB - spikeA
      })
    }

    setFilteredStocks(result)
  }

  const toggleView = () => setIsTableView(!isTableView)

  const toggleVolumeSpikeOrder = () => {
    setVolumeSpikeOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }

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
          {[...Array(10)].map((_, index) => (
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
            <DropdownMenuItem onSelect={() => setSortBy("Alphabetical")}>
              A - B
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("% Change (High to Low)")}>
              % High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("% Change (Low to High)")}>
              % Low to High
            </DropdownMenuItem>
            {/* <DropdownMenuItem onSelect={() => setSortBy("Volume Spike")}>
              Volume Spike
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle View Button */}
        <Button variant="outline" onClick={toggleView}>
          {isTableView ? <LayoutGrid className="h-4 w-4" /> : <Table className="h-4 w-4" />}
        </Button>

        {/* Volume Spike Order Button */}
        <Button variant="outline" onClick={toggleVolumeSpikeOrder}>
          <Flame className="h-4 w-4" />
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
                    <td className="px-3 py-2">{stock.stock_name}</td>
                    <td className="px-3 py-2">₹{stock.price.toFixed(2)}</td>
                    <td className={`px-3 py-2 ${stock.chg_percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.chg_percentage}%
                    </td>
                    <td className="px-3 py-2">{stock.sector}</td>
                    <td className="px-3 py-2">{stock.volume_spike}</td>
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
                style={{ backgroundColor: getBackgroundColor(stock.chg_percentage) }}
                className="rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <StockCard
                  stock_name={stock.stock_name}
                  symbol={stock.symbol}
                  price={stock.price}
                  chg_percentage={stock.chg_percentage}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}