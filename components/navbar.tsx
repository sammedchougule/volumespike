'use client'

import Link from 'next/link'
import SearchInput from './search-input'
import { User, Home, Search, BarChart2, Layers, FileText } from 'lucide-react'
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
              <Search className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">IntraBuzz</span>
            </Link>
            <Link href="/heatmap" className="text-white hover:text-gray-300 flex items-center">
              <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Heatmap</span>
            </Link>
            <Link href="/sectors" className="text-white hover:text-gray-300 flex items-center">
              <Layers className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm">Sectors</span>
            </Link>
            <Link href="/screeners" className="text-white hover:text-gray-300 flex items-center">
              <FileText className="h-5 w-5 text-red-500 mr-2" />
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

      {/* <nav className="fixed bottom-4 left-4 right-4 z-50 bg-gray-800 border border-gray-700 shadow-2xl rounded-full sm:hidden">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="text-white hover:text-gray-300 flex flex-col items-center">
            <Home className="h-7 w-7 text-white-500" />
            <span className="text-xxs text-gray-300">IntraBuzz</span>
          </Link>
          <Link href="../intrabuzz/" className="text-white hover:text-gray-300 flex flex-col items-center">
            <Search className="h-7 w-7 text-blue-500" />
            <span className="text-xxs text-gray-300">IntraBuzz</span>
          </Link>
          <Link href="/heatmap" className="text-white hover:text-gray-300 flex flex-col items-center">
            <BarChart2 className="h-7 w-7 text-green-500" />
            <span className="text-xxs text-gray-300">Heatmap</span>
          </Link>
          <Link href="/sectors" className="text-white hover:text-gray-300 flex flex-col items-center">
            <Layers className="h-7 w-7 text-yellow-500" />
            <span className="text-xxs text-gray-300">Sectors</span>
          </Link>
          <Link href="/screeners" className="text-white hover:text-gray-300 flex flex-col items-center">
            <FileText className="h-7 w-7 text-red-500" />
            <span className="text-xxs text-gray-300">Screeners</span>
          </Link>
          <Link href="/portfolio" className="text-white hover:text-gray-300 flex flex-col items-center">
            <User className="h-7 w-7 text-purple-500" />
            <span className="text-xxs text-gray-300">Portfolio</span>
          </Link>
        </div>
      </nav> */}

<nav className="fixed bottom-4 left-4 right-4 z-50 bg-gray-800 border border-gray-700 shadow-2xl rounded-full sm:hidden">
      <div className="flex justify-around items-center py-2">
        <Link
          href="/"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('/') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <Home className="h-7 w-7 text-white-500" />
          <span className="text-xxs text-gray-300">Home</span>
        </Link>
        <Link
          href="../intrabuzz/"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('../intrabuzz/') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <Search className="h-7 w-7 text-blue-500" />
          <span className="text-xxs text-gray-300">IntraBuzz</span>
        </Link>
        <Link
          href="/heatmap"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('/heatmap') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <BarChart2 className="h-7 w-7 text-green-500" />
          <span className="text-xxs text-gray-300">Heatmap</span>
        </Link>
        <Link
          href="/sectors"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('/sectors') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <Layers className="h-7 w-7 text-yellow-500" />
          <span className="text-xxs text-gray-300">Sectors</span>
        </Link>
        <Link
          href="/screeners"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('/screeners') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <FileText className="h-7 w-7 text-red-500" />
          <span className="text-xxs text-gray-300">Screeners</span>
        </Link>
        <Link
          href="/portfolio"
          className={`flex flex-col items-center p-3 rounded-full ${
            isActive('/portfolio') ? 'bg-[#181D23]' : ''
          } text-white hover:text-gray-300`}
        >
          <User className="h-7 w-7 text-purple-500" />
          <span className="text-xxs text-gray-300">Portfolio</span>
        </Link>
      </div>
    </nav>

    </>

    
  )
};


