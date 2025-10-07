'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SunIcon,
  CloudIcon,
  ChartBarIcon,
  MapIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  GlobeAltIcon,
  CalendarIcon,
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  EyeIcon,
  ShareIcon,
  ArrowDownTrayIcon as DownloadIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  ViewColumnsIcon,
  Bars3Icon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  HandThumbUpIcon as ThumbUpIcon,
  HandThumbDownIcon as ThumbDownIcon,
  BookmarkIcon,
  FlagIcon,
  StarIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  TruckIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { WeatherWidget } from '@/components/agriculture/weather-widget'
import { CropRecommendations } from '@/components/agriculture/crop-recommendations'
import { MarketPrices } from '@/components/agriculture/market-prices'
import { PestDiseaseInfo } from '@/components/agriculture/pest-disease-info'
import { FarmingTips } from '@/components/agriculture/farming-tips'

export default function AgriculturePage() {
  const [selectedLocation, setSelectedLocation] = useState('Monrovia, Liberia')
  const [selectedSeason, setSelectedSeason] = useState('wet')
  const [showLocationSelector, setShowLocationSelector] = useState(false)
  const [showSeasonSelector, setShowSeasonSelector] = useState(false)
  const [viewMode, setViewMode] = useState<'overview' | 'weather' | 'crops' | 'market'>('overview')
  const [showFilters, setShowFilters] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [realTimeData, setRealTimeData] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Enhanced agriculture data for Liberia
  const [agricultureData] = useState({
    locations: [
      { name: 'Monrovia, Liberia', flag: '🇱🇷', region: 'Montserrado' },
      { name: 'Gbarnga, Liberia', flag: '🇱🇷', region: 'Bong' },
      { name: 'Kakata, Liberia', flag: '🇱🇷', region: 'Margibi' },
      { name: 'Buchanan, Liberia', flag: '🇱🇷', region: 'Grand Bassa' },
      { name: 'Zwedru, Liberia', flag: '🇱🇷', region: 'Grand Gedeh' },
      { name: 'Harper, Liberia', flag: '🇱🇷', region: 'Maryland' },
      { name: 'Voinjama, Liberia', flag: '🇱🇷', region: 'Lofa' },
      { name: 'Sanniquellie, Liberia', flag: '🇱🇷', region: 'Nimba' }
    ],
    seasons: [
      { id: 'wet', name: 'Wet Season', months: 'May-October', description: 'Rainy season for planting' },
      { id: 'dry', name: 'Dry Season', months: 'November-April', description: 'Dry season for harvesting' },
      { id: 'transition', name: 'Transition', months: 'April-May', description: 'Seasonal transition period' }
    ],
    liberiaCrops: [
      {
        name: 'Rice',
        season: 'wet',
        planting: 'May-June',
        harvesting: 'October-November',
        suitability: 95,
        marketPrice: 'L$450/kg',
        demand: 'High',
        profit: 'High'
      },
      {
        name: 'Cassava',
        season: 'year-round',
        planting: 'Any time',
        harvesting: '8-12 months',
        suitability: 90,
        marketPrice: 'L$120/kg',
        demand: 'Medium',
        profit: 'Medium'
      },
      {
        name: 'Oil Palm',
        season: 'year-round',
        planting: 'Any time',
        harvesting: '3-4 years',
        suitability: 85,
        marketPrice: 'L$800/ton',
        demand: 'High',
        profit: 'Very High'
      },
      {
        name: 'Rubber',
        season: 'year-round',
        planting: 'Any time',
        harvesting: '5-7 years',
        suitability: 80,
        marketPrice: 'L$1,200/ton',
        demand: 'High',
        profit: 'Very High'
      }
    ],
    weatherData: {
      temperature: 28,
      humidity: 75,
      rainfall: 15,
      windSpeed: 8,
      pressure: 1013,
      uvIndex: 6,
      forecast: [
        { day: 'Today', temp: 28, condition: 'Partly Cloudy', rain: 20 },
        { day: 'Tomorrow', temp: 29, condition: 'Sunny', rain: 10 },
        { day: 'Day 3', temp: 27, condition: 'Rainy', rain: 80 },
        { day: 'Day 4', temp: 26, condition: 'Thunderstorm', rain: 90 },
        { day: 'Day 5', temp: 28, condition: 'Partly Cloudy', rain: 30 }
      ]
    },
    marketTrends: [
      { crop: 'Rice', price: 'L$450/kg', change: 5.2, trend: 'up', volume: 1200 },
      { crop: 'Cassava', price: 'L$120/kg', change: 8.5, trend: 'up', volume: 1500 },
      { crop: 'Oil Palm', price: 'L$800/ton', change: -2.1, trend: 'down', volume: 800 },
      { crop: 'Rubber', price: 'L$1,200/ton', change: 12.3, trend: 'up', volume: 600 }
    ]
  })

  const periods = [
    { id: '24hours', name: '24 Hours', hours: 24 },
    { id: '7days', name: '7 Days', hours: 168 },
    { id: '30days', name: '30 Days', hours: 720 },
    { id: '90days', name: '90 Days', hours: 2160 }
  ]

  const viewModes = [
    { id: 'overview', name: 'Overview', icon: Squares2X2Icon },
    { id: 'weather', name: 'Weather', icon: CloudIcon },
    { id: 'crops', name: 'Crops', icon: SunIcon },
    { id: 'market', name: 'Market', icon: ChartBarIcon }
  ]

  // Real-time data simulation
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        console.log('Updating agriculture data...')
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
    console.log(`Exporting agriculture data as ${format}`)
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
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="subheader">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <SunIcon className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="subheader-title line-clamp-1 text-xl lg:text-2xl">Agriculture Intelligence</h1>
                <p className="subheader-desc line-clamp-1">Smart farming solutions for Liberia</p>
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
                          ? 'bg-white text-green-600 shadow-sm'
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
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
                    placeholder="Search crops, weather, markets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Location Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLocationSelector(!showLocationSelector)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{selectedLocation}</span>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showLocationSelector && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {agricultureData.locations.map((location) => (
                        <button
                          key={location.name}
                          onClick={() => {
                            setSelectedLocation(location.name)
                            setShowLocationSelector(false)
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="text-lg">{location.flag}</span>
                          <div>
                            <span className="text-sm font-medium">{location.name}</span>
                            <div className="text-xs text-gray-500">{location.region}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Season Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSeasonSelector(!showSeasonSelector)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        {agricultureData.seasons.find(s => s.id === selectedSeason)?.name}
                      </span>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showSeasonSelector && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {agricultureData.seasons.map((season) => (
                        <button
                          key={season.id}
                          onClick={() => {
                            setSelectedSeason(season.id)
                            setShowSeasonSelector(false)
                          }}
                          className="w-full flex items-start space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <div>
                            <span className="text-sm font-medium">{season.name}</span>
                            <div className="text-xs text-gray-500">{season.months}</div>
                            <div className="text-xs text-gray-400">{season.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
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
      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        {/* Dynamic Content Based on View Mode */}
        {viewMode === 'overview' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {/* Weather Widget - Takes 2/3 on large screens */}
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.6 }} 
              className="xl:col-span-8"
            >
              <WeatherWidget location={selectedLocation} />
            </motion.div>

            {/* Quick Stats - Takes 1/3 on large screens, stacked on mobile */}
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.6 }} 
              className="xl:col-span-4 space-y-4 sm:space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Weather Conditions</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: 'Temperature', value: `${agricultureData.weatherData.temperature}°C`, icon: SunIcon, color: 'text-orange-600' },
                    { label: 'Humidity', value: `${agricultureData.weatherData.humidity}%`, icon: CloudIcon, color: 'text-blue-600' },
                    { label: 'Rainfall', value: `${agricultureData.weatherData.rainfall}mm`, icon: ChartBarIcon, color: 'text-green-600' },
                    { label: 'Wind Speed', value: `${agricultureData.weatherData.windSpeed} km/h`, icon: ExclamationTriangleIcon, color: 'text-purple-600' },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                        <span className="text-sm sm:text-base text-gray-700">{stat.label}</span>
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Market Trends</h3>
                <div className="space-y-2 sm:space-y-3">
                  {agricultureData.marketTrends.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-gray-700">{item.crop}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm sm:text-base font-semibold text-gray-900">{item.price}</span>
                        <div className={`flex items-center space-x-1 ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? (
                            <TrendingUpIcon className="w-3 h-3" />
                          ) : (
                            <TrendingDownIcon className="w-3 h-3" />
                          )}
                          <span className="text-xs sm:text-sm">
                            {item.change > 0 ? '+' : ''}{item.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'weather' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Weather Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {agricultureData.weatherData.forecast.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-gray-900 mb-2">{day.day}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{day.temp}°C</div>
                    <div className="text-sm text-gray-600 mb-2">{day.condition}</div>
                    <div className="flex items-center justify-center space-x-1">
                      <CloudIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{day.rain}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'crops' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Liberia Crop Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agricultureData.liberiaCrops.map((crop, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        crop.suitability >= 90 ? 'bg-green-100 text-green-800' :
                        crop.suitability >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {crop.suitability}% suitable
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Season:</span>
                        <span className="font-medium">{crop.season}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Planting:</span>
                        <span className="font-medium">{crop.planting}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Harvesting:</span>
                        <span className="font-medium">{crop.harvesting}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-medium text-green-600">{crop.marketPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit:</span>
                        <span className={`font-medium ${
                          crop.profit === 'Very High' ? 'text-green-600' :
                          crop.profit === 'High' ? 'text-green-500' :
                          'text-yellow-600'
                        }`}>{crop.profit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'market' && (
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agricultureData.marketTrends.map((trend, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{trend.crop}</h4>
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
                      {trend.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      Volume: {trend.volume} tons
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature Grid - Always visible */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <CropRecommendations location={selectedLocation} season={selectedSeason} />
          <MarketPrices location={selectedLocation} />
          <PestDiseaseInfo location={selectedLocation} />
          <FarmingTips location={selectedLocation} />
        </motion.div>

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
                  <h3 className="text-lg font-semibold text-gray-900">Export Agriculture Data</h3>
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
      </motion.main>
    </div>
  )
}
