import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StockCardProps {
  name: string;
  symbol: string;
  price: number;
  chg_rs: number;
  chg_percentage: number;
}


export function StockCard({ name, symbol, price, chg_rs, chg_percentage }: StockCardProps) {
  return (
    <Card className="bg-transparent shadow-none border-none h-full">
      <CardContent className="p-3 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-md font-medium text-white truncate">{symbol}</h3>
          <p className="text-lg text-gray-300 truncate">{name}</p>
        </div>
        <div className="mt-2">
          <p className="text-md font-bold text-white">₹{price.toFixed(2)}</p>
          <p className={`text-base flex items-center justify-end ${chg_rs >= 0 ? "text-green-300" : "text-red-300"}`}>
            {chg_rs >= 0 ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {chg_percentage}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
