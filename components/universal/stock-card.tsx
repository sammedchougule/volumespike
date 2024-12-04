import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StockCardProps {
  name: string;
  symbol: string;
  price: number;
  chg_rs: number;
  chg_percentage: number;
}

const getRandomColor = (seed: string) => {
  const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 30%)`; // Darker color with 30% lightness
};

export function StockCard({ name, symbol, chg_rs, price, chg_percentage }: StockCardProps) {
  return (
    <Card className="bg-transparent shadow-none border-none h-full">
      <CardContent className="p-3 h-full flex flex-col justify-between">
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
            chg_rs >= 0 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {chg_rs >= 0 ? (
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
