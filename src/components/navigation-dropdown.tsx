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
  HomeIcon,
  UserIcon,
  UserGroupIcon
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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { data: session, signOut } = useLocalAuth()
  const { t } = useLanguage()

  // Close dropdown when clicking outside or mouse leaves
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)
      const isOutsideMobileMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(target)
      
      if (isOutsideDropdown) {
        setIsOpen(false)
      }
      if (isOutsideMobileMenu) {
        setIsMobileMenuOpen(false)
      }
    }

    function handleTouchStart(event: TouchEvent) {
      const target = event.target as Node
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)
      const isOutsideMobileMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(target)
      
      if (isOutsideDropdown) {
        setIsOpen(false)
      }
      if (isOutsideMobileMenu) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleTouchStart)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isMobileMenuOpen])

  const mainNavigation: DropdownItem[] = [
    { name: t('nav.home'), href: '/', icon: HomeIcon, description: 'Dashboard' },
    { name: t('nav.agriculture'), href: '/agriculture', icon: GlobeAltIcon, description: 'Smart farming' },
    { name: 'Market Prices', href: '/market-prices', icon: CurrencyDollarIcon, description: 'Crop prices & currency' },
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

  const userNavigation: DropdownItem[] = [
    { name: 'Profile', href: '/profile', icon: UserIcon, description: 'Manage your profile' },
    { name: 'Farmer Network', href: '/farmer-network', icon: UserGroupIcon, description: 'Connect with farmers' },
    { name: 'AI Chat', href: '/ai/chat', icon: CpuChipIcon, description: 'Chat with AI' }
  ]

  const allNavigation = [
    { title: 'Main', items: mainNavigation },
    { title: 'Farming', items: farmingNavigation },
    { title: 'AI', items: aiNavigation },
    { title: 'Learning', items: learningNavigation },
    { title: 'Location', items: locationNavigation },
    ...(session?.user ? [{ title: 'Account', items: userNavigation }] : [])
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Main Navigation Dropdown */}
        <div 
          className="relative" 
          ref={dropdownRef}
          onMouseLeave={() => setIsOpen(false)}
        >
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
                className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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
                  
                  {/* Sign Out Button for Desktop */}
                  {session?.user && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          signOut()
                          setIsOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
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
      <div className="lg:hidden" ref={mobileMenuRef}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
              <motion.div
                id="mobile-nav-panel"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0 right-0 mt-16 bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="p-5 space-y-6">
                  {/* Mobile Navigation Items */}
                  {allNavigation.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center space-x-3 p-3.5 rounded-xl transition-colors text-[15px] ${
                                isActive
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                              <div>
                                <div className="font-medium leading-tight">{item.name}</div>
                                {item.description && (<div className="text-xs text-gray-500">{item.description}</div>)}
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Mobile User Section */}
                  <div className="pt-5 border-t border-gray-200">
                    <LanguageSelector />
                    {session?.user ? (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center space-x-3 p-3.5 bg-gray-50 rounded-xl">
                          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-green-700 leading-none">
                              {session.user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 leading-tight">{session.user.name}</div>
                            <div className="text-xs text-gray-500">{session.user.country}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            signOut()
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors text-[15px]"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-2">
                        <Link
                          href="/auth/signin"
                          className="block w-full text-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-colors text-[15px]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="block w-full text-center px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-[15px]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
