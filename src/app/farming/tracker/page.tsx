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
  StarIcon,
  PlusIcon,
  PhotoIcon,
  DocumentTextIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { MobileFAB } from '@/components/mobile-fab'
import { AddEntryModal } from '@/components/add-entry-modal'
import { FarmingCalendar } from '@/components/farming-calendar'
import { CropPredictionModal } from '@/components/crop-prediction-modal'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function FarmingTrackerPage() {
  const [selectedCrop, setSelectedCrop] = useState('maize')
  const [selectedLocation, setSelectedLocation] = useState('Lagos, Nigeria')
  const [currentPhase, setCurrentPhase] = useState('planting')
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPredictions, setShowPredictions] = useState(false)
  const [predictionData, setPredictionData] = useState<any>(null)
  const [trackingData, setTrackingData] = useState({
    plantingDate: new Date(),
    expectedHarvest: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    growthStage: 'seedling',
    daysSincePlanting: 15,
    progress: 25
  })

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾', cycle: 120, season: 'rainy', importance: 'Staple food' },
    { id: 'cassava', name: 'Cassava', icon: '🥔', cycle: 300, season: 'all', importance: 'Staple food' },
    { id: 'cocoa', name: 'Cocoa', icon: '🍫', cycle: 365, season: 'all', importance: 'Cash crop' },
    { id: 'coffee', name: 'Coffee', icon: '☕', cycle: 365, season: 'all', importance: 'Cash crop' },
    { id: 'rubber', name: 'Rubber', icon: '🛞', cycle: 2555, season: 'all', importance: 'Cash crop' },
    { id: 'palm_oil', name: 'Palm Oil', icon: '🫒', cycle: 365, season: 'all', importance: 'Cash crop' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬', cycle: 60, season: 'all', importance: 'Food security' },
    { id: 'maize', name: 'Maize', icon: '🌽', cycle: 90, season: 'rainy', importance: 'Food security' }
  ]

  const farmingPhases = [
    { id: 'planning', name: 'Planning', icon: LightBulbIcon, color: 'blue', duration: 30 },
    { id: 'planting', name: 'Planting', icon: SeedlingIcon, color: 'green', duration: 7 },
    { id: 'germination', name: 'Germination', icon: SunIcon, color: 'yellow', duration: 14 },
    { id: 'vegetative', name: 'Vegetative', icon: TrendingUpIcon, color: 'green', duration: 45 },
    { id: 'flowering', name: 'Flowering', icon: HeartIcon, color: 'pink', duration: 21 },
    { id: 'fruiting', name: 'Fruiting', icon: StarIcon, color: 'purple', duration: 30 },
    { id: 'harvesting', name: 'Harvesting', icon: ScissorsIcon, color: 'orange', duration: 14 },
    { id: 'post-harvest', name: 'Post-Harvest', icon: CheckCircleIcon, color: 'gray', duration: 7 }
  ]

  const predictions = [
    {
      type: 'weather',
      title: 'Weather',
      icon: CloudRainIcon,
      color: 'blue',
      prediction: 'Rain in 3 days',
      confidence: 85,
      recommendation: 'Prepare irrigation'
    },
    {
      type: 'pest',
      title: 'Pest Risk',
      icon: ExclamationTriangleIcon,
      color: 'red',
      prediction: 'Low risk this week',
      confidence: 90,
      recommendation: 'Continue monitoring'
    },
    {
      type: 'harvest',
      title: 'Harvest',
      icon: ScissorsIcon,
      color: 'green',
      prediction: 'Ready in 45 days',
      confidence: 78,
      recommendation: 'Prepare tools'
    },
    {
      type: 'market',
      title: 'Market Price',
      icon: TrendingUpIcon,
      color: 'purple',
      prediction: 'Prices up 15%',
      confidence: 70,
      recommendation: 'Consider holding'
    }
  ]

  const milestones = [
    {
      id: 1,
      title: 'Seeds Planted',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      completed: true,
      description: 'Maize seeds planted'
    },
    {
      id: 2,
      title: 'First Sprouts',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      completed: true,
      description: 'Seedlings emerged'
    },
    {
      id: 3,
      title: 'First Weeding',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Time for weeding'
    },
    {
      id: 4,
      title: 'Fertilizer',
      date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Apply fertilizer'
    },
    {
      id: 5,
      title: 'Flowering',
      date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Crop flowering'
    },
    {
      id: 6,
      title: 'Harvest Ready',
      date: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000),
      completed: false,
      description: 'Ready for harvest'
    }
  ]

  const selectedCropData = crops.find(crop => crop.id === selectedCrop)
  const currentPhaseData = farmingPhases.find(phase => phase.id === currentPhase)

  const calculateProgress = () => {
    const totalDays = selectedCropData?.cycle || 120
    const daysPassed = trackingData.daysSincePlanting
    return Math.min((daysPassed / totalDays) * 100, 100)
  }

  const getDaysUntilHarvest = () => {
    const totalDays = selectedCropData?.cycle || 120
    const daysPassed = trackingData.daysSincePlanting
    return Math.max(totalDays - daysPassed, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Farming Tracker 🌍</h1>
              <p className="text-sm text-gray-600">Track your crops in West Africa</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="View Calendar"
              >
                <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowAddEntry(!showAddEntry)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Add Entry"
              >
                <PlusIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Tap <PlusIcon className="w-3 h-3 inline mx-1" /> to add entries, <CalendarDaysIcon className="w-3 h-3 inline mx-1" /> for calendar
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farming Tracker 🌍</h1>
              <p className="text-gray-600">Track your crops in West Africa and predict outcomes</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CalendarDaysIcon className="w-4 h-4" />
                <span>View Calendar</span>
              </button>
              <button
                onClick={() => setShowAddEntry(!showAddEntry)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Entry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">
        {/* Crop Selection */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Select Your Crop</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PlusIcon className="w-4 h-4" />
              <span>Add Entry</span>
              <span>•</span>
              <CalendarDaysIcon className="w-4 h-4" />
              <span>View Calendar</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Click the <PlusIcon className="w-4 h-4 inline mx-1" /> icon to manually add entries and <CalendarDaysIcon className="w-4 h-4 inline mx-1" /> to view your farming calendar
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-8 gap-3 lg:gap-4">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-3 lg:p-4 rounded-lg border-2 transition-colors ${
                  selectedCrop === crop.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl mb-1 lg:mb-2">{crop.icon}</div>
                  <div className="font-medium text-gray-900 text-xs lg:text-sm">{crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.cycle}d</div>
                  <div className="text-xs text-blue-600 font-medium">{crop.importance}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Current Phase */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center space-x-3 mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SunIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Current Phase</h3>
                <p className="text-xs lg:text-sm text-gray-600">Growth Stage</p>
              </div>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
              {currentPhaseData?.name || 'Planting'}
            </div>
            <div className="text-xs lg:text-sm text-gray-600">
              {trackingData.daysSincePlanting} days since planting
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center space-x-3 mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Progress</h3>
                <p className="text-xs lg:text-sm text-gray-600">Growth Completion</p>
              </div>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
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
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center space-x-3 mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Harvest</h3>
                <p className="text-xs lg:text-sm text-gray-600">Days Remaining</p>
              </div>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
              {getDaysUntilHarvest()} days
            </div>
            <div className="text-xs lg:text-sm text-gray-600">
              Expected: {trackingData.expectedHarvest.toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* Predictions */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">AI Predictions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {predictions.map((prediction, index) => {
              const Icon = prediction.icon
              return (
                <div key={prediction.type} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-3 lg:mb-4">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 bg-${prediction.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 lg:w-5 lg:h-5 text-${prediction.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{prediction.title}</h3>
                      <div className="text-xs lg:text-sm text-gray-500">
                        {prediction.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs lg:text-sm font-medium text-gray-900 mb-1">
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
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Farming Timeline</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="space-y-4 lg:space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start space-x-3 lg:space-x-4">
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
                    milestone.completed 
                      ? 'bg-green-100' 
                      : index === milestones.findIndex(m => !m.completed)
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircleIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    ) : index === milestones.findIndex(m => !m.completed) ? (
                      <BellIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                    ) : (
                      <ClockIcon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold text-sm lg:text-base ${
                        milestone.completed ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {milestone.title}
                      </h3>
                      <span className="text-xs lg:text-sm text-gray-500">
                        {milestone.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">
                      {milestone.description}
                    </p>
                    {index === milestones.findIndex(m => !m.completed) && (
                      <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
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
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Growth Phases</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {farmingPhases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = phase.id === currentPhase
              const isCompleted = index < farmingPhases.findIndex(p => p.id === currentPhase)
              
              return (
                <div
                  key={phase.id}
                  className={`p-3 lg:p-4 rounded-lg border-2 transition-colors ${
                    isActive
                      ? `border-${phase.color}-500 bg-${phase.color}-50`
                      : isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                    <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center ${
                      isActive 
                        ? `bg-${phase.color}-100` 
                        : isCompleted
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-3 h-3 lg:w-4 lg:h-4 ${
                        isActive 
                          ? `text-${phase.color}-600` 
                          : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-xs lg:text-sm ${
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
          className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => setShowPredictions(true)}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <ChartBarIcon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900 text-sm lg:text-base">Get AI Predictions</div>
                <div className="text-xs lg:text-sm text-gray-600">Detailed crop predictions</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                // Set reminder for next milestone
                const nextMilestone = milestones.find(milestone => !milestone.completed)
                if (nextMilestone) {
                  alert(`Reminder set for: ${nextMilestone.title} on ${nextMilestone.date.toLocaleDateString()}`)
                } else {
                  alert('All milestones completed! 🎉')
                }
              }}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BellIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900 text-sm lg:text-base">Set Reminder</div>
                <div className="text-xs lg:text-sm text-gray-600">Get notified for next milestone</div>
              </div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/farming/analytics'}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChartBarIcon className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900 text-sm lg:text-base">View Analytics</div>
                <div className="text-xs lg:text-sm text-gray-600">Detailed growth analysis</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                // Show weather information
                const weatherInfo = {
                  current: 'Sunny, 28°C',
                  humidity: '75%',
                  wind: '5 km/h',
                  forecast: 'Rain expected in 3 days'
                }
                alert(`Current Weather: ${weatherInfo.current}\nHumidity: ${weatherInfo.humidity}\nWind: ${weatherInfo.wind}\nForecast: ${weatherInfo.forecast}`)
              }}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SunIcon className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900 text-sm lg:text-base">Weather Check</div>
                <div className="text-xs lg:text-sm text-gray-600">Current weather conditions</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <MobileFAB 
        onAIChat={() => window.location.href = '/ai/chat'}
        onCamera={() => {
          // Camera action for taking photos of crops
          alert('Camera feature: Take photos of your crops for AI analysis and progress tracking')
        }}
        onVoice={() => {
          // Voice action for voice notes
          alert('Voice feature: Record voice notes about your farming activities')
        }}
        onMessage={() => {
          // Message action for farmer community
          alert('Message feature: Connect with other farmers in your community')
        }}
      />

      {/* Add Entry Modal */}
      <AddEntryModal
        isOpen={showAddEntry}
        onClose={() => setShowAddEntry(false)}
        onSave={(entry) => {
          console.log('New entry saved:', entry)
          // Here you would typically save to your data store
        }}
        onGetPredictions={(cropData) => {
          setPredictionData(cropData)
          setShowPredictions(true)
          setShowAddEntry(false)
        }}
      />

      {/* Farming Calendar Modal */}
      <FarmingCalendar
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
      />

      {/* Crop Prediction Modal */}
      <CropPredictionModal
        isOpen={showPredictions}
        onClose={() => setShowPredictions(false)}
        cropData={predictionData || {
          crop: selectedCrop,
          plantingDate: trackingData.plantingDate.toISOString().split('T')[0],
          location: selectedLocation,
          soilType: 'loamy',
          season: 'rainy'
        }}
      />
    </div>
  )
}