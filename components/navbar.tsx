'use client'

import Link from 'next/link'
import SearchInput from './search-input'
import { User, Home, SquareActivity, Layers,  Sliders, LayoutGrid } from 'lucide-react'
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname(); // Get the current route

  // Utility to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (

    <>
      {/* Top Navbar */}
      <nav className="fixed py-2 top-8 left-0 right-0 z-50 bg-[#0c0e14] border-b border-gray-800">
        <div className="container mx-auto px-6 flex justify-between items-center">

          <Link href="/" className="text-xl font-bold text-white mr-4 hidden lg:block">
            VolumeSpike
          </Link>

          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <SearchInput />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex space-x-6 ml-4">
            <Link href="../intrabuzz/" className="text-white hover:text-gray-300 flex items-center">
              <SquareActivity className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">IntraBuzz</span>
            </Link>
            <Link href="/heatmap" className="text-white hover:text-gray-300 flex items-center">
              <LayoutGrid className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Heatmap</span>
            </Link>
            <Link href="/sectors" className="text-white hover:text-gray-300 flex items-center">
              <Layers className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm">Sectors</span>
            </Link>
            <Link href="/screeners" className="text-white hover:text-gray-300 flex items-center">
              <Sliders className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm">Screeners</span>
            </Link>
            <Link href="/portfolio" className="text-white hover:text-gray-300 flex items-center">
              <User className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm">Portfolio</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Tab Bar for Mobile */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl sm:hidden">
        <div className="flex justify-around items-center py-2">
          <Link
            href="/"
            className={`text-white flex flex-col items-center ${
              isActive('/') ? 'bg-[#181D23] rounded-2xl px-2 py-1' : ''
            }`}
          >
            <Home className={`h-6 w-6 ${isActive('/') ? 'text-blue-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/') ? 'block' : 'hidden'}`}>Home</span>
          </Link>
          <Link
            href="/intrabuzz"
            className={`text-white flex flex-col items-center ${
              isActive('/intrabuzz') ? 'bg-gray-900 rounded-2xl px-2 py-1' : ''
            }`}
          >
            <SquareActivity className={`h-6 w-6 ${isActive('/intrabuzz') ? 'text-blue-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/intrabuzz') ? 'block' : 'hidden'}`}>IntraBuzz</span>
          </Link>
          <Link
            href="/heatmap"
            className={`text-white flex flex-col items-center ${
              isActive('/heatmap') ? 'bg-[#181D23] rounded-2xl px-2 py-1' : ''
            }`}
          >
            <LayoutGrid className={`h-6 w-6 ${isActive('/heatmap') ? 'text-green-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/heatmap') ? 'block' : 'hidden'}`}>Heatmap</span>
          </Link>
          <Link
            href="/sectors"
            className={`text-white flex flex-col items-center ${
              isActive('/sectors') ? 'bg-[#181D23] rounded-2xl px-2 py-1' : ''
            }`}
          >
            <Layers className={`h-6 w-6 ${isActive('/sectors') ? 'text-yellow-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/sectors') ? 'block' : 'hidden'}`}>Sectors</span>
          </Link>
          <Link
            href="/screeners"
            className={`text-white flex flex-col items-center ${
              isActive('/screeners') ? 'bg-[#181D23] rounded-2xl px-2 py-1' : ''
            }`}
          >
            <Sliders className={`h-6 w-6 ${isActive('/screeners') ? 'text-red-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/screeners') ? 'block' : 'hidden'}`}>Screener</span>
          </Link>
          <Link
            href="/portfolio"
            className={`text-white flex flex-col items-center ${
              isActive('/portfolio') ? 'bg-[#181D23] rounded-2xl px-2 py-1' : ''
            }`}
          >
            <User className={`h-6 w-6 ${isActive('/portfolio') ? 'text-purple-500' : 'text-white'}`} />
            <span className={`text-xxs text-gray-300 ${isActive('/portfolio') ? 'block' : 'hidden'}`}>Portfolio</span>
          </Link>
        </div>
      </nav>

    </>

    
  )
};


