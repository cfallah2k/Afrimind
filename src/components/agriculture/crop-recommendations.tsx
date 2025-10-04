'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SunIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface CropRecommendationsProps {
  location: string
  season: string
}

export function CropRecommendations({ location, season }: CropRecommendationsProps) {
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchRecommendations = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setRecommendations({
          location,
          season,
          recommendedCrops: [
            {
              name: 'Maize',
              suitability: 0.95,
              plantingPeriod: 'March-April',
              expectedYield: '3-5 tons/hectare',
              marketDemand: 'High',
              profitability: 'High',
              waterRequirement: 'Medium',
              soilType: 'Loamy',
              benefits: ['High yield', 'Good market price', 'Easy to grow']
            },
            {
              name: 'Cassava',
              suitability: 0.88,
              plantingPeriod: 'Year-round',
              expectedYield: '15-25 tons/hectare',
              marketDemand: 'Medium',
              profitability: 'Medium',
              waterRequirement: 'Low',
              soilType: 'Sandy',
              benefits: ['Drought resistant', 'Staple food', 'Multiple uses']
            },
            {
              name: 'Rice',
              suitability: 0.82,
              plantingPeriod: 'May-June',
              expectedYield: '2-4 tons/hectare',
              marketDemand: 'High',
              profitability: 'High',
              waterRequirement: 'High',
              soilType: 'Clay',
              benefits: ['High value', 'Export potential', 'Nutritional']
            }
          ],
          soilImprovementTips: [
            'Add organic matter to improve soil structure',
            'Test soil pH and adjust if necessary',
            'Consider crop rotation to maintain soil health',
            'Use cover crops to prevent erosion'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchRecommendations()
  }, [location, season])

  const getSuitabilityColor = (score: number) => {
    if (score >= 0.9) return 'text-success-600 bg-success-100'
    if (score >= 0.8) return 'text-warning-600 bg-warning-100'
    return 'text-danger-600 bg-danger-100'
  }

  const getSuitabilityText = (score: number) => {
    if (score >= 0.9) return 'Excellent'
    if (score >= 0.8) return 'Good'
    if (score >= 0.7) return 'Fair'
    return 'Poor'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
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
        <SunIcon className="w-6 h-6 text-success-600" />
        <h3 className="text-lg font-semibold text-gray-900">Crop Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations?.recommendedCrops.map((crop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{crop.name}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSuitabilityColor(crop.suitability)}`}>
                {getSuitabilityText(crop.suitability)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Planting:</span>
                <div className="font-medium">{crop.plantingPeriod}</div>
              </div>
              <div>
                <span className="text-gray-600">Yield:</span>
                <div className="font-medium">{crop.expectedYield}</div>
              </div>
              <div>
                <span className="text-gray-600">Market:</span>
                <div className="font-medium">{crop.marketDemand}</div>
              </div>
              <div>
                <span className="text-gray-600">Profit:</span>
                <div className="font-medium">{crop.profitability}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {crop.benefits.map((benefit, benefitIndex) => (
                <span
                  key={benefitIndex}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success-100 text-success-800"
                >
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Soil Improvement Tips */}
      <div className="mt-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-2">Soil Improvement Tips</h4>
        <ul className="text-sm text-warning-700 space-y-1">
          {recommendations?.soilImprovementTips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
