'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CalculatorIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface TariffCalculatorProps {
  commodityCode: string
  origin: string
  destination: string
  value: number
}

export function TariffCalculator({ commodityCode, origin, destination, value }: TariffCalculatorProps) {
  const [tariffData, setTariffData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTariffData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setTariffData({
          commodityCode,
          origin,
          destination,
          value,
          tariffBreakdown: {
            customsDuty: {
              rate: '15%',
              amount: value * 0.15,
              description: 'Standard customs duty rate'
            },
            vat: {
              rate: '7.5%',
              amount: (value + value * 0.15) * 0.075,
              description: 'Value Added Tax'
            },
            exciseDuty: {
              rate: '5%',
              amount: value * 0.05,
              description: 'Excise duty on specific goods'
            },
            processingFee: {
              amount: 50,
              description: 'Customs processing fee'
            }
          },
          totalTariffs: {
            subtotal: value * 0.15 + (value + value * 0.15) * 0.075 + value * 0.05 + 50,
            percentageOfValue: ((value * 0.15 + (value + value * 0.15) * 0.075 + value * 0.05 + 50) / value) * 100
          },
          preferentialRates: {
            afcftaRate: '5%',
            afcftaSavings: value * 0.1,
            requirements: 'Certificate of origin from AfCFTA member state'
          },
          paymentMethods: [
            'Bank transfer',
            'Credit card',
            'Cash (limited amounts)',
            'Letter of credit'
          ],
          paymentDeadline: 'Within 30 days of clearance',
          exemptions: [
            'Personal effects under $500',
            'Diplomatic goods',
            'Humanitarian aid',
            'Educational materials'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchTariffData()
  }, [commodityCode, origin, destination, value])

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
        <CalculatorIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Tariff Calculator</h3>
      </div>

      {/* Tariff Breakdown */}
      <div className="space-y-4 mb-6">
        {Object.entries(tariffData?.tariffBreakdown || {}).map(([key, tariff]: [string, any]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm text-gray-600">{tariff.description}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {key === 'processingFee' ? formatCurrency(tariff.amount) : `${tariff.rate} (${formatCurrency(tariff.amount)})`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Tariffs */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-primary-800">Total Tariffs</h4>
          <div className="text-2xl font-bold text-primary-900">
            {formatCurrency(tariffData?.totalTariffs.subtotal)}
          </div>
        </div>
        <div className="text-sm text-primary-700">
          {tariffData?.totalTariffs.percentageOfValue.toFixed(1)}% of total value
        </div>
      </div>

      {/* Preferential Rates */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">AfCFTA Preferential Rates</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-success-700">AfCFTA Rate:</span>
            <span className="font-medium">{tariffData?.preferentialRates.afcftaRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-success-700">Potential Savings:</span>
            <span className="font-medium">{formatCurrency(tariffData?.preferentialRates.afcftaSavings)}</span>
          </div>
          <div className="text-xs text-success-600 mt-2">
            {tariffData?.preferentialRates.requirements}
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Payment Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-warning-700">Deadline:</span>
            <span className="font-medium">{tariffData?.paymentDeadline}</span>
          </div>
          <div className="mt-3">
            <div className="font-medium text-warning-800 mb-2">Accepted Methods:</div>
            <div className="space-y-1">
              {tariffData?.paymentMethods.map((method: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-3 h-3 text-warning-600" />
                  <span className="text-warning-700">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exemptions */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Possible Exemptions</h4>
        <div className="space-y-2">
          {tariffData?.exemptions.map((exemption: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{exemption}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
