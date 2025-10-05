'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserGroupIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  StarIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  SunIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

// Sample farmer profiles
const farmers = [
  {
    id: 1,
    name: 'John Kollie',
    location: 'Monrovia, Liberia',
    crops: ['Rice', 'Cassava'],
    experience: '15 years',
    rating: 4.8,
    avatar: '👨‍🌾',
    phone: '+231-77-123-4567',
    online: true,
    specialties: ['Organic Farming', 'Market Analysis'],
    languages: ['English', 'Kpelle'],
    lastActive: '2 hours ago',
    bio: 'Experienced rice farmer with expertise in organic farming methods. Always willing to share knowledge and help fellow farmers.',
    achievements: ['Top Producer 2023', 'Community Leader'],
    verified: true
  },
  {
    id: 2,
    name: 'Aisha Diallo',
    location: 'Dakar, Senegal',
    crops: ['Millet', 'Sorghum'],
    experience: '8 years',
    rating: 4.6,
    avatar: '👩‍🌾',
    phone: '+221-77-234-5678',
    online: true,
    specialties: ['Drought Resistance', 'Women in Agriculture'],
    languages: ['French', 'Wolof', 'English'],
    lastActive: '1 hour ago',
    bio: 'Passionate about sustainable farming and empowering women in agriculture. Expert in drought-resistant crops.',
    achievements: ['Women Farmer of the Year', 'Climate Resilience Award'],
    verified: true
  },
  {
    id: 3,
    name: 'Kwame Asante',
    location: 'Kumasi, Ghana',
    crops: ['Cocoa', 'Coffee'],
    experience: '20 years',
    rating: 4.9,
    avatar: '👨‍🌾',
    phone: '+233-24-345-6789',
    online: false,
    specialties: ['Cash Crops', 'Export Markets'],
    languages: ['English', 'Twi'],
    lastActive: '5 hours ago',
    bio: 'Third-generation cocoa farmer with extensive knowledge of international markets and export procedures.',
    achievements: ['Export Excellence Award', 'Mentor of the Year'],
    verified: true
  },
  {
    id: 4,
    name: 'Fatou Traore',
    location: 'Bamako, Mali',
    crops: ['Cotton', 'Groundnuts'],
    experience: '12 years',
    rating: 4.7,
    avatar: '👩‍🌾',
    phone: '+223-65-456-7890',
    online: true,
    specialties: ['Cotton Production', 'Soil Management'],
    languages: ['French', 'Bambara', 'English'],
    lastActive: '30 minutes ago',
    bio: 'Cotton specialist with innovative soil management techniques. Active in farmer cooperatives.',
    achievements: ['Soil Conservation Award', 'Cooperative Leader'],
    verified: false
  },
  {
    id: 5,
    name: 'Ibrahim Oumarou',
    location: 'Niamey, Niger',
    crops: ['Millet', 'Cowpea'],
    experience: '18 years',
    rating: 4.5,
    avatar: '👨‍🌾',
    phone: '+227-90-567-8901',
    online: false,
    specialties: ['Dryland Farming', 'Seed Production'],
    languages: ['French', 'Hausa', 'English'],
    lastActive: '1 day ago',
    bio: 'Expert in dryland farming techniques and seed production. Helps farmers adapt to climate change.',
    achievements: ['Climate Adaptation Award', 'Seed Bank Founder'],
    verified: true
  }
]

// Market insights and discussions
const discussions = [
  {
    id: 1,
    title: 'Best Rice Varieties for Liberia',
    author: 'John Kollie',
    authorId: 1,
    category: 'Crop Advice',
    replies: 12,
    views: 45,
    lastReply: '2 hours ago',
    tags: ['Rice', 'Liberia', 'Varieties'],
    content: 'Sharing my experience with different rice varieties that work well in our climate...'
  },
  {
    id: 2,
    title: 'Cross-Border Trading Opportunities',
    author: 'Kwame Asante',
    authorId: 3,
    category: 'Market Intelligence',
    replies: 8,
    views: 32,
    lastReply: '4 hours ago',
    tags: ['Trading', 'Export', 'Ghana'],
    content: 'Recent market analysis shows great opportunities for cocoa exports to Europe...'
  },
  {
    id: 3,
    title: 'Organic Pest Control Methods',
    author: 'Aisha Diallo',
    authorId: 2,
    category: 'Sustainable Farming',
    replies: 15,
    views: 67,
    lastReply: '1 hour ago',
    tags: ['Organic', 'Pest Control', 'Sustainable'],
    content: 'Traditional methods that have worked for generations in our region...'
  }
]

export default function FarmerNetworkPage() {
  const [selectedTab, setSelectedTab] = useState('farmers')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [filterCountry, setFilterCountry] = useState('all')
  const [filterCrop, setFilterCrop] = useState('all')

  const countries = ['all', 'Liberia', 'Senegal', 'Ghana', 'Mali', 'Niger']
  const crops = ['all', 'Rice', 'Cassava', 'Cocoa', 'Coffee', 'Cotton', 'Millet']

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        farmer.crops.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCountry = filterCountry === 'all' || farmer.location.includes(filterCountry)
    const matchesCrop = filterCrop === 'all' || farmer.crops.includes(filterCrop)
    
    return matchesSearch && matchesCountry && matchesCrop
  })

  const handleCall = (farmer: any) => {
    setSelectedFarmer(farmer)
    setShowCallModal(true)
  }

  const handleMessage = (farmer: any) => {
    setSelectedFarmer(farmer)
    setShowChat(true)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message
      alert(`Message sent to ${selectedFarmer.name}: "${chatMessage}"`)
      setChatMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Farmer Network 🌾</h1>
              <p className="text-sm text-gray-600">Connect with fellow farmers</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Messages"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Network</h1>
              <p className="text-gray-600">Connect, learn, and grow together</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <PlusIcon className="w-4 h-4" />
                <span>Add Farmer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-7xl mx-auto px-4 py-6"
      >
        {/* Tab Navigation */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('farmers')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'farmers'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserGroupIcon className="w-4 h-4 inline mr-2" />
              Farmers
            </button>
            <button
              onClick={() => setSelectedTab('discussions')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'discussions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-2" />
              Discussions
            </button>
            <button
              onClick={() => setSelectedTab('market-insights')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'market-insights'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GlobeAltIcon className="w-4 h-4 inline mr-2" />
              Market Insights
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search farmers, crops, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country === 'all' ? 'All Countries' : country}
                    </option>
                  ))}
                </select>

                <select
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {crops.map(crop => (
                    <option key={crop} value={crop}>
                      {crop === 'all' ? 'All Crops' : crop}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content based on selected tab */}
        {selectedTab === 'farmers' && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
              Connect with Farmers ({filteredFarmers.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredFarmers.map((farmer) => (
                <div key={farmer.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="text-3xl">{farmer.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                        {farmer.verified && (
                          <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                        )}
                        {farmer.online && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{farmer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span>{farmer.rating}</span>
                        <span>•</span>
                        <span>{farmer.experience} experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {farmer.crops.map((crop: string) => (
                        <span key={crop} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {crop}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specialties.map((specialty: string) => (
                        <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{farmer.bio}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCall(farmer)}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4" />
                        <span className="text-sm">Call</span>
                      </button>
                      <button
                        onClick={() => handleMessage(farmer)}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        <span className="text-sm">Message</span>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {farmer.lastActive}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'discussions' && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Community Discussions</h2>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-700">
                          {discussion.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {discussion.lastReply}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{discussion.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.views} views</span>
                    </div>
                    <div className="flex space-x-1">
                      {discussion.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'market-insights' && (
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Market Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Rice prices up in Nigeria</div>
                      <div className="text-sm text-gray-600">+15% in Lagos markets</div>
                    </div>
                    <TrendingUpIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Cocoa prices down in Ghana</div>
                      <div className="text-sm text-gray-600">-8% in Kumasi markets</div>
                    </div>
                    <TrendingDownIcon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Trading Opportunities</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-gray-900">Liberia → Nigeria</div>
                    <div className="text-sm text-gray-600">Rice export opportunity</div>
                    <div className="text-sm text-green-600 font-medium">+25% profit margin</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-gray-900">Ghana → Senegal</div>
                    <div className="text-sm text-gray-600">Cocoa trading</div>
                    <div className="text-sm text-green-600 font-medium">+18% profit margin</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.main>

      {/* Call Modal */}
      {showCallModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{selectedFarmer.avatar}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedFarmer.name}</h3>
              <p className="text-gray-600 mb-4">{selectedFarmer.location}</p>
              <p className="text-sm text-gray-500 mb-6">{selectedFarmer.phone}</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    alert(`Calling ${selectedFarmer.name} at ${selectedFarmer.phone}`)
                    setShowCallModal(false)
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-md h-96 flex flex-col"
          >
            <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
              <div className="text-2xl">{selectedFarmer.avatar}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedFarmer.name}</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Online</span>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                    Hello! I'm interested in learning about your farming methods.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                    Hi! I'd be happy to share my experience with you.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
