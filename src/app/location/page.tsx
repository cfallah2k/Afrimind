'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GlobeAltIcon,
  BuildingOfficeIcon,
  HomeIcon,
  WifiIcon,
  SignalIcon,
  MapPinIcon,
  UsersIcon,
  TruckIcon,
  SunIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  AcademicCapIcon,
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/components/providers/language-provider'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function LocationPage() {
  const { t } = useLanguage()
  const [selectedLocation, setSelectedLocation] = useState<'rural' | 'urban' | null>(null)
  const [selectedCountry, setSelectedCountry] = useState('NG')

  const countries = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', ruralPop: '65%', urbanPop: '35%' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', ruralPop: '70%', urbanPop: '30%' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', ruralPop: '55%', urbanPop: '45%' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', ruralPop: '35%', urbanPop: '65%' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', ruralPop: '40%', urbanPop: '60%' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', ruralPop: '80%', urbanPop: '20%' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', ruralPop: '70%', urbanPop: '30%' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', ruralPop: '75%', urbanPop: '25%' }
  ]

  const ruralFeatures = [
    {
      title: 'Offline-First Agriculture',
      description: 'Access farming knowledge without internet connection',
      icon: SunIcon,
      color: 'green',
      features: [
        'Downloadable farming guides',
        'Offline weather data',
        'Local crop recommendations',
        'Traditional farming methods'
      ]
    },
    {
      title: 'Community Learning',
      description: 'Learn together with your village community',
      icon: UsersIcon,
      color: 'blue',
      features: [
        'Group learning sessions',
        'Local expert knowledge',
        'Community farming projects',
        'Shared success stories'
      ]
    },
    {
      title: 'Mobile Money Access',
      description: 'Financial services for rural communities',
      icon: CurrencyDollarIcon,
      color: 'yellow',
      features: [
        'M-Pesa integration',
        'Agricultural loans',
        'Crop insurance',
        'Market payments'
      ]
    },
    {
      title: 'Local Language Support',
      description: 'Learn in your native language',
      icon: LanguageIcon,
      color: 'purple',
      features: [
        '12 African languages',
        'Voice-based learning',
        'Cultural context',
        'Traditional knowledge'
      ]
    }
  ]

  const urbanFeatures = [
    {
      title: 'Smart City Integration',
      description: 'Connect with urban infrastructure and services',
      icon: BuildingOfficeIcon,
      color: 'blue',
      features: [
        'Digital banking services',
        'E-commerce platforms',
        'Smart transportation',
        'Urban farming solutions'
      ]
    },
    {
      title: 'Business Development',
      description: 'Scale your business in urban markets',
      icon: TruckIcon,
      color: 'green',
      features: [
        'Cross-border trade',
        'Supply chain optimization',
        'Digital marketing',
        'E-commerce integration'
      ]
    },
    {
      title: 'Technology Skills',
      description: 'Master digital skills for urban opportunities',
      icon: AcademicCapIcon,
      color: 'purple',
      features: [
        'AI and machine learning',
        'Digital literacy',
        'Online business',
        'Tech entrepreneurship'
      ]
    },
    {
      title: 'Financial Services',
      description: 'Access comprehensive financial tools',
      icon: CurrencyDollarIcon,
      color: 'yellow',
      features: [
        'Investment opportunities',
        'Credit building',
        'Digital banking',
        'Fintech solutions'
      ]
    }
  ]

  const connectivityOptions = [
    {
      type: 'High Bandwidth',
      icon: WifiIcon,
      description: 'Full platform access with all features',
      features: ['Video learning', 'Real-time AI chat', 'Live updates', 'Full multimedia'],
      suitable: 'Urban areas with good internet'
    },
    {
      type: 'Low Bandwidth',
      icon: SignalIcon,
      description: 'Optimized for slower connections',
      features: ['Text-based learning', 'Compressed images', 'Offline content', 'Basic AI features'],
      suitable: 'Rural areas with limited internet'
    },
    {
      type: 'Offline Mode',
      icon: HomeIcon,
      description: 'Works without internet connection',
      features: ['Downloaded content', 'Offline farming guides', 'Local data storage', 'Sync when online'],
      suitable: 'Remote rural communities'
    }
  ]

  const selectedCountryData = countries.find(c => c.code === selectedCountry)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Designed for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {' '}Every Community
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you're in a bustling city or a remote village, AfriMind adapts to your needs, 
              connectivity, and local context across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Community Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your location type to get personalized features and content
            </p>
          </motion.div>

          {/* Country Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Select Your Country</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                    selectedCountry === country.code
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-gray-500">
                      Rural: {country.ruralPop} | Urban: {country.urbanPop}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rural Option */}
            <motion.div
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedLocation === 'rural'
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedLocation('rural')}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rural Community</h3>
                <p className="text-gray-600">
                  Designed for farming communities, villages, and remote areas
                </p>
              </div>
              <div className="space-y-3">
                {[
                  'Offline-first agriculture tools',
                  'Community learning groups',
                  'Local language support',
                  'Mobile money integration',
                  'Traditional farming methods'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Urban Option */}
            <motion.div
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedLocation === 'urban'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedLocation('urban')}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Urban Community</h3>
                <p className="text-gray-600">
                  Optimized for cities, towns, and areas with good connectivity
                </p>
              </div>
              <div className="space-y-3">
                {[
                  'Smart city integration',
                  'Business development tools',
                  'Technology skills training',
                  'Digital financial services',
                  'Cross-border trade support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Based on Selection */}
      {selectedLocation && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedLocation === 'rural' ? 'Rural Community' : 'Urban Community'} Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {selectedLocation === 'rural' 
                  ? 'Tailored for farming communities and remote areas'
                  : 'Optimized for city life and business development'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(selectedLocation === 'rural' ? ruralFeatures : urbanFeatures).map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Connectivity Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Works with Any Internet Connection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AfriMind adapts to your internet speed and availability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {connectivityOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={option.type}
                  className="bg-white rounded-xl shadow-lg p-6 text-center"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {option.type}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {option.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    {option.suitable}
                  </div>
                  <ul className="space-y-2 text-left">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of Africans who are already using AfriMind to transform their communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg">
                Get Started Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
