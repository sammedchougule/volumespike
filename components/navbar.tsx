import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

// Button Component Definition inside the same file
const Button: React.FC<{
  variant?: 'ghost' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'icon';
  className?: string;
  children: React.ReactNode;
}> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-0 right-0 z-40  border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between h-auto py-4">
          <Link href="/" className="text-xl font-bold text-white mr-4">
            VolumeSpike
          </Link>

          <div className="flex-grow max-w-md my-2 sm:my-0 order-3 sm:order-2 w-full sm:w-auto sm:mx-4">
            <input
              type="search"
              placeholder="Search for stocks..."
              className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full rounded-lg px-3 py-2"
            />
          </div>

          <button className="sm:hidden text-white" aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div className="hidden sm:flex flex-wrap items-center space-x-6 order-2 sm:order-3">
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
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
