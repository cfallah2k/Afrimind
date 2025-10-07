'use client'

import { useState, useEffect, useRef } from 'react'
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
  LanguageIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  ChartBarIcon,
  EyeIcon,
  ShareIcon,
  ArrowDownTrayIcon as DownloadIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  LightBulbIcon,
  StarIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  Bars3Icon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  HandThumbUpIcon as ThumbUpIcon,
  HandThumbDownIcon as ThumbDownIcon,
  BookmarkIcon,
  FlagIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  CheckBadgeIcon,
  CurrencyEuroIcon,
  BanknotesIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  TruckIcon as TransportIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  SunIcon,
  CloudIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { TradeRoutes } from '@/components/trade/trade-routes'
import { CustomsRegulations } from '@/components/trade/customs-regulations'
import { DocumentationRequirements } from '@/components/trade/documentation-requirements'
import { BorderConditions } from '@/components/trade/border-conditions'
import { TariffCalculator } from '@/components/trade/tariff-calculator'
import { useLanguage } from '@/components/providers/language-provider'

export default function TradePage() {
  const { currentLanguage, setLanguage, currentCountry, setCountry, availableLanguages, availableCountries } = useLanguage()
  const [selectedOrigin, setSelectedOrigin] = useState('Monrovia, Liberia')
  const [selectedDestination, setSelectedDestination] = useState('Lagos, Nigeria')
  const [selectedCommodity, setSelectedCommodity] = useState('Agricultural Products')
  const [showOriginSelector, setShowOriginSelector] = useState(false)
  const [showDestinationSelector, setShowDestinationSelector] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  
  // Advanced state management
  const [viewMode, setViewMode] = useState<'overview' | 'routes' | 'analysis' | 'documents'>('overview')
  const [showFilters, setShowFilters] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [realTimeData, setRealTimeData] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [tradeValue, setTradeValue] = useState(10000)
  
  const chartRef = useRef<HTMLDivElement>(null)

  // Enhanced trade data
  const [tradeData] = useState({
    routes: [
      {
        id: 1,
        name: 'Monrovia-Lagos Route',
        origin: 'Monrovia, Liberia',
        destination: 'Lagos, Nigeria',
        distance: 1200,
        duration: '18-24 hours',
        cost: 350,
        currency: 'USD',
        status: 'active',
        efficiency: 90,
        popularity: 88,
        risk: 'low',
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: 2,
        name: 'Monrovia-Accra Route',
        origin: 'Monrovia, Liberia',
        destination: 'Accra, Ghana',
        distance: 800,
        duration: '12-16 hours',
        cost: 250,
        currency: 'USD',
        status: 'active',
        efficiency: 92,
        popularity: 85,
        risk: 'low',
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 3,
        name: 'Monrovia-Abidjan Route',
        origin: 'Monrovia, Liberia',
        destination: 'Abidjan, Côte d\'Ivoire',
        distance: 600,
        duration: '8-12 hours',
        cost: 180,
        currency: 'USD',
        status: 'active',
        efficiency: 88,
        popularity: 82,
        risk: 'low',
        lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: 4,
        name: 'Monrovia-Conakry Route',
        origin: 'Monrovia, Liberia',
        destination: 'Conakry, Guinea',
        distance: 300,
        duration: '4-6 hours',
        cost: 100,
        currency: 'USD',
        status: 'active',
        efficiency: 95,
        popularity: 75,
        risk: 'low',
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 5,
        name: 'Monrovia-Freetown Route',
        origin: 'Monrovia, Liberia',
        destination: 'Freetown, Sierra Leone',
        distance: 200,
        duration: '3-5 hours',
        cost: 80,
        currency: 'USD',
        status: 'active',
        efficiency: 96,
        popularity: 78,
        risk: 'low',
        lastUpdated: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 6,
        name: 'Monrovia-Dakar Route',
        origin: 'Monrovia, Liberia',
        destination: 'Dakar, Senegal',
        distance: 1500,
        duration: '24-30 hours',
        cost: 450,
        currency: 'USD',
        status: 'active',
        efficiency: 82,
        popularity: 68,
        risk: 'medium',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ],
    marketTrends: [
      { commodity: 'Rice', price: 450, change: 5.2, trend: 'up', volume: 1200, country: 'Liberia' },
      { commodity: 'Maize', price: 380, change: -2.1, trend: 'down', volume: 800, country: 'Liberia' },
      { commodity: 'Cassava', price: 120, change: 8.5, trend: 'up', volume: 1500, country: 'Liberia' },
      { commodity: 'Tomato', price: 320, change: 12.3, trend: 'up', volume: 600, country: 'Liberia' },
      { commodity: 'Cocoa', price: 2800, change: 3.8, trend: 'up', volume: 400, country: 'Liberia' },
      { commodity: 'Coffee', price: 1800, change: -1.5, trend: 'down', volume: 300, country: 'Liberia' },
      { commodity: 'Palm Oil', price: 650, change: 7.2, trend: 'up', volume: 800, country: 'Liberia' },
      { commodity: 'Groundnut', price: 280, change: 4.1, trend: 'up', volume: 500, country: 'Liberia' }
    ],
    borderConditions: [
      {
        border: 'Ganta Border',
        countries: 'Liberia-Ivory Coast',
        status: 'normal',
        waitTime: '1-3 hours',
        efficiency: 88,
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        border: 'Bo Waterside Border',
        countries: 'Liberia-Sierra Leone',
        status: 'normal',
        waitTime: '1-2 hours',
        efficiency: 92,
        lastUpdate: new Date(Date.now() - 20 * 60 * 1000)
      },
      {
        border: 'Seme Border',
        countries: 'Nigeria-Benin',
        status: 'normal',
        waitTime: '2-4 hours',
        efficiency: 85,
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        border: 'Aflao Border',
        countries: 'Ghana-Togo',
        status: 'busy',
        waitTime: '4-6 hours',
        efficiency: 72,
        lastUpdate: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        border: 'Rosso Border',
        countries: 'Senegal-Mauritania',
        status: 'normal',
        waitTime: '3-5 hours',
        efficiency: 78,
        lastUpdate: new Date(Date.now() - 25 * 60 * 1000)
      }
    ]
  })

  const periods = [
    { id: '24hours', name: '24 Hours', hours: 24 },
    { id: '7days', name: '7 Days', hours: 168 },
    { id: '30days', name: '30 Days', hours: 720 },
    { id: '90days', name: '90 Days', hours: 2160 }
  ]

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
    { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' }
  ]

  const viewModes = [
    { id: 'overview', name: 'Overview', icon: Squares2X2Icon },
    { id: 'routes', name: 'Routes', icon: MapIcon },
    { id: 'analysis', name: 'Analysis', icon: ChartBarIcon },
    { id: 'documents', name: 'Documents', icon: DocumentTextIcon }
  ]

  // Real-time data simulation
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        console.log('Updating trade data...')
      }, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [realTimeData])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleExport = (format: string) => {
    console.log(`Exporting trade data as ${format}`)
    setShowExport(false)
  }

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
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3 subheader">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TruckIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="subheader-title">Trade Intelligence</h1>
                <p className="subheader-desc">Cross-border commerce</p>
              </div>
            </div>
            <div className="subheader-actions">
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  realTimeData 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${realTimeData ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 subheader">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <TruckIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="subheader-title">Trade Intelligence</h1>
                <p className="subheader-desc">Advanced cross-border commerce platform</p>
              </div>
            </div>
            
            <div className="subheader-actions">
              {/* Real-time Toggle */}
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  realTimeData 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${realTimeData ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">Live Data</span>
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {viewModes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === mode.id
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title={mode.name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  )
                })}
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Filters"
              >
                <FunnelIcon className="w-5 h-5" />
              </button>

              {/* Export */}
              <button
                onClick={() => setShowExport(!showExport)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export Data"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>

              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Search and Filters */}
          {(showFilters || showAdvanced) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search routes, commodities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Currency Selector */}
                <div className="relative">
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Trade Value */}
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={tradeValue}
                    onChange={(e) => setTradeValue(Number(e.target.value))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Trade Value"
                  />
                  <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                    {currencies.find(c => c.code === selectedCurrency)?.symbol}
                  </span>
                </div>

                {/* Advanced Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4" />
                  <span className="text-sm">Advanced</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Enhanced Route Selection */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Trade Route Configuration</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <EyeIcon className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <ShareIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Origin Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">From (Origin)</label>
              <button
                onClick={() => setShowOriginSelector(!showOriginSelector)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    { name: 'Monrovia, Liberia', flag: '🇱🇷' },
                    { name: 'Lagos, Nigeria', flag: '🇳🇬' },
                    { name: 'Accra, Ghana', flag: '🇬🇭' },
                    { name: 'Dakar, Senegal', flag: '🇸🇳' },
                    { name: 'Abidjan, Côte d\'Ivoire', flag: '🇨🇮' },
                    { name: 'Bamako, Mali', flag: '🇲🇱' },
                    { name: 'Ouagadougou, Burkina Faso', flag: '🇧🇫' },
                    { name: 'Niamey, Niger', flag: '🇳🇪' },
                    { name: 'Conakry, Guinea', flag: '🇬🇳' },
                    { name: 'Freetown, Sierra Leone', flag: '🇸🇱' },
                    { name: 'Cotonou, Benin', flag: '🇧🇯' },
                    { name: 'Lomé, Togo', flag: '🇹🇬' },
                    { name: 'Banjul, Gambia', flag: '🇬🇲' },
                    { name: 'Bissau, Guinea-Bissau', flag: '🇬🇼' },
                    { name: 'Praia, Cape Verde', flag: '🇨🇻' }
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
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    { name: 'Monrovia, Liberia', flag: '🇱🇷' },
                    { name: 'Lagos, Nigeria', flag: '🇳🇬' },
                    { name: 'Accra, Ghana', flag: '🇬🇭' },
                    { name: 'Dakar, Senegal', flag: '🇸🇳' },
                    { name: 'Abidjan, Côte d\'Ivoire', flag: '🇨🇮' },
                    { name: 'Bamako, Mali', flag: '🇲🇱' },
                    { name: 'Ouagadougou, Burkina Faso', flag: '🇧🇫' },
                    { name: 'Niamey, Niger', flag: '🇳🇪' },
                    { name: 'Conakry, Guinea', flag: '🇬🇳' },
                    { name: 'Freetown, Sierra Leone', flag: '🇸🇱' },
                    { name: 'Cotonou, Benin', flag: '🇧🇯' },
                    { name: 'Lomé, Togo', flag: '🇹🇬' },
                    { name: 'Banjul, Gambia', flag: '🇬🇲' },
                    { name: 'Bissau, Guinea-Bissau', flag: '🇬🇼' },
                    { name: 'Praia, Cape Verde', flag: '🇨🇻' }
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

            {/* Commodity Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Agricultural Products">Agricultural Products</option>
                <option value="Manufactured Goods">Manufactured Goods</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Textiles">Textiles</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* Language Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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

        {/* Dynamic Content Based on View Mode */}
        {viewMode === 'overview' && (
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
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Overview</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Distance', value: '450 km', icon: MapIcon, color: 'text-blue-600' },
                    { label: 'Duration', value: '8-12 hrs', icon: ClockIcon, color: 'text-yellow-600' },
                    { label: 'Cost', value: '$200-400', icon: CurrencyDollarIcon, color: 'text-green-600' },
                    { label: 'Border Crossings', value: '1', icon: ExclamationTriangleIcon, color: 'text-red-600' },
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

              <div className="bg-white rounded-xl shadow-lg p-6">
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
                      <DocumentTextIcon className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'routes' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Trade Routes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradeData.routes.map((route) => (
                  <motion.div
                    key={route.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{route.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">{route.distance} km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{route.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cost:</span>
                        <span className="font-medium">${route.cost} {route.currency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Efficiency:</span>
                        <span className="font-medium">{route.efficiency}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'analysis' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Market Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">West African Market Trends</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>🇱🇷 Liberia Focus</span>
                  <span>•</span>
                  <span>Updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tradeData.marketTrends.map((trend, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{trend.commodity}</h4>
                      <div className={`flex items-center space-x-1 ${
                        trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trend.trend === 'up' ? (
                          <TrendingUpIcon className="w-4 h-4" />
                        ) : (
                          <TrendingDownIcon className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {trend.change > 0 ? '+' : ''}{trend.change}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${trend.price}/ton
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Volume: {trend.volume} tons
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{trend.country}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">West Africa</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Conditions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">West African Border Conditions</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>🛂 ECOWAS Borders</span>
                  <span>•</span>
                  <span>Real-time Updates</span>
                </div>
              </div>
              <div className="space-y-4">
                {tradeData.borderConditions.map((border, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-900">{border.border}</h4>
                        <span className="text-sm text-gray-500">{border.countries}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          border.status === 'normal' ? 'bg-green-100 text-green-800' : 
                          border.status === 'busy' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {border.status}
                        </span>
                        <span className="text-sm text-gray-500">{border.efficiency}% efficiency</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Wait Time:</span>
                          <span className="font-medium ml-1">{border.waitTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Efficiency:</span>
                          <span className="font-medium ml-1">{border.efficiency}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Last Update:</span>
                          <span className="font-medium ml-1">{border.lastUpdate.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-600">ECOWAS:</span>
                          <span className="font-medium ml-1 text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'documents' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Documentation Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomsRegulations 
                  origin={selectedOrigin} 
                  destination={selectedDestination}
                  commodity={selectedCommodity}
                />
                <DocumentationRequirements 
                  commodity={selectedCommodity}
                  value={tradeValue}
                />
                <BorderConditions 
                  borderCrossing="Seme Border"
                  countryPair={`${selectedOrigin.split(',')[0]}-${selectedDestination.split(',')[0]}`}
                />
                <TariffCalculator 
                  commodityCode="1001"
                  origin={selectedOrigin}
                  destination={selectedDestination}
                  value={tradeValue}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Export Modal */}
        {showExport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Export Trade Data</h3>
                  <button
                    onClick={() => setShowExport(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'pdf', name: 'PDF Report', icon: DocumentChartBarIcon },
                    { id: 'excel', name: 'Excel Spreadsheet', icon: TableCellsIcon },
                    { id: 'csv', name: 'CSV Data', icon: TableCellsIcon },
                    { id: 'image', name: 'Image Export', icon: ArrowDownTrayIcon }
                  ].map((format) => {
                    const Icon = format.icon
                    return (
                      <button
                        key={format.id}
                        onClick={() => handleExport(format.id)}
                        className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{format.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
