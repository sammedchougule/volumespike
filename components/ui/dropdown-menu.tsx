'use client';

import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

interface DropdownMenuContentProps {
  children: ReactNode;
}

interface DropdownMenuItemProps {
  onSelect: () => void;
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <Menu as="div" className="relative inline-block">{children}</Menu>;
}

export function DropdownMenuTrigger({ asChild = false, children }: DropdownMenuTriggerProps) {
  if (asChild) {
    return (
      <Menu.Button as={Fragment}>
        {children}
      </Menu.Button>
    );
  }

  return (
    <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md">
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Menu.Button>
  );
}

export function DropdownMenuContent({ children }: DropdownMenuContentProps) {
  return (
    <Menu.Items className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg focus:outline-none z-10">
      {children}
    </Menu.Items>
  );
}

export function DropdownMenuItem({ onSelect, children }: DropdownMenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onSelect}
          className={`w-full px-4 py-2 text-left text-sm ${
            active ? 'bg-gray-700 text-white' : 'text-gray-300'
          }`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
