'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

interface Index {
  name: string
  value: string
  change: number
  changePercent: number
}

const indices: Index[] = [
  { name: 'NIFTY 50', value: '24,946.75', change: -57.80, changePercent: -0.23 },
  { name: 'SENSEX', value: '81,380.09', change: -231.31, changePercent: -0.28 },
  { name: 'Nifty Bank', value: '51,072.60', change: -458.30, changePercent: -0.89 },
  { name: 'Nifty IT', value: '42,195.30', change: 106.50, changePercent: 0.25 },
  { name: 'S&P BSE SmallCap', value: '56,497.93', change: 144.57, changePercent: 0.26 },
  { name: 'Nifty Midcap', value: '38,123.45', change: 78.20, changePercent: 0.21 },
  { name: 'Nifty Auto', value: '15,678.90', change: -34.15, changePercent: -0.22 },
  { name: 'Nifty Pharma', value: '12,345.67', change: 23.45, changePercent: 0.19 },
]

export default function Indices() {
  const [showAll, setShowAll] = useState(false)

  const displayedIndices = showAll ? indices : indices.slice(0, 4)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedIndices.map((index) => (
          <Card key={index.name} className="shadow-lg bg-gray-800">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-300">{index.name}</h3>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-white">{index.value}</p>
              <p className={`text-sm ${index.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {!showAll && indices.length > 4 && (
        <div className="text-center sm:hidden">
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 mx-auto"
          >
            See more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

