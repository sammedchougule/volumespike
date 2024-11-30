// 'use client'

// import { useState } from 'react'
// import useSWR from 'swr'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

// interface Stock {
//   symbol: string
//   name: string
//   price: number
//   change: number
// }

// const tabData = [
//   { id: 'gainers', label: 'Gainers', icon: '📈', color: 'bg-green-500' },
//   { id: 'losers', label: 'Losers', icon: '📉', color: 'bg-red-500' },
//   { id: 'most-active', label: 'Most Active', icon: '⚡', color: 'bg-yellow-500' },
//   { id: '52w-high', label: '52W High', icon: '🔝', color: 'bg-blue-500' },
//   { id: '52w-low', label: '52W Low', icon: '🔻', color: 'bg-purple-500' },
// ]

// const fetcher = async (url: string) => {
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`)
//   }
//   const data = await res.json()
//   if (!data.stocks || !Array.isArray(data.stocks)) {
//     throw new Error('Invalid data format')
//   }
//   return data
// }

// export default function TodayStocks() {
//   const [activeTab, setActiveTab] = useState('gainers')
//   const { data, error } = useSWR<{ stocks: Stock[] }>('/api/stocks', fetcher)

//   const filteredStocks = (() => {
//     if (!data) return []
//     switch (activeTab) {
//       case 'gainers':
//         return data.stocks
//           .filter((stock) => stock.change > 0)
//           .sort((a, b) => b.change - a.change)
//           .slice(0, 5) // Top 5 gainers
//       case 'losers':
//         return data.stocks
//           .filter((stock) => stock.change < 0)
//           .sort((a, b) => a.change - b.change)
//           .slice(0, 5) // Top 5 losers
//       case 'most-active':
//         return data.stocks
//           .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
//           .slice(0, 5) // Top 5 most active
//       case '52w-high':
//         return data.stocks
//           .filter((stock) => stock.price > 3000) // Mock logic
//           .slice(0, 5) // Top 5 by 52w-high
//       case '52w-low':
//         return data.stocks
//           .filter((stock) => stock.price < 100) // Mock logic
//           .slice(0, 5) // Top 5 by 52w-low
//       default:
//         return data.stocks.slice(0, 5) // Default fallback
//     }
//   })()

//   return (
//     <Card className="shadow-lg bg-gray-800">
//       <CardHeader className="flex flex-col space-y-4">
//         <CardTitle className="text-white">Today&apos;s Top</CardTitle>
//         <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
//           {tabData.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors
//                 ${activeTab === tab.id ? `${tab.color} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
//             >
//               <span>{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </CardHeader>

//       <CardContent>
//         {!data && !error ? (
//           <div className="space-y-4">
//             {[...Array(5)].map((_, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 {/* Placeholder for stock symbol */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
//                   <div>
//                     <p className="h-4 w-24 bg-gray-600 rounded animate-pulse"></p>
//                     <p className="h-3 w-16 bg-gray-700 rounded mt-1 animate-pulse"></p>
//                   </div>
//                 </div>
//                 {/* Placeholder for stock price and change */}
//                 <div className="text-right">
//                   <p className="h-4 w-20 bg-gray-600 rounded animate-pulse"></p>
//                   <p className="h-3 w-16 bg-gray-700 rounded mt-1 animate-pulse"></p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Failed to load stocks</div>
//         ) : (
//           <div className="space-y-4">
//             {filteredStocks.map((stock) => (
//               <div
//                 key={stock.symbol}
//                 className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 {/* Stock symbol and name */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
//                     {stock.symbol[0]}
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">{stock.name}</p>
//                     <p className="text-gray-400 text-sm">{stock.symbol}</p>
//                   </div>
//                 </div>
//                 {/* Stock price and change */}
//                 <div className="text-right">
//                   <p className="text-white font-medium">
//                     ₹{stock.price.toFixed(2)}
//                   </p>
//                   <p
//                     className={`text-sm flex items-center ${
//                       stock.change >= 0 ? 'text-green-500' : 'text-red-500'
//                     }`}
//                   >
//                     {stock.change >= 0 ? (
//                       <ArrowUpIcon className="mr-1" />
//                     ) : (
//                       <ArrowDownIcon className="mr-1" />
//                     )}
//                     {Math.abs(stock.change)}%
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>

//     </Card>
//   )
// }

"use client";

import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface Stock {
  symbol: string;
  logo?: string;
  stock_name: string;
  price: number;
  chg_percentage: number;
  chg_rs: number;
  year_high: number;
  year_low: number;
}

const tabData = [
  { id: 'gainers', label: 'Gainers', icon: '📈', color: 'bg-green-500' },
  { id: 'losers', label: 'Losers', icon: '📉', color: 'bg-red-500' },
  { id: 'most-active', label: 'Most Active', icon: '⚡', color: 'bg-yellow-500' },
  { id: '52w-high', label: '52W High', icon: '🔝', color: 'bg-blue-500' },
  { id: '52w-low', label: '52W Low', icon: '🔻', color: 'bg-purple-500' },
];

const fetcher = async (url: string): Promise<{ stocks: Stock[] }> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid data format');
  return { stocks: data };
};

export default function TodayStocks() {
  const [activeTab, setActiveTab] = useState('gainers');
  const { data, error } = useSWR<{ stocks: Stock[] }>('/api/stocks', fetcher, {
    refreshInterval: 5000, // 5 seconds
  });
  const prevData = useRef<{ stocks: Stock[] } | null>(null);

  // Track which stocks have changed
  const changedStocks = new Set<string>();
  if (data && prevData.current) {
    data.stocks.forEach((stock, index) => {
      const prevStock = prevData.current?.stocks[index];
      if (prevStock && (stock.price !== prevStock.price || stock.chg_percentage !== prevStock.chg_percentage)) {
        changedStocks.add(stock.symbol);
      }
    });
  }

  useEffect(() => {
    if (data) {
      prevData.current = data; // Update the previous data
    }
  }, [data]);

  const filteredStocks = (() => {
    if (!data) return [];
    switch (activeTab) {
      case 'gainers':
        return data.stocks
          .filter((stock) => stock.chg_percentage > 0)
          .sort((a, b) => b.chg_percentage - a.chg_percentage)
          .slice(0, 50);
      case 'losers':
        return data.stocks
          .filter((stock) => stock.chg_percentage < 0)
          .sort((a, b) => a.chg_percentage - b.chg_percentage)
          .slice(0, 50);
      case 'most-active':
        return data.stocks
          .sort((a, b) => Math.abs(b.chg_percentage) - Math.abs(a.chg_percentage))
          .slice(0, 50);
      case '52w-high':
        return data.stocks
          .filter((stock) => stock.price >= stock.year_high)
          .slice(0, 50);
      case '52w-low':
        return data.stocks
          .filter((stock) => stock.price <= stock.year_low)
          .slice(0, 50);
      default:
        return data.stocks.slice(0, 5);
    }
  })();

  return (
    <Card className="shadow-lg bg-gray-800">
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
      <CardContent>
        {error ? (
          <div className="text-red-500">Failed to load stocks</div>
        ) : !data ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className={`flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors`}
              >
                <div className="flex items-center gap-3">
                  {stock.logo && stock.logo !== '0' ? (
                    <img src={stock.logo} alt={`${stock.stock_name} logo`} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">{stock.symbol[0]}</div>
                  )}
                  <div>
                    <p className="text-white font-medium">{stock.stock_name}</p>
                    <p className="text-gray-400 text-sm">{stock.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-white font-medium ${ changedStocks.has(stock.symbol) ? 'animate-blink' : ''
                  }`}>₹{stock.price.toFixed(2)}</p>
                  <p className={`text-sm flex items-center  ${stock.chg_percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.chg_percentage >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                    {Math.abs(stock.chg_percentage)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

