'use client'

import { Home, Leaf, Truck, Users, MessageCircle, Brain, Zap, Activity, CheckCircle } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      gradient: 'from-blue-500 to-purple-600',
      description: 'Dashboard'
    },
    { 
      id: 'agriculture', 
      label: 'Farm', 
      icon: Leaf,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Farming'
    },
    { 
      id: 'logistics', 
      label: 'Trade', 
      icon: Truck,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Logistics'
    },
    { 
      id: 'culture', 
      label: 'Culture', 
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      description: 'Context'
    },
    { 
      id: 'chat', 
      label: 'AI Chat', 
      icon: MessageCircle,
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Intelligence'
    }
  ]

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur-lg border-t border-white/20 px-4 py-3 shadow-2xl z-40">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 transform ${
                isActive 
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg scale-105` 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 ${
                isActive ? 'bg-white/20' : 'hover:bg-gray-100'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{tab.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Status Indicator */}
      <div className="flex items-center justify-center mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center space-x-1">
            <Brain className="w-3 h-3" />
            <span>AI Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Real-time</span>
          </div>
        </div>
      </div>
    </div>
  )
}