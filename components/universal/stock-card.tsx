import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

const getRandomColor = (seed: string) => {
  const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 30%)`; // Darker color with 30% lightness
};

interface StockCardProps {
  name: string
  symbol: string
  price: number
  changePercent: number
}

export function StockCard({ 
  name, 
  symbol, 
  price, 
  change, 
  changePercent
}: StockCardProps) {
  return (
    <Card className="bg-white shadow-sm border-none h-[200px]">
      <CardContent className="p-4 h-full flex flex-col justify-between">
        {/* Symbol and Name Section */}
        <div>
          <div className="self-start inline-block px-3 py-1 rounded-md text-sm font-medium text-white mb-2" style={{ backgroundColor: getRandomColor(symbol) }}>
            {symbol}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">{name}</h3>
        </div>

        {/* Price and Change Section */}
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-2 truncate">
            {price >= 1000 ? 
              `₹${price.toLocaleString('en-IN')}` : 
              `₹${price.toFixed(2)}`
            }
          </p>
          <div className={`inline-flex items-center px-2 py-1 rounded-xl text-sm font-bold ${
            changePercent >= 0 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {changePercent >= 0 ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            <span className="truncate">
              {Math.abs(changePercent).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

