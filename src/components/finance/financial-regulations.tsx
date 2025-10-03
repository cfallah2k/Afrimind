'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

interface FinancialRegulationsProps {
  country: string
  regulationType: string
}

export function FinancialRegulations({ country, regulationType }: FinancialRegulationsProps) {
  const [regulationsData, setRegulationsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchRegulationsData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setRegulationsData({
          country,
          regulationType,
          regulatoryBodies: [
            {
              name: 'Central Bank',
              role: 'Monetary policy and banking supervision',
              website: 'https://centralbank.example.com',
              contact: '+234-XXX-XXXX'
            },
            {
              name: 'Securities and Exchange Commission',
              role: 'Capital markets regulation',
              website: 'https://sec.example.com',
              contact: '+234-XXX-XXXX'
            },
            {
              name: 'National Insurance Commission',
              role: 'Insurance sector regulation',
              website: 'https://naicom.example.com',
              contact: '+234-XXX-XXXX'
            }
          ],
          keyRegulations: [
            {
              regulation: 'Know Your Customer (KYC)',
              description: 'Customer identification and verification requirements',
              complianceRequirements: [
                'Valid government ID',
                'Proof of address',
                'Biometric verification',
                'Risk assessment'
              ]
            },
            {
              regulation: 'Anti-Money Laundering (AML)',
              description: 'Prevention of money laundering and terrorist financing',
              complianceRequirements: [
                'Transaction monitoring',
                'Suspicious activity reporting',
                'Customer due diligence',
                'Record keeping'
              ]
            },
            {
              regulation: 'Data Protection',
              description: 'Protection of customer data and privacy',
              complianceRequirements: [
                'Data encryption',
                'Consent management',
                'Data breach notification',
                'Privacy policies'
              ]
            }
          ],
          licensingRequirements: [
            {
              service: 'Mobile Money',
              requirements: [
                'Central Bank license',
                'Minimum capital requirement',
                'Risk management framework',
                'Consumer protection measures'
              ]
            },
            {
              service: 'Digital Banking',
              requirements: [
                'Banking license',
                'Technology infrastructure',
                'Cybersecurity measures',
                'Operational procedures'
              ]
            }
          ],
          complianceTimeline: [
            'Initial application: 30-60 days',
            'Due diligence: 60-90 days',
            'License approval: 90-120 days',
            'Operational readiness: 120-180 days'
          ],
          penaltiesAndSanctions: [
            'Monetary fines: $10,000-100,000',
            'License suspension',
            'Criminal prosecution',
            'Reputational damage'
          ]
        })
        setLoading(false)
      }, 1000)
    }

    fetchRegulationsData()
  }, [country, regulationType])

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
        <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Financial Regulations</h3>
      </div>

      {/* Regulatory Bodies */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Regulatory Bodies</h4>
        <div className="space-y-3">
          {regulationsData?.regulatoryBodies.map((body, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{body.name}</h5>
                <div className="text-sm text-gray-500">{body.contact}</div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{body.role}</p>
              <div className="text-xs text-primary-600">{body.website}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Regulations */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Key Regulations</h4>
        <div className="space-y-4">
          {regulationsData?.keyRegulations.map((regulation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">{regulation.regulation}</h5>
              <p className="text-sm text-gray-600 mb-3">{regulation.description}</p>
              <div className="space-y-2">
                {regulation.complianceRequirements.map((requirement, reqIndex) => (
                  <div key={reqIndex} className="flex items-center space-x-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-success-600" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Licensing Requirements */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Licensing Requirements</h4>
        <div className="space-y-3">
          {regulationsData?.licensingRequirements.map((license, index) => (
            <div key={index} className="p-3 bg-white rounded-lg">
              <div className="font-medium text-gray-900 mb-2">{license.service}</div>
              <div className="space-y-1">
                {license.requirements.map((requirement, reqIndex) => (
                  <div key={reqIndex} className="flex items-center space-x-2 text-sm">
                    <DocumentTextIcon className="w-4 h-4 text-primary-600" />
                    <span className="text-primary-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Timeline */}
      <div className="mb-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Compliance Timeline</h4>
        <div className="space-y-2">
          {regulationsData?.complianceTimeline.map((timeline, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ClockIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{timeline}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Penalties and Sanctions */}
      <div className="p-4 bg-danger-50 rounded-lg">
        <h4 className="font-semibold text-danger-800 mb-3">Penalties and Sanctions</h4>
        <div className="space-y-2">
          {regulationsData?.penaltiesAndSanctions.map((penalty, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4 text-danger-600" />
              <span className="text-danger-700">{penalty}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
