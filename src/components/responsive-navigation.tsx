'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HomeIcon,
  GlobeAltIcon,
  TruckIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  BookOpenIcon,
  MapPinIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from './providers/language-provider'
import LanguageSelector from './ui/language-selector'

export function ResponsiveNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/', icon: HomeIcon },
    { name: t('nav.agriculture'), href: '/agriculture', icon: GlobeAltIcon },
    { name: 'Farming Tracker', href: '/farming/tracker', icon: GlobeAltIcon },
    { name: t('nav.trade'), href: '/trade', icon: TruckIcon },
    { name: t('nav.culture'), href: '/culture', icon: LanguageIcon },
    { name: t('nav.finance'), href: '/finance', icon: CurrencyDollarIcon },
    { name: t('nav.ai'), href: '/ai', icon: CpuChipIcon },
    { name: 'Learning', href: '/learning', icon: BookOpenIcon },
    { name: 'Location', href: '/location', icon: MapPinIcon }
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Afri<span className="text-green-600">Mind</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              {navigation.slice(0, 6).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Auth */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              {session ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/ai/chat"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <CpuChipIcon className="w-4 h-4" />
                    <span>AI Chat</span>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{session.user?.name}</span>
                    <button
                      onClick={() => signOut()}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {t('nav.auth.signout')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {t('nav.auth.signin')}
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    {t('nav.auth.signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Afri<span className="text-green-600">Mind</span>
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
                
                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200">
                  {session ? (
                    <div className="space-y-3">
                      <Link
                        href="/ai/chat"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <CpuChipIcon className="w-5 h-5" />
                        <span className="font-medium">AI Chat</span>
                      </Link>
                      <div className="flex items-center space-x-3 p-3">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">{session.user?.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          signOut()
                          setIsOpen(false)
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-red-600"
                      >
                        {t('nav.auth.signout')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth/signin"
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('nav.auth.signin')}
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('nav.auth.signup')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
