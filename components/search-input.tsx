import { Input } from '@/components/ui/input'

export default function SearchInput() {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search for stocks, ETFs & more"
        className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full"
      />
    </div>
  )
}

