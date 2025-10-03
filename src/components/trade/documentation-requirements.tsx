'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface DocumentationRequirementsProps {
  commodity: string
  value: number
}

export function DocumentationRequirements({ commodity, value }: DocumentationRequirementsProps) {
  const [docsData, setDocsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchDocsData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setDocsData({
          commodity,
          value,
          requiredDocuments: {
            commercialInvoice: {
              required: true,
              description: 'Detailed invoice showing goods, quantities, and values',
              format: 'PDF or original',
              validity: '30 days'
            },
            packingList: {
              required: true,
              description: 'Detailed list of all items in the shipment',
              format: 'PDF or original',
              validity: '30 days'
            },
            certificateOfOrigin: {
              required: value > 1000,
              description: 'Certificate proving the origin of goods',
              format: 'Original with stamp',
              validity: '6 months'
            },
            importExportPermit: {
              required: commodity.includes('restricted'),
              description: 'Government permit for restricted goods',
              format: 'Original',
              validity: '1 year'
            },
            phytosanitaryCertificate: {
              required: commodity.includes('agricultural'),
              description: 'Certificate for agricultural products',
              format: 'Original',
              validity: '14 days'
            }
          },
          optionalDocuments: [
            'Insurance certificate',
            'Quality inspection certificate',
            'Fumigation certificate',
            'Weight certificate'
          ],
          documentPreparationTips: [
            'Ensure all documents are in English or with certified translations',
            'Check that all signatures and stamps are valid',
            'Keep copies of all documents',
            'Submit documents well in advance of shipment'
          ],
          commonMistakes: [
            'Missing signatures or stamps',
            'Incorrect commodity descriptions',
            'Outdated certificates',
            'Incomplete information'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchDocsData()
  }, [commodity, value])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
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
        <DocumentTextIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Documentation Requirements</h3>
      </div>

      <div className="space-y-4">
        {Object.entries(docsData?.requiredDocuments || {}).map(([key, doc]: [string, any]) => (
          <div key={key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                doc.required 
                  ? 'text-success-600 bg-success-100' 
                  : 'text-gray-600 bg-gray-100'
              }`}>
                {doc.required ? 'Required' : 'Optional'}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{doc.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Format:</span>
                <div className="font-medium">{doc.format}</div>
              </div>
              <div>
                <span className="text-gray-600">Validity:</span>
                <div className="font-medium">{doc.validity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Documents */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Optional Documents</h4>
        <div className="space-y-2">
          {docsData?.optionalDocuments.map((doc, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <InformationCircleIcon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Tips */}
      <div className="mt-4 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Preparation Tips</h4>
        <div className="space-y-2">
          {docsData?.documentPreparationTips.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="mt-4 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Common Mistakes to Avoid</h4>
        <div className="space-y-2">
          {docsData?.commonMistakes.map((mistake, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{mistake}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
