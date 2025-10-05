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
  const [selectedCountry, setSelectedCountry] = useState('Liberia')
  const [selectedService, setSelectedService] = useState('mobile_money')
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [countryData, setCountryData] = useState<any>(null)

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

  // Dynamic country data for all West African countries
  const countryFinancialData = {
    'Liberia': {
      currency: 'LRD',
      currencySymbol: 'L$',
      exchangeRate: 1,
      flag: '🇱🇷',
      financialOverview: {
        mobileMoneyUsers: '2.5M+',
        bankingPenetration: '45%',
        financialInclusion: '60%',
        digitalPayments: '35%'
      },
      popularServices: [
        { service: 'Orange Money Liberia', users: '1.2M+', coverage: 'Liberia' },
        { service: 'Lonestar MTN', users: '800K+', coverage: 'Liberia' },
        { service: 'Ecobank Liberia', users: '300K+', coverage: 'Liberia' }
      ]
    },
    'Nigeria': {
      currency: 'NGN',
      currencySymbol: '₦',
      exchangeRate: 750,
      flag: '🇳🇬',
      financialOverview: {
        mobileMoneyUsers: '50M+',
        bankingPenetration: '85%',
        financialInclusion: '75%',
        digitalPayments: '60%'
      },
      popularServices: [
        { service: 'MTN Mobile Money', users: '25M+', coverage: 'Nigeria' },
        { service: 'Airtel Money', users: '15M+', coverage: 'Nigeria' },
        { service: 'First Bank', users: '10M+', coverage: 'Nigeria' }
      ]
    },
    'Ghana': {
      currency: 'GHS',
      currencySymbol: '₵',
      exchangeRate: 12,
      flag: '🇬🇭',
      financialOverview: {
        mobileMoneyUsers: '15M+',
        bankingPenetration: '70%',
        financialInclusion: '80%',
        digitalPayments: '55%'
      },
      popularServices: [
        { service: 'MTN Mobile Money', users: '8M+', coverage: 'Ghana' },
        { service: 'Vodafone Cash', users: '4M+', coverage: 'Ghana' },
        { service: 'Ghana Commercial Bank', users: '3M+', coverage: 'Ghana' }
      ]
    },
    'Senegal': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇸🇳',
      financialOverview: {
        mobileMoneyUsers: '8M+',
        bankingPenetration: '65%',
        financialInclusion: '70%',
        digitalPayments: '45%'
      },
      popularServices: [
        { service: 'Orange Money Senegal', users: '4M+', coverage: 'Senegal' },
        { service: 'Free Money', users: '2M+', coverage: 'Senegal' },
        { service: 'Ecobank Senegal', users: '1.5M+', coverage: 'Senegal' }
      ]
    },
    'Mali': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇲🇱',
      financialOverview: {
        mobileMoneyUsers: '6M+',
        bankingPenetration: '40%',
        financialInclusion: '55%',
        digitalPayments: '30%'
      },
      popularServices: [
        { service: 'Orange Money Mali', users: '3M+', coverage: 'Mali' },
        { service: 'Moov Money', users: '1.5M+', coverage: 'Mali' },
        { service: 'Bank of Africa Mali', users: '800K+', coverage: 'Mali' }
      ]
    },
    'Burkina Faso': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇧🇫',
      financialOverview: {
        mobileMoneyUsers: '4M+',
        bankingPenetration: '35%',
        financialInclusion: '50%',
        digitalPayments: '25%'
      },
      popularServices: [
        { service: 'Orange Money Burkina', users: '2M+', coverage: 'Burkina Faso' },
        { service: 'Moov Money', users: '1M+', coverage: 'Burkina Faso' },
        { service: 'Ecobank Burkina', users: '500K+', coverage: 'Burkina Faso' }
      ]
    },
    'Ivory Coast': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇨🇮',
      financialOverview: {
        mobileMoneyUsers: '12M+',
        bankingPenetration: '60%',
        financialInclusion: '65%',
        digitalPayments: '40%'
      },
      popularServices: [
        { service: 'Orange Money Côte d\'Ivoire', users: '6M+', coverage: 'Ivory Coast' },
        { service: 'MTN Mobile Money', users: '3M+', coverage: 'Ivory Coast' },
        { service: 'Ecobank Côte d\'Ivoire', users: '2M+', coverage: 'Ivory Coast' }
      ]
    },
    'Guinea': {
      currency: 'GNF',
      currencySymbol: 'FG',
      exchangeRate: 9000,
      flag: '🇬🇳',
      financialOverview: {
        mobileMoneyUsers: '3M+',
        bankingPenetration: '30%',
        financialInclusion: '45%',
        digitalPayments: '20%'
      },
      popularServices: [
        { service: 'Orange Money Guinea', users: '1.5M+', coverage: 'Guinea' },
        { service: 'MTN Mobile Money', users: '800K+', coverage: 'Guinea' },
        { service: 'Ecobank Guinea', users: '400K+', coverage: 'Guinea' }
      ]
    },
    'Sierra Leone': {
      currency: 'SLL',
      currencySymbol: 'Le',
      exchangeRate: 20000,
      flag: '🇸🇱',
      financialOverview: {
        mobileMoneyUsers: '2M+',
        bankingPenetration: '25%',
        financialInclusion: '40%',
        digitalPayments: '15%'
      },
      popularServices: [
        { service: 'Orange Money Sierra Leone', users: '800K+', coverage: 'Sierra Leone' },
        { service: 'Africell Money', users: '600K+', coverage: 'Sierra Leone' },
        { service: 'Rokel Commercial Bank', users: '300K+', coverage: 'Sierra Leone' }
      ]
    },
    'Gambia': {
      currency: 'GMD',
      currencySymbol: 'D',
      exchangeRate: 50,
      flag: '🇬🇲',
      financialOverview: {
        mobileMoneyUsers: '1.5M+',
        bankingPenetration: '40%',
        financialInclusion: '55%',
        digitalPayments: '30%'
      },
      popularServices: [
        { service: 'Orange Money Gambia', users: '600K+', coverage: 'Gambia' },
        { service: 'Africell Money', users: '400K+', coverage: 'Gambia' },
        { service: 'Trust Bank Gambia', users: '200K+', coverage: 'Gambia' }
      ]
    },
    'Guinea-Bissau': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇬🇼',
      financialOverview: {
        mobileMoneyUsers: '800K+',
        bankingPenetration: '20%',
        financialInclusion: '35%',
        digitalPayments: '10%'
      },
      popularServices: [
        { service: 'Orange Money Guinea-Bissau', users: '400K+', coverage: 'Guinea-Bissau' },
        { service: 'MTN Mobile Money', users: '200K+', coverage: 'Guinea-Bissau' },
        { service: 'Ecobank Guinea-Bissau', users: '100K+', coverage: 'Guinea-Bissau' }
      ]
    },
    'Cape Verde': {
      currency: 'CVE',
      currencySymbol: '$',
      exchangeRate: 100,
      flag: '🇨🇻',
      financialOverview: {
        mobileMoneyUsers: '300K+',
        bankingPenetration: '70%',
        financialInclusion: '80%',
        digitalPayments: '50%'
      },
      popularServices: [
        { service: 'Orange Money Cape Verde', users: '150K+', coverage: 'Cape Verde' },
        { service: 'CV Movel Money', users: '100K+', coverage: 'Cape Verde' },
        { service: 'Banco Comercial do Atlântico', users: '80K+', coverage: 'Cape Verde' }
      ]
    },
    'Togo': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇹🇬',
      financialOverview: {
        mobileMoneyUsers: '3M+',
        bankingPenetration: '35%',
        financialInclusion: '50%',
        digitalPayments: '25%'
      },
      popularServices: [
        { service: 'Orange Money Togo', users: '1.5M+', coverage: 'Togo' },
        { service: 'Moov Money', users: '800K+', coverage: 'Togo' },
        { service: 'Ecobank Togo', users: '400K+', coverage: 'Togo' }
      ]
    },
    'Benin': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇧🇯',
      financialOverview: {
        mobileMoneyUsers: '4M+',
        bankingPenetration: '40%',
        financialInclusion: '55%',
        digitalPayments: '30%'
      },
      popularServices: [
        { service: 'Orange Money Benin', users: '2M+', coverage: 'Benin' },
        { service: 'MTN Mobile Money', users: '1M+', coverage: 'Benin' },
        { service: 'Ecobank Benin', users: '600K+', coverage: 'Benin' }
      ]
    },
    'Niger': {
      currency: 'XOF',
      currencySymbol: 'CFA',
      exchangeRate: 600,
      flag: '🇳🇪',
      financialOverview: {
        mobileMoneyUsers: '3M+',
        bankingPenetration: '25%',
        financialInclusion: '40%',
        digitalPayments: '20%'
      },
      popularServices: [
        { service: 'Orange Money Niger', users: '1.5M+', coverage: 'Niger' },
        { service: 'Moov Money', users: '800K+', coverage: 'Niger' },
        { service: 'Ecobank Niger', users: '400K+', coverage: 'Niger' }
      ]
    }
  }

  useEffect(() => {
    const selectedCountryData = countryFinancialData[selectedCountry as keyof typeof countryFinancialData] || countryFinancialData['Liberia']
    setCountryData(selectedCountryData)
  }, [selectedCountry])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.country-selector') && !target.closest('.language-selector')) {
        setShowCountrySelector(false)
        setShowLanguageSelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6"
      >
        {/* Country & Language Selection */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Select Country & Language</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Country Selection */}
          <div className="relative country-selector">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Country/Region</label>
            <button
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium">{selectedCountry}</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showCountrySelector && (
              <div 
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {Object.keys(countryFinancialData).map((country) => {
                  const countryInfo = countryFinancialData[country as keyof typeof countryFinancialData]
                  return (
                    <button
                      key={country}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCountry(country)
                        setShowCountrySelector(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50"
                    >
                      <span className="text-lg">{countryInfo.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{country}</div>
                        <div className="text-xs text-gray-500">{countryInfo.currency} ({countryInfo.currencySymbol})</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="relative language-selector">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Language</label>
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center space-x-2">
                <LanguageIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm font-medium">English</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
            
            {showLanguageSelector && (
              <div 
                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation()
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
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Mobile Money Services */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <MobileMoneyServices 
              country={selectedCountry}
              serviceType={selectedService}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Financial Overview - {selectedCountry}</h3>
              <div className="space-y-3 sm:space-y-4">
                {countryData && [
                  { label: 'Mobile Money Users', value: countryData.financialOverview.mobileMoneyUsers, icon: CreditCardIcon, color: 'text-blue-600' },
                  { label: 'Banking Penetration', value: countryData.financialOverview.bankingPenetration, icon: BuildingOfficeIcon, color: 'text-green-600' },
                  { label: 'Financial Inclusion', value: countryData.financialOverview.financialInclusion, icon: ShieldCheckIcon, color: 'text-purple-600' },
                  { label: 'Digital Payments', value: countryData.financialOverview.digitalPayments, icon: ArrowTrendingUpIcon, color: 'text-orange-600' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                      <span className="text-xs sm:text-sm text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Popular Services - {selectedCountry}</h3>
              <div className="space-y-2 sm:space-y-3">
                {countryData && countryData.popularServices.map((service: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700">{service.service}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm font-medium text-green-600">{service.users}</span>
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
          className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
      </motion.main>
    </div>
  )
}
