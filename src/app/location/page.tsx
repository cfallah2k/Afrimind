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
  LightBulbIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  BoltIcon,
  StarIcon,
  SparklesIcon,
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  CpuChipIcon,
  BookOpenIcon,
  GlobeAmericasIcon,
  ChevronRightIcon,
  PlayIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/components/providers/language-provider'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function LocationPage() {
  const { t } = useLanguage()
  const [selectedLocation, setSelectedLocation] = useState<'rural' | 'urban' | null>(null)
  const [selectedCountry, setSelectedCountry] = useState('LR')
  const [showCountryModal, setShowCountryModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const countries = [
    // West African Countries (with special focus on Liberia)
    { 
      code: 'LR', 
      name: 'Liberia', 
      flag: '🇱🇷', 
      ruralPop: '60%', 
      urbanPop: '40%',
      capital: 'Monrovia',
      population: '5.2M',
      currency: 'LRD',
      languages: ['English', 'Kpelle', 'Bassa'],
      description: 'Land of Liberty - Your gateway to West Africa',
      isDefault: true
    },
    { 
      code: 'NG', 
      name: 'Nigeria', 
      flag: '🇳🇬', 
      ruralPop: '65%', 
      urbanPop: '35%',
      capital: 'Abuja',
      population: '218M',
      currency: 'NGN',
      languages: ['English', 'Hausa', 'Yoruba', 'Igbo'],
      description: 'Giant of Africa - Largest economy in West Africa'
    },
    { 
      code: 'GH', 
      name: 'Ghana', 
      flag: '🇬🇭', 
      ruralPop: '55%', 
      urbanPop: '45%',
      capital: 'Accra',
      population: '32M',
      currency: 'GHS',
      languages: ['English', 'Twi', 'Ewe'],
      description: 'Gateway to West Africa - Strong democracy and economy'
    },
    { 
      code: 'SN', 
      name: 'Senegal', 
      flag: '🇸🇳', 
      ruralPop: '60%', 
      urbanPop: '40%',
      capital: 'Dakar',
      population: '17M',
      currency: 'XOF',
      languages: ['French', 'Wolof', 'Pulaar'],
      description: 'Cultural hub of West Africa - Rich traditions and arts'
    },
    { 
      code: 'CI', 
      name: 'Côte d\'Ivoire', 
      flag: '🇨🇮', 
      ruralPop: '65%', 
      urbanPop: '35%',
      capital: 'Yamoussoukro',
      population: '27M',
      currency: 'XOF',
      languages: ['French', 'Baoulé', 'Dioula'],
      description: 'Economic powerhouse - Leading cocoa producer'
    },
    { 
      code: 'ML', 
      name: 'Mali', 
      flag: '🇲🇱', 
      ruralPop: '70%', 
      urbanPop: '30%',
      capital: 'Bamako',
      population: '21M',
      currency: 'XOF',
      languages: ['French', 'Bambara', 'Fulfulde'],
      description: 'Ancient empire - Rich cultural heritage'
    },
    { 
      code: 'BF', 
      name: 'Burkina Faso', 
      flag: '🇧🇫', 
      ruralPop: '75%', 
      urbanPop: '25%',
      capital: 'Ouagadougou',
      population: '22M',
      currency: 'XOF',
      languages: ['French', 'Mooré', 'Dioula'],
      description: 'Land of upright people - Strong agricultural base'
    },
    { 
      code: 'NE', 
      name: 'Niger', 
      flag: '🇳🇪', 
      ruralPop: '80%', 
      urbanPop: '20%',
      capital: 'Niamey',
      population: '26M',
      currency: 'XOF',
      languages: ['French', 'Hausa', 'Zarma'],
      description: 'Gateway to Sahara - Vast natural resources'
    },
    { 
      code: 'GN', 
      name: 'Guinea', 
      flag: '🇬🇳', 
      ruralPop: '70%', 
      urbanPop: '30%',
      capital: 'Conakry',
      population: '14M',
      currency: 'GNF',
      languages: ['French', 'Fulfulde', 'Malinké'],
      description: 'Water tower of West Africa - Rich in minerals'
    },
    { 
      code: 'SL', 
      name: 'Sierra Leone', 
      flag: '🇸🇱', 
      ruralPop: '65%', 
      urbanPop: '35%',
      capital: 'Freetown',
      population: '8M',
      currency: 'SLL',
      languages: ['English', 'Krio', 'Mende'],
      description: 'Diamond coast - Beautiful beaches and resources'
    },
    { 
      code: 'GM', 
      name: 'Gambia', 
      flag: '🇬🇲', 
      ruralPop: '60%', 
      urbanPop: '40%',
      capital: 'Banjul',
      population: '2.5M',
      currency: 'GMD',
      languages: ['English', 'Mandinka', 'Wolof'],
      description: 'Smiling coast of Africa - Tourism and agriculture'
    },
    { 
      code: 'GW', 
      name: 'Guinea-Bissau', 
      flag: '🇬🇼', 
      ruralPop: '70%', 
      urbanPop: '30%',
      capital: 'Bissau',
      population: '2M',
      currency: 'XOF',
      languages: ['Portuguese', 'Crioulo', 'Fulfulde'],
      description: 'Island nation - Unique blend of cultures'
    },
    { 
      code: 'CV', 
      name: 'Cape Verde', 
      flag: '🇨🇻', 
      ruralPop: '40%', 
      urbanPop: '60%',
      capital: 'Praia',
      population: '560K',
      currency: 'CVE',
      languages: ['Portuguese', 'Crioulo'],
      description: 'Island paradise - Tourism and services hub'
    },
    { 
      code: 'TG', 
      name: 'Togo', 
      flag: '🇹🇬', 
      ruralPop: '65%', 
      urbanPop: '35%',
      capital: 'Lomé',
      population: '8.5M',
      currency: 'XOF',
      languages: ['French', 'Ewe', 'Kabiye'],
      description: 'Gateway to landlocked countries - Strategic location'
    },
    { 
      code: 'BJ', 
      name: 'Benin', 
      flag: '🇧🇯', 
      ruralPop: '60%', 
      urbanPop: '40%',
      capital: 'Porto-Novo',
      population: '13M',
      currency: 'XOF',
      languages: ['French', 'Fon', 'Yoruba'],
      description: 'Cradle of voodoo - Rich cultural traditions'
    }
  ]

  const ruralFeatures = [
    {
      title: 'Smart Farming Tools',
      description: 'AI-powered agricultural assistance for better yields',
      icon: SunIcon,
      color: 'green',
      features: [
        'Crop recommendations',
        'Weather alerts',
        'Pest identification',
        'Soil analysis',
        'Market prices'
      ]
    },
    {
      title: 'Community Learning',
      description: 'Connect with local farmers and share knowledge',
      icon: UsersIcon,
      color: 'blue',
      features: [
        'Farmer groups',
        'Skill sharing',
        'Local experts',
        'Traditional methods',
        'Success stories'
      ]
    },
    {
      title: 'Mobile Money',
      description: 'Secure financial services for rural communities',
      icon: CurrencyDollarIcon,
      color: 'yellow',
      features: [
        'Mobile payments',
        'Savings accounts',
        'Micro-loans',
        'Insurance',
        'Remittances'
      ]
    },
    {
      title: 'Offline Access',
      description: 'Works without internet connection',
      icon: WifiIcon,
      color: 'purple',
      features: [
        'Offline mode',
        'Data sync',
        'Local storage',
        'Voice notes',
        'Photo capture'
      ]
    }
  ]

  const urbanFeatures = [
    {
      title: 'Business Tools',
      description: 'Digital tools for urban entrepreneurs',
      icon: BuildingOfficeIcon,
      color: 'blue',
      features: [
        'Business planning',
        'Market research',
        'Financial tracking',
        'Customer management',
        'Growth analytics'
      ]
    },
    {
      title: 'Cross-Border Trade',
      description: 'Connect with regional markets and opportunities',
      icon: TruckIcon,
      color: 'green',
      features: [
        'Trade routes',
        'Customs info',
        'Market prices',
        'Currency exchange',
        'Documentation'
      ]
    },
    {
      title: 'Digital Skills',
      description: 'Learn modern technology and digital literacy',
      icon: AcademicCapIcon,
      color: 'purple',
      features: [
        'Online courses',
        'Certifications',
        'Tech skills',
        'Digital marketing',
        'E-commerce'
      ]
    },
    {
      title: 'Smart Services',
      description: 'AI-powered urban solutions',
      icon: CpuChipIcon,
      color: 'orange',
      features: [
        'Smart recommendations',
        'Automated tasks',
        'Data insights',
        'Predictive analytics',
        'Voice assistance'
      ]
    }
  ]

  const connectivityOptions = [
    {
      type: 'Offline Mode',
      description: 'Works completely without internet',
      icon: CloudIcon,
      suitable: 'Perfect for remote areas',
      features: [
        'Download content for offline use',
        'Sync when connection available',
        'Local data storage',
        'Voice-based interactions',
        'Photo and video capture'
      ]
    },
    {
      type: 'Mobile Data',
      description: 'Optimized for 2G/3G connections',
      icon: SignalIcon,
      suitable: 'Good for rural areas',
      features: [
        'Lightweight interface',
        'Compressed data',
        'Essential features only',
        'Quick loading',
        'Data usage tracking'
      ]
    },
    {
      type: 'WiFi/4G',
      description: 'Full features with fast internet',
      icon: WifiIcon,
      suitable: 'Urban areas and cities',
      features: [
        'All features available',
        'Real-time updates',
        'Video streaming',
        'Cloud sync',
        'Advanced analytics'
      ]
    }
  ]

  const selectedCountryData = countries.find(c => c.code === selectedCountry)

  const handleNext = () => {
    if (currentStep === 1 && selectedCountry) {
      setCurrentStep(2)
    } else if (currentStep === 2 && selectedLocation) {
      setCurrentStep(3)
      setIsCompleted(true)
    }
  }

  const handleComplete = () => {
    // Save user preferences and redirect
    console.log('User setup completed:', { selectedCountry, selectedLocation })
    // Redirect to main app or dashboard
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative w-full">
      {/* Mobile Status Bar */}
      <div className="bg-black text-white text-xs px-3 sm:px-4 py-1 flex justify-between items-center">
        <span className="text-xs">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
        </div>
        <span className="text-xs">100%</span>
      </div>

      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">Setup Location</h1>
                <p className="text-xs text-gray-500">Step {currentStep} of 3</p>
              </div>
            </div>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="p-1.5 sm:p-2 -mr-1 sm:-mr-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1 sm:h-1.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-1 sm:h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step 1: Country Selection */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-3 sm:px-4 py-4 sm:py-6"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
              Welcome to AfriMind! 🌍
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Let's personalize your experience
            </p>
          </div>

          {/* Default Country - Liberia */}
          <div className="mb-3 sm:mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-10 rounded-full -mr-6 sm:-mr-8 -mt-6 sm:-mt-8"></div>
              <div className="relative">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">🇱🇷</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold truncate">Liberia (Recommended)</h3>
                    <p className="text-blue-100 text-xs">Land of Liberty</p>
                  </div>
                  <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                </div>
                <p className="text-blue-100 text-xs mb-2 sm:mb-3">
                  Your gateway to West Africa
                </p>
                <button
                  onClick={() => {
                    setSelectedCountry('LR')
                    handleNext()
                  }}
                  className="bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-colors"
                >
                  Use Liberia (Default)
                </button>
              </div>
            </div>
          </div>

          {/* Other Countries */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 text-center">
              Or choose another country:
            </h3>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {countries.slice(1, 7).map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                    selectedCountry === country.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-lg sm:text-xl mb-0.5 sm:mb-1 block">{country.flag}</span>
                    <div className="font-medium text-xs text-gray-900 truncate">{country.name}</div>
                    <div className="text-xs text-gray-500">{country.population}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowCountryModal(true)}
              className="w-full mt-2 sm:mt-3 p-2 sm:p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <GlobeAltIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium text-xs sm:text-sm">View All Countries</span>
                <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </button>
          </div>

          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 sm:mt-4"
            >
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                Continue to Community Type
                <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2" />
              </button>
            </motion.div>
          )}
          </div>
        </motion.div>
      )}

      {/* Step 2: Community Type Selection */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-3 sm:px-4 py-4 sm:py-6"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
              Choose Your Community Type
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              This helps us customize features for your needs
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {/* Rural Option */}
            <motion.div
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${
                selectedLocation === 'rural'
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setSelectedLocation('rural')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">Rural Community</h3>
                  <p className="text-xs text-gray-600">Farming, villages, remote areas</p>
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                      Agriculture
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                      Offline
                    </span>
                  </div>
                </div>
                {selectedLocation === 'rural' && (
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </motion.div>

            {/* Urban Option */}
            <motion.div
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${
                selectedLocation === 'urban'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedLocation('urban')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">Urban Community</h3>
                  <p className="text-xs text-gray-600">Cities, towns, good connectivity</p>
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                      Business
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                      Digital
                    </span>
                  </div>
                </div>
                {selectedLocation === 'urban' && (
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          </div>

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 sm:mt-4"
            >
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                Continue to Features
                <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2" />
              </button>
            </motion.div>
          )}
        </div>
        </motion.div>
      )}

      {/* Step 3: Features Preview */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-3 sm:px-4 py-4 sm:py-6"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
              Your Personalized Features
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Based on your {selectedLocation} location in {selectedCountryData?.name}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {(selectedLocation === 'rural' ? ruralFeatures : urbanFeatures).map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-2.5 sm:p-3 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-${feature.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-${feature.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 sm:space-y-3"
          >
            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
            >
              Complete Setup & Start Using AfriMind
              <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2" />
            </button>
            
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full border border-gray-300 text-gray-700 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              Change Settings
            </button>
          </motion.div>
          </div>
        </motion.div>
      )}

      {/* Country Selection Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-0">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Select Country</h3>
              <button
                onClick={() => setShowCountryModal(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 max-h-96 overflow-y-auto">
              <div className="space-y-1.5 sm:space-y-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country.code)
                      setShowCountryModal(false)
                    }}
                    className={`p-2.5 sm:p-3 rounded-lg border-2 text-left transition-all w-full ${
                      selectedCountry === country.code
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-lg sm:text-xl">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-gray-900 truncate">{country.name}</div>
                        <div className="text-xs text-gray-600">{country.description}</div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                          <span className="text-xs text-gray-500">Capital: {country.capital}</span>
                          <span className="text-xs text-gray-500">Pop: {country.population}</span>
                        </div>
                      </div>
                      {country.isDefault && (
                        <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}