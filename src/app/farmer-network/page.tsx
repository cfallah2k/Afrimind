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
  ArrowTrendingDownIcon as TrendingDownIcon,
  XMarkIcon
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
  },
  {
    id: 6,
    name: 'Aminata Conteh',
    location: 'Freetown, Sierra Leone',
    crops: ['Rice', 'Palm Oil'],
    experience: '10 years',
    rating: 4.4,
    avatar: '👩‍🌾',
    phone: '+232-76-123-4567',
    online: true,
    specialties: ['Palm Oil Processing', 'Women Empowerment'],
    languages: ['English', 'Krio', 'Temne'],
    lastActive: '3 hours ago',
    bio: 'Palm oil producer and processor. Active in women farmer groups and sustainable agriculture.',
    achievements: ['Women Entrepreneur Award', 'Sustainable Farming Leader'],
    verified: true
  },
  {
    id: 7,
    name: 'Mohamed Camara',
    location: 'Conakry, Guinea',
    crops: ['Rice', 'Maize'],
    experience: '14 years',
    rating: 4.6,
    avatar: '👨‍🌾',
    phone: '+224-61-234-5678',
    online: false,
    specialties: ['Irrigation Systems', 'Crop Rotation'],
    languages: ['French', 'Fulani', 'English'],
    lastActive: '6 hours ago',
    bio: 'Expert in irrigation and modern farming techniques. Helps farmers increase productivity.',
    achievements: ['Innovation Award', 'Productivity Leader'],
    verified: true
  },
  {
    id: 8,
    name: 'Grace Mensah',
    location: 'Accra, Ghana',
    crops: ['Tomato', 'Pepper'],
    experience: '7 years',
    rating: 4.3,
    avatar: '👩‍🌾',
    phone: '+233-24-456-7890',
    online: true,
    specialties: ['Vegetable Farming', 'Greenhouse Technology'],
    languages: ['English', 'Twi', 'Ga'],
    lastActive: '1 hour ago',
    bio: 'Vegetable farmer specializing in greenhouse production and modern farming techniques.',
    achievements: ['Young Farmer Award', 'Technology Adopter'],
    verified: false
  },
  {
    id: 9,
    name: 'Ousmane Diop',
    location: 'Dakar, Senegal',
    crops: ['Groundnut', 'Millet'],
    experience: '16 years',
    rating: 4.7,
    avatar: '👨‍🌾',
    phone: '+221-77-345-6789',
    online: true,
    specialties: ['Groundnut Production', 'Market Access'],
    languages: ['French', 'Wolof', 'English'],
    lastActive: '2 hours ago',
    bio: 'Groundnut specialist with strong market connections. Helps farmers access better prices.',
    achievements: ['Market Access Award', 'Price Negotiation Expert'],
    verified: true
  },
  {
    id: 10,
    name: 'Fatima Al-Hassan',
    location: 'Abuja, Nigeria',
    crops: ['Maize', 'Sorghum'],
    experience: '11 years',
    rating: 4.5,
    avatar: '👩‍🌾',
    phone: '+234-80-123-4567',
    online: false,
    specialties: ['Cereal Production', 'Post-Harvest Management'],
    languages: ['English', 'Hausa', 'Yoruba'],
    lastActive: '4 hours ago',
    bio: 'Cereal farmer with expertise in post-harvest management and storage techniques.',
    achievements: ['Post-Harvest Expert', 'Storage Innovation Award'],
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
  },
  {
    id: 4,
    title: 'Cassava Processing Techniques in West Africa',
    author: 'Aminata Conteh',
    authorId: 6,
    category: 'Processing',
    replies: 9,
    views: 38,
    lastReply: '3 hours ago',
    tags: ['Cassava', 'Processing', 'Sierra Leone'],
    content: 'Sharing traditional and modern cassava processing methods used across West Africa...'
  },
  {
    id: 5,
    title: 'Irrigation Solutions for Dry Season Farming',
    author: 'Mohamed Camara',
    authorId: 7,
    category: 'Technology',
    replies: 6,
    views: 29,
    lastReply: '5 hours ago',
    tags: ['Irrigation', 'Technology', 'Guinea'],
    content: 'Modern irrigation systems that have increased our productivity by 40%...'
  },
  {
    id: 6,
    title: 'Women in Agriculture - Success Stories',
    author: 'Grace Mensah',
    authorId: 8,
    category: 'Community',
    replies: 18,
    views: 89,
    lastReply: '30 minutes ago',
    tags: ['Women', 'Agriculture', 'Ghana'],
    content: 'Celebrating the achievements of women farmers across West Africa...'
  },
  {
    id: 7,
    title: 'Groundnut Market Trends in Senegal',
    author: 'Ousmane Diop',
    authorId: 9,
    category: 'Market Intelligence',
    replies: 11,
    views: 52,
    lastReply: '2 hours ago',
    tags: ['Groundnut', 'Market', 'Senegal'],
    content: 'Current market analysis and price trends for groundnut exports...'
  },
  {
    id: 8,
    title: 'Post-Harvest Storage Solutions',
    author: 'Fatima Al-Hassan',
    authorId: 10,
    category: 'Storage',
    replies: 7,
    views: 34,
    lastReply: '4 hours ago',
    tags: ['Storage', 'Post-Harvest', 'Nigeria'],
    content: 'Innovative storage methods that reduce post-harvest losses by 60%...'
  },
  {
    id: 9,
    title: 'Climate Change Adaptation Strategies',
    author: 'Ibrahim Oumarou',
    authorId: 5,
    category: 'Climate',
    replies: 14,
    views: 76,
    lastReply: '1 hour ago',
    tags: ['Climate', 'Adaptation', 'Niger'],
    content: 'How we\'re adapting our farming practices to changing weather patterns...'
  },
  {
    id: 10,
    title: 'Youth Engagement in Agriculture',
    author: 'Fatou Traore',
    authorId: 4,
    category: 'Community',
    replies: 13,
    views: 58,
    lastReply: '6 hours ago',
    tags: ['Youth', 'Agriculture', 'Mali'],
    content: 'Encouraging young people to take up farming as a viable career...'
  }
]

export default function FarmerNetworkPage() {
  const [selectedTab, setSelectedTab] = useState('farmers')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [filterCountry, setFilterCountry] = useState('all')
  const [filterCrop, setFilterCrop] = useState('all')
  
  // Add Farmer form state
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    location: '',
    crops: [],
    experience: '',
    phone: '',
    specialties: [],
    languages: [],
    bio: ''
  })

  const countries = ['all', 'Liberia', 'Nigeria', 'Ghana', 'Senegal', 'Ivory Coast', 'Mali', 'Burkina Faso', 'Niger', 'Guinea', 'Sierra Leone', 'Benin', 'Togo', 'Gambia', 'Guinea-Bissau', 'Cape Verde']
  const crops = ['all', 'Rice', 'Cassava', 'Maize', 'Cocoa', 'Coffee', 'Palm Oil', 'Cotton', 'Millet', 'Sorghum', 'Groundnut', 'Yam', 'Plantain', 'Tomato', 'Onion', 'Pepper', 'Okra', 'Sweet Potato', 'Ginger', 'Turmeric', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach', 'Banana', 'Mango', 'Orange', 'Pineapple', 'Papaya']

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

  const handleAddFarmer = () => {
    setShowAddFarmerModal(true)
  }

  const handleSubmitFarmer = () => {
    if (newFarmer.name && newFarmer.location && newFarmer.phone) {
      // In a real app, this would submit to a backend
      alert(`Farmer ${newFarmer.name} from ${newFarmer.location} has been added to the network!`)
      setShowAddFarmerModal(false)
      setNewFarmer({
        name: '',
        location: '',
        crops: [],
        experience: '',
        phone: '',
        specialties: [],
        languages: [],
        bio: ''
      })
    } else {
      alert('Please fill in all required fields (Name, Location, Phone)')
    }
  }

  const handleCropToggle = (crop: string) => {
    setNewFarmer(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) 
        ? prev.crops.filter(c => c !== crop)
        : [...prev.crops, crop]
    }))
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setNewFarmer(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="subheader">
            <div>
              <h1 className="subheader-title">Farmer Network 🌾</h1>
              <p className="subheader-desc">West African farmers network</p>
            </div>
            <div className="subheader-actions">
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
          <div className="subheader">
            <div>
              <h1 className="subheader-title">Farmer Network</h1>
              <p className="subheader-desc">West African farmers network</p>
            </div>
            <div className="subheader-actions">
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
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                selectedTab === 'farmers'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserGroupIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Farmers</span>
              <span className="sm:hidden">Farm</span>
            </button>
            <button
              onClick={() => setSelectedTab('discussions')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                selectedTab === 'discussions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Discussions</span>
              <span className="sm:hidden">Chat</span>
            </button>
            <button
              onClick={() => setSelectedTab('market-insights')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                selectedTab === 'market-insights'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GlobeAltIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Market Insights</span>
              <span className="sm:hidden">Market</span>
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
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search farmers, crops, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
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
                  className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filteredFarmers.map((farmer) => (
                <div key={farmer.id} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">{farmer.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{farmer.name}</h3>
                        {farmer.verified && (
                          <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                        )}
                        {farmer.online && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                        <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{farmer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                        <span className="truncate">{farmer.experience} experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {farmer.crops.slice(0, 3).map((crop: string) => (
                        <span key={crop} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {crop}
                        </span>
                      ))}
                      {farmer.crops.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{farmer.crops.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specialties.slice(0, 2).map((specialty: string) => (
                        <span key={specialty} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {farmer.specialties.length > 2 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{farmer.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{farmer.bio}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleCall(farmer)}
                        className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
                      >
                        <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Call</span>
                      </button>
                      <button
                        onClick={() => handleMessage(farmer)}
                        className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                      >
                        <ChatBubbleLeftRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Message</span>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 text-center sm:text-right">
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
            <div className="space-y-3 sm:space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium text-green-700">
                          {discussion.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{discussion.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                          <span>by {discussion.author}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0 ml-2">
                      {discussion.lastReply}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2">{discussion.content}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.views} views</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {discussion.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {discussion.tags.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{discussion.tags.length - 3}
                        </span>
                      )}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900">West African Market Insights</h2>
                <p className="text-sm text-gray-600">Real-time market data and trading opportunities</p>
              </div>
              <button 
                onClick={handleAddFarmer}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Farmer</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">West African Price Alerts</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Rice prices up in Liberia 🇱🇷</div>
                      <div className="text-xs sm:text-sm text-gray-600">+12% in Monrovia markets • L$0.95/kg</div>
                    </div>
                    <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Cassava prices up in Nigeria 🇳🇬</div>
                      <div className="text-xs sm:text-sm text-gray-600">+8% in Lagos markets • ₦120/kg</div>
                    </div>
                    <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Cocoa prices down in Ghana 🇬🇭</div>
                      <div className="text-xs sm:text-sm text-gray-600">-5% in Kumasi markets • ₵8.50/kg</div>
                    </div>
                    <TrendingDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Palm Oil up in Ivory Coast 🇨🇮</div>
                      <div className="text-xs sm:text-sm text-gray-600">+15% in Abidjan markets • CFA 1,200/kg</div>
                    </div>
                    <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Groundnut up in Senegal 🇸🇳</div>
                      <div className="text-xs sm:text-sm text-gray-600">+10% in Dakar markets • CFA 800/kg</div>
                    </div>
                    <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Cotton stable in Mali 🇲🇱</div>
                      <div className="text-xs sm:text-sm text-gray-600">No change in Bamako markets • CFA 450/kg</div>
                    </div>
                    <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 ml-2" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">West African Trading Opportunities</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Nigeria 🇱🇷→🇳🇬</div>
                    <div className="text-xs sm:text-sm text-gray-600">Rice export • L$0.95 → ₦475/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+28% profit margin</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Ghana 🇱🇷→🇬🇭</div>
                    <div className="text-xs sm:text-sm text-gray-600">Cassava trading • L$0.45 → ₵3.0/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+22% profit margin</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Ivory Coast 🇱🇷→🇨🇮</div>
                    <div className="text-xs sm:text-sm text-gray-600">Palm oil export • L$1.20 → CFA 1,500/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+35% profit margin</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Senegal 🇱🇷→🇸🇳</div>
                    <div className="text-xs sm:text-sm text-gray-600">Groundnut trading • L$0.80 → CFA 1,000/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+18% profit margin</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Sierra Leone 🇱🇷→🇸🇱</div>
                    <div className="text-xs sm:text-sm text-gray-600">Coffee export • L$2.50 → Le 25/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+15% profit margin</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-pink-50 rounded-lg">
                    <div className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">Liberia → Guinea 🇱🇷→🇬🇳</div>
                    <div className="text-xs sm:text-sm text-gray-600">Maize trading • L$0.60 → FG 6,000/kg</div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">+12% profit margin</div>
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

      {/* Add Farmer Modal */}
      {showAddFarmerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Farmer</h3>
              <button
                onClick={() => setShowAddFarmerModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newFarmer.name}
                    onChange={(e) => setNewFarmer(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter farmer's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    value={newFarmer.location}
                    onChange={(e) => setNewFarmer(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    {countries.filter(c => c !== 'all').map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newFarmer.phone}
                    onChange={(e) => setNewFarmer(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+231-XX-XXX-XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={newFarmer.experience}
                    onChange={(e) => setNewFarmer(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              {/* Crops */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crops
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {crops.filter(crop => crop !== 'all').map(crop => (
                    <button
                      key={crop}
                      onClick={() => handleCropToggle(crop)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                        newFarmer.crops.includes(crop)
                          ? 'bg-green-100 border-green-300 text-green-800'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Organic Farming', 'Market Analysis', 'Drought Resistance', 'Women in Agriculture', 'Cash Crops', 'Export Markets', 'Cotton Production', 'Soil Management', 'Dryland Farming', 'Seed Production', 'Irrigation Systems', 'Crop Rotation', 'Vegetable Farming', 'Greenhouse Technology', 'Groundnut Production', 'Market Access', 'Cereal Production', 'Post-Harvest Management'].map(specialty => (
                    <button
                      key={specialty}
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                        newFarmer.specialties.includes(specialty)
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={newFarmer.bio}
                  onChange={(e) => setNewFarmer(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Tell us about this farmer's background and expertise..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmitFarmer}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Farmer</span>
                </button>
                <button
                  onClick={() => setShowAddFarmerModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
