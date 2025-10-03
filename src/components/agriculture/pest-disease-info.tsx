'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface PestDiseaseInfoProps {
  location: string
}

export function PestDiseaseInfo({ location }: PestDiseaseInfoProps) {
  const [pestData, setPestData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPestData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setPestData({
          location,
          commonPests: [
            {
              name: 'Fall Armyworm',
              description: 'Destructive pest affecting maize and other crops',
              symptoms: ['Holes in leaves', 'Stunted growth', 'Yellowing'],
              prevention: ['Early planting', 'Crop rotation', 'Natural predators'],
              treatment: ['Biological control', 'Targeted pesticides'],
              severity: 'High',
              season: 'Wet season'
            },
            {
              name: 'Cassava Mosaic Disease',
              description: 'Viral disease affecting cassava plants',
              symptoms: ['Mottled leaves', 'Stunted growth', 'Reduced yield'],
              prevention: ['Use disease-free cuttings', 'Resistant varieties'],
              treatment: ['Remove infected plants', 'Plant resistant varieties'],
              severity: 'Medium',
              season: 'Year-round'
            },
            {
              name: 'Stem Borer',
              description: 'Larval stage bores into plant stems',
              symptoms: ['Wilting', 'Holes in stems', 'Plant death'],
              prevention: ['Early detection', 'Proper spacing', 'Clean fields'],
              treatment: ['Insecticides', 'Biological control'],
              severity: 'High',
              season: 'Dry season'
            }
          ],
          preventionStrategies: [
            'Regular field monitoring',
            'Crop rotation',
            'Use of resistant varieties',
            'Proper field hygiene',
            'Early planting',
            'Integrated pest management'
          ],
          emergencyContacts: [
            'Local agricultural extension officer',
            'Pest control services',
            'Agricultural research institute',
            'Farmers cooperative'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchPestData()
  }, [location])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
        <ExclamationTriangleIcon className="w-6 h-6 text-warning-600" />
        <h3 className="text-lg font-semibold text-gray-900">Pest & Disease Info</h3>
      </div>

      <div className="space-y-4">
        {pestData?.commonPests.map((pest, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{pest.name}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(pest.severity)}`}>
                {pest.severity} Risk
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{pest.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-700 mb-1">Symptoms:</div>
                <ul className="space-y-1">
                  {pest.symptoms.map((symptom, symptomIndex) => (
                    <li key={symptomIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-danger-500 rounded-full"></div>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Prevention:</div>
                <ul className="space-y-1">
                  {pest.prevention.map((prevention, preventionIndex) => (
                    <li key={preventionIndex} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-3 h-3 text-success-600" />
                      <span>{prevention}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 p-3 bg-warning-50 rounded-lg">
              <div className="font-medium text-warning-800 mb-1">Treatment:</div>
              <div className="text-sm text-warning-700">
                {pest.treatment.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prevention Strategies */}
      <div className="mt-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-2">Prevention Strategies</h4>
        <div className="grid grid-cols-2 gap-2">
          {pestData?.preventionStrategies.map((strategy, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-success-700">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>{strategy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-4 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-2">Emergency Contacts</h4>
        <div className="space-y-2">
          {pestData?.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-primary-700">
              <PhoneIcon className="w-4 h-4" />
              <span>{contact}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
