const percentageRanges = [
    { value: -3, color: 'bg-red-700' },
    { value: -2, color: 'bg-red-500' },
    { value: -1, color: 'bg-red-300' },
    { value: 0, color: 'bg-gray-300' },
    { value: 1, color: 'bg-green-400' },
    { value: 2, color: 'bg-green-500' },
    { value: 3, color: 'bg-green-600' },
  ]
  
  export function HeatmapLegend() {
    return (
      <div className="flex items-center gap-1 mb-6">
        {percentageRanges.map((range, index) => (
          <div
            key={range.value}
            className={`px-2 py-1 rounded-sm ${range.color} text-white text-xs font-medium`}
          >
            {range.value}%
          </div>
        ))}
      </div>
    )
  }
  
  