'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  StarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface InvestmentOpportunitiesProps {
  country: string
  investmentType: string
  riskTolerance: string
}

export function InvestmentOpportunities({ country, investmentType, riskTolerance }: InvestmentOpportunitiesProps) {
  const [investmentData, setInvestmentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchInvestmentData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setInvestmentData({
          country,
          investmentType,
          riskTolerance,
          stockMarket: {
            name: 'Nigerian Stock Exchange',
            marketCap: '$50 billion',
            listedCompanies: '150+',
            sectors: [
              'Banking',
              'Oil & Gas',
              'Telecommunications',
              'Consumer Goods',
              'Agriculture'
            ],
            performance: {
              yearToDate: '+15%',
              annualReturn: '+12%',
              volatility: 'Medium'
            }
          },
          governmentBonds: [
            {
              name: 'Federal Government Bond',
              maturity: '5-10 years',
              yield: '12-15% per annum',
              risk: 'Low',
              minimumInvestment: '$1000'
            },
            {
              name: 'Treasury Bills',
              maturity: '91-364 days',
              yield: '8-12% per annum',
              risk: 'Very Low',
              minimumInvestment: '$100'
            }
          ],
          realEstate: [
            {
              type: 'Residential Property',
              location: 'Lagos, Abuja',
              expectedReturn: '8-15% per annum',
              risk: 'Medium',
              minimumInvestment: '$50,000'
            },
            {
              type: 'Commercial Property',
              location: 'Major cities',
              expectedReturn: '10-20% per annum',
              risk: 'Medium-High',
              minimumInvestment: '$100,000'
            }
          ],
          startupInvestment: [
            {
              sector: 'Fintech',
              stage: 'Early stage',
              expectedReturn: '20-50% per annum',
              risk: 'High',
              minimumInvestment: '$10,000'
            },
            {
              sector: 'Agritech',
              stage: 'Growth stage',
              expectedReturn: '15-30% per annum',
              risk: 'Medium-High',
              minimumInvestment: '$25,000'
            }
          ],
          investmentPlatforms: [
            {
              name: 'Risevest',
              type: 'Digital investment platform',
              services: ['Stocks', 'Bonds', 'Real Estate'],
              minimumInvestment: '$10',
              fees: '1-2% per transaction'
            },
            {
              name: 'Bamboo',
              type: 'Stock trading platform',
              services: ['US Stocks', 'Nigerian Stocks'],
              minimumInvestment: '$1',
              fees: '0.5% per transaction'
            }
          ],
          riskManagement: [
            'Diversification across sectors',
            'Regular portfolio rebalancing',
            'Risk assessment and monitoring',
            'Professional financial advice'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchInvestmentData()
  }, [country, investmentType, riskTolerance])

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
        <ArrowTrendingUpIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Investment Opportunities</h3>
      </div>

      {/* Stock Market */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Stock Market</h4>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-gray-900">{investmentData?.stockMarket.name}</h5>
            <span className="text-sm text-gray-500">{investmentData?.stockMarket.marketCap}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="font-medium text-gray-700 mb-1">Performance:</div>
              <div className="text-sm text-gray-600">{investmentData?.stockMarket.performance.yearToDate}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Annual Return:</div>
              <div className="text-sm text-gray-600">{investmentData?.stockMarket.performance.annualReturn}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Volatility:</div>
              <div className="text-sm text-gray-600">{investmentData?.stockMarket.performance.volatility}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {investmentData?.stockMarket.sectors.map((sector: any, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
              >
                <ChartBarIcon className="w-3 h-3 mr-1" />
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Government Bonds */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Government Bonds</h4>
        <div className="space-y-3">
          {investmentData?.governmentBonds.map((bond: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{bond.name}</h5>
                <span className="text-sm text-gray-500">{bond.risk}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Maturity:</div>
                  <div className="text-gray-600">{bond.maturity}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Yield:</div>
                  <div className="text-gray-600">{bond.yield}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Minimum:</div>
                  <div className="text-gray-600">{bond.minimumInvestment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Estate */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Real Estate</h4>
        <div className="space-y-3">
          {investmentData?.realEstate.map((property: any, index: number) => (
            <div key={index} className="p-3 bg-white rounded-lg">
              <div className="font-medium text-gray-900 mb-2">{property.type}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Location:</div>
                  <div className="text-primary-700">{property.location}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Expected Return:</div>
                  <div className="text-primary-700">{property.expectedReturn}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Risk:</div>
                  <div className="text-primary-700">{property.risk}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Minimum:</div>
                  <div className="text-primary-700">{property.minimumInvestment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Platforms */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Investment Platforms</h4>
        <div className="space-y-3">
          {investmentData?.investmentPlatforms.map((platform: any, index: number) => (
            <div key={index} className="p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{platform.name}</h5>
                <span className="text-sm text-gray-500">{platform.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Services:</div>
                  <div className="text-success-700">{platform.services.join(', ')}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Minimum:</div>
                  <div className="text-success-700">{platform.minimumInvestment}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Fees:</div>
                  <div className="text-success-700">{platform.fees}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div className="p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Risk Management</h4>
        <div className="space-y-2">
          {investmentData?.riskManagement.map((strategy: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{strategy}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
