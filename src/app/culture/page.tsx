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
    animate: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <LanguageIcon className="w-6 h-6 lg:w-7 lg:h-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">Culture 🌍</h1>
              <p className="text-sm lg:text-base xl:text-lg text-gray-600">Preserve West African heritage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Language Translation */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <LanguageTranslation 
              language={selectedLanguage}
              country={selectedCountry}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-6">
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
          transition={{ duration: 0.6 }}
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
    </div>
  )
}
