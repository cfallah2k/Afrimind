'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  ClockIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface BorderConditionsProps {
  borderCrossing: string
  countryPair: string
}

export function BorderConditions({ borderCrossing, countryPair }: BorderConditionsProps) {
  const [borderData, setBorderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchBorderData = async () => {
      setLoading(true)
      // Mock data - in production, this would be a real API call
      setTimeout(() => {
        setBorderData({
          borderCrossing,
          countryPair,
          currentStatus: {
            operational: true,
            waitTime: '2-4 hours',
            queueLength: '50-100 vehicles',
            processingSpeed: 'Normal'
          },
          operatingHours: {
            weekdays: '6:00 AM - 10:00 PM',
            weekends: '8:00 AM - 8:00 PM',
            holidays: 'Closed or reduced hours'
          },
          currentConditions: {
            weather: 'Clear',
            roadConditions: 'Good',
            securityLevel: 'Normal',
            covidRestrictions: 'None'
          },
          peakHours: [
            '8:00 AM - 10:00 AM',
            '2:00 PM - 4:00 PM',
            '6:00 PM - 8:00 PM'
          ],
          bestTimesToCross: [
            '6:00 AM - 8:00 AM',
            '10:00 AM - 12:00 PM',
            '4:00 PM - 6:00 PM'
          ],
          requiredProcedures: [
            'Vehicle inspection',
            'Document verification',
            'Customs declaration',
            'Security check'
          ],
          tipsForSmoothCrossing: [
            'Arrive early in the morning',
            'Have all documents ready',
            'Ensure vehicle is in good condition',
            'Be patient and cooperative'
          ],
          emergencyContacts: {
            borderControl: '+234-XXX-XXXX',
            customs: '+234-XXX-XXXX',
            police: '+234-XXX-XXXX'
          }
        })
        setLoading(false)
      }, 1000)
    }

    fetchBorderData()
  }, [borderCrossing, countryPair])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-success-600 bg-success-100'
      case 'Slow':
        return 'text-warning-600 bg-warning-100'
      case 'Very Slow':
        return 'text-danger-600 bg-danger-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
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
        <ExclamationTriangleIcon className="w-6 h-6 text-warning-600" />
        <h3 className="text-lg font-semibold text-gray-900">Border Conditions</h3>
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Current Status</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-1">Operational:</div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              borderData?.currentStatus.operational 
                ? 'text-success-600 bg-success-100' 
                : 'text-danger-600 bg-danger-100'
            }`}>
              {borderData?.currentStatus.operational ? 'Open' : 'Closed'}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Wait Time:</div>
            <div className="text-primary-700">{borderData?.currentStatus.waitTime}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Queue Length:</div>
            <div className="text-primary-700">{borderData?.currentStatus.queueLength}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Processing:</div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(borderData?.currentStatus.processingSpeed)}`}>
              {borderData?.currentStatus.processingSpeed}
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Operating Hours</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Weekdays:</span>
            <span className="font-medium">{borderData?.operatingHours.weekdays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Weekends:</span>
            <span className="font-medium">{borderData?.operatingHours.weekends}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Holidays:</span>
            <span className="font-medium">{borderData?.operatingHours.holidays}</span>
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Current Conditions</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-1">Weather:</div>
            <div className="text-success-700">{borderData?.currentConditions.weather}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Roads:</div>
            <div className="text-success-700">{borderData?.currentConditions.roadConditions}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Security:</div>
            <div className="text-success-700">{borderData?.currentConditions.securityLevel}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">COVID-19:</div>
            <div className="text-success-700">{borderData?.currentConditions.covidRestrictions}</div>
          </div>
        </div>
      </div>

      {/* Best Times to Cross */}
      <div className="mb-6 p-4 bg-warning-50 rounded-lg">
        <h4 className="font-semibold text-warning-800 mb-3">Best Times to Cross</h4>
        <div className="space-y-2">
          {borderData?.bestTimesToCross.map((time, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ClockIcon className="w-4 h-4 text-warning-600" />
              <span className="text-warning-700">{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Required Procedures */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-3">Required Procedures</h4>
        <div className="space-y-2">
          {borderData?.requiredProcedures.map((procedure, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700">{procedure}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips for Smooth Crossing */}
      <div className="mb-6 p-4 bg-success-50 rounded-lg">
        <h4 className="font-semibold text-success-800 mb-3">Tips for Smooth Crossing</h4>
        <div className="space-y-2">
          {borderData?.tipsForSmoothCrossing.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="w-4 h-4 text-success-600" />
              <span className="text-success-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="p-4 bg-danger-50 rounded-lg">
        <h4 className="font-semibold text-danger-800 mb-3">Emergency Contacts</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-4 h-4 text-danger-600" />
            <span className="text-danger-700">Border Control: {borderData?.emergencyContacts.borderControl}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-4 h-4 text-danger-600" />
            <span className="text-danger-700">Customs: {borderData?.emergencyContacts.customs}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-4 h-4 text-danger-600" />
            <span className="text-danger-700">Police: {borderData?.emergencyContacts.police}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
