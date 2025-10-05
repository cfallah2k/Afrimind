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
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { WeatherWidget } from '@/components/agriculture/weather-widget'
import { CropRecommendations } from '@/components/agriculture/crop-recommendations'
import { MarketPrices } from '@/components/agriculture/market-prices'
import { PestDiseaseInfo } from '@/components/agriculture/pest-disease-info'
import { FarmingTips } from '@/components/agriculture/farming-tips'

export default function AgriculturePage() {
  const [selectedLocation, setSelectedLocation] = useState('Lagos, Nigeria')
  const [selectedSeason, setSelectedSeason] = useState('wet')

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
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <SunIcon className="w-6 h-6 lg:w-7 lg:h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">Agriculture 🌱</h1>
              <p className="text-sm lg:text-base xl:text-lg text-gray-600">Smart farming solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Weather Widget */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <WeatherWidget location={selectedLocation} />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Temperature', value: '28°C', icon: SunIcon, color: 'text-warning-600' },
                  { label: 'Humidity', value: '75%', icon: CloudIcon, color: 'text-primary-600' },
                  { label: 'Rainfall', value: '15mm', icon: ChartBarIcon, color: 'text-success-600' },
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
              <div className="space-y-3">
                {[
                  { crop: 'Maize', price: '₦450/kg', trend: 'up', change: '+5%' },
                  { crop: 'Rice', price: '₦380/kg', trend: 'down', change: '-2%' },
                  { crop: 'Cassava', price: '₦120/kg', trend: 'up', change: '+8%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.crop}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{item.price}</span>
                      <span className={`text-sm ${item.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
                        {item.change}
                      </span>
                    </div>
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
          <CropRecommendations location={selectedLocation} season={selectedSeason} />
          <MarketPrices location={selectedLocation} />
          <PestDiseaseInfo location={selectedLocation} />
          <FarmingTips location={selectedLocation} />
        </motion.div>
      </div>
      </div>
    </div>
  )
}
