'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ClockIcon,
  BookOpenIcon,
  StarIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface HistoricalContextProps {
  topic: string
  region: string
}

export function HistoricalContext({ topic, region }: HistoricalContextProps) {
  const [historicalData, setHistoricalData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchHistoricalData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setHistoricalData({
          topic,
          region,
          historicalBackground: {
            keyEvents: [
              {
                date: '1960s',
                event: 'Independence movements',
                significance: 'End of colonial rule and beginning of self-governance',
                impact: 'Shaped modern African nations'
              },
              {
                date: '1990s',
                event: 'Democratization wave',
                significance: 'Transition to democratic governance',
                impact: 'Increased political participation'
              }
            ],
            culturalEvolution: [
              'Preservation of traditional values',
              'Adaptation to modern challenges',
              'Integration of global influences',
              'Revival of cultural practices'
            ],
            economicDevelopment: [
              'Agricultural revolution',
              'Industrialization efforts',
              'Service sector growth',
              'Technology adoption'
            ]
          },
          contemporaryRelevance: [
            'Influence on modern politics',
            'Impact on cultural identity',
            'Role in economic development',
            'Contribution to global culture'
          ],
          sourcesAndReferences: [
            'Academic papers and research',
            'Oral history traditions',
            'Archaeological evidence',
            'Contemporary accounts'
          ],
          furtherReading: [
            'Books on African history',
            'Documentary films',
            'Museum collections',
            'Academic journals'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchHistoricalData()
  }, [topic, region])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
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
      <div className="flex items-center space-x-2 mb-6">
        <ClockIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Historical Context</h3>
      </div>

      {/* Key Events */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Key Events</h4>
        <div className="space-y-4">
          {historicalData?.historicalBackground.keyEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{event.event}</h5>
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{event.significance}</p>
              <div className="text-xs text-gray-500">Impact: {event.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Evolution */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Cultural Evolution</h4>
        <div className="space-y-2">
          {historicalData?.historicalBackground.culturalEvolution.map((evolution, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700">{evolution}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Development */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Economic Development</h4>
        <div className="space-y-2">
          {historicalData?.historicalBackground.economicDevelopment.map((development, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <StarIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{development}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contemporary Relevance */}
      <div className="mb-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Contemporary Relevance</h4>
        <div className="space-y-2">
          {historicalData?.contemporaryRelevance.map((relevance, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{relevance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sources and References */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Sources and References</h4>
        <div className="space-y-2">
          {historicalData?.sourcesAndReferences.map((source, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <BookOpenIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Further Reading */}
      <div className="p-4 bg-accent-50 rounded-lg">
        <h4 className="font-semibold text-accent-800 mb-3">Further Reading</h4>
        <div className="space-y-2">
          {historicalData?.furtherReading.map((reading, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
              <span className="text-accent-700">{reading}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
