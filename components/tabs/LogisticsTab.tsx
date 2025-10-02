'use client'

import { useState, useEffect } from 'react'
import { 
  Truck, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Star,
  ArrowRight,
  DollarSign,
  Package,
  Route,
  Calendar,
  Users,
  Phone,
  MessageSquare,
  Wifi,
  Volume2,
  Eye,
  Target,
  Award,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react'

export default function LogisticsTab() {
  const [selectedRoute, setSelectedRoute] = useState('lagos-accra')
  const [realTimeData, setRealTimeData] = useState({
    routes: {
      'lagos-accra': { 
        name: 'Lagos to Accra', 
        distance: 450, 
        duration: 8, 
        status: 'active', 
        traffic: 'moderate',
        cost: 250,
        efficiency: 85
      },
      'abuja-lagos': { 
        name: 'Abuja to Lagos', 
        distance: 750, 
        duration: 12, 
        status: 'delayed', 
        traffic: 'heavy',
        cost: 180,
        efficiency: 72
      },
      'nairobi-kampala': { 
        name: 'Nairobi to Kampala', 
        distance: 600, 
        duration: 10, 
        status: 'active', 
        traffic: 'light',
        cost: 320,
        efficiency: 92
      }
    },
    borderStatus: {
      'nigeria-ghana': { status: 'open', waitTime: 45, documents: 'complete' },
      'kenya-uganda': { status: 'open', waitTime: 30, documents: 'complete' },
      'south-africa-zimbabwe': { status: 'delayed', waitTime: 120, documents: 'pending' }
    },
    shipments: [
      { id: 'SH001', origin: 'Lagos', destination: 'Accra', status: 'in-transit', progress: 65, eta: '2 hours' },
      { id: 'SH002', origin: 'Nairobi', destination: 'Kampala', status: 'delivered', progress: 100, eta: 'completed' },
      { id: 'SH003', origin: 'Abuja', destination: 'Lagos', status: 'pending', progress: 0, eta: '6 hours' }
    ],
    marketData: {
      fuel: { price: 450, change: 5, trend: 'up' },
      insurance: { price: 120, change: -2, trend: 'down' },
      maintenance: { price: 80, change: 3, trend: 'up' }
    },
    recommendations: [
      { type: 'route', priority: 'high', message: 'Alternative route available via Tema Port - 2 hours faster' },
      { type: 'document', priority: 'medium', message: 'Update customs documentation for faster clearance' },
      { type: 'fuel', priority: 'low', message: 'Fuel prices expected to drop 3% next week' }
    ]
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        routes: {
          ...prev.routes,
          'lagos-accra': { 
            ...prev.routes['lagos-accra'], 
            efficiency: Math.max(70, Math.min(95, prev.routes['lagos-accra'].efficiency + (Math.random() - 0.5) * 5))
          }
        },
        marketData: {
          ...prev.marketData,
          fuel: { ...prev.marketData.fuel, price: prev.marketData.fuel.price + (Math.random() - 0.5) * 10 }
        }
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const routes = [
    { id: 'lagos-accra', name: 'Lagos to Accra', icon: Globe, color: 'blue' },
    { id: 'abuja-lagos', name: 'Abuja to Lagos', icon: MapPin, color: 'green' },
    { id: 'nairobi-kampala', name: 'Nairobi to Kampala', icon: Target, color: 'purple' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trade & Logistics Intelligence</h1>
            <p className="text-purple-100">Cross-border excellence powered by AI</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Truck className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Route className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-purple-100">Active Routes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Package className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-purple-100">Shipments</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm text-purple-100">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Route Selection */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Select Route</h3>
        <div className="space-y-3">
          {routes.map((route) => {
            const IconComponent = route.icon
            const isSelected = selectedRoute === route.id
            const routeData = realTimeData.routes[route.id as keyof typeof realTimeData.routes]
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-300 transform ${
                  isSelected 
                    ? `bg-gradient-to-r from-${route.color}-500 to-${route.color}-600 text-white shadow-lg scale-105` 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-105'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">{route.name}</p>
                      <p className="text-sm opacity-80">{routeData.distance}km • {routeData.duration}h</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₦{routeData.cost}</p>
                    <p className="text-sm opacity-80">{routeData.efficiency}% efficiency</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Border Status */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Border Status</h3>
        <div className="space-y-4">
          {Object.entries(realTimeData.borderStatus).map(([border, status]) => (
            <div key={border} className={`p-4 rounded-xl border-l-4 ${
              status.status === 'open' ? 'bg-green-50 border-green-500' :
              status.status === 'delayed' ? 'bg-yellow-50 border-yellow-500' :
              'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    status.status === 'open' ? 'bg-green-100' :
                    status.status === 'delayed' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    {status.status === 'open' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                     status.status === 'delayed' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                     <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{border.replace('-', ' - ')}</p>
                    <p className="text-sm text-gray-600">Documents: {status.documents}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{status.waitTime} min</p>
                  <p className="text-sm text-gray-600">Wait time</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Shipments */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Active Shipments</h3>
        <div className="space-y-4">
          {realTimeData.shipments.map((shipment) => (
            <div key={shipment.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{shipment.id}</p>
                    <p className="text-sm text-gray-600">{shipment.origin} → {shipment.destination}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  shipment.status === 'delivered' ? 'bg-green-100 text-green-600' :
                  shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {shipment.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-gray-800">{shipment.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${shipment.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ETA</span>
                  <span className="text-sm font-semibold text-gray-800">{shipment.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Data */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Cost Analysis (₦/km)</h3>
        <div className="space-y-4">
          {Object.entries(realTimeData.marketData).map(([item, data]) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  data.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 capitalize">{item}</p>
                  <p className="text-sm text-gray-600">Per kilometer</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">₦{data.price}</p>
                <p className={`text-sm font-semibold ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.trend === 'up' ? '+' : ''}{data.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          {realTimeData.recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              rec.priority === 'high' ? 'bg-red-50 border-red-500' :
              rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-red-100' :
                  rec.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {rec.priority === 'high' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                   rec.priority === 'medium' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                   <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 capitalize">{rec.type} Optimization</p>
                  <p className="text-sm text-gray-600">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Route className="w-5 h-5" />
              <span className="font-semibold">Route Optimizer</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5" />
              <span className="font-semibold">Cost Analysis</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Documentation</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">AI Advisor</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}