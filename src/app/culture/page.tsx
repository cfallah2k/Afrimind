'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LanguageIcon,
  GlobeAltIcon,
  BookOpenIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { LanguageTranslation } from '@/components/culture/language-translation'
import { CulturalPractices } from '@/components/culture/cultural-practices'
import { LocalContext } from '@/components/culture/local-context'
import { LanguageResources } from '@/components/culture/language-resources'
import { HistoricalContext } from '@/components/culture/historical-context'

export default function CulturePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('Yoruba')
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [selectedRegion, setSelectedRegion] = useState('Southwest')

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-600 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8"
            >
              <LanguageIcon className="w-4 h-4 mr-2" />
              Cultural Preservation
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Preserving African Heritage
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-accent-100 max-w-4xl mx-auto mb-8"
            >
              AI that understands African languages, cultures, and local contexts 
              to preserve and promote our rich cultural heritage.
            </motion.p>

            {/* Culture Selector */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <LanguageIcon className="w-5 h-5" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="Yoruba">Yoruba</option>
                  <option value="Hausa">Hausa</option>
                  <option value="Igbo">Igbo</option>
                  <option value="Swahili">Swahili</option>
                  <option value="Amharic">Amharic</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <GlobeAltIcon className="w-5 h-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Language Translation */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <LanguageTranslation 
              language={selectedLanguage}
              country={selectedCountry}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cultural Overview</h3>
              <div className="space-y-4">
                {[
                  { label: 'Languages', value: '2000+', icon: LanguageIcon, color: 'text-accent-600' },
                  { label: 'Cultures', value: '3000+', icon: HeartIcon, color: 'text-primary-600' },
                  { label: 'Traditions', value: '500+', icon: BookOpenIcon, color: 'text-success-600' },
                  { label: 'Regions', value: '54', icon: GlobeAltIcon, color: 'text-warning-600' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Status</h3>
              <div className="space-y-3">
                {[
                  { language: 'Swahili', status: 'Growing', speakers: '200M+', color: 'text-success-600' },
                  { language: 'Yoruba', status: 'Stable', speakers: '50M+', color: 'text-primary-600' },
                  { language: 'Hausa', status: 'Growing', speakers: '80M+', color: 'text-success-600' },
                  { language: 'Amharic', status: 'Stable', speakers: '30M+', color: 'text-primary-600' },
                ].map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{lang.language}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${lang.color}`}>{lang.status}</span>
                      <span className="text-xs text-gray-500">{lang.speakers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <CulturalPractices 
            country={selectedCountry}
            region={selectedRegion}
          />
          <LocalContext 
            location={selectedCountry}
            contextType="business"
          />
          <LanguageResources 
            language={selectedLanguage}
            resourceType="dictionary"
          />
          <HistoricalContext 
            topic="African Independence"
            region={selectedCountry}
          />
        </motion.div>
      </div>
    </div>
  )
}
