'use client'

import { useState } from 'react'
import { 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  User, 
  Bell, 
  Brain, 
  Zap, 
  Shield, 
  Activity,
  ChevronDown,
  Globe,
  Smartphone,
  Wifi,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star
} from 'lucide-react'

interface HeaderProps {
  user?: {
    name?: string
    phone: string
    region?: string
  } | null
  onLogout: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "System Update Complete",
      message: "AfriMind has been updated to version 2.1.0",
      time: "2 minutes ago",
      type: "success",
      icon: CheckCircle
    },
    {
      id: 2,
      title: "Weather Alert",
      message: "Heavy rain expected in your area tomorrow",
      time: "1 hour ago",
      type: "warning",
      icon: AlertTriangle
    },
    {
      id: 3,
      title: "Market Update",
      message: "Maize prices have increased by 15%",
      time: "3 hours ago",
      type: "info",
      icon: Activity
    }
  ]

  return (
    <div className="relative z-50">
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AfriMind</h1>
              <p className="text-blue-100 text-sm">Enterprise AI Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 relative"
              >
                <Bell className="w-6 h-6 text-white" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{notifications.length}</span>
                  </div>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon
                      return (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              notification.type === 'success' ? 'bg-green-100' :
                              notification.type === 'warning' ? 'bg-orange-100' :
                              'bg-blue-100'
                            }`}>
                              <IconComponent className={`w-4 h-4 ${
                                notification.type === 'success' ? 'text-green-600' :
                                notification.type === 'warning' ? 'text-orange-600' :
                                'text-blue-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 text-sm">{notification.title}</p>
                              <p className="text-gray-600 text-xs">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
              <Settings className="w-6 h-6 text-white" />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-100">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-blue-100">Real-time Processing</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-blue-200" />
              <span className="text-xs text-blue-200">USSD</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-blue-200" />
              <span className="text-xs text-blue-200">Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-200" />
              <span className="text-xs text-blue-200">Voice</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl rounded-b-2xl z-50 border border-white/20">
          <div className="p-6">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">{user?.name || 'User'}</p>
                <p className="text-gray-600">{user?.phone}</p>
                <p className="text-sm text-blue-600 font-semibold">{user?.region || 'African Intelligence'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center p-4 text-left hover:bg-gray-50 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600 mr-4" />
                <span className="text-gray-800 font-medium">Settings</span>
              </button>

              <button className="w-full flex items-center p-4 text-left hover:bg-gray-50 rounded-xl transition-colors">
                <Shield className="w-5 h-5 text-gray-600 mr-4" />
                <span className="text-gray-800 font-medium">Security</span>
              </button>

              <button className="w-full flex items-center p-4 text-left hover:bg-gray-50 rounded-xl transition-colors">
                <Globe className="w-5 h-5 text-gray-600 mr-4" />
                <span className="text-gray-800 font-medium">Language</span>
              </button>

              <button className="w-full flex items-center p-4 text-left hover:bg-gray-50 rounded-xl transition-colors">
                <Star className="w-5 h-5 text-gray-600 mr-4" />
                <span className="text-gray-800 font-medium">Premium Features</span>
              </button>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <button 
                onClick={onLogout}
                className="w-full flex items-center p-4 text-left hover:bg-red-50 rounded-xl transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5 mr-4" />
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}