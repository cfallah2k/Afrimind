'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TruckIcon,
  MapIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { TradeRoutes } from '@/components/trade/trade-routes'
import { CustomsRegulations } from '@/components/trade/customs-regulations'
import { DocumentationRequirements } from '@/components/trade/documentation-requirements'
import { BorderConditions } from '@/components/trade/border-conditions'
import { TariffCalculator } from '@/components/trade/tariff-calculator'

export default function TradePage() {
  const [selectedOrigin, setSelectedOrigin] = useState('Lagos, Nigeria')
  const [selectedDestination, setSelectedDestination] = useState('Accra, Ghana')
  const [selectedCommodity, setSelectedCommodity] = useState('Agricultural Products')

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
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
              <TruckIcon className="w-4 h-4 mr-2" />
              Cross-Border Trade
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Streamlined African Trade
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto mb-8"
            >
              Navigate customs regulations, optimize trade routes, and access 
              real-time border conditions for seamless cross-border commerce.
            </motion.p>

            {/* Trade Route Selector */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <MapIcon className="w-5 h-5" />
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                  <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                  <option value="Accra, Ghana">Accra, Ghana</option>
                  <option value="Cairo, Egypt">Cairo, Egypt</option>
                  <option value="Johannesburg, South Africa">Johannesburg, South Africa</option>
                </select>
              </div>
              <div className="text-white">→</div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <MapIcon className="w-5 h-5" />
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="bg-transparent text-white border-none outline-none"
                >
                  <option value="Accra, Ghana">Accra, Ghana</option>
                  <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                  <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                  <option value="Cairo, Egypt">Cairo, Egypt</option>
                  <option value="Johannesburg, South Africa">Johannesburg, South Africa</option>
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
          {/* Trade Routes */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <TradeRoutes 
              origin={selectedOrigin} 
              destination={selectedDestination}
              commodity={selectedCommodity}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Overview</h3>
              <div className="space-y-4">
                {[
                  { label: 'Distance', value: '450 km', icon: MapIcon, color: 'text-primary-600' },
                  { label: 'Duration', value: '8-12 hrs', icon: ClockIcon, color: 'text-warning-600' },
                  { label: 'Cost', value: '$200-400', icon: CurrencyDollarIcon, color: 'text-success-600' },
                  { label: 'Border Crossings', value: '1', icon: ExclamationTriangleIcon, color: 'text-danger-600' },
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-2">
                {[
                  'Commercial Invoice',
                  'Packing List',
                  'Certificate of Origin',
                  'Import Permit',
                  'Phytosanitary Certificate',
                ].map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <DocumentTextIcon className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">{doc}</span>
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
          <CustomsRegulations 
            origin={selectedOrigin} 
            destination={selectedDestination}
            commodity={selectedCommodity}
          />
          <DocumentationRequirements 
            commodity={selectedCommodity}
            value={10000}
          />
          <BorderConditions 
            borderCrossing="Seme Border"
            countryPair={`${selectedOrigin.split(',')[0]}-${selectedDestination.split(',')[0]}`}
          />
          <TariffCalculator 
            commodityCode="1001"
            origin={selectedOrigin}
            destination={selectedDestination}
            value={10000}
          />
        </motion.div>
      </div>
    </div>
  )
}
