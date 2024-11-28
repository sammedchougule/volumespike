import Indices from '@/components/indices'
import TodayStocks from '@/components/today-stocks'
import TodayNewsEvents from '@/components/today-news-events'

export default function Home() {
  return (
    <main className="min-h-screen ">  {/* bg-[#0c0e14] */}
      <div className="container mx-auto px-4 py-8">
        <Indices />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TodayStocks />
          <TodayNewsEvents />
        </div>
      </div>
    </main>
  )
}

