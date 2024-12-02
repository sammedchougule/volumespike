// StockPreviewModal.tsx
import { Dialog } from "@/components/ui/dialog" // Use the dialog from the new dialog.tsx
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { Stock } from '@/types/stock'
import { StockChart } from "./universal/stock-chart"

interface StockPreviewModalProps {
  stock: Stock | null
  isOpen: boolean
  onClose: () => void
}

export function StockPreviewModal({ stock, isOpen, onClose }: StockPreviewModalProps) {
  if (!stock) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <div className="flex justify-between items-start w-full">
            <Dialog.Title>{stock.stock_name}</Dialog.Title>
            <Dialog.Close onClick={onClose} />

             <Link href={`/stockdetail/${stock.symbol}`}>
              <Button size="icon" className="h-8 w-8 bg-gray-800 border hover:border-gray-400">
                <SquareArrowOutUpRight className="h-4 w-4" />
              </Button>
             </Link>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{stock.symbol}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">{stock.exchange}</span>
            </div>
          </div>
        </Dialog.Header>

        {/* Chart */}
        {/* <StockChart symbol={stock.symbol} /> */}

        <div className="space-y-4">
          {/* Price and Change */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">₹{stock.price.toFixed(2)}</span>
            <div className={`flex items-center ${(stock.chg_percentage) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {(stock.chg_percentage) >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs((stock.chg_percentage)).toFixed(2)}%</span>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <p className="text-sm text-gray-400">Day Range</p>
              <p className="text-sm">₹{stock.low} - ₹{stock.high}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">52W Range</p>
              <p className="text-sm">₹{stock.year_low} - ₹{stock.year_high}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Market Cap</p>
              <p className="text-sm">₹{stock.marketcap} Cr</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">P/E Ratio</p>
              <p className="text-sm">{stock.eps ? (stock.price / stock.eps).toFixed(2) : 'N/A' }</p>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <p className="text-sm text-gray-400 mb-1">About</p>
            <p className="text-sm">
              {stock.stock_name} is a {stock.industry} company listed on {stock.exchange}, operating in the {stock.sector} sector.
            </p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
