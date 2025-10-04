'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LightBulbIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface FarmingTipsProps {
  location: string
}

export function FarmingTips({ location }: FarmingTipsProps) {
  const [tipsData, setTipsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTipsData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setTipsData({
          location,
          tips: [
            {
              category: 'Soil Preparation',
              advice: 'Prepare soil 2-3 weeks before planting',
              details: 'Test soil pH, add organic matter, ensure good drainage',
              importance: 'High',
              timing: 'Before planting'
            },
            {
              category: 'Planting',
              advice: 'Plant at optimal depth and spacing',
              details: 'Follow recommended spacing for your crop variety',
              importance: 'High',
              timing: 'Planting season'
            },
            {
              category: 'Watering',
              advice: 'Maintain consistent soil moisture',
              details: 'Water deeply but infrequently, avoid overwatering',
              importance: 'High',
              timing: 'Throughout growth'
            },
            {
              category: 'Fertilization',
              advice: 'Apply fertilizers at the right time',
              details: 'Use balanced NPK fertilizer, follow soil test recommendations',
              importance: 'Medium',
              timing: 'Growth stages'
            },
            {
              category: 'Pest Control',
              advice: 'Monitor for pests regularly',
              details: 'Early detection and treatment, use integrated pest management',
              importance: 'High',
              timing: 'Throughout season'
            },
            {
              category: 'Harvesting',
              advice: 'Harvest at the right maturity stage',
              details: 'Check for proper maturity indicators, harvest in cool weather',
              importance: 'High',
              timing: 'Harvest season'
            }
          ],
          seasonalConsiderations: [
            'Monitor weather forecasts',
            'Adjust planting dates based on rainfall',
            'Prepare for seasonal pests and diseases',
            'Plan irrigation for dry periods',
            'Store seeds properly for next season'
          ],
          successMetrics: [
            'Plant height and vigor',
            'Leaf color and health',
            'Flowering and fruiting',
            'Overall yield potential',
            'Disease resistance'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchTipsData()
  }, [location])

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High':
        return 'text-danger-600 bg-danger-100'
      case 'Medium':
        return 'text-warning-600 bg-warning-100'
      case 'Low':
        return 'text-success-600 bg-success-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
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
        <LightBulbIcon className="w-6 h-6 text-warning-600" />
        <h3 className="text-lg font-semibold text-gray-900">Farming Tips</h3>
      </div>

      <div className="space-y-4">
        {tipsData?.tips.map((tip: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{tip.category}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(tip.importance)}`}>
                {tip.importance} Priority
              </div>
            </div>

            <div className="mb-3">
              <div className="font-medium text-gray-800 mb-1">{tip.advice}</div>
              <div className="text-sm text-gray-600">{tip.details}</div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <ClockIcon className="w-4 h-4" />
                <span>{tip.timing}</span>
              </div>
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-warning-500" />
                <span className="text-warning-600 font-medium">{tip.importance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Considerations */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-2">Seasonal Considerations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tipsData?.seasonalConsiderations.map((consideration: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-primary-700">
              <CheckCircleIcon className="w-4 h-4" />
              <span>{consideration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mt-4 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-2">Success Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tipsData?.successMetrics.map((metric: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-success-700">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span>{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
