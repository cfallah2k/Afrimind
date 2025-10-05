'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { MobileMoneyServices } from '@/components/finance/mobile-money-services'
import { BankingServices } from '@/components/finance/banking-services'
import { FinancialRegulations } from '@/components/finance/financial-regulations'
import { CreditScoring } from '@/components/finance/credit-scoring'
import { InvestmentOpportunities } from '@/components/finance/investment-opportunities'
import { useLanguage } from '@/components/providers/language-provider'

export default function FinancePage() {
  const { currentLanguage, setLanguage, currentCountry, setCountry, availableLanguages, availableCountries } = useLanguage()
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [selectedService, setSelectedService] = useState('mobile_money')
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

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
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">Finance 💰</h1>
              <p className="text-sm lg:text-base xl:text-lg text-gray-600">Manage your money</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6">

      {/* Country & Language Selection */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Select Country & Language</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Country Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Country/Region</label>
            <button
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Liberia</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showCountrySelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {availableCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setCountry(country.code)
                      setShowCountrySelector(false)
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <LanguageIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">English</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showLanguageSelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setShowLanguageSelector(false)
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Mobile Money Services */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <MobileMoneyServices 
              country={selectedCountry}
              serviceType={selectedService}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
              <div className="space-y-4">
                {[
                  { label: 'Mobile Money Users', value: '500M+', icon: CreditCardIcon, color: 'text-secondary-600' },
                  { label: 'Banking Penetration', value: '85%', icon: BuildingOfficeIcon, color: 'text-primary-600' },
                  { label: 'Financial Inclusion', value: '75%', icon: ShieldCheckIcon, color: 'text-success-600' },
                  { label: 'Digital Payments', value: '60%', icon: ArrowTrendingUpIcon, color: 'text-warning-600' },
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
              <div className="space-y-3">
                {[
                  { service: 'MTN Mobile Money', users: '100M+', coverage: 'Pan-Africa', color: 'text-success-600' },
                  { service: 'M-Pesa', users: '50M+', coverage: 'East Africa', color: 'text-primary-600' },
                  { service: 'Orange Money', users: '30M+', coverage: 'West Africa', color: 'text-warning-600' },
                  { service: 'Airtel Money', users: '25M+', coverage: 'Central Africa', color: 'text-accent-600' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{service.service}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${service.color}`}>{service.users}</span>
                      <span className="text-xs text-gray-500">{service.coverage}</span>
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
          <BankingServices 
            country={selectedCountry}
            serviceType="savings"
          />
          <FinancialRegulations 
            country={selectedCountry}
            regulationType="mobile_money"
          />
          <CreditScoring 
            country={selectedCountry}
            borrowerType="individual"
          />
          <InvestmentOpportunities 
            country={selectedCountry}
            investmentType="stocks"
            riskTolerance="medium"
          />
        </motion.div>
      </div>
      </div>
    </div>
  )
}
