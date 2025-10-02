'use client'

import { useState } from 'react'
import { Menu, X, Settings, LogOut, User } from 'lucide-react'

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

  return (
    <header className="mobile-header">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-sm">AC</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">AfriContext</h1>
          <p className="text-white text-opacity-80 text-xs">
            {user?.region || 'African Intelligence'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl z-50">
          <div className="p-4">
            <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-africa-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-africa-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-600">{user?.phone}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-800">Settings</span>
              </button>

              <button 
                onClick={onLogout}
                className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-600">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}