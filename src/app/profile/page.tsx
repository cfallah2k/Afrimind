'use client'

import { useState, useEffect } from 'react'
import { useLocalAuth } from '@/hooks/use-local-auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  UserIcon,
  MapPinIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function ProfilePage() {
  const { data: session, updateUser } = useLocalAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const [profileData, setProfileData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    profileImage: '',
    
    // Farming Details
    farmName: '',
    farmSize: '',
    farmingExperience: '',
    primaryCrops: [] as string[],
    farmingMethods: [] as string[],
    
    // Location
    country: '',
    region: '',
    city: '',
    coordinates: { lat: '', lng: '' },
    
    // Preferences
    language: 'en',
    currency: 'USD',
    units: 'metric',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    weatherAlerts: true,
    marketUpdates: true,
    farmingTips: true,
    
    // Privacy
    profileVisibility: 'public',
    dataSharing: false
  })

  useEffect(() => {
    if (session?.user) {
      setProfileData(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
        country: session.user?.country || '',
        language: session.user?.language || 'en'
      }))
    }
  }, [session])

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateUser(profileData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: UserIcon },
    { id: 'farming', label: 'Farming Details', icon: MapPinIcon },
    { id: 'preferences', label: 'Preferences', icon: CogIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon }
  ]

  const westAfricanCountries = [
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: 'MR', name: 'Mauritania', flag: '🇲🇷' }
  ]

  const commonCrops = [
    'Rice', 'Maize', 'Cassava', 'Yam', 'Sorghum', 'Millet', 'Groundnut', 'Cowpea',
    'Soybean', 'Cotton', 'Cocoa', 'Coffee', 'Palm Oil', 'Banana', 'Plantain', 'Tomato',
    'Onion', 'Pepper', 'Okra', 'Cabbage', 'Lettuce', 'Carrot', 'Sweet Potato'
  ]

  const farmingMethods = [
    'Traditional', 'Organic', 'Conventional', 'Conservation Agriculture',
    'Agroforestry', 'Integrated Pest Management', 'Precision Farming'
  ]

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          {profileData.profileImage ? (
            <img src={profileData.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <UserIcon className="w-10 h-10 text-green-600" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{profileData.name || 'Farmer'}</h3>
          <p className="text-gray-600">{profileData.email}</p>
          <button className="text-green-600 text-sm hover:text-green-700">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
            placeholder="+234 123 456 7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <select
            value={profileData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="">Select your country</option>
            {westAfricanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  const renderFarmingDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
          <input
            type="text"
            value={profileData.farmName}
            onChange={(e) => handleInputChange('farmName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
            placeholder="e.g., Green Valley Farm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
          <select
            value={profileData.farmSize}
            onChange={(e) => handleInputChange('farmSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="">Select farm size</option>
            <option value="small">Small (0-5 hectares)</option>
            <option value="medium">Medium (5-20 hectares)</option>
            <option value="large">Large (20+ hectares)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Farming Experience</label>
          <select
            value={profileData.farmingExperience}
            onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner (0-2 years)</option>
            <option value="intermediate">Intermediate (2-10 years)</option>
            <option value="experienced">Experienced (10+ years)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <input
            type="text"
            value={profileData.region}
            onChange={(e) => handleInputChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
            placeholder="e.g., Northern Region"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crops</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {commonCrops.map((crop) => (
            <label key={crop} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.primaryCrops.includes(crop)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('primaryCrops', [...profileData.primaryCrops, crop])
                  } else {
                    handleInputChange('primaryCrops', profileData.primaryCrops.filter(c => c !== crop))
                  }
                }}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                disabled={!isEditing}
              />
              <span className="text-sm text-gray-700">{crop}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Farming Methods</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {farmingMethods.map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.farmingMethods.includes(method)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('farmingMethods', [...profileData.farmingMethods, method])
                  } else {
                    handleInputChange('farmingMethods', profileData.farmingMethods.filter(m => m !== method))
                  }
                }}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                disabled={!isEditing}
              />
              <span className="text-sm text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={profileData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yorùbá</option>
            <option value="ig">Igbo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={profileData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="USD">USD ($)</option>
            <option value="NGN">Naira (₦)</option>
            <option value="GHS">Cedi (₵)</option>
            <option value="XOF">CFA Franc (₣)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
          <select
            value={profileData.units}
            onChange={(e) => handleInputChange('units', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="metric">Metric (kg, ha, °C)</option>
            <option value="imperial">Imperial (lbs, acres, °F)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
          { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive updates via SMS' },
          { key: 'weatherAlerts', label: 'Weather Alerts', description: 'Get weather warnings and forecasts' },
          { key: 'marketUpdates', label: 'Market Updates', description: 'Receive market price updates' },
          { key: 'farmingTips', label: 'Farming Tips', description: 'Get agricultural advice and tips' }
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{label}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData[key as keyof typeof profileData] as boolean}
                onChange={(e) => handleInputChange(key, e.target.checked)}
                className="sr-only peer"
                disabled={!isEditing}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
          <select
            value={profileData.profileVisibility}
            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isEditing}
          >
            <option value="public">Public - Visible to all farmers</option>
            <option value="community">Community - Visible to local farmers</option>
            <option value="private">Private - Only visible to you</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Data Sharing</h4>
            <p className="text-sm text-gray-600">Allow sharing of anonymized farming data for research</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.dataSharing}
              onChange={(e) => handleInputChange('dataSharing', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalInfo()
      case 'farming': return renderFarmingDetails()
      case 'preferences': return renderPreferences()
      case 'notifications': return renderNotifications()
      case 'privacy': return renderPrivacy()
      default: return renderPersonalInfo()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Farmer Profile</h1>
                  <p className="text-gray-600">Manage your farming profile and preferences</p>
                </div>
                <div className="flex items-center space-x-3">
                  {success && (
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm">{success}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                      isEditing 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
