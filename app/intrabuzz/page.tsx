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

export default function Nifty50Page() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [activeFilter, setActiveFilter] = useState<"all" | "long" | "short">("all")
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [isTableView, setIsTableView] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sectors, setSectors] = useState<string[]>([])

  const [activeSector, setActiveSector] = useState<boolean>(false)
  const [activeSort, setActiveSort] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<boolean>(false)
  const [volumeSpikeOrder, setVolumeSpikeOrder] = useState<"asc" | "desc" | null>(null);

  
  useEffect(() => {
    // Sample sectors, replace with actual data
    setSectors(["All", "Technology", "Finance", "Healthcare", "Energy"])
  }, [])

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector);
    setActiveSector(true); // Activate when a sector is selected, not when button is clicked
    setActiveSort(false);
    setActiveView(false);
  };
  

  const handleSortSelect = (sort: string) => {
    setSortBy(sort);
    setActiveSort(true); // Activate when sorting option is selected
    setActiveSector(false);
    setActiveView(false);
  };
  

  const toggleView = () => {
    setIsTableView(!isTableView)
    setActiveView(!activeView)
    setActiveSector(false)
    setActiveSort(false)
  }

  const toggleVolumeSpikeOrder = () => {
    setVolumeSpikeOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setActiveSector(false);
    setActiveSort(false);
    setActiveView(false);
  };
  
  
  
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
  }, [selectedSector, sortBy, activeFilter])

  const filterAndSortStocks = () => {
    let result = [...stocks]

    if (selectedSector && selectedSector !== "All") {
      result = result.filter((stock) => stock.sector === selectedSector)
    }

    if (activeFilter === "long") {
      result = result.filter((stock) => stock.chg_percentage > 0)
    } else if (activeFilter === "short") {
      result = result.filter((stock) => stock.chg_percentage < 0)
    }

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
        result.sort((a, b) => parseFloat(b.volume_spike) - parseFloat(a.volume_spike))
        break
    }

    setFilteredStocks(result)
  }

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


  if (loading) return <div className="text-white text-center py-8">Loading stocks...</div>
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Nifty 50 Stocks</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter by Sector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${activeSector ? "bg-gray-700 text-white border border-gray-200" : "bg-gray-900 text-gray-200 border border-gray-700"}`}
            >
              Sector <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sectors.map((sector) => (
              <DropdownMenuItem key={sector} onSelect={() => handleSectorSelect(sector)}>
                {sector}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort by Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${activeSort ? "bg-gray-700 text-white border border-gray-200" : "bg-gray-900 text-gray-200 border border-gray-700"}`}
            >
              Sort <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleSortSelect("alphabetical")}>
              Alphabetical
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortSelect("percentageInc")}>
              % Change (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortSelect("percentageDec")}>
              % Change (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortSelect("volumeSpike")}>
              Volume Spike
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle View Button */}
        <Button
          variant="outline"
          className={`${activeView ? "bg-gray-700 text-white border border-gray-200" : "bg-gray-900 text-gray-200 border border-gray-700"}`}
          onClick={toggleView}
        >
          {isTableView ? <LayoutGrid className="h-4 w-4" /> : <Table className="h-4 w-4" />}
        </Button>

        {/* Volume Spike Order Button */}
        <Button
          variant="outline"
          onClick={toggleVolumeSpikeOrder}
          className={`${
            volumeSpikeOrder === "asc" ? "bg-gray-700 text-white" : 
            volumeSpikeOrder === "desc" ? "bg-gray-900 text-gray-200" : "bg-gray-800 text-gray-400"
          } border border-gray-700`}
        >
          <Flame className="h-4 w-4" />
        </Button>

      </div>


      {isTableView ? (
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th className="px-3 py-2">Symbol</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Change %</th>
                <th className="px-3 py-2">Volume Spike</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="border-b border-gray-700">
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{stock.symbol}</td>
                  <td className="px-3 py-2">{stock.stock_name}</td>
                  <td className="px-3 py-2">₹{stock.price.toFixed(2)}</td>
                  <td
                    className={`px-3 py-2 ${
                      stock.chg_percentage >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.chg_percentage}%
                  </td>
                  <td className="px-3 py-2">{stock.volume_spike}</td>
                </tr>
              ))}
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
                className="rounded-lg transition-colors">
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


