'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  GlobeAltIcon,
  TruckIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  BookOpenIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeIconSolid,
  GlobeAltIcon as GlobeAltIconSolid,
  TruckIcon as TruckIconSolid,
  LanguageIcon as LanguageIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  CpuChipIcon as CpuChipIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  MapPinIcon as MapPinIconSolid
} from '@heroicons/react/24/solid'

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
      color: 'blue'
    },
    { 
      name: 'Agriculture', 
      href: '/agriculture', 
      icon: GlobeAltIcon, 
      iconSolid: GlobeAltIconSolid,
      color: 'green'
    },
    { 
      name: 'AI', 
      href: '/ai', 
      icon: CpuChipIcon, 
      iconSolid: CpuChipIconSolid,
      color: 'indigo'
    },
    { 
      name: 'Learning', 
      href: '/learning', 
      icon: BookOpenIcon, 
      iconSolid: BookOpenIconSolid,
      color: 'pink'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="grid grid-cols-4 gap-1 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = isActive ? item.iconSolid : item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive 
                  ? `text-${item.color}-600` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
