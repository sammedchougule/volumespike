'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SearchInput from './search-input'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed py-2 top-8 left-0 right-0 z-50 bg-[#0c0e14] border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between py-2">
          <Link href="/" className="text-xl font-bold text-white mr-4">
            VolumeSpike
          </Link>

          <div className="flex-grow max-w-md my-2 sm:my-0 order-3 sm:order-2 w-full sm:w-auto sm:mx-4">
            <SearchInput />
          </div>

          {/* Hamburger Menu Button (Visible on mobile and tablet) */}
          <button 
            className="sm:block md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Navigation Links (Hidden on mobile/tablet, show on larger screens or when menu is open) */}
          <div 
            className={`${
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } sm:max-h-screen sm:opacity-100 overflow-hidden transition-all duration-300 ease-in-out md:flex md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto mt-4 md:mt-0 order-4 md:order-3`}
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link href="/itrabuzz" className="text-white hover:text-gray-300">
                Itrabuzz
              </Link>
              <Link href="/sectors" className="text-white hover:text-gray-300">
                Sectors
              </Link>
              <Link href="/oasis" className="text-white hover:text-gray-300">
                Oasis
              </Link>
              <Link href="/screeners" className="text-white hover:text-gray-300">
                Screeners
              </Link>
              <Link href="/fno" className="text-white hover:text-gray-300">
                F&O
              </Link>
              <Link href="/portfolio" className="text-white hover:text-gray-300">
                Portfolio
              </Link>
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
