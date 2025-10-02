'use client'

import { useState } from 'react'
import { 
  MapPin, 
  Clock, 
  Truck, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Navigation,
  DollarSign,
  Globe,
  Phone
} from 'lucide-react'

export default function LogisticsTab() {
  const [selectedRoute, setSelectedRoute] = useState('nairobi-kampala')

  const routes = [
    {
      id: 'nairobi-kampala',
      from: 'Nairobi',
      to: 'Kampala',
      distance: '530 km',
      duration: '8-10 hours',
      cost: '$150-200',
      status: 'open',
      waitTime: '1.5 hours'
    },
    {
      id: 'nairobi-dar',
      from: 'Nairobi',
      to: 'Dar es Salaam',
      distance: '650 km',
      duration: '10-12 hours',
      cost: '$180-250',
      status: 'delayed',
      waitTime: '3 hours'
    },
    {
      id: 'nairobi-kigali',
      from: 'Nairobi',
      to: 'Kigali',
      distance: '420 km',
      duration: '6-8 hours',
      cost: '$120-180',
      status: 'open',
      waitTime: '45 minutes'
    }
  ]

  const borderInfo = {
    name: 'Malaba Border',
    status: 'Open',
    hours: '6:00 AM - 10:00 PM',
    waitTime: '1.5 hours',
    requirements: [
      'Valid Passport',
      'Certificate of Origin',
      'Commercial Invoice',
      'Phytosanitary Certificate'
    ]
  }

  const currentRoute = routes.find(route => route.id === selectedRoute)

  return (
    <div className="space-y-6">
      {/* Route Selection */}
      <div className="card-elevated">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Trade Routes</h3>
        <div className="space-y-3">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedRoute === route.id
                  ? 'border-africa-600 bg-africa-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-africa-100 rounded-lg flex items-center justify-center mr-3">
                    <Truck className="w-5 h-5 text-africa-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">{route.from} → {route.to}</p>
                    <p className="text-sm text-gray-600">{route.distance} • {route.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{route.cost}</p>
                  <div className="flex items-center">
                    {route.status === 'open' ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-600 mr-1" />
                    )}
                    <span className={`text-sm ${
                      route.status === 'open' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {route.status}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Route Details */}
      {currentRoute && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Route Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center mb-2">
                  <Navigation className="w-4 h-4 text-africa-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Distance</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{currentRoute.distance}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-africa-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Duration</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{currentRoute.duration}</p>
              </div>
            </div>

            <div className="p-3 bg-africa-50 rounded-xl">
              <div className="flex items-center mb-2">
                <DollarSign className="w-4 h-4 text-africa-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">Estimated Cost</span>
              </div>
              <p className="text-xl font-bold text-gray-800">{currentRoute.cost}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-africa-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">Current Wait Time</span>
              </div>
              <p className="text-lg font-bold text-gray-800">{currentRoute.waitTime}</p>
            </div>
          </div>
        </div>
      )}

      {/* Border Information */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Border Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-800">{borderInfo.name}</p>
              <p className="text-sm text-gray-600">{borderInfo.hours}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">{borderInfo.status}</span>
              </div>
              <p className="text-sm text-gray-600">Wait: {borderInfo.waitTime}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-3">Required Documents</h4>
            <div className="space-y-2">
              {borderInfo.requirements.map((req, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-africa-600 mr-3" />
                  <span className="text-sm text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="btn-primary">
          <MapPin className="w-4 h-4 mr-2" />
          Live Tracking
        </button>
        <button className="btn-secondary">
          <Phone className="w-4 h-4 mr-2" />
          Border Contact
        </button>
      </div>

      {/* Emergency Contacts */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Border Emergency</p>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </div>
            </div>
            <span className="text-red-600 font-bold">+254 700 123 456</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Trade Support</p>
                <p className="text-sm text-gray-600">Business Hours</p>
              </div>
            </div>
            <span className="text-blue-600 font-bold">+254 700 789 012</span>
          </div>
        </div>
      </div>
    </div>
  )
}
