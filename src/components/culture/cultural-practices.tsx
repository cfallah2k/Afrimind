'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  CalendarIcon,
  UsersIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface CulturalPracticesProps {
  country: string
  region: string
}

export function CulturalPractices({ country, region }: CulturalPracticesProps) {
  const [practicesData, setPracticesData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPracticesData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setPracticesData({
          country,
          region,
          practices: [
            {
              name: 'Traditional Wedding Ceremony',
              description: 'Elaborate wedding ceremonies with traditional rituals',
              significance: 'Celebrates union and family bonds',
              timing: 'Usually held during dry season',
              participants: 'Extended family and community',
              traditionalElements: [
                'Traditional attire',
                'Cultural dances',
                'Traditional music',
                'Ritual ceremonies'
              ],
              modernAdaptations: [
                'Combination with Western ceremonies',
                'Use of modern technology',
                'Inclusion of diverse elements'
              ]
            },
            {
              name: 'Harvest Festival',
              description: 'Celebration of agricultural abundance',
              significance: 'Thanksgiving and community bonding',
              timing: 'After harvest season',
              participants: 'Entire community',
              activities: [
                'Traditional dances',
                'Feasting',
                'Gift exchanges',
                'Community games'
              ]
            },
            {
              name: 'Naming Ceremony',
              description: 'Traditional ceremony for naming newborns',
              significance: 'Welcoming new life into the community',
              timing: 'Within first week of birth',
              participants: 'Family and close friends',
              activities: [
                'Prayers and blessings',
                'Traditional naming rituals',
                'Feasting and celebration',
                'Gift giving'
              ]
            }
          ],
          culturalEtiquette: [
            'Greet elders first',
            'Use right hand for giving and receiving',
            'Remove shoes when entering homes',
            'Dress modestly for religious occasions'
          ],
          importantDates: [
            {
              date: 'January 1',
              name: 'New Year Celebration',
              significance: 'Fresh start and new beginnings'
            },
            {
              date: 'March 21',
              name: 'Spring Equinox Festival',
              significance: 'Celebration of nature and renewal'
            }
          ],
          traditionalFoods: [
            {
              name: 'Jollof Rice',
              description: 'Popular West African rice dish',
              occasions: 'Celebrations and special events',
              culturalSignificance: 'Symbol of unity and sharing'
            },
            {
              name: 'Injera',
              description: 'Ethiopian sourdough flatbread',
              occasions: 'Daily meals and celebrations',
              culturalSignificance: 'Staple food and cultural identity'
            }
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchPracticesData()
  }, [country, region])

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
        <HeartIcon className="w-6 h-6 text-accent-600" />
        <h3 className="text-lg font-semibold text-gray-900">Cultural Practices</h3>
      </div>

      <div className="space-y-4">
        {practicesData?.practices.map((practice, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">{practice.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{practice.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-700 mb-1">Significance:</div>
                <div className="text-gray-600">{practice.significance}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Timing:</div>
                <div className="text-gray-600">{practice.timing}</div>
              </div>
            </div>

            {practice.traditionalElements && (
              <div className="mt-3">
                <div className="font-medium text-gray-700 mb-2">Traditional Elements:</div>
                <div className="flex flex-wrap gap-1">
                  {practice.traditionalElements.map((element, elementIndex) => (
                    <span
                      key={elementIndex}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent-100 text-accent-800"
                    >
                      <StarIcon className="w-3 h-3 mr-1" />
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {practice.activities && (
              <div className="mt-3">
                <div className="font-medium text-gray-700 mb-2">Activities:</div>
                <div className="space-y-1">
                  {practice.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircleIcon className="w-3 h-3 text-success-600" />
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cultural Etiquette */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Cultural Etiquette</h4>
        <div className="space-y-2">
          {practicesData?.culturalEtiquette.map((etiquette, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700">{etiquette}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional Foods */}
      <div className="mt-4 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Traditional Foods</h4>
        <div className="space-y-3">
          {practicesData?.traditionalFoods.map((food, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-gray-900">{food.name}</div>
                <div className="text-sm text-gray-600">{food.description}</div>
                <div className="text-xs text-success-700 mt-1">{food.culturalSignificance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
