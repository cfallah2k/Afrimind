'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TruckIcon,
  MapIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { TradeRoutes } from '@/components/trade/trade-routes'
import { CustomsRegulations } from '@/components/trade/customs-regulations'
import { DocumentationRequirements } from '@/components/trade/documentation-requirements'
import { BorderConditions } from '@/components/trade/border-conditions'
import { TariffCalculator } from '@/components/trade/tariff-calculator'
import { useLanguage } from '@/components/providers/language-provider'

export default function TradePage() {
  const { currentLanguage, setLanguage, currentCountry, setCountry, availableLanguages, availableCountries } = useLanguage()
  const [selectedOrigin, setSelectedOrigin] = useState('Lagos, Nigeria')
  const [selectedDestination, setSelectedDestination] = useState('Accra, Ghana')
  const [selectedCommodity, setSelectedCommodity] = useState('Agricultural Products')
  const [showOriginSelector, setShowOriginSelector] = useState(false)
  const [showDestinationSelector, setShowDestinationSelector] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TruckIcon className="w-6 h-6 lg:w-7 lg:h-7 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">Trade 🚛</h1>
              <p className="text-sm lg:text-base xl:text-lg text-gray-600">Cross-border commerce</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">

      {/* Route & Language Selection */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Select Trade Route & Language</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Origin Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From (Origin)</label>
            <button
              onClick={() => setShowOriginSelector(!showOriginSelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{selectedOrigin}</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showOriginSelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {[
                  { name: 'Lagos, Nigeria', flag: '🇳🇬' },
                  { name: 'Accra, Ghana', flag: '🇬🇭' },
                  { name: 'Monrovia, Liberia', flag: '🇱🇷' },
                  { name: 'Dakar, Senegal', flag: '🇸🇳' },
                  { name: 'Abidjan, Côte d\'Ivoire', flag: '🇨🇮' },
                  { name: 'Bamako, Mali', flag: '🇲🇱' },
                  { name: 'Ouagadougou, Burkina Faso', flag: '🇧🇫' },
                  { name: 'Niamey, Niger', flag: '🇳🇪' },
                  { name: 'Conakry, Guinea', flag: '🇬🇳' },
                  { name: 'Freetown, Sierra Leone', flag: '🇸🇱' }
                ].map((location) => (
                  <button
                    key={location.name}
                    onClick={() => {
                      setSelectedOrigin(location.name)
                      setShowOriginSelector(false)
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg">{location.flag}</span>
                    <span className="text-sm">{location.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To (Destination)</label>
            <button
              onClick={() => setShowDestinationSelector(!showDestinationSelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{selectedDestination}</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showDestinationSelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {[
                  { name: 'Lagos, Nigeria', flag: '🇳🇬' },
                  { name: 'Accra, Ghana', flag: '🇬🇭' },
                  { name: 'Monrovia, Liberia', flag: '🇱🇷' },
                  { name: 'Dakar, Senegal', flag: '🇸🇳' },
                  { name: 'Abidjan, Côte d\'Ivoire', flag: '🇨🇮' },
                  { name: 'Bamako, Mali', flag: '🇲🇱' },
                  { name: 'Ouagadougou, Burkina Faso', flag: '🇧🇫' },
                  { name: 'Niamey, Niger', flag: '🇳🇪' },
                  { name: 'Conakry, Guinea', flag: '🇬🇳' },
                  { name: 'Freetown, Sierra Leone', flag: '🇸🇱' }
                ].map((location) => (
                  <button
                    key={location.name}
                    onClick={() => {
                      setSelectedDestination(location.name)
                      setShowDestinationSelector(false)
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg">{location.flag}</span>
                    <span className="text-sm">{location.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <LanguageIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">English</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showLanguageSelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setShowLanguageSelector(false)
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Trade Routes */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <TradeRoutes 
              origin={selectedOrigin} 
              destination={selectedDestination}
              commodity={selectedCommodity}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Overview</h3>
              <div className="space-y-4">
                {[
                  { label: 'Distance', value: '450 km', icon: MapIcon, color: 'text-primary-600' },
                  { label: 'Duration', value: '8-12 hrs', icon: ClockIcon, color: 'text-warning-600' },
                  { label: 'Cost', value: '$200-400', icon: CurrencyDollarIcon, color: 'text-success-600' },
                  { label: 'Border Crossings', value: '1', icon: ExclamationTriangleIcon, color: 'text-danger-600' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-2">
                {[
                  'Commercial Invoice',
                  'Packing List',
                  'Certificate of Origin',
                  'Import Permit',
                  'Phytosanitary Certificate',
                ].map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <DocumentTextIcon className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <CustomsRegulations 
            origin={selectedOrigin} 
            destination={selectedDestination}
            commodity={selectedCommodity}
          />
          <DocumentationRequirements 
            commodity={selectedCommodity}
            value={10000}
          />
          <BorderConditions 
            borderCrossing="Seme Border"
            countryPair={`${selectedOrigin.split(',')[0]}-${selectedDestination.split(',')[0]}`}
          />
          <TariffCalculator 
            commodityCode="1001"
            origin={selectedOrigin}
            destination={selectedDestination}
            value={10000}
          />
        </motion.div>
      </div>
      </div>
    </div>
  )
}
