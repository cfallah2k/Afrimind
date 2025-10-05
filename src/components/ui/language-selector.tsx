'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers/language-provider'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, currentCountry, setCountry, availableLanguages, availableCountries, supportedLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)
  const currentCountryData = availableCountries.find(country => country.code === currentCountry)

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode)
    setIsOpen(false)
  }

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <GlobeAltIcon className="w-4 h-4" />
        <span>{currentLang?.flag} {currentLang?.nativeName}</span>
        <span className="text-gray-400">•</span>
        <span>{currentCountryData?.flag} {currentCountryData?.name}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Language & Region</h3>
            
            {/* Language Selection */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">Language</label>
              <div className="grid grid-cols-2 gap-2">
                {supportedLanguages.map((langCode) => {
                  const lang = availableLanguages.find(l => l.code === langCode)
                  if (!lang) return null
                  
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Region</label>
              <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
                {availableCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      currentCountry === country.code
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
