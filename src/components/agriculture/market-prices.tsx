'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface MarketPricesProps {
  location: string
}

export function MarketPrices({ location }: MarketPricesProps) {
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchMarketData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setMarketData({
          location,
          commodities: [
            {
              name: 'Maize',
              price: 450,
              currency: 'NGN',
              unit: 'kg',
              change: 5.2,
              trend: 'up',
              market: 'Lagos Central Market',
              lastUpdated: '2 hours ago'
            },
            {
              name: 'Rice',
              price: 380,
              currency: 'NGN',
              unit: 'kg',
              change: -2.1,
              trend: 'down',
              market: 'Kano Grain Market',
              lastUpdated: '1 hour ago'
            },
            {
              name: 'Cassava',
              price: 120,
              currency: 'NGN',
              unit: 'kg',
              change: 8.5,
              trend: 'up',
              market: 'Onitsha Main Market',
              lastUpdated: '3 hours ago'
            },
            {
              name: 'Yam',
              price: 280,
              currency: 'NGN',
              unit: 'kg',
              change: 1.2,
              trend: 'up',
              market: 'Abuja Market',
              lastUpdated: '4 hours ago'
            }
          ],
          marketAnalysis: [
            'Demand is high due to seasonal factors',
            'Supply chain disruptions affecting prices',
            'Government policies supporting local production',
            'Export opportunities increasing'
          ],
          bestSellingLocations: [
            'Lagos Central Market',
            'Kano Grain Market',
            'Onitsha Main Market',
            'Abuja Market'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchMarketData()
  }, [location])

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
  }

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return 'text-success-600'
    return 'text-danger-600'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-soft"
    >
      <div className="flex items-center space-x-2 mb-6">
        <CurrencyDollarIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Market Prices</h3>
      </div>

      <div className="space-y-4">
        {marketData?.commodities.map((commodity: any, index: number) => {
          const TrendIcon = getTrendIcon(commodity.trend)
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{commodity.name}</h4>
                <div className="flex items-center space-x-2">
                  <TrendIcon className={`w-4 h-4 ${getTrendColor(commodity.trend, commodity.change)}`} />
                  <span className={`text-sm font-medium ${getTrendColor(commodity.trend, commodity.change)}`}>
                    {commodity.change > 0 ? '+' : ''}{commodity.change}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(commodity.price, commodity.currency)}/{commodity.unit}
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{commodity.market}</span>
                  </div>
                  <div className="text-xs text-gray-500">{commodity.lastUpdated}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Market Analysis */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-2">Market Analysis</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          {marketData?.marketAnalysis.map((analysis: any, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>{analysis}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best Selling Locations */}
      <div className="mt-4 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-2">Best Selling Locations</h4>
        <div className="flex flex-wrap gap-2">
          {marketData?.bestSellingLocations.map((location: any, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success-100 text-success-800"
            >
              <ChartBarIcon className="w-3 h-3 mr-1" />
              {location}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
