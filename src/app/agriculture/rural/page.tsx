'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SunIcon,
  CloudIcon,
  DropletIcon,
  MapPinIcon,
  DownloadIcon,
  WifiIcon,
  WifiSlashIcon,
  UsersIcon,
  BookOpenIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function RuralAgriculturePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [downloadedContent, setDownloadedContent] = useState<string[]>([])
  const [selectedSeason, setSelectedSeason] = useState('rainy')

  useEffect(() => {
    // Simulate online/offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const seasons = [
    { id: 'rainy', name: 'Rainy Season', months: 'April - October', color: 'blue' },
    { id: 'dry', name: 'Dry Season', months: 'November - March', color: 'yellow' },
    { id: 'harmattan', name: 'Harmattan', months: 'December - February', color: 'orange' }
  ]

  const offlineContent = [
    {
      id: 'farming-guide',
      title: 'Traditional Farming Guide',
      size: '2.3 MB',
      description: 'Complete guide to traditional African farming methods',
      downloaded: downloadedContent.includes('farming-guide'),
      category: 'Education'
    },
    {
      id: 'crop-calendar',
      title: 'Crop Planting Calendar',
      size: '1.1 MB',
      description: 'When to plant different crops in your region',
      downloaded: downloadedContent.includes('crop-calendar'),
      category: 'Planning'
    },
    {
      id: 'pest-control',
      title: 'Natural Pest Control',
      size: '1.8 MB',
      description: 'Organic methods to control pests and diseases',
      downloaded: downloadedContent.includes('pest-control'),
      category: 'Protection'
    },
    {
      id: 'weather-data',
      title: 'Local Weather Patterns',
      size: '3.2 MB',
      description: 'Historical weather data for your area',
      downloaded: downloadedContent.includes('weather-data'),
      category: 'Weather'
    }
  ]

  const communityFeatures = [
    {
      title: 'Village Learning Groups',
      description: 'Learn together with your community',
      icon: UsersIcon,
      color: 'blue',
      features: [
        'Weekly farming discussions',
        'Shared success stories',
        'Group problem solving',
        'Traditional knowledge sharing'
      ]
    },
    {
      title: 'Local Expert Network',
      description: 'Connect with experienced farmers in your area',
      icon: StarIcon,
      color: 'green',
      features: [
        'Find nearby farming experts',
        'Ask questions and get advice',
        'Share your knowledge',
        'Build local connections'
      ]
    },
    {
      title: 'Offline Farming Tools',
      description: 'Access farming tools without internet',
      icon: BookOpenIcon,
      color: 'purple',
      features: [
        'Downloadable guides',
        'Crop planning tools',
        'Weather tracking',
        'Market price history'
      ]
    },
    {
      title: 'Mobile Money Integration',
      description: 'Financial services for rural farmers',
      icon: ShieldCheckIcon,
      color: 'yellow',
      features: [
        'M-Pesa for payments',
        'Agricultural loans',
        'Crop insurance',
        'Market transactions'
      ]
    }
  ]

  const handleDownload = (contentId: string) => {
    setDownloadedContent(prev => [...prev, contentId])
  }

  const handleRemoveDownload = (contentId: string) => {
    setDownloadedContent(prev => prev.filter(id => id !== contentId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <SunIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rural Agriculture</h1>
                <p className="text-gray-600">Designed for farming communities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isOnline ? (
                  <WifiIcon className="w-5 h-5" />
                ) : (
                  <WifiSlashIcon className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Season Selection */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Season</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedSeason === season.id
                    ? `border-${season.color}-500 bg-${season.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 bg-${season.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <SunIcon className={`w-6 h-6 text-${season.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{season.name}</h3>
                  <p className="text-sm text-gray-600">{season.months}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Offline Content */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Offline Content</h2>
            <div className="text-sm text-gray-500">
              {downloadedContent.length} of {offlineContent.length} downloaded
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offlineContent.map((content) => (
              <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{content.size}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{content.category}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {content.downloaded ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <button
                          onClick={() => handleRemoveDownload(content.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(content.id)}
                        disabled={!isOnline}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community Features */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Community Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="bg-white rounded-xl shadow-lg p-6">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Farming Guide</div>
                <div className="text-sm text-gray-600">Step-by-step instructions</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CloudIcon className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Weather Check</div>
                <div className="text-sm text-gray-600">Current conditions</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UsersIcon className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Community Chat</div>
                <div className="text-sm text-gray-600">Talk to other farmers</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
