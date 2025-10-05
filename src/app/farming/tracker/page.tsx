'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarIcon,
  SunIcon,
  CloudIcon as CloudRainIcon,
  SparklesIcon as SeedlingIcon,
  ScissorsIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  BellIcon,
  ChartBarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { MobileAppHeader } from '@/components/mobile-app-header'
import { MobileFAB } from '@/components/mobile-fab'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function FarmingTrackerPage() {
  const [selectedCrop, setSelectedCrop] = useState('maize')
  const [selectedLocation, setSelectedLocation] = useState('Lagos, Nigeria')
  const [currentPhase, setCurrentPhase] = useState('planting')
  const [trackingData, setTrackingData] = useState({
    plantingDate: new Date(),
    expectedHarvest: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days from now
    growthStage: 'seedling',
    daysSincePlanting: 15,
    progress: 25
  })

  const crops = [
    { id: 'maize', name: 'Maize', icon: '🌽', cycle: 120, season: 'rainy' },
    { id: 'rice', name: 'Rice', icon: '🌾', cycle: 90, season: 'rainy' },
    { id: 'cassava', name: 'Cassava', icon: '🥔', cycle: 300, season: 'all' },
    { id: 'yam', name: 'Yam', icon: '🍠', cycle: 180, season: 'rainy' },
    { id: 'beans', name: 'Beans', icon: '🫘', cycle: 60, season: 'rainy' },
    { id: 'tomato', name: 'Tomato', icon: '🍅', cycle: 90, season: 'dry' },
    { id: 'pepper', name: 'Pepper', icon: '🌶️', cycle: 120, season: 'dry' },
    { id: 'onion', name: 'Onion', icon: '🧅', cycle: 150, season: 'dry' }
  ]

  const farmingPhases = [
    { id: 'planning', name: 'Planning Phase', icon: LightBulbIcon, color: 'blue', duration: 30 },
    { id: 'planting', name: 'Planting Phase', icon: SeedlingIcon, color: 'green', duration: 7 },
    { id: 'germination', name: 'Germination', icon: SunIcon, color: 'yellow', duration: 14 },
    { id: 'vegetative', name: 'Vegetative Growth', icon: TrendingUpIcon, color: 'green', duration: 45 },
    { id: 'flowering', name: 'Flowering', icon: HeartIcon, color: 'pink', duration: 21 },
    { id: 'fruiting', name: 'Fruiting', icon: StarIcon, color: 'purple', duration: 30 },
    { id: 'harvesting', name: 'Harvesting', icon: ScissorsIcon, color: 'orange', duration: 14 },
    { id: 'post-harvest', name: 'Post-Harvest', icon: CheckCircleIcon, color: 'gray', duration: 7 }
  ]

  const predictions = [
    {
      type: 'weather',
      title: 'Weather Prediction',
      icon: CloudRainIcon,
      color: 'blue',
      prediction: 'Rain expected in 3 days',
      confidence: 85,
      recommendation: 'Prepare for irrigation if needed'
    },
    {
      type: 'pest',
      title: 'Pest Risk Assessment',
      icon: ExclamationTriangleIcon,
      color: 'red',
      prediction: 'Low pest risk this week',
      confidence: 90,
      recommendation: 'Continue monitoring, no treatment needed'
    },
    {
      type: 'harvest',
      title: 'Harvest Prediction',
      icon: ScissorsIcon,
      color: 'green',
      prediction: 'Ready for harvest in 45 days',
      confidence: 78,
      recommendation: 'Start preparing harvesting tools'
    },
    {
      type: 'market',
      title: 'Market Price Forecast',
      icon: TrendingUpIcon,
      color: 'purple',
      prediction: 'Prices expected to rise 15%',
      confidence: 70,
      recommendation: 'Consider holding harvest for better prices'
    }
  ]

  const milestones = [
    {
      id: 1,
      title: 'Seeds Planted',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      completed: true,
      description: 'Maize seeds planted successfully'
    },
    {
      id: 2,
      title: 'First Sprouts',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      completed: true,
      description: 'First seedlings emerged from soil'
    },
    {
      id: 3,
      title: 'First Weeding',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Time for first weeding session'
    },
    {
      id: 4,
      title: 'Fertilizer Application',
      date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Apply first round of fertilizer'
    },
    {
      id: 5,
      title: 'Flowering Begins',
      date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Crop should start flowering'
    },
    {
      id: 6,
      title: 'Harvest Ready',
      date: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Crop ready for harvesting'
    }
  ]

  const selectedCropData = crops.find(crop => crop.id === selectedCrop)
  const currentPhaseData = farmingPhases.find(phase => phase.id === currentPhase)

  const calculateProgress = () => {
    const totalDays = selectedCropData?.cycle || 120
    const daysPassed = trackingData.daysSincePlanting
    return Math.min((daysPassed / totalDays) * 100, 100)
  }

  const getNextMilestone = () => {
    return milestones.find(milestone => !milestone.completed)
  }

  const getDaysUntilHarvest = () => {
    const totalDays = selectedCropData?.cycle || 120
    const daysPassed = trackingData.daysSincePlanting
    return Math.max(totalDays - daysPassed, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <MobileAppHeader 
        title="Farming Tracker"
        subtitle="Track your crops and predict outcomes"
        showNotifications={true}
        notificationCount={3}
      />

      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">
        {/* Crop Selection */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Crop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedCrop === crop.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{crop.icon}</div>
                  <div className="font-medium text-gray-900 text-sm">{crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.cycle} days</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Current Phase */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SunIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Current Phase</h3>
                <p className="text-sm text-gray-600">Growth Stage</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {currentPhaseData?.name || 'Planting'}
            </div>
            <div className="text-sm text-gray-600">
              {trackingData.daysSincePlanting} days since planting
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Progress</h3>
                <p className="text-sm text-gray-600">Growth Completion</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {Math.round(calculateProgress())}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Days to Harvest */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Harvest</h3>
                <p className="text-sm text-gray-600">Days Remaining</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {getDaysUntilHarvest()} days
            </div>
            <div className="text-sm text-gray-600">
              Expected: {trackingData.expectedHarvest.toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* Predictions */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {predictions.map((prediction, index) => {
              const Icon = prediction.icon
              return (
                <div key={prediction.type} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 bg-${prediction.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${prediction.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                      <div className="text-sm text-gray-500">
                        {prediction.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {prediction.prediction}
                    </div>
                    <div className="text-xs text-gray-600">
                      {prediction.recommendation}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`bg-${prediction.color}-500 h-1 rounded-full`}
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Farming Timeline */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Farming Timeline</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.completed 
                      ? 'bg-green-100' 
                      : index === milestones.findIndex(m => !m.completed)
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    ) : index === milestones.findIndex(m => !m.completed) ? (
                      <BellIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${
                        milestone.completed ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {milestone.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {milestone.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {milestone.description}
                    </p>
                    {index === milestones.findIndex(m => !m.completed) && (
                      <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Next Milestone
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Growth Phases */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Growth Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {farmingPhases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = phase.id === currentPhase
              const isCompleted = index < farmingPhases.findIndex(p => p.id === currentPhase)
              
              return (
                <div
                  key={phase.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isActive
                      ? `border-${phase.color}-500 bg-${phase.color}-50`
                      : isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive 
                        ? `bg-${phase.color}-100` 
                        : isCompleted
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        isActive 
                          ? `text-${phase.color}-600` 
                          : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm ${
                        isActive ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {phase.name}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {phase.duration} days
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`bg-${phase.color}-500 h-1 rounded-full`}
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                  )}
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
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BellIcon className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Set Reminder</div>
                <div className="text-sm text-gray-600">Get notified for next milestone</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">View Analytics</div>
                <div className="text-sm text-gray-600">Detailed growth analysis</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SunIcon className="w-6 h-6 text-yellow-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Weather Check</div>
                <div className="text-sm text-gray-600">Current weather conditions</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <MobileFAB 
        onAIChat={() => window.location.href = '/ai/chat'}
        onCamera={() => console.log('Camera action')}
        onVoice={() => console.log('Voice action')}
        onMessage={() => console.log('Message action')}
      />
    </div>
  )
}
