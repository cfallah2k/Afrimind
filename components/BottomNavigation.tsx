'use client'

import { Home, Leaf, Truck, Users, MessageCircle } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'agriculture', label: 'Farm', icon: Leaf },
    { id: 'logistics', label: 'Trade', icon: Truck },
    { id: 'culture', label: 'Culture', icon: Users },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  ]

  return (
    <nav className="mobile-bottom-nav safe-area-bottom">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${
                isActive ? 'bg-africa-100' : 'bg-gray-100'
              }`}>
                <IconComponent className={`w-4 h-4 ${
                  isActive ? 'text-africa-600' : 'text-gray-500'
                }`} />
              </div>
              <span className={`text-xs font-medium ${
                isActive ? 'text-africa-600' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
