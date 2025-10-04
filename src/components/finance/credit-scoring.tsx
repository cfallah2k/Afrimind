'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface CreditScoringProps {
  country: string
  borrowerType: string
}

export function CreditScoring({ country, borrowerType }: CreditScoringProps) {
  const [creditData, setCreditData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchCreditData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setCreditData({
          country,
          borrowerType,
          creditBureaus: [
            {
              name: 'Credit Bureau Nigeria',
              coverage: 'Nigeria',
              services: ['credit_reporting', 'scoring', 'monitoring'],
              website: 'https://creditbureau.example.com'
            },
            {
              name: 'TransUnion Africa',
              coverage: 'Pan-African',
              services: ['credit_reporting', 'scoring', 'monitoring'],
              website: 'https://transunion.example.com'
            }
          ],
          creditScoreFactors: [
            {
              factor: 'Payment History',
              weight: '35%',
              description: 'Timeliness of loan and bill payments'
            },
            {
              factor: 'Credit Utilization',
              weight: '30%',
              description: 'Amount of credit used vs. available'
            },
            {
              factor: 'Credit History Length',
              weight: '15%',
              description: 'Length of credit relationships'
            },
            {
              factor: 'Credit Mix',
              weight: '10%',
              description: 'Variety of credit types'
            },
            {
              factor: 'New Credit',
              weight: '10%',
              description: 'Recent credit applications'
            }
          ],
          scoreRanges: [
            {
              range: '750-850',
              rating: 'Excellent',
              description: 'Lowest risk, best rates'
            },
            {
              range: '700-749',
              rating: 'Good',
              description: 'Low risk, good rates'
            },
            {
              range: '650-699',
              rating: 'Fair',
              description: 'Medium risk, moderate rates'
            },
            {
              range: '600-649',
              rating: 'Poor',
              description: 'High risk, higher rates'
            },
            {
              range: '300-599',
              rating: 'Very Poor',
              description: 'Very high risk, limited options'
            }
          ],
          improvingCreditScore: [
            'Pay bills on time',
            'Keep credit utilization low',
            'Don\'t close old accounts',
            'Limit new credit applications',
            'Monitor credit report regularly'
          ],
          alternativeCreditAssessment: [
            'Mobile money transaction history',
            'Utility payment history',
            'Rental payment history',
            'Business transaction records',
            'Social network analysis'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchCreditData()
  }, [country, borrowerType])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
        <ChartBarIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Credit Scoring</h3>
      </div>

      {/* Credit Bureaus */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Credit Bureaus</h4>
        <div className="space-y-3">
          {creditData?.creditBureaus.map((bureau: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{bureau.name}</h5>
                <span className="text-sm text-gray-500">{bureau.coverage}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{bureau.website}</div>
              <div className="flex flex-wrap gap-1">
                {bureau.services.map((service: any, serviceIndex: number) => (
                  <span
                    key={serviceIndex}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                  >
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    {service.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Score Factors */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Credit Score Factors</h4>
        <div className="space-y-3">
          {creditData?.creditScoreFactors.map((factor: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{factor.factor}</div>
                <div className="text-sm text-gray-600">{factor.description}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary-600">{factor.weight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Ranges */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Score Ranges</h4>
        <div className="space-y-2">
          {creditData?.scoreRanges.map((range, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
              <div>
                <div className="font-medium text-gray-900">{range.range}</div>
                <div className="text-sm text-gray-600">{range.description}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary-600">{range.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improving Credit Score */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Improving Credit Score</h4>
        <div className="space-y-2">
          {creditData?.improvingCreditScore.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Credit Assessment */}
      <div className="p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Alternative Credit Assessment</h4>
        <div className="space-y-2">
          {creditData?.alternativeCreditAssessment.map((assessment, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{assessment}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
