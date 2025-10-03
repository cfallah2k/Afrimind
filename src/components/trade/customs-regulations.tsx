'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

interface CustomsRegulationsProps {
  origin: string
  destination: string
  commodity: string
}

export function CustomsRegulations({ origin, destination, commodity }: CustomsRegulationsProps) {
  const [regulationsData, setRegulationsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchRegulationsData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setRegulationsData({
          origin,
          destination,
          commodity,
          regulations: {
            importRequirements: [
              'Valid commercial invoice',
              'Packing list',
              'Certificate of origin',
              'Import permit (if required)',
              'Phytosanitary certificate (for agricultural products)'
            ],
            exportRequirements: [
              'Export declaration',
              'Commercial invoice',
              'Packing list',
              'Certificate of origin',
              'Export permit (if required)'
            ],
            prohibitedItems: [
              'Narcotics and controlled substances',
              'Counterfeit goods',
              'Hazardous materials without proper permits'
            ],
            restrictedItems: [
              'Agricultural products (require phytosanitary certificates)',
              'Electronics (require compliance certificates)',
              'Textiles (require import quotas)'
            ]
          },
          processingTimes: {
            standardClearance: '2-5 business days',
            expeditedClearance: '1-2 business days',
            specialClearance: '5-10 business days'
          },
          fees: {
            customsDuty: '5-25% of CIF value',
            processingFee: '$50-200',
            storageFee: '$10-50 per day'
          },
          contactInformation: {
            customsOffice: `${destination} Customs Authority`,
            phone: '+234-XXX-XXXX',
            email: 'customs@example.com',
            website: 'https://customs.example.com'
          }
        })
        setLoading(false)
      }, 1000)
    }

    fetchRegulationsData()
  }, [origin, destination, commodity])

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
        <DocumentTextIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Customs Regulations</h3>
      </div>

      {/* Import Requirements */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Import Requirements</h4>
        <div className="space-y-2">
          {regulationsData?.regulations.importRequirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-success-600" />
              <span className="text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Requirements */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Export Requirements</h4>
        <div className="space-y-2">
          {regulationsData?.regulations.exportRequirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-success-600" />
              <span className="text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prohibited Items */}
      <div className="mb-6 p-4 bg-danger-50 rounded-lg">
        <h4 className="font-semibold text-danger-800 mb-3">Prohibited Items</h4>
        <div className="space-y-2">
          {regulationsData?.regulations.prohibitedItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4 text-danger-600" />
              <span className="text-danger-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Times */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Processing Times</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-1">Standard:</div>
            <div className="text-primary-700">{regulationsData?.processingTimes.standardClearance}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Expedited:</div>
            <div className="text-primary-700">{regulationsData?.processingTimes.expeditedClearance}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Special:</div>
            <div className="text-primary-700">{regulationsData?.processingTimes.specialClearance}</div>
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="mb-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Fees & Charges</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-warning-700">Customs Duty:</span>
            <span className="font-medium">{regulationsData?.fees.customsDuty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-warning-700">Processing Fee:</span>
            <span className="font-medium">{regulationsData?.fees.processingFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-warning-700">Storage Fee:</span>
            <span className="font-medium">{regulationsData?.fees.storageFee}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{regulationsData?.contactInformation.customsOffice}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{regulationsData?.contactInformation.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">{regulationsData?.contactInformation.email}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
