'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface MobileMoneyServicesProps {
  country: string
  serviceType: string
}

export function MobileMoneyServices({ country, serviceType }: MobileMoneyServicesProps) {
  const [servicesData, setServicesData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamic data based on country selection
    const fetchServicesData = async () => {
      setLoading(true)
      
      // Country-specific data for all West African countries
      const countryData = {
        'Liberia': {
          currency: 'LRD',
          providers: [
            {
              name: 'Orange Money Liberia',
              coverage: 'Liberia',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'LRD 50-200' },
              requirements: ['Valid ID', 'Phone number', 'Liberian address'],
              limits: { daily: 'LRD 50,000', monthly: 'LRD 500,000' },
              contact: '+231-77-XXX-XXXX', rating: 4.4,
              description: 'Orange Money provides mobile money services in Liberia'
            },
            {
              name: 'Lonestar MTN Mobile Money',
              coverage: 'Liberia',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-3% of amount', payment: '1-2% of amount', withdrawal: 'LRD 75-250' },
              requirements: ['Valid ID', 'Phone number', 'Liberian address'],
              limits: { daily: 'LRD 40,000', monthly: 'LRD 400,000' },
              contact: '+231-88-XXX-XXXX', rating: 4.2,
              description: 'MTN Mobile Money services in Liberia'
            }
          ]
        },
        'Nigeria': {
          currency: 'NGN',
          providers: [
            {
              name: 'MTN Mobile Money Nigeria',
              coverage: 'Nigeria',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-3% of amount', payment: '0.5-2% of amount', withdrawal: 'NGN 50-200' },
              requirements: ['Valid ID', 'Phone number', 'BVN'],
              limits: { daily: 'NGN 50,000', monthly: 'NGN 500,000' },
              contact: '+234-XXX-XXXX', rating: 4.5,
              description: 'MTN Mobile Money provides services across Nigeria'
            },
            {
              name: 'Airtel Money Nigeria',
              coverage: 'Nigeria',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'NGN 30-150' },
              requirements: ['Valid ID', 'Phone number', 'BVN'],
              limits: { daily: 'NGN 30,000', monthly: 'NGN 300,000' },
              contact: '+234-XXX-XXXX', rating: 4.3,
              description: 'Airtel Money services in Nigeria'
            }
          ]
        },
        'Ghana': {
          currency: 'GHS',
          providers: [
            {
              name: 'MTN Mobile Money Ghana',
              coverage: 'Ghana',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2.5% of amount', payment: '0.5-2% of amount', withdrawal: 'GHS 2-8' },
              requirements: ['Valid ID', 'Phone number', 'Ghana Card'],
              limits: { daily: 'GHS 2,000', monthly: 'GHS 20,000' },
              contact: '+233-XXX-XXXX', rating: 4.6,
              description: 'MTN Mobile Money services in Ghana'
            },
            {
              name: 'Vodafone Cash Ghana',
              coverage: 'Ghana',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'GHS 1.5-6' },
              requirements: ['Valid ID', 'Phone number', 'Ghana Card'],
              limits: { daily: 'GHS 1,500', monthly: 'GHS 15,000' },
              contact: '+233-XXX-XXXX', rating: 4.4,
              description: 'Vodafone Cash services in Ghana'
            }
          ]
        },
        'Senegal': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Senegal',
              coverage: 'Senegal',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Senegalese address'],
              limits: { daily: 'XOF 100,000', monthly: 'XOF 1,000,000' },
              contact: '+221-77-XXX-XXXX', rating: 4.3,
              description: 'Orange Money provides services in Senegal'
            },
            {
              name: 'Free Money Senegal',
              coverage: 'Senegal',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Senegalese address'],
              limits: { daily: 'XOF 80,000', monthly: 'XOF 800,000' },
              contact: '+221-78-XXX-XXXX', rating: 4.1,
              description: 'Free Money services in Senegal'
            }
          ]
        },
        'Mali': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Mali',
              coverage: 'Mali',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Malian address'],
              limits: { daily: 'XOF 80,000', monthly: 'XOF 800,000' },
              contact: '+223-70-XXX-XXXX', rating: 4.2,
              description: 'Orange Money provides services in Mali'
            },
            {
              name: 'Moov Money Mali',
              coverage: 'Mali',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Malian address'],
              limits: { daily: 'XOF 60,000', monthly: 'XOF 600,000' },
              contact: '+223-76-XXX-XXXX', rating: 4.0,
              description: 'Moov Money services in Mali'
            }
          ]
        },
        'Ivory Coast': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Côte d\'Ivoire',
              coverage: 'Ivory Coast',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Ivorian address'],
              limits: { daily: 'XOF 150,000', monthly: 'XOF 1,500,000' },
              contact: '+225-07-XXX-XXXX', rating: 4.4,
              description: 'Orange Money provides services in Ivory Coast'
            },
            {
              name: 'MTN Mobile Money Côte d\'Ivoire',
              coverage: 'Ivory Coast',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Ivorian address'],
              limits: { daily: 'XOF 120,000', monthly: 'XOF 1,200,000' },
              contact: '+225-05-XXX-XXXX', rating: 4.2,
              description: 'MTN Mobile Money services in Ivory Coast'
            }
          ]
        },
        'Guinea': {
          currency: 'GNF',
          providers: [
            {
              name: 'Orange Money Guinea',
              coverage: 'Guinea',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'GNF 5,000-25,000' },
              requirements: ['Valid ID', 'Phone number', 'Guinean address'],
              limits: { daily: 'GNF 2,000,000', monthly: 'GNF 20,000,000' },
              contact: '+224-60-XXX-XXXX', rating: 4.1,
              description: 'Orange Money provides services in Guinea'
            },
            {
              name: 'MTN Mobile Money Guinea',
              coverage: 'Guinea',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'GNF 7,500-30,000' },
              requirements: ['Valid ID', 'Phone number', 'Guinean address'],
              limits: { daily: 'GNF 1,500,000', monthly: 'GNF 15,000,000' },
              contact: '+224-61-XXX-XXXX', rating: 3.9,
              description: 'MTN Mobile Money services in Guinea'
            }
          ]
        },
        'Sierra Leone': {
          currency: 'SLL',
          providers: [
            {
              name: 'Orange Money Sierra Leone',
              coverage: 'Sierra Leone',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'SLL 10,000-50,000' },
              requirements: ['Valid ID', 'Phone number', 'Sierra Leone address'],
              limits: { daily: 'SLL 5,000,000', monthly: 'SLL 50,000,000' },
              contact: '+232-77-XXX-XXXX', rating: 4.0,
              description: 'Orange Money provides services in Sierra Leone'
            },
            {
              name: 'Africell Money Sierra Leone',
              coverage: 'Sierra Leone',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'SLL 15,000-60,000' },
              requirements: ['Valid ID', 'Phone number', 'Sierra Leone address'],
              limits: { daily: 'SLL 4,000,000', monthly: 'SLL 40,000,000' },
              contact: '+232-88-XXX-XXXX', rating: 3.8,
              description: 'Africell Money services in Sierra Leone'
            }
          ]
        },
        'Gambia': {
          currency: 'GMD',
          providers: [
            {
              name: 'Orange Money Gambia',
              coverage: 'Gambia',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'GMD 20-100' },
              requirements: ['Valid ID', 'Phone number', 'Gambian address'],
              limits: { daily: 'GMD 10,000', monthly: 'GMD 100,000' },
              contact: '+220-77-XXX-XXXX', rating: 4.2,
              description: 'Orange Money provides services in Gambia'
            },
            {
              name: 'Africell Money Gambia',
              coverage: 'Gambia',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'GMD 30-120' },
              requirements: ['Valid ID', 'Phone number', 'Gambian address'],
              limits: { daily: 'GMD 8,000', monthly: 'GMD 80,000' },
              contact: '+220-88-XXX-XXXX', rating: 4.0,
              description: 'Africell Money services in Gambia'
            }
          ]
        },
        'Burkina Faso': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Burkina Faso',
              coverage: 'Burkina Faso',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Burkinabé address'],
              limits: { daily: 'XOF 80,000', monthly: 'XOF 800,000' },
              contact: '+226-70-XXX-XXXX', rating: 4.1,
              description: 'Orange Money provides services in Burkina Faso'
            },
            {
              name: 'Moov Money Burkina Faso',
              coverage: 'Burkina Faso',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Burkinabé address'],
              limits: { daily: 'XOF 60,000', monthly: 'XOF 600,000' },
              contact: '+226-76-XXX-XXXX', rating: 3.9,
              description: 'Moov Money services in Burkina Faso'
            }
          ]
        },
        'Togo': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Togo',
              coverage: 'Togo',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Togolese address'],
              limits: { daily: 'XOF 80,000', monthly: 'XOF 800,000' },
              contact: '+228-90-XXX-XXXX', rating: 4.0,
              description: 'Orange Money provides services in Togo'
            },
            {
              name: 'Moov Money Togo',
              coverage: 'Togo',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Togolese address'],
              limits: { daily: 'XOF 60,000', monthly: 'XOF 600,000' },
              contact: '+228-91-XXX-XXXX', rating: 3.8,
              description: 'Moov Money services in Togo'
            }
          ]
        },
        'Benin': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Benin',
              coverage: 'Benin',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Beninese address'],
              limits: { daily: 'XOF 100,000', monthly: 'XOF 1,000,000' },
              contact: '+229-97-XXX-XXXX', rating: 4.2,
              description: 'Orange Money provides services in Benin'
            },
            {
              name: 'MTN Mobile Money Benin',
              coverage: 'Benin',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Beninese address'],
              limits: { daily: 'XOF 80,000', monthly: 'XOF 800,000' },
              contact: '+229-96-XXX-XXXX', rating: 4.0,
              description: 'MTN Mobile Money services in Benin'
            }
          ]
        },
        'Niger': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Niger',
              coverage: 'Niger',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Nigerien address'],
              limits: { daily: 'XOF 60,000', monthly: 'XOF 600,000' },
              contact: '+227-90-XXX-XXXX', rating: 3.9,
              description: 'Orange Money provides services in Niger'
            },
            {
              name: 'Moov Money Niger',
              coverage: 'Niger',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Nigerien address'],
              limits: { daily: 'XOF 50,000', monthly: 'XOF 500,000' },
              contact: '+227-91-XXX-XXXX', rating: 3.7,
              description: 'Moov Money services in Niger'
            }
          ]
        },
        'Guinea-Bissau': {
          currency: 'XOF',
          providers: [
            {
              name: 'Orange Money Guinea-Bissau',
              coverage: 'Guinea-Bissau',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'XOF 100-500' },
              requirements: ['Valid ID', 'Phone number', 'Guinea-Bissau address'],
              limits: { daily: 'XOF 40,000', monthly: 'XOF 400,000' },
              contact: '+245-95-XXX-XXXX', rating: 3.8,
              description: 'Orange Money provides services in Guinea-Bissau'
            },
            {
              name: 'MTN Mobile Money Guinea-Bissau',
              coverage: 'Guinea-Bissau',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'XOF 150-600' },
              requirements: ['Valid ID', 'Phone number', 'Guinea-Bissau address'],
              limits: { daily: 'XOF 30,000', monthly: 'XOF 300,000' },
              contact: '+245-96-XXX-XXXX', rating: 3.6,
              description: 'MTN Mobile Money services in Guinea-Bissau'
            }
          ]
        },
        'Cape Verde': {
          currency: 'CVE',
          providers: [
            {
              name: 'Orange Money Cape Verde',
              coverage: 'Cape Verde',
              services: ['transfer', 'payment', 'savings', 'credit'],
              fees: { transfer: '1-2% of amount', payment: '0.5-1.5% of amount', withdrawal: 'CVE 50-200' },
              requirements: ['Valid ID', 'Phone number', 'Cape Verde address'],
              limits: { daily: 'CVE 50,000', monthly: 'CVE 500,000' },
              contact: '+238-99-XXX-XXXX', rating: 4.3,
              description: 'Orange Money provides services in Cape Verde'
            },
            {
              name: 'CV Movel Money',
              coverage: 'Cape Verde',
              services: ['transfer', 'payment', 'savings'],
              fees: { transfer: '1.5-2.5% of amount', payment: '1-2% of amount', withdrawal: 'CVE 75-300' },
              requirements: ['Valid ID', 'Phone number', 'Cape Verde address'],
              limits: { daily: 'CVE 40,000', monthly: 'CVE 400,000' },
              contact: '+238-98-XXX-XXXX', rating: 4.1,
              description: 'CV Movel Money services in Cape Verde'
            }
          ]
        }
      }

      const selectedCountryData = countryData[country as keyof typeof countryData] || countryData['Liberia']
      
      setTimeout(() => {
        setServicesData({
          country,
          serviceType,
          currency: selectedCountryData.currency,
          providers: selectedCountryData.providers,
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
      }, 800)
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
        {servicesData?.providers.map((provider: any, index: number) => (
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
                  {provider.services.map((service: any, serviceIndex: number) => (
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
          {servicesData?.commonUseCases.map((useCase: any, index: number) => (
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
          {servicesData?.benefits.map((benefit: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Trends */}
      <div className="mt-4 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Future Trends</h4>
        <div className="space-y-2">
          {servicesData?.futureTrends.map((trend: any, index: number) => (
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
