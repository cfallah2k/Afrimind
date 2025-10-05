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
  CalendarDaysIcon,
  MicrophoneIcon
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
  const [selectedLocation, setSelectedLocation] = useState('Monrovia, Liberia')
  const [currentPhase, setCurrentPhase] = useState('planting')
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPredictions, setShowPredictions] = useState(false)
  const [predictionData, setPredictionData] = useState<any>(null)
  const [farmingEntries, setFarmingEntries] = useState<any[]>([])
  const [savedPhotos, setSavedPhotos] = useState<any[]>([])
  const [savedVoiceNotes, setSavedVoiceNotes] = useState<any[]>([])
  const [trackingData, setTrackingData] = useState({
    plantingDate: new Date(),
    expectedHarvest: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    growthStage: 'seedling',
    daysSincePlanting: 15,
    progress: 25
  })

  // Load saved data on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('farmingEntries') || '[]')
    const savedPhotos = JSON.parse(localStorage.getItem('cropPhotos') || '[]')
    const savedVoiceNotes = JSON.parse(localStorage.getItem('voiceNotes') || '[]')
    
    setFarmingEntries(savedEntries)
    setSavedPhotos(savedPhotos)
    setSavedVoiceNotes(savedVoiceNotes)
  }, [])

  // Add save functions to window for modal callbacks
  useEffect(() => {
    (window as any).saveCropPhoto = (imageSrc: string) => {
      // Save crop photo to local storage
      const newPhoto = {
        id: Date.now(),
        src: imageSrc,
        crop: selectedCrop,
        location: selectedLocation,
        date: new Date().toISOString(),
        timestamp: Date.now()
      }
      const updatedPhotos = [...savedPhotos, newPhoto]
      setSavedPhotos(updatedPhotos)
      localStorage.setItem('cropPhotos', JSON.stringify(updatedPhotos))
      
      // Close modal and show success
      document.querySelector('.fixed')?.remove()
      alert('Crop photo saved successfully!')
    }

    (window as any).saveVoiceNote = (audioUrl: string) => {
      // Save voice note to local storage
      const newNote = {
        id: Date.now(),
        url: audioUrl,
        crop: selectedCrop,
        location: selectedLocation,
        date: new Date().toISOString(),
        timestamp: Date.now()
      }
      const updatedNotes = [...savedVoiceNotes, newNote]
      setSavedVoiceNotes(updatedNotes)
      localStorage.setItem('voiceNotes', JSON.stringify(updatedNotes))
      
      // Close modal and show success
      document.querySelector('.fixed')?.remove()
      alert('Voice note saved successfully!')
    }
  }, [selectedCrop, selectedLocation, savedPhotos, savedVoiceNotes])

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

  // Smart AI predictions based on Liberia's climate and farming conditions
  const getSmartPredictions = () => {
    const currentMonth = new Date().getMonth() + 1
    const isRainySeason = currentMonth >= 4 && currentMonth <= 10
    const isDrySeason = currentMonth >= 11 || currentMonth <= 3
    
    return [
      {
        type: 'weather',
        title: 'Weather',
        icon: CloudRainIcon,
        color: 'blue',
        prediction: isRainySeason ? 'Heavy rains expected' : 'Dry season conditions',
        confidence: 92,
        recommendation: isRainySeason ? 'Drainage preparation needed' : 'Irrigation planning required'
      },
      {
        type: 'pest',
        title: 'Pest Risk',
        icon: ExclamationTriangleIcon,
        color: 'red',
        prediction: isRainySeason ? 'High pest activity expected' : 'Low pest risk',
        confidence: 88,
        recommendation: isRainySeason ? 'Apply organic pesticides' : 'Monitor for termites'
      },
      {
        type: 'harvest',
        title: 'Harvest',
        icon: ScissorsIcon,
        color: 'green',
        prediction: `Ready in ${getDaysUntilHarvest()} days`,
        confidence: 85,
        recommendation: 'Prepare storage facilities'
      },
      {
        type: 'market',
        title: 'Market Price',
        icon: TrendingUpIcon,
        color: 'purple',
        prediction: isRainySeason ? 'Prices stable' : 'Prices may increase',
        confidence: 75,
        recommendation: isRainySeason ? 'Hold for better prices' : 'Consider early sale'
      },
      {
        type: 'soil',
        title: 'Soil Health',
        icon: SunIcon,
        color: 'yellow',
        prediction: isRainySeason ? 'Good moisture levels' : 'Soil needs watering',
        confidence: 80,
        recommendation: isRainySeason ? 'Test soil pH' : 'Add organic matter'
      },
      {
        type: 'disease',
        title: 'Disease Risk',
        icon: ExclamationTriangleIcon,
        color: 'orange',
        prediction: isRainySeason ? 'Fungal diseases likely' : 'Low disease risk',
        confidence: 82,
        recommendation: isRainySeason ? 'Apply fungicide' : 'Maintain plant spacing'
      }
    ]
  }

  const predictions = getSmartPredictions()

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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

        {/* Recent Farming Entries */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Recent Entries</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            {farmingEntries.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
                <p className="text-gray-600 mb-4">Start tracking your farming activities by adding your first entry</p>
                <button
                  onClick={() => setShowAddEntry(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add First Entry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {farmingEntries.slice(0, 5).map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <DocumentTextIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{entry.activity || 'Farming Activity'}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {entry.notes || 'No notes provided'}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {entry.crop}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {entry.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {farmingEntries.length > 5 && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowCalendar(true)}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      View all {farmingEntries.length} entries in calendar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Saved Photos & Voice Notes */}
        {(savedPhotos.length > 0 || savedVoiceNotes.length > 0) && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Media Library</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Photos */}
              {savedPhotos.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <PhotoIcon className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Crop Photos ({savedPhotos.length})</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {savedPhotos.slice(0, 6).map((photo) => (
                      <div key={photo.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={photo.src} 
                          alt="Crop photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Voice Notes */}
              {savedVoiceNotes.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MicrophoneIcon className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Voice Notes ({savedVoiceNotes.length})</h3>
                  </div>
                  <div className="space-y-2">
                    {savedVoiceNotes.slice(0, 3).map((note) => (
                      <div key={note.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <audio controls className="flex-1">
                          <source src={note.url} type="audio/wav" />
                        </audio>
                        <span className="text-xs text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <MobileFAB 
        onAIChat={() => window.location.href = '/ai/chat'}
        onCamera={() => {
          // Open camera for photo capture
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.capture = 'environment'
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
              // Create a preview and allow user to save the photo
              const reader = new FileReader()
              reader.onload = (e) => {
                const img = new Image()
                img.src = e.target?.result as string
                img.onload = () => {
                  // Show photo preview modal
                  const modal = document.createElement('div')
                  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                  modal.innerHTML = `
                    <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                      <h3 class="text-lg font-semibold mb-4">Crop Photo</h3>
                      <img src="${img.src}" alt="Crop photo" class="w-full h-64 object-cover rounded-lg mb-4">
                      <div class="flex space-x-3">
                        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
                        <button onclick="saveCropPhoto('${img.src}')" class="px-4 py-2 bg-green-600 text-white rounded-lg">Save Photo</button>
                      </div>
                    </div>
                  `
                  document.body.appendChild(modal)
                }
              }
              reader.readAsDataURL(file)
            }
          }
          input.click()
        }}
        onVoice={() => {
          // Voice recording functionality
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
              .then(stream => {
                const mediaRecorder = new MediaRecorder(stream)
                const chunks: Blob[] = []
                
                mediaRecorder.ondataavailable = (e) => {
                  chunks.push(e.data)
                }
                
                mediaRecorder.onstop = () => {
                  const blob = new Blob(chunks, { type: 'audio/wav' })
                  const url = URL.createObjectURL(blob)
                  
                  // Show voice note modal
                  const modal = document.createElement('div')
                  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                  modal.innerHTML = `
                    <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                      <h3 class="text-lg font-semibold mb-4">Voice Note</h3>
                      <audio controls class="w-full mb-4">
                        <source src="${url}" type="audio/wav">
                      </audio>
                      <div class="flex space-x-3">
                        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
                        <button onclick="saveVoiceNote('${url}')" class="px-4 py-2 bg-green-600 text-white rounded-lg">Save Note</button>
                      </div>
                    </div>
                  `
                  document.body.appendChild(modal)
                }
                
                // Start recording
                mediaRecorder.start()
                
                // Show recording interface (string-based to avoid TS DOM type quirks)
                const recordingHtml = `
                  <div class="afm-recording-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
                      <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                      <h3 class="text-lg font-semibold mb-2">Recording Voice Note</h3>
                      <p class="text-gray-600 mb-4">Speak about your farming activities...</p>
                      <button onclick="stopRecording()" class="px-6 py-2 bg-red-600 text-white rounded-lg">Stop Recording</button>
                    </div>
                  </div>
                `
                document.body.insertAdjacentHTML('beforeend', recordingHtml)
                const recordingModal = document.querySelector('.afm-recording-modal') as HTMLDivElement | null

                // Stop recording function
                const stopRecording = () => {
                  mediaRecorder.stop()
                  stream.getTracks().forEach(track => track.stop())
                  if (recordingModal && recordingModal.parentNode) {
                    recordingModal.parentNode.removeChild(recordingModal)
                  }
                }
                
                // Add stop function to window for button
                (window as any).stopRecording = stopRecording
                
                // Auto stop after 30 seconds
                const timeoutId = setTimeout(() => {
                  stopRecording()
                }, 30000)
              })
              .catch(err => {
                alert('Microphone access denied. Please allow microphone access to record voice notes.')
                console.error('Error accessing microphone:', err)
              })
          } else {
            alert('Voice recording not supported on this device.')
          }
        }}
        onMessage={() => {
          // Open farmer community/messaging
          const modalHtml = `
            <div class="afm-community-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
                <h3 class="text-lg font-semibold mb-4">Farmer Community</h3>
                <div class="space-y-3">
                  <button onclick="openCommunityChat()" class="w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    💬 Community Chat
                  </button>
                  <button onclick="openExpertAdvice()" class="w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    👨‍🌾 Expert Advice
                  </button>
                  <button onclick="openMarketplace()" class="w-full p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    🛒 Marketplace
                  </button>
                  <button onclick="openEvents()" class="w-full p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                    📅 Farming Events
                  </button>
                </div>
                <div class="mt-4 flex space-x-3">
                  <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Close</button>
                </div>
              </div>
            </div>
          `
          document.body.insertAdjacentHTML('beforeend', modalHtml)
          const modal = document.querySelector('.afm-community-modal') as HTMLDivElement | null
          
          // Add functions to window
          (window as any).openCommunityChat = () => {
            if (modal && modal.parentNode) {
              modal.parentNode.removeChild(modal)
            }
            alert('Community Chat: Connect with local farmers in your area')
          }
          (window as any).openExpertAdvice = () => {
            if (modal && modal.parentNode) {
              modal.parentNode.removeChild(modal)
            }
            alert('Expert Advice: Get guidance from agricultural experts')
          }
          (window as any).openMarketplace = () => {
            if (modal && modal.parentNode) {
              modal.parentNode.removeChild(modal)
            }
            alert('Marketplace: Buy and sell farming equipment and supplies')
          }
          (window as any).openEvents = () => {
            if (modal && modal.parentNode) {
              modal.parentNode.removeChild(modal)
            }
            alert('Farming Events: Join workshops and training sessions')
          }
        }}
      />

      {/* Add Entry Modal */}
      <AddEntryModal
        isOpen={showAddEntry}
        onClose={() => setShowAddEntry(false)}
        onSave={(entry) => {
          const newEntry = {
            id: Date.now(),
            ...entry,
            crop: selectedCrop,
            location: selectedLocation,
            date: new Date().toISOString(),
            timestamp: Date.now()
          }
          const updatedEntries = [...farmingEntries, newEntry]
          setFarmingEntries(updatedEntries)
          localStorage.setItem('farmingEntries', JSON.stringify(updatedEntries))
          setShowAddEntry(false)
          alert('Farming entry saved successfully!')
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
        farmingEntries={farmingEntries}
        savedPhotos={savedPhotos}
        savedVoiceNotes={savedVoiceNotes}
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