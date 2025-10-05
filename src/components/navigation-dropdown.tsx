'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDownIcon,
  GlobeAltIcon,
  TruckIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  BookOpenIcon,
  MapPinIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { useLocalAuth } from '@/hooks/use-local-auth'
import { useLanguage } from './providers/language-provider'
import LanguageSelector from './ui/language-selector'

interface DropdownItem {
  name: string
  href: string
  icon: any
  description?: string
}

export function NavigationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { data: session, signOut } = useLocalAuth()
  const { t } = useLanguage()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const mainNavigation: DropdownItem[] = [
    { name: t('nav.home'), href: '/', icon: HomeIcon, description: 'Dashboard' },
    { name: t('nav.agriculture'), href: '/agriculture', icon: GlobeAltIcon, description: 'Smart farming' },
    { name: t('nav.trade'), href: '/trade', icon: TruckIcon, description: 'Cross-border commerce' },
    { name: t('nav.culture'), href: '/culture', icon: LanguageIcon, description: 'Cultural preservation' },
    { name: t('nav.finance'), href: '/finance', icon: CurrencyDollarIcon, description: 'Financial inclusion' }
  ]

  const farmingNavigation: DropdownItem[] = [
    { name: 'Farming Tracker', href: '/farming/tracker', icon: GlobeAltIcon, description: 'Track your crops' },
    { name: 'Analytics', href: '/farming/analytics', icon: GlobeAltIcon, description: 'Farming insights' },
    { name: 'Notifications', href: '/farming/notifications', icon: GlobeAltIcon, description: 'Alerts & updates' }
  ]

  const aiNavigation: DropdownItem[] = [
    { name: t('nav.ai'), href: '/ai', icon: CpuChipIcon, description: 'AI overview' },
    { name: 'AI Chat', href: '/ai/chat', icon: CpuChipIcon, description: 'Chat with AI' }
  ]

  const learningNavigation: DropdownItem[] = [
    { name: 'Learning', href: '/learning', icon: BookOpenIcon, description: 'E-learning hub' },
    { name: 'Dashboard', href: '/learning/dashboard', icon: BookOpenIcon, description: 'Progress tracking' }
  ]

  const locationNavigation: DropdownItem[] = [
    { name: 'Location', href: '/location', icon: MapPinIcon, description: 'Set your location' }
  ]

  const allNavigation = [
    { title: 'Main', items: mainNavigation },
    { title: 'Farming', items: farmingNavigation },
    { title: 'AI', items: aiNavigation },
    { title: 'Learning', items: learningNavigation },
    { title: 'Location', items: locationNavigation }
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Main Navigation Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-5 h-5" />
            <span className="font-medium">Menu</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4">
                  {allNavigation.map((section, sectionIndex) => (
                    <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {section.items.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                {item.description && (
                                  <div className="text-sm text-gray-500">{item.description}</div>
                                )}
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Selector */}
        <LanguageSelector />

        {/* User Menu */}
        {session?.user ? (
          <div className="flex items-center space-x-3">
            <Link
              href="/ai/chat"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CpuChipIcon className="w-4 h-4" />
              <span className="font-medium">AI Chat</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-700">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{session.user.name}</div>
                <div className="text-gray-500">{session.user.country}</div>
              </div>
              <button
                onClick={signOut}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
            >
              <div className="p-4 space-y-4">
                {/* Mobile Navigation Items */}
                {allNavigation.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-500">{item.description}</div>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Mobile User Section */}
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSelector />
                  {session?.user ? (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-green-700">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{session.user.name}</div>
                          <div className="text-sm text-gray-500">{session.user.country}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <Link
                        href="/auth/signin"
                        className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
