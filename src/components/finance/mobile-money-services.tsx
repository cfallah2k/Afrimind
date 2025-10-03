'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface MobileMoneyServicesProps {
  country: string
  serviceType: string
}

export function MobileMoneyServices({ country, serviceType }: MobileMoneyServicesProps) {
  const [servicesData, setServicesData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchServicesData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setServicesData({
          country,
          serviceType,
          providers: [
            {
              name: 'MTN Mobile Money',
              coverage: 'Pan-African',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: {
                transfer: '1-3% of amount',
                payment: '0.5-2% of amount',
                withdrawal: '$0.50-2.00'
              },
              requirements: [
                'Valid ID',
                'Phone number',
                'Basic KYC'
              ],
              limits: {
                daily: '$500',
                monthly: '$5000'
              },
              rating: 4.5,
              contact: '+234-XXX-XXXX'
            },
            {
              name: 'Airtel Money',
              coverage: 'East and Central Africa',
              services: ['transfer', 'payment', 'savings'],
              fees: {
                transfer: '1-2% of amount',
                payment: '0.5-1.5% of amount',
                withdrawal: '$0.30-1.50'
              },
              requirements: [
                'Valid ID',
                'Phone number',
                'Basic KYC'
              ],
              limits: {
                daily: '$300',
                monthly: '$3000'
              },
              rating: 4.3,
              contact: '+234-XXX-XXXX'
            },
            {
              name: 'Orange Money',
              coverage: 'West and Central Africa',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: {
                transfer: '1-2.5% of amount',
                payment: '0.5-2% of amount',
                withdrawal: '$0.40-1.80'
              },
              requirements: [
                'Valid ID',
                'Phone number',
                'Basic KYC'
              ],
              limits: {
                daily: '$400',
                monthly: '$4000'
              },
              rating: 4.2,
              contact: '+234-XXX-XXXX'
            }
          ],
          commonUseCases: [
            'Sending money to family',
            'Paying for goods and services',
            'Receiving payments',
            'Saving money',
            'Accessing credit'
          ],
          benefits: [
            'Convenience and accessibility',
            'Lower transaction costs',
            'Financial inclusion',
            'Digital payment options'
          ],
          challenges: [
            'Limited interoperability',
            'Regulatory compliance',
            'Security concerns',
            'Digital literacy'
          ],
          futureTrends: [
            'Increased interoperability',
            'Enhanced security features',
            'Integration with traditional banking',
            'Expansion of services'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchServicesData()
  }, [country, serviceType])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-soft"
    >
      <div className="flex items-center space-x-2 mb-6">
        <CurrencyDollarIcon className="w-6 h-6 text-secondary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Mobile Money Services</h3>
      </div>

      <div className="space-y-4">
        {servicesData?.providers.map((provider, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{provider.name}</h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-warning-500" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{provider.coverage}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{provider.name} provides mobile money services across {provider.coverage}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="font-medium text-gray-700 mb-2">Services:</div>
                <div className="flex flex-wrap gap-1">
                  {provider.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-800"
                    >
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-2">Fees:</div>
                <div className="text-sm space-y-1">
                  <div>Transfer: {provider.fees.transfer}</div>
                  <div>Payment: {provider.fees.payment}</div>
                  <div>Withdrawal: {provider.fees.withdrawal}</div>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-2">Limits:</div>
                <div className="text-sm space-y-1">
                  <div>Daily: {provider.limits.daily}</div>
                  <div>Monthly: {provider.limits.monthly}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Contact: {provider.contact}
              </div>
              <button className="btn btn-primary btn-sm">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Common Use Cases */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Common Use Cases</h4>
        <div className="grid grid-cols-2 gap-2">
          {servicesData?.commonUseCases.map((useCase, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700">{useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-4 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Benefits</h4>
        <div className="grid grid-cols-2 gap-2">
          {servicesData?.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <TrendingUpIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Trends */}
      <div className="mt-4 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Future Trends</h4>
        <div className="space-y-2">
          {servicesData?.futureTrends.map((trend, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{trend}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
