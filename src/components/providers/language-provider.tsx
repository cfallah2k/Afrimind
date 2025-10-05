'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLocalAuth } from '@/hooks/use-local-auth'
import { languages, countries, getTranslation, getSupportedLanguages } from '@/lib/i18n'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  currentCountry: string
  setCountry: (country: string) => void
  t: (key: string) => string
  availableLanguages: typeof languages
  availableCountries: typeof countries
  supportedLanguages: string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { data: session } = useLocalAuth()
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [currentCountry, setCurrentCountry] = useState('LR')

  // Initialize language and country from session or localStorage
  useEffect(() => {
    if (session?.user) {
      setCurrentLanguage(session.user.language || 'en')
      setCurrentCountry(session.user.country || 'LR')
    } else {
      const savedLanguage = localStorage.getItem('afrimind-language')
      const savedCountry = localStorage.getItem('afrimind-country')
      
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage)
      }
      if (savedCountry) {
        setCurrentCountry(savedCountry)
      }
    }
  }, [session])

  // Save language and country to localStorage
  useEffect(() => {
    localStorage.setItem('afrimind-language', currentLanguage)
    localStorage.setItem('afrimind-country', currentCountry)
  }, [currentLanguage, currentCountry])

  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
  }

  const setCountry = (country: string) => {
    setCurrentCountry(country)
    // Update supported languages when country changes
    const supported = getSupportedLanguages(country)
    if (!supported.includes(currentLanguage)) {
      setCurrentLanguage(supported[0] || 'en')
    }
  }

  const t = (key: string) => {
    return getTranslation(key, currentLanguage)
  }

  const supportedLanguages = getSupportedLanguages(currentCountry)

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    currentCountry,
    setCountry,
    t,
    availableLanguages: languages,
    availableCountries: countries,
    supportedLanguages
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
