'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SunIcon,
  CloudIcon,
  CloudIcon as CloudRainIcon,
  WifiIcon as WindIcon,
  EyeIcon,
  FireIcon as ThermometerIcon
} from '@heroicons/react/24/outline'

interface WeatherWidgetProps {
  location: string
}

export function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setWeatherData({
          location,
          current: {
            temperature: 28,
            humidity: 75,
            rainfall: 15,
            windSpeed: 12,
            conditions: 'partly_cloudy',
            visibility: 10
          },
          forecast: [
            { day: 'Today', high: 32, low: 24, conditions: 'partly_cloudy', rainfall: 5 },
            { day: 'Tomorrow', high: 30, low: 22, conditions: 'sunny', rainfall: 0 },
            { day: 'Day 3', high: 29, low: 21, conditions: 'cloudy', rainfall: 20 },
            { day: 'Day 4', high: 31, low: 23, conditions: 'partly_cloudy', rainfall: 8 },
            { day: 'Day 5', high: 33, low: 25, conditions: 'sunny', rainfall: 0 },
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchWeatherData()
  }, [location])

  const getWeatherIcon = (conditions: string) => {
    switch (conditions) {
      case 'sunny':
        return <SunIcon className="w-8 h-8 text-warning-500" />
      case 'cloudy':
        return <CloudIcon className="w-8 h-8 text-gray-500" />
      case 'partly_cloudy':
        return <CloudIcon className="w-8 h-8 text-gray-400" />
      case 'rainy':
        return <CloudRainIcon className="w-8 h-8 text-primary-500" />
      default:
        return <SunIcon className="w-8 h-8 text-warning-500" />
    }
  }

  const getWeatherColor = (conditions: string) => {
    switch (conditions) {
      case 'sunny':
        return 'bg-warning-100 text-warning-800'
      case 'cloudy':
        return 'bg-gray-100 text-gray-800'
      case 'partly_cloudy':
        return 'bg-gray-100 text-gray-800'
      case 'rainy':
        return 'bg-primary-100 text-primary-800'
      default:
        return 'bg-warning-100 text-warning-800'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Weather Forecast</h2>
        <span className="text-sm text-gray-500">{location}</span>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold mb-2">
              {weatherData?.current.temperature}°C
            </div>
            <div className="text-lg capitalize">
              {weatherData?.current.conditions.replace('_', ' ')}
            </div>
            <div className="text-sm opacity-90">
              Feels like {weatherData?.current.temperature + 2}°C
            </div>
          </div>
          <div className="text-right">
            {getWeatherIcon(weatherData?.current.conditions)}
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: ThermometerIcon, label: 'Humidity', value: `${weatherData?.current.humidity}%` },
          { icon: CloudRainIcon, label: 'Rainfall', value: `${weatherData?.current.rainfall}mm` },
          { icon: WindIcon, label: 'Wind', value: `${weatherData?.current.windSpeed} km/h` },
          { icon: EyeIcon, label: 'Visibility', value: `${weatherData?.current.visibility} km` },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <item.icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="font-semibold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {weatherData?.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 mb-2">{day.day}</div>
              <div className="mb-2">
                {getWeatherIcon(day.conditions)}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {day.high}°
              </div>
              <div className="text-sm text-gray-600">
                {day.low}°
              </div>
              {day.rainfall > 0 && (
                <div className="text-xs text-primary-600 mt-1">
                  {day.rainfall}mm
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural Recommendations */}
      <div className="mt-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-2">Farming Recommendations</h4>
        <div className="text-sm text-success-700">
          {weatherData?.current.rainfall > 10 ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span>Good conditions for planting. Soil moisture is adequate.</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <span>Consider irrigation. Rainfall is below optimal levels.</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
