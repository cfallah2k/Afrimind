'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Globe, 
  MessageCircle, 
  BookOpen, 
  Heart, 
  Star,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  DollarSign,
  Package,
  Route,
  Calendar,
  Phone,
  Wifi,
  Volume2,
  Eye,
  Target,
  Award,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Flag,
  Languages,
  Handshake,
  Lightbulb
} from 'lucide-react'

export default function CultureTab() {
  const [selectedRegion, setSelectedRegion] = useState('west-africa')
  const [realTimeData, setRealTimeData] = useState({
    regions: {
      'west-africa': { 
        name: 'West Africa', 
        countries: 16, 
        languages: 8, 
        population: '400M',
        gdp: '$1.2T',
        culture: 'diverse'
      },
      'east-africa': { 
        name: 'East Africa', 
        countries: 8, 
        languages: 6, 
        population: '200M',
        gdp: '$800B',
        culture: 'unified'
      },
      'southern-africa': { 
        name: 'Southern Africa', 
        countries: 5, 
        languages: 4, 
        population: '150M',
        gdp: '$600B',
        culture: 'cosmopolitan'
      }
    },
    languages: [
      { name: 'Swahili', speakers: '200M', countries: 4, difficulty: 'medium', business: 'high' },
      { name: 'Hausa', speakers: '80M', countries: 3, difficulty: 'easy', business: 'medium' },
      { name: 'Yoruba', speakers: '50M', countries: 2, difficulty: 'medium', business: 'high' },
      { name: 'Amharic', speakers: '30M', countries: 1, difficulty: 'hard', business: 'medium' }
    ],
    businessPractices: [
      { country: 'Nigeria', greeting: 'Handshake with eye contact', negotiation: 'Direct but respectful', timing: 'Flexible' },
      { country: 'Ghana', greeting: 'Firm handshake', negotiation: 'Consensus-based', timing: 'Punctual' },
      { country: 'Kenya', greeting: 'Warm handshake', negotiation: 'Relationship-first', timing: 'Business hours' },
      { country: 'South Africa', greeting: 'Professional handshake', negotiation: 'Formal process', timing: 'Strict' }
    ],
    culturalInsights: [
      { type: 'festival', title: 'Eid al-Fitr', region: 'West Africa', date: 'March 2024', significance: 'Religious celebration' },
      { type: 'tradition', title: 'Ubuntu Philosophy', region: 'Southern Africa', date: 'Ongoing', significance: 'Community values' },
      { type: 'custom', title: 'Greeting Etiquette', region: 'East Africa', date: 'Daily', significance: 'Social respect' }
    ],
    recommendations: [
      { type: 'language', priority: 'high', message: 'Learn basic Swahili greetings for East African business' },
      { type: 'custom', priority: 'medium', message: 'Understand gift-giving traditions in West Africa' },
      { type: 'timing', priority: 'low', message: 'Respect prayer times when scheduling meetings' }
    ]
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        regions: {
          ...prev.regions,
          'west-africa': { 
            ...prev.regions['west-africa'], 
            population: `${400 + Math.floor(Math.random() * 10)}M`
          }
        }
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const regions = [
    { id: 'west-africa', name: 'West Africa', icon: Globe, color: 'green' },
    { id: 'east-africa', name: 'East Africa', icon: MapPin, color: 'blue' },
    { id: 'southern-africa', name: 'Southern Africa', icon: Flag, color: 'purple' }
  ]

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Cultural Intelligence</h1>
            <p className="text-orange-100 text-sm md:text-base">Context-aware AI for African business</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Languages className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">20+</p>
            <p className="text-xs md:text-sm text-orange-100">Languages</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">54</p>
            <p className="text-xs md:text-sm text-orange-100">Countries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">1.4B</p>
            <p className="text-xs md:text-sm text-orange-100">People</p>
          </div>
        </div>
      </div>

      {/* Region Selection */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Select Region</h3>
        <div className="space-y-3">
          {regions.map((region) => {
            const IconComponent = region.icon
            const isSelected = selectedRegion === region.id
            const regionData = realTimeData.regions[region.id as keyof typeof realTimeData.regions]
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-300 transform ${
                  isSelected 
                    ? `bg-gradient-to-r from-${region.color}-500 to-${region.color}-600 text-white shadow-lg scale-105` 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-105'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">{region.name}</p>
                      <p className="text-sm opacity-80">{regionData.countries} countries • {regionData.languages} languages</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{regionData.population}</p>
                    <p className="text-sm opacity-80">Population</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Language Analysis */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Major Languages</h3>
        <div className="space-y-4">
          {realTimeData.languages.map((language, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{language.name}</p>
                    <p className="text-sm text-gray-600">{language.speakers} speakers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{language.countries}</p>
                  <p className="text-sm text-gray-600">countries</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className={`font-semibold ${
                    language.difficulty === 'easy' ? 'text-green-600' :
                    language.difficulty === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {language.difficulty}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Business Value</p>
                  <p className={`font-semibold ${
                    language.business === 'high' ? 'text-green-600' :
                    language.business === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {language.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Practices */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Business Practices</h3>
        <div className="space-y-4">
          {realTimeData.businessPractices.map((practice, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{practice.country}</p>
                    <p className="text-sm text-gray-600">Business etiquette</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Greeting</p>
                    <p className="text-sm text-gray-600">{practice.greeting}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Negotiation</p>
                    <p className="text-sm text-gray-600">{practice.negotiation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Timing</p>
                    <p className="text-sm text-gray-600">{practice.timing}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Insights */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cultural Insights</h3>
        <div className="space-y-4">
          {realTimeData.culturalInsights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              insight.type === 'festival' ? 'bg-yellow-50 border-yellow-500' :
              insight.type === 'tradition' ? 'bg-blue-50 border-blue-500' :
              'bg-green-50 border-green-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  insight.type === 'festival' ? 'bg-yellow-100' :
                  insight.type === 'tradition' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  {insight.type === 'festival' ? <Star className="w-4 h-4 text-yellow-600" /> :
                   insight.type === 'tradition' ? <BookOpen className="w-4 h-4 text-blue-600" /> :
                   <Heart className="w-4 h-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{insight.title}</p>
                  <p className="text-sm text-gray-600">{insight.region} • {insight.date}</p>
                  <p className="text-sm text-gray-500 mt-1">{insight.significance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          {realTimeData.recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              rec.priority === 'high' ? 'bg-red-50 border-red-500' :
              rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-red-100' :
                  rec.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {rec.priority === 'high' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                   rec.priority === 'medium' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                   <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 capitalize">{rec.type} Intelligence</p>
                  <p className="text-sm text-gray-600">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Languages className="w-5 h-5" />
              <span className="font-semibold">Language Learning</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Handshake className="w-5 h-5" />
              <span className="font-semibold">Business Guide</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Cultural Guide</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">AI Advisor</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}