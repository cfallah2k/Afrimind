'use client'

import { useState } from 'react'
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
  Clock
} from 'lucide-react'

export default function AgricultureTab() {
  const [selectedCrop, setSelectedCrop] = useState('maize')

  const weatherData = {
    current: { temp: 28, condition: 'Partly Cloudy', humidity: 65 },
    forecast: [
      { day: 'Today', high: 30, low: 22, condition: 'Sunny', rain: 10 },
      { day: 'Tomorrow', high: 28, low: 20, condition: 'Rainy', rain: 80 },
      { day: 'Day 3', high: 26, low: 18, condition: 'Cloudy', rain: 40 },
    ]
  }

  const marketData = {
    maize: { price: 280, change: 15, trend: 'up' },
    beans: { price: 320, change: -5, trend: 'down' },
    rice: { price: 180, change: 8, trend: 'up' }
  }

  const farmingTips = [
    { title: 'Planting Season', description: 'Optimal planting time is March 15-30', status: 'good' },
    { title: 'Soil Preparation', description: 'Plow and add organic matter', status: 'pending' },
    { title: 'Pest Control', description: 'Watch for armyworms in 2 weeks', status: 'warning' }
  ]

  return (
    <div className="space-y-6">
      {/* Weather Card */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Current Weather</h3>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            Nairobi
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mr-4">
              <Sun className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{weatherData.current.temp}°C</p>
              <p className="text-gray-600">{weatherData.current.condition}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Droplets className="w-4 h-4 mr-1" />
              {weatherData.current.humidity}%
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Thermometer className="w-4 h-4 mr-1" />
              Feels like 30°C
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  {day.condition === 'Sunny' ? <Sun className="w-4 h-4 text-yellow-600" /> :
                   day.condition === 'Rainy' ? <Droplets className="w-4 h-4 text-blue-600" /> :
                   <Cloud className="w-4 h-4 text-gray-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{day.day}</p>
                  <p className="text-sm text-gray-600">{day.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{day.high}°/{day.low}°</p>
                <p className="text-sm text-gray-600">{day.rain}% rain</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Prices */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Market Prices</h3>
        <div className="space-y-3">
          {Object.entries(marketData).map(([crop, data]) => (
            <div key={crop} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  data.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800 capitalize">{crop}</p>
                  <p className="text-sm text-gray-600">Per 90kg bag</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">${data.price}</p>
                <p className={`text-sm flex items-center ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${
                    data.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  {data.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Tips */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Farming Tips</h3>
        <div className="space-y-3">
          {farmingTips.map((tip, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-xl">
              <div className="mr-3 mt-1">
                {tip.status === 'good' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {tip.status === 'warning' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                {tip.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
              </div>
              <div>
                <p className="font-medium text-gray-800">{tip.title}</p>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crop Selection */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Crop Information</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['maize', 'beans', 'rice'].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                selectedCrop === crop
                  ? 'bg-africa-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {crop.charAt(0).toUpperCase() + crop.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 bg-africa-50 rounded-xl">
          <h4 className="font-bold text-gray-800 mb-2">
            {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Growing Guide
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Planting depth: 2-3 cm</p>
            <p>• Spacing: 75cm between rows</p>
            <p>• Watering: 2-3 times per week</p>
            <p>• Harvest time: 3-4 months</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-primary">
          <Calendar className="w-4 h-4 mr-2" />
          Planting Calendar
        </button>
        <button className="btn-secondary">
          <TrendingUp className="w-4 h-4 mr-2" />
          Market Trends
        </button>
      </div>
    </div>
  )
}
