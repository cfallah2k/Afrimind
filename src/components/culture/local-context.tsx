'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  GlobeAltIcon,
  BuildingOfficeIcon,
  UsersIcon,
  HeartIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface LocalContextProps {
  location: string
  contextType: string
}

export function LocalContext({ location, contextType }: LocalContextProps) {
  const [contextData, setContextData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchContextData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setContextData({
          location,
          contextType,
          businessContext: {
            businessHours: '8:00 AM - 6:00 PM (Monday-Friday)',
            meetingEtiquette: [
              'Arrive on time or slightly early',
              'Greet everyone individually',
              'Use formal titles initially',
              'Allow time for relationship building'
            ],
            communicationStyle: 'Indirect and relationship-focused',
            decisionMaking: 'Consensus-based and hierarchical',
            giftGiving: 'Appropriate for business relationships'
          },
          socialContext: {
            greetingCustoms: [
              'Handshake with eye contact',
              'Ask about family and health',
              'Use appropriate titles'
            ],
            socialHierarchy: 'Respect for age and position',
            familyImportance: 'Family is central to social life',
            communityValues: 'Collectivism and mutual support'
          },
          religiousContext: {
            majorReligions: ['Christianity', 'Islam', 'Traditional religions'],
            religiousPractices: 'Daily prayers and weekly services',
            religiousHolidays: 'Respect for all religious observances',
            dietaryRestrictions: 'Halal and kosher considerations'
          },
          educationalContext: {
            educationSystem: 'Primary, secondary, and tertiary levels',
            languageOfInstruction: 'English and local languages',
            culturalEducation: 'Traditional knowledge and modern education',
            technologyAdoption: 'Growing use of digital tools'
          },
          aiConsiderations: [
            'Respect for cultural sensitivities',
            'Inclusion of local languages',
            'Understanding of social dynamics',
            'Appreciation for traditional knowledge'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchContextData()
  }, [location, contextType])

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
        <GlobeAltIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Local Context</h3>
      </div>

      {/* Business Context */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Business Context</h4>
        <div className="p-4 bg-primary-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Business Hours:</div>
              <div className="text-primary-700">{contextData?.businessContext.businessHours}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Communication Style:</div>
              <div className="text-primary-700">{contextData?.businessContext.communicationStyle}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Decision Making:</div>
              <div className="text-primary-700">{contextData?.businessContext.decisionMaking}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Gift Giving:</div>
              <div className="text-primary-700">{contextData?.businessContext.giftGiving}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Context */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Social Context</h4>
        <div className="p-4 bg-success-50 rounded-lg">
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-2">Greeting Customs:</div>
              <div className="space-y-1">
                {contextData?.socialContext.greetingCustoms.map((custom: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-success-500 rounded-full"></div>
                    <span className="text-success-700">{custom}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Social Hierarchy:</div>
              <div className="text-success-700">{contextData?.socialContext.socialHierarchy}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Family Importance:</div>
              <div className="text-success-700">{contextData?.socialContext.familyImportance}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Religious Context */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Religious Context</h4>
        <div className="p-4 bg-accent-50 rounded-lg">
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Major Religions:</div>
              <div className="text-accent-700">{contextData?.religiousContext.majorReligions.join(', ')}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Religious Practices:</div>
              <div className="text-accent-700">{contextData?.religiousContext.religiousPractices}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Dietary Restrictions:</div>
              <div className="text-accent-700">{contextData?.religiousContext.dietaryRestrictions}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Context */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Educational Context</h4>
        <div className="p-4 bg-warning-50 rounded-lg">
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Education System:</div>
              <div className="text-warning-700">{contextData?.educationalContext.educationSystem}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Language of Instruction:</div>
              <div className="text-warning-700">{contextData?.educationalContext.languageOfInstruction}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Technology Adoption:</div>
              <div className="text-warning-700">{contextData?.educationalContext.technologyAdoption}</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Considerations */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">AI Considerations</h4>
        <div className="space-y-2">
          {contextData?.aiConsiderations.map((consideration: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{consideration}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
