'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  ArrowPathIcon,
  MapPinIcon,
  CalculatorIcon,
  BanknotesIcon,
  GlobeAltIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

// West African countries with their currencies and exchange rates (approximate)
const countries = [
  { 
    id: 'liberia', 
    name: 'Liberia', 
    currency: 'LRD', 
    symbol: 'L$', 
    flag: '🇱🇷',
    rate: 1.0, // Base rate
    timezone: 'GMT'
  },
  { 
    id: 'nigeria', 
    name: 'Nigeria', 
    currency: 'NGN', 
    symbol: '₦', 
    flag: '🇳🇬',
    rate: 0.002, // 1 LRD = 500 NGN (approximate)
    timezone: 'WAT'
  },
  { 
    id: 'ghana', 
    name: 'Ghana', 
    currency: 'GHS', 
    symbol: '₵', 
    flag: '🇬🇭',
    rate: 0.15, // 1 LRD = 6.7 GHS (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'senegal', 
    name: 'Senegal', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇸🇳',
    rate: 0.0008, // 1 LRD = 1250 XOF (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'ivory-coast', 
    name: 'Ivory Coast', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇨🇮',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'mali', 
    name: 'Mali', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇲🇱',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'burkina-faso', 
    name: 'Burkina Faso', 
    currency: 'XOF', 
    symbol: 'CFA', 
    flag: '🇧🇫',
    rate: 0.0008,
    timezone: 'GMT'
  },
  { 
    id: 'guinea', 
    name: 'Guinea', 
    currency: 'GNF', 
    symbol: 'FG', 
    flag: '🇬🇳',
    rate: 0.0001, // 1 LRD = 10,000 GNF (approximate)
    timezone: 'GMT'
  },
  { 
    id: 'sierra-leone', 
    name: 'Sierra Leone', 
    currency: 'SLL', 
    symbol: 'Le', 
    flag: '🇸🇱',
    rate: 0.05, // 1 LRD = 20 SLL (approximate)
    timezone: 'GMT'
  }
]

// Common crops with their prices in different countries
const cropPrices = [
  {
    id: 'rice',
    name: 'Rice',
    icon: '🌾',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.85, sell: 0.95, unit: 'per kg' },
      nigeria: { buy: 425, sell: 475, unit: 'per kg' },
      ghana: { buy: 5.7, sell: 6.4, unit: 'per kg' },
      senegal: { buy: 1062, sell: 1188, unit: 'per kg' },
      'ivory-coast': { buy: 1062, sell: 1188, unit: 'per kg' },
      mali: { buy: 1062, sell: 1188, unit: 'per kg' },
      'burkina-faso': { buy: 1062, sell: 1188, unit: 'per kg' },
      guinea: { buy: 8500, sell: 9500, unit: 'per kg' },
      'sierra-leone': { buy: 17, sell: 19, unit: 'per kg' }
    }
  },
  {
    id: 'cassava',
    name: 'Cassava',
    icon: '🥔',
    category: 'Staple',
    prices: {
      liberia: { buy: 0.35, sell: 0.45, unit: 'per kg' },
      nigeria: { buy: 175, sell: 225, unit: 'per kg' },
      ghana: { buy: 2.3, sell: 3.0, unit: 'per kg' },
      senegal: { buy: 437, sell: 562, unit: 'per kg' },
      'ivory-coast': { buy: 437, sell: 562, unit: 'per kg' },
      mali: { buy: 437, sell: 562, unit: 'per kg' },
      'burkina-faso': { buy: 437, sell: 562, unit: 'per kg' },
      guinea: { buy: 3500, sell: 4500, unit: 'per kg' },
      'sierra-leone': { buy: 7, sell: 9, unit: 'per kg' }
    }
  },
  {
    id: 'maize',
    name: 'Maize',
    icon: '🌽',
    category: 'Cereal',
    prices: {
      liberia: { buy: 0.60, sell: 0.75, unit: 'per kg' },
      nigeria: { buy: 300, sell: 375, unit: 'per kg' },
      ghana: { buy: 4.0, sell: 5.0, unit: 'per kg' },
      senegal: { buy: 750, sell: 937, unit: 'per kg' },
      'ivory-coast': { buy: 750, sell: 937, unit: 'per kg' },
      mali: { buy: 750, sell: 937, unit: 'per kg' },
      'burkina-faso': { buy: 750, sell: 937, unit: 'per kg' },
      guinea: { buy: 6000, sell: 7500, unit: 'per kg' },
      'sierra-leone': { buy: 12, sell: 15, unit: 'per kg' }
    }
  },
  {
    id: 'cocoa',
    name: 'Cocoa',
    icon: '🍫',
    category: 'Cash Crop',
    prices: {
      liberia: { buy: 2.50, sell: 3.20, unit: 'per kg' },
      nigeria: { buy: 1250, sell: 1600, unit: 'per kg' },
      ghana: { buy: 16.7, sell: 21.3, unit: 'per kg' },
      senegal: { buy: 3125, sell: 4000, unit: 'per kg' },
      'ivory-coast': { buy: 3125, sell: 4000, unit: 'per kg' },
      mali: { buy: 3125, sell: 4000, unit: 'per kg' },
      'burkina-faso': { buy: 3125, sell: 4000, unit: 'per kg' },
      guinea: { buy: 25000, sell: 32000, unit: 'per kg' },
      'sierra-leone': { buy: 50, sell: 64, unit: 'per kg' }
    }
  },
  {
    id: 'palm-oil',
    name: 'Palm Oil',
    icon: '🫒',
    category: 'Oil',
    prices: {
      liberia: { buy: 1.20, sell: 1.50, unit: 'per liter' },
      nigeria: { buy: 600, sell: 750, unit: 'per liter' },
      ghana: { buy: 8.0, sell: 10.0, unit: 'per liter' },
      senegal: { buy: 1500, sell: 1875, unit: 'per liter' },
      'ivory-coast': { buy: 1500, sell: 1875, unit: 'per liter' },
      mali: { buy: 1500, sell: 1875, unit: 'per liter' },
      'burkina-faso': { buy: 1500, sell: 1875, unit: 'per liter' },
      guinea: { buy: 12000, sell: 15000, unit: 'per liter' },
      'sierra-leone': { buy: 24, sell: 30, unit: 'per liter' }
    }
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    category: 'Cash Crop',
    prices: {
      liberia: { buy: 3.80, sell: 4.50, unit: 'per kg' },
      nigeria: { buy: 1900, sell: 2250, unit: 'per kg' },
      ghana: { buy: 25.3, sell: 30.0, unit: 'per kg' },
      senegal: { buy: 4750, sell: 5625, unit: 'per kg' },
      'ivory-coast': { buy: 4750, sell: 5625, unit: 'per kg' },
      mali: { buy: 4750, sell: 5625, unit: 'per kg' },
      'burkina-faso': { buy: 4750, sell: 5625, unit: 'per kg' },
      guinea: { buy: 38000, sell: 45000, unit: 'per kg' },
      'sierra-leone': { buy: 76, sell: 90, unit: 'per kg' }
    }
  }
]

export default function MarketPricesPage() {
  const [selectedCountry, setSelectedCountry] = useState('liberia')
  const [selectedCrop, setSelectedCrop] = useState('rice')
  const [fromCountry, setFromCountry] = useState('liberia')
  const [toCountry, setToCountry] = useState('nigeria')
  const [quantity, setQuantity] = useState(100)
  const [showConverter, setShowConverter] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Update prices every hour (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, [])

  const currentCountry = countries.find(c => c.id === selectedCountry)
  const currentCrop = cropPrices.find(c => c.id === selectedCrop)
  const fromCountryData = countries.find(c => c.id === fromCountry)
  const toCountryData = countries.find(c => c.id === toCountry)

  // Calculate conversion between currencies
  const convertPrice = (price: number, fromCountryId: string, toCountryId: string) => {
    const fromRate = countries.find(c => c.id === fromCountryId)?.rate || 1
    const toRate = countries.find(c => c.id === toCountryId)?.rate || 1
    return (price * fromRate) / toRate
  }

  // Calculate profit potential
  const calculateProfit = (crop: any, fromCountryId: string, toCountryId: string, quantity: number) => {
    const fromPrices = crop.prices[fromCountryId as keyof typeof crop.prices]
    const toPrices = crop.prices[toCountryId as keyof typeof crop.prices]
    
    if (!fromPrices || !toPrices) return null

    const buyPrice = fromPrices.buy
    const sellPrice = toPrices.sell
    
    const buyCost = buyPrice * quantity
    const sellRevenue = convertPrice(sellPrice, toCountryId, fromCountryId) * quantity
    const profit = sellRevenue - buyCost
    const profitMargin = (profit / buyCost) * 100

    return {
      buyCost,
      sellRevenue,
      profit,
      profitMargin,
      fromCurrency: countries.find(c => c.id === fromCountryId)?.symbol || '',
      toCurrency: countries.find(c => c.id === toCountryId)?.symbol || ''
    }
  }

  const profitData = calculateProfit(currentCrop, fromCountry, toCountry, quantity)

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Market Prices 🌍</h1>
              <p className="text-sm text-gray-600">West African Markets</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowConverter(!showConverter)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Currency Converter"
              >
                <CalculatorIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
              <p className="text-gray-600">Real-time prices across West Africa</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowConverter(!showConverter)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CalculatorIcon className="w-4 h-4" />
                <span>Currency Converter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-7xl mx-auto px-4 py-6"
      >
        {/* Country Selector */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Select Country</h2>
          <div className="grid grid-cols-3 lg:grid-cols-9 gap-2 lg:gap-3">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`p-2 lg:p-3 rounded-lg border-2 transition-colors ${
                  selectedCountry === country.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg lg:text-xl mb-1">{country.flag}</div>
                  <div className="font-medium text-gray-900 text-xs lg:text-sm">{country.name}</div>
                  <div className="text-xs text-gray-500">{country.currency}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Crop Prices */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Current Prices in {currentCountry?.name} ({currentCountry?.currency})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {cropPrices.map((crop) => {
              const prices = crop.prices[selectedCountry as keyof typeof crop.prices]
              if (!prices) return null

              return (
                <div key={crop.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{crop.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                      <div className="text-sm text-gray-500">{crop.category}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Buy Price</span>
                      <span className="font-semibold text-green-600">
                        {currentCountry?.symbol}{prices.buy.toFixed(2)} {prices.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sell Price</span>
                      <span className="font-semibold text-blue-600">
                        {currentCountry?.symbol}{prices.sell.toFixed(2)} {prices.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="font-semibold text-purple-600">
                        {(((prices.sell - prices.buy) / prices.buy) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Currency Converter */}
        {showConverter && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Currency Converter & Profit Calculator</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Converter Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Country</label>
                    <select
                      value={fromCountry}
                      onChange={(e) => setFromCountry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.name} ({country.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Country</label>
                    <select
                      value={toCountry}
                      onChange={(e) => setToCountry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.name} ({country.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {cropPrices.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.icon} {crop.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>

                {/* Profit Analysis */}
                {profitData && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profit Analysis</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Buy Cost ({fromCountryData?.currency})</span>
                        <span className="font-semibold">
                          {fromCountryData?.symbol}{profitData.buyCost.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sell Revenue ({toCountryData?.currency})</span>
                        <span className="font-semibold">
                          {toCountryData?.symbol}{profitData.sellRevenue.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Profit</span>
                          <span className={`font-bold ${profitData.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fromCountryData?.symbol}{profitData.profit.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-600">Profit Margin</span>
                          <span className={`font-bold ${profitData.profitMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {profitData.profitMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                      {profitData.profitMargin > 20 ? (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span className="text-sm">Excellent profit opportunity! Consider this trade.</span>
                        </div>
                      ) : profitData.profitMargin > 10 ? (
                        <div className="flex items-center space-x-2 text-yellow-700">
                          <ExclamationTriangleIcon className="w-5 h-5" />
                          <span className="text-sm">Moderate profit. Consider market risks.</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-red-700">
                          <ExclamationTriangleIcon className="w-5 h-5" />
                          <span className="text-sm">Low profit margin. Consider other options.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Market Trends */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Market Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Rising Prices</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rice</span>
                  <span className="text-sm font-semibold text-green-600">+5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cocoa</span>
                  <span className="text-sm font-semibold text-green-600">+3.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Coffee</span>
                  <span className="text-sm font-semibold text-green-600">+2.1%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingDownIcon className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Falling Prices</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cassava</span>
                  <span className="text-sm font-semibold text-red-600">-2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Maize</span>
                  <span className="text-sm font-semibold text-red-600">-1.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Palm Oil</span>
                  <span className="text-sm font-semibold text-red-600">-0.9%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <StarIcon className="w-6 h-6 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Best Opportunities</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Liberia → Nigeria</span>
                  <span className="text-sm font-semibold text-blue-600">Rice</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ghana → Liberia</span>
                  <span className="text-sm font-semibold text-blue-600">Cocoa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Senegal → Guinea</span>
                  <span className="text-sm font-semibold text-blue-600">Coffee</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <ArrowPathIcon className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}
