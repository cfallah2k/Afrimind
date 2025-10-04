'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { MobileMoneyServices } from '@/components/finance/mobile-money-services'
import { BankingServices } from '@/components/finance/banking-services'
import { FinancialRegulations } from '@/components/finance/financial-regulations'
import { CreditScoring } from '@/components/finance/credit-scoring'
import { InvestmentOpportunities } from '@/components/finance/investment-opportunities'

export default function FinancePage() {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [selectedService, setSelectedService] = useState('mobile_money')

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
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-20">
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
              <CurrencyDollarIcon className="w-4 h-4 mr-2" />
              Financial Inclusion
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Empowering Financial Access
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-secondary-100 max-w-4xl mx-auto mb-8"
            >
              Access mobile money services, banking solutions, and financial tools 
              to promote economic empowerment across Africa.
            </motion.p>

            {/* Finance Selector */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <BuildingOfficeIcon className="w-5 h-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Ghana">Ghana</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <CreditCardIcon className="w-5 h-5" />
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="mobile_money">Mobile Money</option>
                  <option value="banking">Banking</option>
                  <option value="investment">Investment</option>
                  <option value="credit">Credit</option>
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
          {/* Mobile Money Services */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <MobileMoneyServices 
              country={selectedCountry}
              serviceType={selectedService}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="space-y-6">
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
  )
}
