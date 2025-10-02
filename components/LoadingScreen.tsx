'use client'

import { Globe, Leaf, Truck, Users } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
  showFeatures?: boolean
}

export default function LoadingScreen({ 
  message = "Loading...", 
  showFeatures = false 
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-50 to-earth-50 flex items-center justify-center p-6">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-africa rounded-2xl mx-auto flex items-center justify-center shadow-lg animate-pulse">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-earth-500 rounded-full animate-bounce"></div>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="loading-dots flex justify-center">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {message}
        </h2>
        <p className="text-gray-600 text-sm">
          Preparing your African context intelligence...
        </p>

        {/* Feature Icons */}
        {showFeatures && (
          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-earth-100 rounded-xl flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-earth-600" />
              </div>
              <span className="text-xs text-gray-600">Agriculture</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-africa-100 rounded-xl flex items-center justify-center mb-2">
                <Truck className="w-6 h-6 text-africa-600" />
              </div>
              <span className="text-xs text-gray-600">Logistics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Culture</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-africa h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  )
}
