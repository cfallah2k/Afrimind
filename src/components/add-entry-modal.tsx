'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  PhotoIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  MapPinIcon,
  SunIcon,
  CloudIcon,
  BeakerIcon as DropletIcon,
  ScissorsIcon,
  CheckCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface AddEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (entry: any) => void
  onGetPredictions?: (cropData: any) => void
}

export function AddEntryModal({ isOpen, onClose, onSave, onGetPredictions }: AddEntryModalProps) {
  const [entryType, setEntryType] = useState('observation')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState('sunny')
  const [notes, setNotes] = useState('')
  const [crop, setCrop] = useState('')
  const [soilType, setSoilType] = useState('')
  const [season, setSeason] = useState('')

  const entryTypes = [
    { id: 'observation', name: 'Observation', icon: SunIcon, color: 'blue' },
    { id: 'watering', name: 'Watering', icon: DropletIcon, color: 'blue' },
    { id: 'fertilizing', name: 'Fertilizing', icon: ScissorsIcon, color: 'green' },
    { id: 'harvesting', name: 'Harvesting', icon: ScissorsIcon, color: 'orange' },
    { id: 'pest_control', name: 'Pest Control', icon: CheckCircleIcon, color: 'red' },
    { id: 'weather', name: 'Weather', icon: CloudIcon, color: 'gray' }
  ]

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾', importance: 'Staple food' },
    { id: 'cassava', name: 'Cassava', icon: '🥔', importance: 'Staple food' },
    { id: 'cocoa', name: 'Cocoa', icon: '🍫', importance: 'Cash crop' },
    { id: 'coffee', name: 'Coffee', icon: '☕', importance: 'Cash crop' },
    { id: 'rubber', name: 'Rubber', icon: '🛞', importance: 'Cash crop' },
    { id: 'palm_oil', name: 'Palm Oil', icon: '🫒', importance: 'Cash crop' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬', importance: 'Food security' },
    { id: 'maize', name: 'Maize', icon: '🌽', importance: 'Food security' }
  ]

  const soilTypes = [
    { id: 'red_soil', name: 'Red Soil (Laterite)', description: 'Common in West Africa' },
    { id: 'clay_soil', name: 'Clay Soil', description: 'Found in coastal and inland regions' },
    { id: 'sandy_soil', name: 'Sandy Soil', description: 'Coastal areas and some inland regions' },
    { id: 'alluvial_soil', name: 'Alluvial Soil', description: 'River valleys and floodplains' }
  ]

  const seasons = [
    { id: 'rainy', name: 'Rainy Season (April-October)', description: 'Main growing season' },
    { id: 'dry', name: 'Dry Season (November-March)', description: 'Harvest and preparation season' },
    { id: 'all', name: 'All Year', description: 'Year-round cultivation' }
  ]

  const weatherOptions = [
    { id: 'sunny', name: 'Sunny', icon: SunIcon },
    { id: 'cloudy', name: 'Cloudy', icon: CloudIcon },
    { id: 'rainy', name: 'Rainy', icon: DropletIcon },
    { id: 'stormy', name: 'Stormy', icon: CloudIcon }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const entry = {
      id: Date.now(),
      type: entryType,
      title,
      description,
      date,
      location,
      weather,
      notes,
      crop,
      soilType,
      season,
      createdAt: new Date()
    }
    onSave(entry)
    onClose()
    // Reset form
    setTitle('')
    setDescription('')
    setLocation('')
    setNotes('')
    setCrop('')
    setSoilType('')
    setSeason('')
  }

  const handleGetPredictions = () => {
    if (crop && date && location) {
      const cropData = {
        crop,
        plantingDate: date,
        location,
        soilType,
        season
      }
      onGetPredictions?.(cropData)
    }
  }

  const selectedEntryType = entryTypes.find(type => type.id === entryType)
  const selectedWeather = weatherOptions.find(w => w.id === weather)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Farming Entry</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Entry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {entryTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setEntryType(type.id)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          entryType === type.id
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${
                            entryType === type.id ? `text-${type.color}-600` : 'text-gray-400'
                          }`} />
                          <span className="text-sm font-medium">{type.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter entry title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe what you observed or did"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Field location or coordinates"
                />
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a crop</option>
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.icon} {crop.name} - {crop.importance}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map((soil) => (
                    <option key={soil.id} value={soil.id}>
                      {soil.name} - {soil.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select season</option>
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name} - {season.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weather */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weather
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {weatherOptions.map((weather) => {
                    const Icon = weather.icon
                    return (
                      <button
                        key={weather.id}
                        type="button"
                        onClick={() => setWeather(weather.id)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          weather.id === weather
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${
                            weather.id === weather ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <span className="text-sm font-medium">{weather.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Any additional observations or notes"
                />
              </div>

              {/* Get Predictions Button */}
              {crop && date && location && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleGetPredictions}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ChartBarIcon className="w-4 h-4" />
                    <span>Get AI Predictions for {crops.find(c => c.id === crop)?.name}</span>
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
