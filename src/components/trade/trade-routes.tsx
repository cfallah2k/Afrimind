'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TruckIcon,
  MapIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface TradeRoutesProps {
  origin: string
  destination: string
  commodity: string
}

export function TradeRoutes({ origin, destination, commodity }: TradeRoutesProps) {
  const [routesData, setRoutesData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchRoutesData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setRoutesData({
          origin,
          destination,
          commodity,
          recommendedRoutes: [
            {
              routeId: 'route_1',
              name: 'Primary Route',
              distance: '450 km',
              estimatedTime: '8-12 hours',
              cost: '$200-400',
              transportModes: ['road'],
              borderCrossings: 1,
              reliabilityScore: 0.9,
              description: 'Most direct route with good road conditions',
              advantages: ['Fastest', 'Most reliable', 'Good infrastructure'],
              disadvantages: ['Higher cost', 'Toll fees']
            },
            {
              routeId: 'route_2',
              name: 'Alternative Route',
              distance: '520 km',
              estimatedTime: '10-14 hours',
              cost: '$180-350',
              transportModes: ['road', 'rail'],
              borderCrossings: 2,
              reliabilityScore: 0.8,
              description: 'Slightly longer but more cost-effective',
              advantages: ['Lower cost', 'Scenic route', 'Multiple options'],
              disadvantages: ['Longer time', 'More border crossings']
            },
            {
              routeId: 'route_3',
              name: 'Multi-modal Route',
              distance: '380 km',
              estimatedTime: '6-10 hours',
              cost: '$300-500',
              transportModes: ['road', 'air'],
              borderCrossings: 1,
              reliabilityScore: 0.95,
              description: 'Fastest option with air transport segment',
              advantages: ['Fastest', 'Reliable', 'Good for perishables'],
              disadvantages: ['Highest cost', 'Limited capacity']
            }
          ],
          logisticsProviders: [
            {
              name: 'AfriLogistics Ltd',
              services: ['road', 'rail'],
              coverage: 'West Africa',
              rating: 4.5,
              contact: '+234-XXX-XXXX',
              specialties: ['Agricultural products', 'General cargo']
            },
            {
              name: 'TransAfrica Cargo',
              services: ['road', 'air', 'sea'],
              coverage: 'Pan-Africa',
              rating: 4.3,
              contact: '+234-XXX-XXXX',
              specialties: ['Express delivery', 'Heavy cargo']
            }
          ],
          borderCrossingInfo: {
            primaryBorder: 'Seme Border',
            operatingHours: '6:00 AM - 10:00 PM',
            peakHours: '8:00 AM - 6:00 PM',
            averageWaitTime: '2-4 hours',
            requiredDocuments: ['Passport', 'Vehicle documents', 'Customs declaration']
          }
        })
        setLoading(false)
      }, 1000)
    }

    fetchRoutesData()
  }, [origin, destination, commodity])

  const getReliabilityColor = (score: number) => {
    if (score >= 0.9) return 'text-success-600 bg-success-100'
    if (score >= 0.8) return 'text-warning-600 bg-warning-100'
    return 'text-danger-600 bg-danger-100'
  }

  const getReliabilityText = (score: number) => {
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
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
        <TruckIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Trade Routes</h3>
      </div>

      <div className="space-y-4">
        {routesData?.recommendedRoutes.map((route: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{route.name}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getReliabilityColor(route.reliabilityScore)}`}>
                {getReliabilityText(route.reliabilityScore)}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{route.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{route.distance}</div>
                <div className="text-xs text-gray-600">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{route.estimatedTime}</div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{route.cost}</div>
                <div className="text-xs text-gray-600">Cost</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{route.borderCrossings}</div>
                <div className="text-xs text-gray-600">Borders</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-700 mb-2">Advantages:</div>
                <ul className="space-y-1">
                  {route.advantages.map((advantage: any, advantageIndex: number) => (
                    <li key={advantageIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-success-600" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-2">Considerations:</div>
                <ul className="space-y-1">
                  {route.disadvantages.map((disadvantage: any, disadvantageIndex: number) => (
                    <li key={disadvantageIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-1 h-1 bg-warning-500 rounded-full"></div>
                      <span>{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logistics Providers */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Recommended Logistics Providers</h4>
        <div className="space-y-3">
          {routesData?.logisticsProviders.map((provider: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{provider.name}</div>
                <div className="text-sm text-gray-600">{provider.coverage}</div>
                <div className="text-xs text-gray-500">{provider.specialties.join(', ')}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <StarIcon className="w-4 h-4 text-warning-500" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
                <div className="text-xs text-gray-600">{provider.contact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Crossing Info */}
      <div className="mt-4 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-2">Border Crossing Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-1">Primary Border:</div>
            <div className="text-gray-600">{routesData?.borderCrossingInfo.primaryBorder}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Operating Hours:</div>
            <div className="text-gray-600">{routesData?.borderCrossingInfo.operatingHours}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Peak Hours:</div>
            <div className="text-gray-600">{routesData?.borderCrossingInfo.peakHours}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Average Wait:</div>
            <div className="text-gray-600">{routesData?.borderCrossingInfo.averageWaitTime}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
