'use client'

import { useState } from 'react'
import { 
  Users, 
  Globe, 
  MessageCircle, 
  BookOpen, 
  Heart,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react'

export default function CultureTab() {
  const [selectedRegion, setSelectedRegion] = useState('east-africa')

  const regions = [
    {
      id: 'east-africa',
      name: 'East Africa',
      countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'],
      languages: ['Swahili', 'English', 'Kinyarwanda'],
      greeting: 'Hujambo (Hello)'
    },
    {
      id: 'west-africa',
      name: 'West Africa',
      countries: ['Nigeria', 'Ghana', 'Senegal'],
      languages: ['English', 'French', 'Yoruba'],
      greeting: 'Sannu (Hello)'
    },
    {
      id: 'southern-africa',
      name: 'Southern Africa',
      countries: ['South Africa', 'Zimbabwe', 'Botswana'],
      languages: ['English', 'Zulu', 'Xhosa'],
      greeting: 'Sawubona (Hello)'
    }
  ]

  const culturalTips = [
    {
      category: 'Business Etiquette',
      tips: [
        'Always greet with a handshake',
        'Use formal titles (Mr./Mrs.)',
        'Allow time for small talk before business',
        'Dress conservatively for meetings'
      ]
    },
    {
      category: 'Communication Style',
      tips: [
        'Speak clearly and slowly',
        'Use simple, direct language',
        'Avoid interrupting others',
        'Show respect through listening'
      ]
    },
    {
      category: 'Cultural Sensitivity',
      tips: [
        'Respect local customs and traditions',
        'Learn basic greetings in local language',
        'Be aware of religious practices',
        'Ask permission before taking photos'
      ]
    }
  ]

  const currentRegion = regions.find(region => region.id === selectedRegion)

  return (
    <div className="space-y-6">
      {/* Region Selection */}
      <div className="card-elevated">
        <h3 className="text-lg font-bold text-gray-800 mb-4">African Regions</h3>
        <div className="space-y-3">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedRegion === region.id
                  ? 'border-africa-600 bg-africa-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-africa-100 rounded-lg flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-africa-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">{region.name}</p>
                    <p className="text-sm text-gray-600">{region.greeting}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{region.countries.length} countries</p>
                  <p className="text-sm font-medium text-gray-800">{region.languages.length} languages</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Region Details */}
      {currentRegion && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{currentRegion.name} Guide</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Countries</h4>
              <div className="flex flex-wrap gap-2">
                {currentRegion.countries.map((country, index) => (
                  <span key={index} className="px-3 py-1 bg-africa-100 text-africa-700 rounded-full text-sm">
                    {country}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {currentRegion.languages.map((language, index) => (
                  <span key={index} className="px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-africa-50 rounded-xl">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-4 h-4 text-africa-600 mr-2" />
                <span className="font-medium text-gray-800">Common Greeting</span>
              </div>
              <p className="text-lg font-bold text-gray-800">{currentRegion.greeting}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Tips */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cultural Tips</h3>
        <div className="space-y-4">
          {culturalTips.map((category, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 text-africa-600 mr-2" />
                {category.category}
              </h4>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Local Contacts */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Local Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Cultural Guide</p>
                <p className="text-sm text-gray-600">Local expert</p>
              </div>
            </div>
            <span className="text-blue-600 font-bold">+254 700 123 456</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Translation Service</p>
                <p className="text-sm text-gray-600">Language support</p>
              </div>
            </div>
            <span className="text-green-600 font-bold">translate@afri.com</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Community Leader</p>
                <p className="text-sm text-gray-600">Local representative</p>
              </div>
            </div>
            <span className="text-purple-600 font-bold">+254 700 789 012</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-primary">
          <MessageCircle className="w-4 h-4 mr-2" />
          Learn Phrases
        </button>
        <button className="btn-secondary">
          <Heart className="w-4 h-4 mr-2" />
          Cultural Events
        </button>
      </div>

      {/* Language Learning */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Language Learning</h3>
        <div className="space-y-3">
          <div className="p-3 bg-africa-50 rounded-xl">
            <p className="font-bold text-gray-800 mb-2">Swahili Basics</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>• Hello: Hujambo</p>
              <p>• Thank you: Asante</p>
              <p>• Goodbye: Kwaheri</p>
              <p>• How are you?: Habari yako?</p>
            </div>
          </div>

          <div className="p-3 bg-earth-50 rounded-xl">
            <p className="font-bold text-gray-800 mb-2">Business Phrases</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>• Good morning: Habari za asubuhi</p>
              <p>• Please: Tafadhali</p>
              <p>• Excuse me: Samahani</p>
              <p>• Nice to meet you: Nimefurahi kukutana na wewe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
