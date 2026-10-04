'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRestaurantConfig } from '@/lib/restaurant-config-context';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { config } = useRestaurantConfig();

  const isRestaurantOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();

    if (day === 0 || day === 6) {
      return hours >= 12 && hours < 24;
    }
    return hours >= 11 && hours < 23;
  };

  const open = isRestaurantOpen();

  return (
    <nav className="bg-black text-gray-100 py-4 border-b border-gray-800">
      <div className="container-safe flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-gray-100">
              {config.name}
            </Link>
            <span className="text-sm text-gray-400">
              {config.slogan}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${open ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{open ? 'Abierto' : 'Cerrado'}</span>
            </div>
            <div className="text-gray-400">
              {config.hoursMonFri} | {config.hoursSatSun}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && (
            <Link href="/dashboard" className="text-sm px-3 py-1 rounded text-gray-100 hover:bg-gray-900 transition-colors">
              Panel
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <div className={`w-6 h-0.5 bg-gray-100 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-100 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-100 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-800 mt-4 pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm px-4">
            <span className={`w-2 h-2 rounded-full ${open ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{open ? 'Abierto' : 'Cerrado'}</span>
          </div>
          <div className="text-xs text-gray-400 px-4">
            <p>{config.hoursMonFri}</p>
            <p>{config.hoursSatSun}</p>
          </div>
          {isAuthenticated && (
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-900">
              Panel
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
