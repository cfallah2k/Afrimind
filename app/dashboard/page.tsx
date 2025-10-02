'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  Leaf, 
  Truck, 
  Users, 
  MessageCircle, 
  Mic, 
  Settings, 
  LogOut,
  Globe,
  TrendingUp,
  AlertCircle,
  Phone,
  Brain,
  Zap,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Smartphone,
  Wifi,
  Volume2,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  MapPin,
  DollarSign,
  Cloud,
  Sun,
  Droplets
} from 'lucide-react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import AgricultureTab from '@/components/tabs/AgricultureTab'
import LogisticsTab from '@/components/tabs/LogisticsTab'
import CultureTab from '@/components/tabs/CultureTab'
import ChatTab from '@/components/tabs/ChatTab'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeSessions: 0,
    aiQueries: 0,
    systemHealth: 0,
    weatherData: {
      temperature: 0,
      humidity: 0,
      condition: 'sunny'
    },
    marketData: {
      maize: 0,
      rice: 0,
      beans: 0
    }
  })
  const { user, logout } = useAuth()
  const router = useRouter()

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        activeSessions: Math.floor(Math.random() * 1000) + 500,
        aiQueries: prev.aiQueries + Math.floor(Math.random() * 10),
        systemHealth: Math.floor(Math.random() * 10) + 90,
        weatherData: {
          temperature: Math.floor(Math.random() * 10) + 25,
          humidity: Math.floor(Math.random() * 20) + 60,
          condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
        },
        marketData: {
          maize: Math.floor(Math.random() * 50) + 200,
          rice: Math.floor(Math.random() * 50) + 300,
          beans: Math.floor(Math.random() * 50) + 150
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/onboarding')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab dashboardData={dashboardData} />
      case 'agriculture':
        return <AgricultureTab />
      case 'logistics':
        return <LogisticsTab />
      case 'culture':
        return <CultureTab />
      case 'chat':
        return <ChatTab />
      default:
        return <HomeTab dashboardData={dashboardData} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-purple-600/3 to-blue-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/3 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Header user={user} onLogout={handleLogout} />
        
        <div className="mobile-container">
          <main className="pb-20">
            {renderTabContent()}
          </main>
          
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
      </div>
    </div>
  )
}

function HomeTab({ dashboardData }: { dashboardData: any }) {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-blue-100">Ready to unlock Africa's potential with AI intelligence</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-blue-100">System Health</p>
                <p className="text-2xl font-bold">{dashboardData.systemHealth}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-blue-100">Active Users</p>
                <p className="text-2xl font-bold">{dashboardData.activeSessions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-semibold">+12% this month</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{dashboardData.aiQueries.toLocaleString()}</p>
              <p className="text-sm text-gray-600">AI Queries</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-600 font-semibold">+8% this week</span>
          </div>
        </div>
      </div>

      {/* Weather & Market Data */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{dashboardData.weatherData.temperature}°C</p>
              <p className="text-sm text-gray-600">Temperature</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600 font-semibold">{dashboardData.weatherData.humidity}% humidity</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">₦{dashboardData.marketData.maize}</p>
              <p className="text-sm text-gray-600">Maize Price</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-semibold">+5% today</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5" />
              <span className="font-semibold">Voice Chat</span>
            </div>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5" />
              <span className="font-semibold">Offline Mode</span>
            </div>
          </button>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Analytics</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Reports</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
              <LineChart className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Trends</p>
          </div>
        </div>
      </div>

      {/* Multi-Channel Access */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Access Methods</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Phone className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">USSD</span>
            <span className="text-xs opacity-80">*123#</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <MessageCircle className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">SMS</span>
            <span className="text-xs opacity-80">Text us</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <Mic className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">Voice</span>
            <span className="text-xs opacity-80">Speak to AI</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
            <Globe className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">Web</span>
            <span className="text-xs opacity-80">Full features</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <TrendingUp className="w-6 h-6 text-green-600 mr-4" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Maize prices up 15%</p>
              <p className="text-sm text-gray-600">Market analysis updated 2 hours ago</p>
            </div>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
            <AlertCircle className="w-6 h-6 text-orange-600 mr-4" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Weather alert</p>
              <p className="text-sm text-gray-600">Heavy rain expected tomorrow</p>
            </div>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <MapPin className="w-6 h-6 text-blue-600 mr-4" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Border status update</p>
              <p className="text-sm text-gray-600">Lagos-Accra route cleared</p>
            </div>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}