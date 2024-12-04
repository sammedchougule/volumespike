import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StockCardProps {
  name: string;
  symbol: string;
  price: number;
  chg_rs: number;
  chg_percentage: number;
}


export function StockCard({ name, symbol, chg_rs, price, chg_percentage }: StockCardProps) {
  return (
    <Card className="bg-transparent shadow-none border-none h-full">
      <CardContent className="p-3 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-md font-medium text-white truncate">{symbol}</h3>
          <p className="text-lg text-gray-300 truncate">{name}</p>
        </div>
        <div className="mt-2">
          <p className="text-md font-bold text-white">₹{price.toFixed(2)}</p>
          <p className={`inline-flex items-center px-2 py-1 rounded-xl text-sm font-bold ${
            chg_rs >= 0 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {chg_rs >= 0 ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {chg_percentage}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
