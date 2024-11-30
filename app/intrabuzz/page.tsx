"use client";
import Link from 'next/link'

export default function ItrabuzzPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white">Itrabuzz</h1>
        <p className="mt-4 text-gray-300">Latest market buzz and trending stories.</p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Featured Indices</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/intrabuzz/nifty50" className="text-blue-400 hover:text-blue-300">
                Nifty 50 Stocks
              </Link>
            </li>
            <li>
              <Link href="/heatmap" className="text-blue-400 hover:text-blue-300">
                Stock Heatmap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
