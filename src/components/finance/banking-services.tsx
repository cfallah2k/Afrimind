'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BuildingOfficeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  PhoneIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface BankingServicesProps {
  country: string
  serviceType: string
}

export function BankingServices({ country, serviceType }: BankingServicesProps) {
  const [bankingData, setBankingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchBankingData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setBankingData({
          country,
          serviceType,
          majorBanks: [
            {
              name: 'First Bank of Nigeria',
              type: 'Commercial Bank',
              services: ['savings', 'current', 'loan', 'investment'],
              branches: '500+',
              digitalServices: true,
              mobileApp: true,
              customerSupport: '24/7',
              rating: 4.2
            },
            {
              name: 'Standard Bank',
              type: 'Commercial Bank',
              services: ['savings', 'current', 'loan', 'investment'],
              branches: '200+',
              digitalServices: true,
              mobileApp: true,
              customerSupport: '24/7',
              rating: 4.0
            },
            {
              name: 'Ecobank',
              type: 'Pan-African Bank',
              services: ['savings', 'current', 'loan', 'investment'],
              branches: '1000+',
              digitalServices: true,
              mobileApp: true,
              customerSupport: '24/7',
              rating: 4.3
            }
          ],
          accountTypes: [
            {
              type: 'Savings Account',
              minimumBalance: '$10-50',
              interestRate: '2-5% per annum',
              features: [
                'Interest earning',
                'ATM access',
                'Online banking',
                'Mobile banking'
              ]
            },
            {
              type: 'Current Account',
              minimumBalance: '$100-500',
              interestRate: '0-2% per annum',
              features: [
                'Check writing',
                'Business transactions',
                'Overdraft facility',
                'Online banking'
              ]
            }
          ],
          loanProducts: [
            {
              type: 'Personal Loan',
              amount: '$500-50000',
              interestRate: '15-25% per annum',
              tenure: '6-60 months',
              requirements: [
                'Proof of income',
                'Credit history',
                'Collateral (for large amounts)'
              ]
            },
            {
              type: 'Business Loan',
              amount: '$1000-100000',
              interestRate: '12-20% per annum',
              tenure: '12-84 months',
              requirements: [
                'Business registration',
                'Financial statements',
                'Business plan',
                'Collateral'
              ]
            }
          ],
          digitalBanking: [
            'Online banking platform',
            'Mobile banking app',
            'ATM network',
            'POS terminals',
            'Internet banking'
          ],
          feesAndCharges: [
            'Account maintenance: $2-5 per month',
            'ATM withdrawal: $0.50-2.00',
            'Transfer fees: $1-5',
            'Overdraft fees: $10-25'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchBankingData()
  }, [country, serviceType])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
        <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Banking Services</h3>
      </div>

      {/* Major Banks */}
      <div className="space-y-4 mb-6">
        {bankingData?.majorBanks.map((bank: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{bank.name}</h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-warning-500" />
                  <span className="text-sm font-medium">{bank.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{bank.type}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="font-medium text-gray-700 mb-2">Services:</div>
                <div className="flex flex-wrap gap-1">
                  {bank.services.map((service: any, serviceIndex: number) => (
                    <span
                      key={serviceIndex}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                    >
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-2">Branches:</div>
                <div className="text-sm text-gray-600">{bank.branches}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-2">Digital Services:</div>
                <div className="text-sm text-gray-600">
                  {bank.digitalServices ? 'Available' : 'Limited'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Support: {bank.customerSupport}
              </div>
              <button className="btn btn-primary btn-sm">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Account Types */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Account Types</h4>
        <div className="space-y-3">
          {bankingData?.accountTypes.map((account: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{account.type}</div>
                <div className="text-sm text-gray-600">Min: {account.minimumBalance} • Rate: {account.interestRate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{account.features.length} features</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Banking */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Digital Banking Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {bankingData?.digitalBanking.map((feature: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fees and Charges */}
      <div className="p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Fees and Charges</h4>
        <div className="space-y-2">
          {bankingData?.feesAndCharges.map((fee: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CreditCardIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{fee}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
