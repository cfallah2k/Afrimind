'use client'

import { useState } from 'react'
import { Globe, Leaf, Truck, Users, Smartphone, Wifi, Volume2, ChevronRight } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: Globe,
      title: "Welcome to AfriMind",
      description: "Africa's AI Mind - Your intelligent African context platform",
      color: "africa"
    },
    {
      icon: Leaf,
      title: "Agricultural Intelligence",
      description: "Get smart farming advice, weather updates, and market prices",
      color: "earth"
    },
    {
      icon: Truck,
      title: "Trade & Logistics",
      description: "Navigate cross-border trade with ease and confidence",
      color: "africa"
    },
    {
      icon: Users,
      title: "Cultural Context",
      description: "Understand local customs, languages, and business practices",
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Multi-Channel Access",
      description: "Use via web, SMS, USSD, or voice chat",
      color: "earth"
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // Start the app
      window.location.href = '/onboarding'
    }
  }

  const currentSlideData = slides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-50 to-earth-50">
      {/* Progress Indicator */}
      <div className="pt-8 px-6">
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentSlide ? 'bg-africa-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className={`w-32 h-32 bg-${currentSlideData.color}-100 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg`}>
          <IconComponent className={`w-16 h-16 text-${currentSlideData.color}-600`} />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {currentSlideData.title}
        </h1>

        <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-md">
          {currentSlideData.description}
        </p>

        {/* Features for last slide */}
        {currentSlide === slides.length - 1 && (
          <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Wifi className="w-6 h-6 text-africa-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">Offline Mode</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Volume2 className="w-6 h-6 text-earth-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">Voice Chat</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Smartphone className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">USSD Access</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Globe className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-800">SMS Support</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="w-full max-w-sm">
          <button
            onClick={handleNext}
            className="w-full btn-primary flex items-center justify-center text-lg py-4"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}