import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface StockCardProps {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function StockCard({ name, symbol, price, change, changePercent }: StockCardProps) {
  return (
    <Card className="bg-transparent shadow-none border-none h-full">
      <CardContent className="p-3 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-white truncate">{symbol}</h3>
          <p className="text-base text-gray-300 truncate">{name}</p>
        </div>
        <div className="mt-2">
          <p className="text-lg font-bold text-white">₹{price.toFixed(2)}</p>
          <p className={`text-base flex items-center justify-end ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {change >= 0 ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
            {Math.abs(changePercent).toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
