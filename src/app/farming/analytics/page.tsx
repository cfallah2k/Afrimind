'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon,
  CalendarIcon,
  MapPinIcon,
  SunIcon,
  CloudIcon as CloudRainIcon,
  SparklesIcon as SeedlingIcon,
  ScissorsIcon,
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function FarmingAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('yield')

  const periods = [
    { id: '1month', name: '1 Month', days: 30 },
    { id: '3months', name: '3 Months', days: 90 },
    { id: '6months', name: '6 Months', days: 180 },
    { id: '1year', name: '1 Year', days: 365 }
  ]

  const metrics = [
    { id: 'yield', name: 'Yield', icon: TrendingUpIcon, color: 'green' },
    { id: 'profit', name: 'Profit', icon: CurrencyDollarIcon, color: 'blue' },
    { id: 'growth', name: 'Growth Rate', icon: ChartBarIcon, color: 'purple' },
    { id: 'efficiency', name: 'Efficiency', icon: StarIcon, color: 'yellow' }
  ]

  const farmingCycles = [
    {
      id: 1,
      crop: 'Maize',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      yield: 2.5,
      profit: 450,
      status: 'completed',
      season: 'rainy'
    },
    {
      id: 2,
      crop: 'Rice',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-01'),
      yield: 1.8,
      profit: 320,
      status: 'completed',
      season: 'rainy'
    },
    {
      id: 3,
      crop: 'Tomato',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-09-15'),
      yield: 3.2,
      profit: 680,
      status: 'completed',
      season: 'dry'
    },
    {
      id: 4,
      crop: 'Cassava',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2025-05-01'),
      yield: 0,
      profit: 0,
      status: 'ongoing',
      season: 'all'
    }
  ]

  const weatherData = [
    { month: 'Jan', rainfall: 45, temperature: 28, humidity: 75 },
    { month: 'Feb', rainfall: 38, temperature: 30, humidity: 70 },
    { month: 'Mar', rainfall: 52, temperature: 32, humidity: 80 },
    { month: 'Apr', rainfall: 68, temperature: 31, humidity: 85 },
    { month: 'May', rainfall: 75, temperature: 29, humidity: 90 },
    { month: 'Jun', rainfall: 42, temperature: 27, humidity: 75 },
    { month: 'Jul', rainfall: 35, temperature: 26, humidity: 70 },
    { month: 'Aug', rainfall: 28, temperature: 28, humidity: 65 },
    { month: 'Sep', rainfall: 32, temperature: 30, humidity: 70 },
    { month: 'Oct', rainfall: 48, temperature: 31, humidity: 75 },
    { month: 'Nov', rainfall: 55, temperature: 29, humidity: 80 },
    { month: 'Dec', rainfall: 40, temperature: 28, humidity: 75 }
  ]

  const marketPrices = [
    { crop: 'Maize', current: 450, previous: 420, change: 7.1, trend: 'up' },
    { crop: 'Rice', current: 380, previous: 400, change: -5.0, trend: 'down' },
    { crop: 'Tomato', current: 320, previous: 280, change: 14.3, trend: 'up' },
    { crop: 'Cassava', current: 120, previous: 110, change: 9.1, trend: 'up' },
    { crop: 'Beans', current: 280, previous: 300, change: -6.7, trend: 'down' }
  ]

  const insights = [
    {
      type: 'success',
      title: 'Best Performing Crop',
      description: 'Tomato farming has been your most profitable crop this season',
      icon: StarIcon,
      color: 'green',
      value: '+68% profit',
      recommendation: 'Consider expanding tomato cultivation'
    },
    {
      type: 'warning',
      title: 'Weather Alert',
      description: 'Below-average rainfall predicted for next month',
      icon: ExclamationTriangleIcon,
      color: 'yellow',
      value: '-20% rainfall',
      recommendation: 'Prepare irrigation systems'
    },
    {
      type: 'info',
      title: 'Market Opportunity',
      description: 'Rice prices are expected to rise in the coming weeks',
      icon: TrendingUpIcon,
      color: 'blue',
      value: '+15% price increase',
      recommendation: 'Consider planting rice for next season'
    },
    {
      type: 'tip',
      title: 'Efficiency Tip',
      description: 'Your maize yield could improve with better spacing',
      icon: LightBulbIcon,
      color: 'purple',
      value: '+25% potential yield',
      recommendation: 'Adjust planting density to 30cm spacing'
    }
  ]

  const getTotalYield = () => {
    return farmingCycles
      .filter(cycle => cycle.status === 'completed')
      .reduce((total, cycle) => total + cycle.yield, 0)
  }

  const getTotalProfit = () => {
    return farmingCycles
      .filter(cycle => cycle.status === 'completed')
      .reduce((total, cycle) => total + cycle.profit, 0)
  }

  const getAverageYield = () => {
    const completedCycles = farmingCycles.filter(cycle => cycle.status === 'completed')
    return completedCycles.length > 0 ? getTotalYield() / completedCycles.length : 0
  }

  const getBestCrop = () => {
    const completedCycles = farmingCycles.filter(cycle => cycle.status === 'completed')
    return completedCycles.reduce((best, current) => 
      current.profit > best.profit ? current : best, completedCycles[0]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Farming Analytics</h1>
                <p className="text-gray-600">Analyze your farming performance and trends</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">
        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Yield</h3>
                <p className="text-sm text-gray-600">This period</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {getTotalYield().toFixed(1)} tons
            </div>
            <div className="text-sm text-green-600">+12% from last period</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Profit</h3>
                <p className="text-sm text-gray-600">This period</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ₦{getTotalProfit().toLocaleString()}
            </div>
            <div className="text-sm text-green-600">+18% from last period</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Average Yield</h3>
                <p className="text-sm text-gray-600">Per crop cycle</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {getAverageYield().toFixed(1)} tons
            </div>
            <div className="text-sm text-green-600">+8% improvement</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Success Rate</h3>
                <p className="text-sm text-gray-600">Completed cycles</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
            <div className="text-sm text-green-600">+5% from last period</div>
          </div>
        </motion.div>

        {/* Farming Cycles */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Farming Cycles</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {farmingCycles.map((cycle) => (
                    <tr key={cycle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">
                            {cycle.crop === 'Maize' && '🌽'}
                            {cycle.crop === 'Rice' && '🌾'}
                            {cycle.crop === 'Tomato' && '🍅'}
                            {cycle.crop === 'Cassava' && '🥔'}
                          </div>
                          <div className="font-medium text-gray-900">{cycle.crop}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {cycle.startDate.toLocaleDateString()} - {cycle.endDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cycle.yield} tons
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{cycle.profit.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          cycle.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {cycle.status === 'completed' ? 'Completed' : 'Ongoing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {cycle.season}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Market Prices */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {marketPrices.map((price, index) => (
              <div key={price.crop} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{price.crop}</h3>
                  <div className={`flex items-center space-x-1 ${
                    price.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {price.trend === 'up' ? (
                      <TrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <TrendingDownIcon className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {price.change > 0 ? '+' : ''}{price.change}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ₦{price.current}/kg
                </div>
                <div className="text-sm text-gray-600">
                  Previous: ₦{price.previous}/kg
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Insights & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={insight.type} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                  insight.type === 'success' ? 'border-green-500' :
                  insight.type === 'warning' ? 'border-yellow-500' :
                  insight.type === 'info' ? 'border-blue-500' :
                  'border-purple-500'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      insight.type === 'success' ? 'bg-green-100' :
                      insight.type === 'warning' ? 'bg-yellow-100' :
                      insight.type === 'info' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        insight.type === 'success' ? 'text-green-600' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                        insight.type === 'info' ? 'text-blue-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {insight.description}
                      </p>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {insight.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {insight.recommendation}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Weather Trends */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CloudRainIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Rainfall</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {weatherData.reduce((sum, month) => sum + month.rainfall, 0)}mm
              </div>
              <div className="text-sm text-gray-600">Annual total</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <SunIcon className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Temperature</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {Math.round(weatherData.reduce((sum, month) => sum + month.temperature, 0) / weatherData.length)}°C
              </div>
              <div className="text-sm text-gray-600">Average</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                <span className="font-semibold text-gray-900">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {Math.round(weatherData.reduce((sum, month) => sum + month.humidity, 0) / weatherData.length)}%
              </div>
              <div className="text-sm text-gray-600">Average</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
