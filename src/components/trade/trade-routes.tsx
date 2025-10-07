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

// West African route calculation functions
const getRouteDistance = (origin: string, destination: string) => {
  const distances: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '1,200 km',
      'Accra, Ghana': '800 km',
      'Dakar, Senegal': '1,500 km',
      'Abidjan, Côte d\'Ivoire': '600 km',
      'Bamako, Mali': '1,000 km',
      'Ouagadougou, Burkina Faso': '900 km',
      'Niamey, Niger': '1,100 km',
      'Conakry, Guinea': '300 km',
      'Freetown, Sierra Leone': '200 km',
      'Cotonou, Benin': '1,100 km',
      'Lomé, Togo': '1,000 km',
      'Banjul, Gambia': '1,400 km',
      'Bissau, Guinea-Bissau': '1,200 km',
      'Praia, Cape Verde': '1,800 km'
    }
  }
  return distances[origin]?.[destination] || '800 km'
}

const getRouteTime = (origin: string, destination: string) => {
  const times: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '18-24 hours',
      'Accra, Ghana': '12-16 hours',
      'Dakar, Senegal': '24-30 hours',
      'Abidjan, Côte d\'Ivoire': '8-12 hours',
      'Bamako, Mali': '16-20 hours',
      'Ouagadougou, Burkina Faso': '14-18 hours',
      'Niamey, Niger': '18-22 hours',
      'Conakry, Guinea': '4-6 hours',
      'Freetown, Sierra Leone': '3-5 hours',
      'Cotonou, Benin': '16-20 hours',
      'Lomé, Togo': '14-18 hours',
      'Banjul, Gambia': '20-26 hours',
      'Bissau, Guinea-Bissau': '18-24 hours',
      'Praia, Cape Verde': '28-36 hours'
    }
  }
  return times[origin]?.[destination] || '12-16 hours'
}

const getRouteCost = (origin: string, destination: string) => {
  const costs: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '$300-500',
      'Accra, Ghana': '$200-350',
      'Dakar, Senegal': '$400-600',
      'Abidjan, Côte d\'Ivoire': '$150-250',
      'Bamako, Mali': '$250-400',
      'Ouagadougou, Burkina Faso': '$200-350',
      'Niamey, Niger': '$300-450',
      'Conakry, Guinea': '$80-120',
      'Freetown, Sierra Leone': '$60-100',
      'Cotonou, Benin': '$250-400',
      'Lomé, Togo': '$200-350',
      'Banjul, Gambia': '$350-550',
      'Bissau, Guinea-Bissau': '$300-500',
      'Praia, Cape Verde': '$500-800'
    }
  }
  return costs[origin]?.[destination] || '$200-350'
}

const getBorderCrossings = (origin: string, destination: string) => {
  const borders: { [key: string]: { [key: string]: number } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': 2,
      'Accra, Ghana': 1,
      'Dakar, Senegal': 3,
      'Abidjan, Côte d\'Ivoire': 1,
      'Bamako, Mali': 2,
      'Ouagadougou, Burkina Faso': 2,
      'Niamey, Niger': 2,
      'Conakry, Guinea': 1,
      'Freetown, Sierra Leone': 1,
      'Cotonou, Benin': 2,
      'Lomé, Togo': 1,
      'Banjul, Gambia': 3,
      'Bissau, Guinea-Bissau': 2,
      'Praia, Cape Verde': 4
    }
  }
  return borders[origin]?.[destination] || 1
}

const getCoastalDistance = (origin: string, destination: string) => {
  const coastalDistances: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '1,400 km',
      'Accra, Ghana': '900 km',
      'Dakar, Senegal': '1,600 km',
      'Abidjan, Côte d\'Ivoire': '700 km',
      'Bamako, Mali': '1,200 km',
      'Ouagadougou, Burkina Faso': '1,100 km',
      'Niamey, Niger': '1,300 km',
      'Conakry, Guinea': '400 km',
      'Freetown, Sierra Leone': '300 km',
      'Cotonou, Benin': '1,300 km',
      'Lomé, Togo': '1,200 km',
      'Banjul, Gambia': '1,500 km',
      'Bissau, Guinea-Bissau': '1,300 km',
      'Praia, Cape Verde': '1,900 km'
    }
  }
  return coastalDistances[origin]?.[destination] || '900 km'
}

const getCoastalTime = (origin: string, destination: string) => {
  const coastalTimes: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '20-28 hours',
      'Accra, Ghana': '14-20 hours',
      'Dakar, Senegal': '26-34 hours',
      'Abidjan, Côte d\'Ivoire': '10-16 hours',
      'Bamako, Mali': '18-24 hours',
      'Ouagadougou, Burkina Faso': '16-22 hours',
      'Niamey, Niger': '20-26 hours',
      'Conakry, Guinea': '6-10 hours',
      'Freetown, Sierra Leone': '5-8 hours',
      'Cotonou, Benin': '18-24 hours',
      'Lomé, Togo': '16-22 hours',
      'Banjul, Gambia': '22-30 hours',
      'Bissau, Guinea-Bissau': '20-28 hours',
      'Praia, Cape Verde': '30-40 hours'
    }
  }
  return coastalTimes[origin]?.[destination] || '14-20 hours'
}

const getCoastalCost = (origin: string, destination: string) => {
  const coastalCosts: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '$350-550',
      'Accra, Ghana': '$250-400',
      'Dakar, Senegal': '$450-650',
      'Abidjan, Côte d\'Ivoire': '$180-280',
      'Bamako, Mali': '$300-450',
      'Ouagadougou, Burkina Faso': '$250-400',
      'Niamey, Niger': '$350-500',
      'Conakry, Guinea': '$100-150',
      'Freetown, Sierra Leone': '$80-130',
      'Cotonou, Benin': '$300-450',
      'Lomé, Togo': '$250-400',
      'Banjul, Gambia': '$400-600',
      'Bissau, Guinea-Bissau': '$350-550',
      'Praia, Cape Verde': '$600-900'
    }
  }
  return coastalCosts[origin]?.[destination] || '$250-400'
}

const getCoastalBorders = (origin: string, destination: string) => {
  const coastalBorders: { [key: string]: { [key: string]: number } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': 3,
      'Accra, Ghana': 2,
      'Dakar, Senegal': 4,
      'Abidjan, Côte d\'Ivoire': 2,
      'Bamako, Mali': 3,
      'Ouagadougou, Burkina Faso': 3,
      'Niamey, Niger': 3,
      'Conakry, Guinea': 2,
      'Freetown, Sierra Leone': 2,
      'Cotonou, Benin': 3,
      'Lomé, Togo': 2,
      'Banjul, Gambia': 4,
      'Bissau, Guinea-Bissau': 3,
      'Praia, Cape Verde': 5
    }
  }
  return coastalBorders[origin]?.[destination] || 2
}

const getInlandDistance = (origin: string, destination: string) => {
  const inlandDistances: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '1,000 km',
      'Accra, Ghana': '700 km',
      'Dakar, Senegal': '1,300 km',
      'Abidjan, Côte d\'Ivoire': '500 km',
      'Bamako, Mali': '800 km',
      'Ouagadougou, Burkina Faso': '700 km',
      'Niamey, Niger': '900 km',
      'Conakry, Guinea': '200 km',
      'Freetown, Sierra Leone': '150 km',
      'Cotonou, Benin': '900 km',
      'Lomé, Togo': '800 km',
      'Banjul, Gambia': '1,200 km',
      'Bissau, Guinea-Bissau': '1,000 km',
      'Praia, Cape Verde': '1,600 km'
    }
  }
  return inlandDistances[origin]?.[destination] || '700 km'
}

const getInlandTime = (origin: string, destination: string) => {
  const inlandTimes: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '16-22 hours',
      'Accra, Ghana': '10-14 hours',
      'Dakar, Senegal': '20-28 hours',
      'Abidjan, Côte d\'Ivoire': '6-10 hours',
      'Bamako, Mali': '12-18 hours',
      'Ouagadougou, Burkina Faso': '10-16 hours',
      'Niamey, Niger': '14-20 hours',
      'Conakry, Guinea': '3-6 hours',
      'Freetown, Sierra Leone': '2-4 hours',
      'Cotonou, Benin': '14-20 hours',
      'Lomé, Togo': '12-18 hours',
      'Banjul, Gambia': '18-26 hours',
      'Bissau, Guinea-Bissau': '16-24 hours',
      'Praia, Cape Verde': '24-32 hours'
    }
  }
  return inlandTimes[origin]?.[destination] || '10-14 hours'
}

const getInlandCost = (origin: string, destination: string) => {
  const inlandCosts: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '$250-400',
      'Accra, Ghana': '$150-250',
      'Dakar, Senegal': '$350-500',
      'Abidjan, Côte d\'Ivoire': '$100-180',
      'Bamako, Mali': '$200-300',
      'Ouagadougou, Burkina Faso': '$150-250',
      'Niamey, Niger': '$250-350',
      'Conakry, Guinea': '$50-80',
      'Freetown, Sierra Leone': '$40-70',
      'Cotonou, Benin': '$200-300',
      'Lomé, Togo': '$150-250',
      'Banjul, Gambia': '$300-450',
      'Bissau, Guinea-Bissau': '$250-400',
      'Praia, Cape Verde': '$400-600'
    }
  }
  return inlandCosts[origin]?.[destination] || '$150-250'
}

const getInlandBorders = (origin: string, destination: string) => {
  const inlandBorders: { [key: string]: { [key: string]: number } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': 3,
      'Accra, Ghana': 2,
      'Dakar, Senegal': 4,
      'Abidjan, Côte d\'Ivoire': 2,
      'Bamako, Mali': 3,
      'Ouagadougou, Burkina Faso': 3,
      'Niamey, Niger': 3,
      'Conakry, Guinea': 2,
      'Freetown, Sierra Leone': 2,
      'Cotonou, Benin': 3,
      'Lomé, Togo': 2,
      'Banjul, Gambia': 4,
      'Bissau, Guinea-Bissau': 3,
      'Praia, Cape Verde': 5
    }
  }
  return inlandBorders[origin]?.[destination] || 2
}

const getPrimaryBorder = (origin: string, destination: string) => {
  const borders: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': 'Seme Border (Nigeria-Benin)',
      'Accra, Ghana': 'Aflao Border (Ghana-Togo)',
      'Dakar, Senegal': 'Rosso Border (Senegal-Mauritania)',
      'Abidjan, Côte d\'Ivoire': 'Ganta Border (Liberia-Ivory Coast)',
      'Bamako, Mali': 'Sikasso Border (Mali-Ivory Coast)',
      'Ouagadougou, Burkina Faso': 'Pô Border (Burkina Faso-Ghana)',
      'Niamey, Niger': 'Makalondi Border (Niger-Burkina Faso)',
      'Conakry, Guinea': 'Ganta Border (Liberia-Guinea)',
      'Freetown, Sierra Leone': 'Bo Waterside Border (Liberia-Sierra Leone)',
      'Cotonou, Benin': 'Seme Border (Benin-Nigeria)',
      'Lomé, Togo': 'Aflao Border (Togo-Ghana)',
      'Banjul, Gambia': 'Farafenni Border (Gambia-Senegal)',
      'Bissau, Guinea-Bissau': 'São Domingos Border (Guinea-Bissau-Senegal)',
      'Praia, Cape Verde': 'Port of Praia (Sea route)'
    }
  }
  return borders[origin]?.[destination] || 'Ganta Border (Liberia-Ivory Coast)'
}

const getAverageWaitTime = (origin: string, destination: string) => {
  const waitTimes: { [key: string]: { [key: string]: string } } = {
    'Monrovia, Liberia': {
      'Lagos, Nigeria': '3-6 hours',
      'Accra, Ghana': '2-4 hours',
      'Dakar, Senegal': '4-8 hours',
      'Abidjan, Côte d\'Ivoire': '1-3 hours',
      'Bamako, Mali': '3-5 hours',
      'Ouagadougou, Burkina Faso': '2-4 hours',
      'Niamey, Niger': '3-6 hours',
      'Conakry, Guinea': '1-2 hours',
      'Freetown, Sierra Leone': '1-2 hours',
      'Cotonou, Benin': '3-5 hours',
      'Lomé, Togo': '2-4 hours',
      'Banjul, Gambia': '4-6 hours',
      'Bissau, Guinea-Bissau': '3-5 hours',
      'Praia, Cape Verde': '6-12 hours'
    }
  }
  return waitTimes[origin]?.[destination] || '2-4 hours'
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
              name: 'ECOWAS Highway Route',
              distance: getRouteDistance(origin, destination),
              estimatedTime: getRouteTime(origin, destination),
              cost: getRouteCost(origin, destination),
              transportModes: ['road'],
              borderCrossings: getBorderCrossings(origin, destination),
              reliabilityScore: 0.9,
              description: 'Primary ECOWAS highway with excellent infrastructure',
              advantages: ['ECOWAS preferential treatment', 'Good road conditions', 'Fastest'],
              disadvantages: ['Toll fees', 'Peak hour delays']
            },
            {
              routeId: 'route_2',
              name: 'Coastal Route',
              distance: getCoastalDistance(origin, destination),
              estimatedTime: getCoastalTime(origin, destination),
              cost: getCoastalCost(origin, destination),
              transportModes: ['road', 'ferry'],
              borderCrossings: getCoastalBorders(origin, destination),
              reliabilityScore: 0.85,
              description: 'Scenic coastal route with ferry connections',
              advantages: ['Scenic views', 'Lower congestion', 'Ferry options'],
              disadvantages: ['Weather dependent', 'Longer distance']
            },
            {
              routeId: 'route_3',
              name: 'Inland Route',
              distance: getInlandDistance(origin, destination),
              estimatedTime: getInlandTime(origin, destination),
              cost: getInlandCost(origin, destination),
              transportModes: ['road'],
              borderCrossings: getInlandBorders(origin, destination),
              reliabilityScore: 0.8,
              description: 'Alternative inland route through multiple countries',
              advantages: ['Lower cost', 'Multiple options', 'Less traffic'],
              disadvantages: ['More border crossings', 'Longer time']
            }
          ],
          logisticsProviders: [
            {
              name: 'ECOWAS Logistics Network',
              services: ['road', 'rail'],
              coverage: 'West Africa',
              rating: 4.7,
              contact: '+231-XXX-XXXX',
              specialties: ['ECOWAS preferential treatment', 'Agricultural products', 'Cross-border trade']
            },
            {
              name: 'Liberia-Nigeria Express',
              services: ['road', 'ferry'],
              coverage: 'Liberia-Nigeria corridor',
              rating: 4.5,
              contact: '+231-XXX-XXXX',
              specialties: ['Express delivery', 'Agricultural products', 'Manufactured goods']
            },
            {
              name: 'West African Cargo',
              services: ['road', 'air', 'sea'],
              coverage: 'All West African countries',
              rating: 4.4,
              contact: '+231-XXX-XXXX',
              specialties: ['Heavy cargo', 'Perishable goods', 'International shipping']
            }
          ],
          borderCrossingInfo: {
            primaryBorder: getPrimaryBorder(origin, destination),
            operatingHours: '6:00 AM - 10:00 PM',
            peakHours: '8:00 AM - 6:00 PM',
            averageWaitTime: getAverageWaitTime(origin, destination),
            requiredDocuments: ['ECOWAS passport', 'Vehicle documents', 'Customs declaration', 'Trade license', 'Health certificate']
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
