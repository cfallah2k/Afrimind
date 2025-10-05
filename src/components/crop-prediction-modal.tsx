'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  SunIcon,
  CloudIcon,
  DropletIcon,
  ScissorsIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  MapPinIcon,
  ClockIcon,
  LightBulbIcon,
  HeartIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'
import { westAfricaPredictions, liberiaSpecificData, liberiaFarmingTips, liberiaGovernmentSupport } from '@/lib/west-africa-data'

interface CropPredictionModalProps {
  isOpen: boolean
  onClose: () => void
  cropData: {
    crop: string
    plantingDate: string
    location: string
    soilType: string
    season: string
  }
}

export function CropPredictionModal({ isOpen, onClose, cropData }: CropPredictionModalProps) {
  const [predictions, setPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Crop-specific data and predictions
  const cropDatabase = {
    maize: {
      name: 'Maize',
      icon: '🌽',
      cycle: 120,
      season: 'rainy',
      optimalTemp: '20-30°C',
      waterNeeds: '500-800mm',
      soilPh: '6.0-7.0',
      spacing: '75cm x 25cm',
      fertilizer: 'NPK 15:15:15',
      commonPests: ['Fall Armyworm', 'Stem Borer', 'Earworm'],
      commonDiseases: ['Rust', 'Smut', 'Blight'],
      predictions: {
        weather: {
          title: 'Weather Forecast',
          prediction: 'Rain expected in 3-5 days',
          confidence: 85,
          recommendation: 'Prepare for irrigation if rain doesn\'t come. Current soil moisture is adequate.',
          impact: 'Positive - Good for germination and early growth'
        },
        growth: {
          title: 'Growth Prediction',
          prediction: 'Expected to reach 15cm height in 2 weeks',
          confidence: 90,
          recommendation: 'Monitor for uniform emergence. Thin to 2 plants per hill if needed.',
          timeline: 'Germination: 5-7 days, First leaves: 10-14 days'
        },
        harvest: {
          title: 'Harvest Prediction',
          prediction: 'Ready for harvest in 105-110 days',
          confidence: 78,
          recommendation: 'Start preparing storage facilities. Monitor kernel moisture (should be 20-25%)',
          yield: 'Expected yield: 3-5 tons per hectare'
        },
        market: {
          title: 'Market Price Forecast',
          prediction: 'Prices expected to increase 12-15% by harvest time',
          confidence: 70,
          recommendation: 'Consider holding harvest for 2-3 weeks for better prices',
          currentPrice: '₦180,000 per ton',
          projectedPrice: '₦205,000 per ton'
        },
        risks: {
          title: 'Risk Assessment',
          prediction: 'Low to moderate risk period',
          confidence: 80,
          recommendation: 'Monitor for Fall Armyworm. Apply preventive measures if needed.',
          risks: ['Pest pressure: Low', 'Disease risk: Low', 'Weather risk: Moderate']
        }
      }
    },
    rice: {
      name: 'Rice',
      icon: '🌾',
      cycle: 90,
      season: 'rainy',
      optimalTemp: '25-35°C',
      waterNeeds: '1000-1500mm',
      soilPh: '5.5-6.5',
      spacing: '20cm x 20cm',
      fertilizer: 'NPK 20:10:10',
      commonPests: ['Rice Bug', 'Stem Borer', 'Leaf Folder'],
      commonDiseases: ['Blast', 'Bacterial Blight', 'Sheath Blight'],
      predictions: {
        weather: {
          title: 'Weather Forecast',
          prediction: 'Heavy rain expected in 2-3 days',
          confidence: 90,
          recommendation: 'Ensure proper drainage. Consider reducing water level temporarily.',
          impact: 'Caution - Monitor for waterlogging'
        },
        growth: {
          title: 'Growth Prediction',
          prediction: 'Expected to reach 25cm height in 3 weeks',
          confidence: 85,
          recommendation: 'Apply first dose of nitrogen fertilizer after 2 weeks',
          timeline: 'Germination: 3-5 days, Tillering: 21-28 days'
        },
        harvest: {
          title: 'Harvest Prediction',
          prediction: 'Ready for harvest in 85-90 days',
          confidence: 82,
          recommendation: 'Start preparing for harvest. Check grain moisture content',
          yield: 'Expected yield: 4-6 tons per hectare'
        },
        market: {
          title: 'Market Price Forecast',
          prediction: 'Prices stable with slight upward trend',
          confidence: 75,
          recommendation: 'Good time to enter market. Consider selling in batches',
          currentPrice: '₦220,000 per ton',
          projectedPrice: '₦235,000 per ton'
        },
        risks: {
          title: 'Risk Assessment',
          prediction: 'Moderate risk due to weather',
          confidence: 75,
          recommendation: 'Monitor for blast disease. Apply fungicide if needed',
          risks: ['Pest pressure: Low', 'Disease risk: Moderate', 'Weather risk: High']
        }
      }
    },
    cassava: {
      name: 'Cassava',
      icon: '🥔',
      cycle: 300,
      season: 'all',
      optimalTemp: '25-30°C',
      waterNeeds: '600-1000mm',
      soilPh: '5.5-6.5',
      spacing: '100cm x 100cm',
      fertilizer: 'NPK 12:12:17',
      commonPests: ['Mealybug', 'Green Mite', 'Whitefly'],
      commonDiseases: ['Cassava Mosaic', 'Bacterial Blight', 'Anthracnose'],
      predictions: {
        weather: {
          title: 'Weather Forecast',
          prediction: 'Dry weather expected for next 2 weeks',
          confidence: 80,
          recommendation: 'Ensure adequate irrigation. Cassava needs consistent moisture',
          impact: 'Negative - May affect root development'
        },
        growth: {
          title: 'Growth Prediction',
          prediction: 'Expected to reach 50cm height in 2 months',
          confidence: 88,
          recommendation: 'Apply first weeding in 4-6 weeks. Monitor for pests',
          timeline: 'Sprouting: 7-10 days, First leaves: 14-21 days'
        },
        harvest: {
          title: 'Harvest Prediction',
          prediction: 'Ready for harvest in 8-10 months',
          confidence: 85,
          recommendation: 'Long-term crop. Plan for extended growing period',
          yield: 'Expected yield: 15-25 tons per hectare'
        },
        market: {
          title: 'Market Price Forecast',
          prediction: 'Prices expected to remain stable',
          confidence: 80,
          recommendation: 'Good for long-term storage. Consider processing options',
          currentPrice: '₦45,000 per ton',
          projectedPrice: '₦48,000 per ton'
        },
        risks: {
          title: 'Risk Assessment',
          prediction: 'Low risk, hardy crop',
          confidence: 85,
          recommendation: 'Monitor for mealybug infestation. Apply neem oil if needed',
          risks: ['Pest pressure: Low', 'Disease risk: Low', 'Weather risk: Low']
        }
      }
    }
  }

  useEffect(() => {
    if (isOpen && cropData.crop) {
      setLoading(true)
      // Simulate AI processing time
      setTimeout(() => {
        // Use West Africa predictions with special focus on Liberia
        const westAfricaPredictionsData = westAfricaPredictions.westAfrica[cropData.crop as keyof typeof westAfricaPredictions.westAfrica]
        if (westAfricaPredictionsData) {
          setPredictions(westAfricaPredictionsData)
        }
        setLoading(false)
      }, 1500)
    }
  }, [isOpen, cropData.crop])

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'weather': return CloudIcon
      case 'growth': return SunIcon
      case 'harvest': return ScissorsIcon
      case 'market': return ArrowTrendingUpIcon
      case 'risks': return ExclamationTriangleIcon
      default: return ChartBarIcon
    }
  }

  const getPredictionColor = (type: string) => {
    switch (type) {
      case 'weather': return 'blue'
      case 'growth': return 'green'
      case 'harvest': return 'orange'
      case 'market': return 'purple'
      case 'risks': return 'red'
      default: return 'gray'
    }
  }

  // Get Liberia-specific crop info
  const liberiaCropInfo = liberiaSpecificData.commonCrops.find(crop => crop.id === cropData.crop)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{liberiaCropInfo?.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {liberiaCropInfo?.name} Predictions for West Africa 🌍
                  </h2>
                  <p className="text-sm text-gray-600">
                    Planted on {new Date(cropData.plantingDate).toLocaleDateString()} in {cropData.location}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    🇱🇷 Special focus on Liberia with love
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Analyzing your crop data...</p>
                    <p className="text-sm text-gray-500 mt-2">Generating personalized predictions</p>
                  </div>
                </div>
              ) : predictions ? (
                <div className="space-y-6">
                  {/* West Africa Crop Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">West Africa Crop Information 🌍</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Growth Cycle:</span>
                        <span className="ml-2 font-medium">{liberiaCropInfo?.cycle} days</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Importance:</span>
                        <span className="ml-2 font-medium">{liberiaCropInfo?.importance}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">West Africa Season:</span>
                        <span className="ml-2 font-medium">April-October</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Soil Type:</span>
                        <span className="ml-2 font-medium">Red soil (Laterite)</span>
                      </div>
                    </div>
                  </div>

                  {/* Predictions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(predictions).map(([key, prediction]: [string, any]) => {
                      const Icon = getPredictionIcon(key)
                      const color = getPredictionColor(key)
                      
                      return (
                        <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 text-${color}-600`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                              <div className="text-sm text-gray-500">
                                {prediction.confidence}% confidence
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                {prediction.prediction}
                              </div>
                              <div className="text-xs text-gray-600">
                                {prediction.recommendation}
                              </div>
                            </div>
                            
                            {prediction.impact && (
                              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                Impact: {prediction.impact}
                              </div>
                            )}
                            
                            {prediction.timeline && (
                              <div className="text-xs text-gray-600">
                                Timeline: {prediction.timeline}
                              </div>
                            )}
                            
                            {prediction.yield && (
                              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                {prediction.yield}
                              </div>
                            )}
                            
                            {prediction.currentPrice && (
                              <div className="text-xs text-gray-600">
                                Current: {prediction.currentPrice} | Projected: {prediction.projectedPrice}
                              </div>
                            )}
                            
                            {prediction.risks && (
                              <div className="space-y-1">
                                {prediction.risks.map((risk: string, index: number) => (
                                  <div key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                    {risk}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${prediction.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* West Africa Pests & Diseases */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">West Africa Pests & Diseases 🌍</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-2">Common Pests in West Africa</h4>
                        <div className="space-y-1">
                          {liberiaSpecificData.commonPests
                            .filter(pest => pest.crops.includes(cropData.crop))
                            .map((pest, index) => (
                            <div key={index} className="text-xs text-gray-600 bg-red-50 px-2 py-1 rounded">
                              <div className="font-medium">{pest.name}</div>
                              <div className="text-gray-500">Control: {pest.control}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-orange-600 mb-2">Common Diseases in West Africa</h4>
                        <div className="space-y-1">
                          {liberiaSpecificData.commonDiseases
                            .filter(disease => disease.crops.includes(cropData.crop))
                            .map((disease, index) => (
                            <div key={index} className="text-xs text-gray-600 bg-orange-50 px-2 py-1 rounded">
                              <div className="font-medium">{disease.name}</div>
                              <div className="text-gray-500">Control: {disease.control}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* West Africa Farming Tips */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-3">West Africa Farming Tips 🌍</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {liberiaFarmingTips.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="text-sm font-medium text-blue-800">{category.category}</h4>
                          <div className="space-y-1">
                            {category.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start space-x-2 text-xs text-blue-700">
                                <CheckCircleIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* West Africa Government Support */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-3">West Africa Government Support 🌍</h3>
                    <p className="text-xs text-green-700 mb-3">🇱🇷 Special focus on Liberia with love</p>
                    <div className="space-y-3">
                      {liberiaGovernmentSupport.programs.map((program, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-green-200">
                          <h4 className="font-medium text-green-800 text-sm">{program.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{program.description}</p>
                          <div className="mt-2">
                            <div className="text-xs text-green-700 font-medium">Benefits:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {program.benefits.map((benefit, benefitIndex) => (
                                <span key={benefitIndex} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <h4 className="font-medium text-green-800 text-sm">Contact Information</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          <div>{liberiaGovernmentSupport.contacts.ministry}</div>
                          <div>Phone: {liberiaGovernmentSupport.contacts.phone}</div>
                          <div>Email: {liberiaGovernmentSupport.contacts.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
