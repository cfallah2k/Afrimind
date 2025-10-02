'use client'

import { useState } from 'react'
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
  Phone
} from 'lucide-react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import AgricultureTab from '@/components/tabs/AgricultureTab'
import LogisticsTab from '@/components/tabs/LogisticsTab'
import CultureTab from '@/components/tabs/CultureTab'
import ChatTab from '@/components/tabs/ChatTab'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/onboarding')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />
      case 'agriculture':
        return <AgricultureTab />
      case 'logistics':
        return <LogisticsTab />
      case 'culture':
        return <CultureTab />
      case 'chat':
        return <ChatTab />
      default:
        return <HomeTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="mobile-content">
        {renderTabContent()}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

function HomeTab() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card-elevated">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-africa rounded-xl flex items-center justify-center mr-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-sm text-gray-600">
              Your African context intelligence hub
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-earth-100 rounded-lg flex items-center justify-center mr-3">
              <Leaf className="w-5 h-5 text-earth-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Agriculture</p>
              <p className="text-lg font-bold text-gray-800">Active</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-africa-100 rounded-lg flex items-center justify-center mr-3">
              <Truck className="w-5 h-5 text-africa-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Logistics</p>
              <p className="text-lg font-bold text-gray-800">Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center p-3 bg-earth-50 rounded-xl hover:bg-earth-100 transition-colors">
            <Leaf className="w-5 h-5 text-earth-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Check Weather</p>
              <p className="text-sm text-gray-600">Get current weather and forecasts</p>
            </div>
          </button>

          <button className="w-full flex items-center p-3 bg-africa-50 rounded-xl hover:bg-africa-100 transition-colors">
            <Truck className="w-5 h-5 text-africa-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Border Status</p>
              <p className="text-sm text-gray-600">Check cross-border conditions</p>
            </div>
          </button>

          <button className="w-full flex items-center p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <Users className="w-5 h-5 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-800">Cultural Guide</p>
              <p className="text-sm text-gray-600">Learn local customs and practices</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-800">Maize prices up 15%</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
            <div>
              <p className="font-medium text-gray-800">Weather alert</p>
              <p className="text-sm text-gray-600">Heavy rain expected tomorrow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Channel Access */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Access Methods</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center p-4 bg-africa-50 rounded-xl hover:bg-africa-100 transition-colors">
            <Phone className="w-6 h-6 text-africa-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">USSD</span>
            <span className="text-xs text-gray-600">*123#</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-earth-50 rounded-xl hover:bg-earth-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-earth-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">SMS</span>
            <span className="text-xs text-gray-600">Text us</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <Mic className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Voice</span>
            <span className="text-xs text-gray-600">Speak to AI</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <Globe className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Web</span>
            <span className="text-xs text-gray-600">Full features</span>
          </button>
        </div>
      </div>
    </div>
  )
}
