import { Stock } from '@/types/stock'

interface StockTileProps {
  stock: Stock
  size?: 'sm' | 'md' | 'lg'
}

export function StockTile({ stock, size = 'md' }: StockTileProps) {
  const getBackgroundColor = (changePercent: number) => {
    if (changePercent > 0) {
      return `rgba(34, 197, 94, ${Math.min(Math.abs(changePercent) / 3, 1)})`
    } else if (changePercent < 0) {
      return `rgba(239, 68, 68, ${Math.min(Math.abs(changePercent) / 3, 1)})`
    }
    return 'rgb(209, 213, 219)'
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-24 h-24'
      case 'lg':
        return 'w-48 h-48'
      default:
        return 'w-32 h-32'
    }
  }

  return (
    <div
      className={`${getSizeClasses()} p-3 rounded-lg transition-colors relative`}
      style={{ backgroundColor: getBackgroundColor(stock.chg_percentage) }}
    >
      <div className="h-full flex flex-col justify-between text-white">
        <div>
          <div className="font-bold text-lg">{stock.symbol}</div>
          {stock.logo && (
            <img
              src={stock.logo}
              alt={stock.name}
              className="w-8 h-8 rounded-full bg-white p-1"
            />
          )}
        </div>
        <div className="text-xl font-bold">
          {stock.chg_percentage >= 0 ? '+' : ''}
          {stock.chg_percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

