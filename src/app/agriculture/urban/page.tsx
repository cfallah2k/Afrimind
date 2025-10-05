'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BuildingOfficeIcon,
  WifiIcon,
  ChartBarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  CpuChipIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
  TrendingUpIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function UrbanAgriculturePage() {
  const [selectedFeature, setSelectedFeature] = useState('smart-farming')

  const smartFeatures = [
    {
      id: 'smart-farming',
      title: 'Smart Farming Systems',
      description: 'IoT sensors, automated irrigation, and precision agriculture',
      icon: CpuChipIcon,
      color: 'blue',
      features: [
        'Automated irrigation systems',
        'Soil moisture sensors',
        'Weather monitoring stations',
        'Crop health analytics',
        'Predictive farming insights'
      ]
    },
    {
      id: 'vertical-farming',
      title: 'Vertical Farming',
      description: 'Space-efficient urban agriculture solutions',
      icon: BuildingOfficeIcon,
      color: 'green',
      features: [
        'Indoor growing systems',
        'LED grow lights',
        'Hydroponic systems',
        'Climate control',
        'Year-round production'
      ]
    },
    {
      id: 'market-integration',
      title: 'Market Integration',
      description: 'Direct connection to urban markets and consumers',
      icon: TruckIcon,
      color: 'purple',
      features: [
        'Direct-to-consumer sales',
        'Restaurant partnerships',
        'Online marketplaces',
        'Supply chain optimization',
        'Real-time pricing'
      ]
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'AI-powered insights for urban farming',
      icon: ChartBarIcon,
      color: 'yellow',
      features: [
        'Yield optimization',
        'Market trend analysis',
        'Resource efficiency',
        'Profitability tracking',
        'Predictive modeling'
      ]
    }
  ]

  const urbanFarmingTypes = [
    {
      title: 'Rooftop Gardens',
      description: 'Utilize building rooftops for food production',
      image: '/urban-farming/rooftop.jpg',
      benefits: ['Space efficient', 'Reduces building heat', 'Local food production'],
      investment: '$500 - $2,000',
      yield: 'High'
    },
    {
      title: 'Hydroponic Systems',
      description: 'Soil-less growing in controlled environments',
      image: '/urban-farming/hydroponic.jpg',
      benefits: ['Water efficient', 'Faster growth', 'No soil needed'],
      investment: '$1,000 - $5,000',
      yield: 'Very High'
    },
    {
      title: 'Community Gardens',
      description: 'Shared spaces for urban agriculture',
      image: '/urban-farming/community.jpg',
      benefits: ['Community building', 'Low cost', 'Educational'],
      investment: '$200 - $1,000',
      yield: 'Medium'
    },
    {
      title: 'Indoor Vertical Farms',
      description: 'Multi-level growing systems in buildings',
      image: '/urban-farming/vertical.jpg',
      benefits: ['Maximum yield', 'Climate controlled', 'Year-round'],
      investment: '$5,000 - $50,000',
      yield: 'Extremely High'
    }
  ]

  const businessOpportunities = [
    {
      title: 'Urban Farm Startup',
      description: 'Start your own urban farming business',
      icon: TrendingUpIcon,
      color: 'green',
      requirements: [
        'Initial investment: $2,000 - $10,000',
        'Space: 100-500 sq ft',
        'Time commitment: 20-40 hours/week',
        'Market research required'
      ],
      potential: 'High profit margins, growing market demand'
    },
    {
      title: 'AgTech Consulting',
      description: 'Help others implement smart farming',
      icon: LightBulbIcon,
      color: 'blue',
      requirements: [
        'Technical knowledge in IoT/AI',
        'Farming experience preferred',
        'Business development skills',
        'Network of urban farmers'
      ],
      potential: 'Scalable service business, high demand'
    },
    {
      title: 'Urban Food Distribution',
      description: 'Connect urban farms to consumers',
      icon: TruckIcon,
      color: 'purple',
      requirements: [
        'Logistics and transportation',
        'Cold storage facilities',
        'Customer network',
        'Technology platform'
      ],
      potential: 'Growing market, direct consumer access'
    }
  ]

  const selectedFeatureData = smartFeatures.find(f => f.id === selectedFeature)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Urban Agriculture</h1>
                <p className="text-gray-600">Smart farming for city environments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <WifiIcon className="w-5 h-5" />
                <span className="text-sm font-medium">High Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Smart Features */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Urban Farming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {smartFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedFeature === feature.id
                      ? `border-${feature.color}-500 bg-${feature.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Feature Details */}
          {selectedFeatureData && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 bg-${selectedFeatureData.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <selectedFeatureData.icon className={`w-8 h-8 text-${selectedFeatureData.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedFeatureData.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedFeatureData.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFeatureData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Urban Farming Types */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Urban Farming Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {urbanFarmingTypes.map((type, index) => (
              <div key={type.title} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{type.title}</h3>
                    <p className="text-green-100 text-sm">{type.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Investment:</span>
                      <span className="font-semibold text-gray-900 ml-1">{type.investment}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Yield:</span>
                      <span className="font-semibold text-gray-900 ml-1">{type.yield}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business Opportunities */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessOpportunities.map((opportunity, index) => {
              const Icon = opportunity.icon
              return (
                <div key={opportunity.title} className="bg-white rounded-xl shadow-lg p-6">
                  <div className={`w-12 h-12 bg-${opportunity.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${opportunity.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {opportunity.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm font-semibold text-green-800 mb-1">Potential:</div>
                    <div className="text-sm text-green-700">{opportunity.potential}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CpuChipIcon className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Smart Farm Setup</div>
                <div className="text-sm text-gray-600">Get started with IoT sensors</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Market Analysis</div>
                <div className="text-sm text-gray-600">Analyze urban market trends</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <UsersIcon className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Find Partners</div>
                <div className="text-sm text-gray-600">Connect with urban farmers</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
