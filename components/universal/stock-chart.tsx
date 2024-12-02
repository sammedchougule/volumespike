'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface StockChartProps {
  symbol: string
  timeRanges?: string[]
}

const defaultTimeRanges = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX']

export function StockChart({ symbol, timeRanges = defaultTimeRanges }: StockChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0])

  return (
    <div className="space-y-6">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg h-[300px]"></div>
      <div className="flex gap-2 overflow-x-auto">
        {timeRanges.map((range) => (
          <Button
            key={range}
            variant="outline"
            className={`border-gray-800 ${
              selectedRange === range 
              ? 'bg-gray-800 border-gray-400 text-white' 
              : 'text-gray-500 hover:bg-gray-900 hover:border-gray-400'
          }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>
    </div>
  )
}

