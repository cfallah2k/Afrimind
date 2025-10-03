'use client'

import { useState, useEffect } from 'react'
import { 
  Cloud, 
  Sun, 
  Droplets, 
  Thermometer, 
  TrendingUp, 
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Leaf,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Shield,
  Brain,
  Activity,
  Star,
  ArrowRight,
  DollarSign,
  Wind,
  Eye,
  Target,
  Award
} from 'lucide-react'

export default function AgricultureTab() {
  const [selectedCrop, setSelectedCrop] = useState('maize')
  const [realTimeData, setRealTimeData] = useState({
    weather: {
      current: { temp: 28, condition: 'Partly Cloudy', humidity: 65, wind: 12 },
      forecast: [
        { day: 'Today', high: 30, low: 22, condition: 'Sunny', rain: 10, wind: 8 },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Rainy', rain: 80, wind: 15 },
        { day: 'Day 3', high: 26, low: 18, condition: 'Cloudy', rain: 40, wind: 10 },
      ]
    },
    market: {
      maize: { price: 280, change: 15, trend: 'up', volume: 1250 },
      rice: { price: 320, change: -8, trend: 'down', volume: 980 },
      beans: { price: 180, change: 5, trend: 'up', volume: 750 },
      cassava: { price: 95, change: 12, trend: 'up', volume: 1100 }
    },
    soil: {
      moisture: 65,
      ph: 6.8,
      nutrients: { nitrogen: 85, phosphorus: 70, potassium: 90 }
    },
    recommendations: [
      { type: 'irrigation', priority: 'high', message: 'Increase irrigation by 20% due to low soil moisture' },
      { type: 'fertilizer', priority: 'medium', message: 'Apply nitrogen fertilizer in 2 weeks' },
      { type: 'pest', priority: 'low', message: 'Monitor for aphids in maize fields' }
    ]
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        weather: {
          ...prev.weather,
          current: {
            ...prev.weather.current,
            temp: prev.weather.current.temp + (Math.random() - 0.5) * 2,
            humidity: Math.max(40, Math.min(90, prev.weather.current.humidity + (Math.random() - 0.5) * 10))
          }
        },
        market: {
          ...prev.market,
          maize: { ...prev.market.maize, price: prev.market.maize.price + (Math.random() - 0.5) * 10 },
          rice: { ...prev.market.rice, price: prev.market.rice.price + (Math.random() - 0.5) * 8 },
          beans: { ...prev.market.beans, price: prev.market.beans.price + (Math.random() - 0.5) * 6 }
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const crops = [
    { id: 'maize', name: 'Maize', icon: Leaf, color: 'green' },
    { id: 'rice', name: 'Rice', icon: Sun, color: 'yellow' },
    { id: 'beans', name: 'Beans', icon: Target, color: 'orange' },
    { id: 'cassava', name: 'Cassava', icon: Award, color: 'purple' }
  ]

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Agricultural Intelligence</h1>
            <p className="text-green-100 text-sm md:text-base">Smart farming powered by AI</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">{Math.round(realTimeData.weather.current.temp)}°C</p>
            <p className="text-xs md:text-sm text-green-100">Temperature</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Droplets className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">{realTimeData.weather.current.humidity}%</p>
            <p className="text-xs md:text-sm text-green-100">Humidity</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Wind className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">{realTimeData.weather.current.wind} km/h</p>
            <p className="text-xs md:text-sm text-green-100">Wind Speed</p>
          </div>
        </div>
      </div>

      {/* Crop Selection */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 shadow-xl">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">Select Crop</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crops.map((crop) => {
            const IconComponent = crop.icon
            const isSelected = selectedCrop === crop.id
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-3 md:p-4 rounded-2xl transition-all duration-300 transform ${
                  isSelected 
                    ? `bg-gradient-to-r from-${crop.color}-500 to-${crop.color}-600 text-white shadow-lg scale-105` 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-105'
                }`}
              >
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                <p className="text-sm md:text-base font-semibold">{crop.name}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Market Prices */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Market Prices (₦/kg)</h3>
        <div className="space-y-4">
          {Object.entries(realTimeData.market).map(([crop, data]) => (
            <div key={crop} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  data.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 capitalize">{crop}</p>
                  <p className="text-sm text-gray-600">Volume: {data.volume} tons</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">₦{data.price}</p>
                <p className={`text-sm font-semibold ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.trend === 'up' ? '+' : ''}{data.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Forecast */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">7-Day Weather Forecast</h3>
        <div className="space-y-3">
          {realTimeData.weather.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  {day.condition === 'Sunny' ? <Sun className="w-6 h-6 text-white" /> :
                   day.condition === 'Rainy' ? <Droplets className="w-6 h-6 text-white" /> :
                   <Cloud className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{day.day}</p>
                  <p className="text-sm text-gray-600">{day.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">{day.high}°</p>
                  <p className="text-sm text-gray-600">{day.low}°</p>
                </div>
                <div className="text-center">
                  <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">{day.rain}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soil Analysis */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Soil Analysis</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <Droplets className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{realTimeData.soil.moisture}%</p>
            <p className="text-sm text-gray-600">Moisture</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{realTimeData.soil.ph}</p>
            <p className="text-sm text-gray-600">pH Level</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Nutrient Levels</h4>
          {Object.entries(realTimeData.soil.nutrients).map(([nutrient, level]) => (
            <div key={nutrient} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{nutrient}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                    style={{ width: `${level}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">{level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          {realTimeData.recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              rec.priority === 'high' ? 'bg-red-50 border-red-500' :
              rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-red-100' :
                  rec.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {rec.priority === 'high' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                   rec.priority === 'medium' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                   <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 capitalize">{rec.type} Recommendation</p>
                  <p className="text-sm text-gray-600">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5" />
              <span className="font-semibold">Market Analysis</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <PieChart className="w-5 h-5" />
              <span className="font-semibold">Yield Prediction</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <LineChart className="w-5 h-5" />
              <span className="font-semibold">Growth Trends</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">AI Advisor</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}