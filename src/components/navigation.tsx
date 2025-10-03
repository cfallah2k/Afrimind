'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon,
  GlobeAltIcon,
  SunIcon,
  TruckIcon,
  LanguageIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Agriculture', href: '/agriculture' },
    { name: 'Trade', href: '/trade' },
    { name: 'Culture', href: '/culture' },
    { name: 'Finance', href: '/finance' },
    { name: 'About', href: '/about' },
  ]

  const services = [
    {
      name: 'Agricultural Intelligence',
      href: '/agriculture',
      icon: SunIcon,
      description: 'AI-powered farming insights',
    },
    {
      name: 'Cross-Border Trade',
      href: '/trade',
      icon: TruckIcon,
      description: 'Streamlined logistics',
    },
    {
      name: 'Cultural Preservation',
      href: '/culture',
      icon: LanguageIcon,
      description: 'Language & culture AI',
    },
    {
      name: 'Financial Inclusion',
      href: '/finance',
      icon: CurrencyDollarIcon,
      description: 'Mobile money & banking',
    },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <GlobeAltIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Afri<span className="text-primary-600">Mind</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/demo"
              className="btn btn-primary btn-md"
            >
              Try Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Services Grid */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Our Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <service.icon className="w-5 h-5 text-primary-600 mb-2" />
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-xs text-gray-600">{service.description}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/demo"
                  className="btn btn-primary btn-md w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
