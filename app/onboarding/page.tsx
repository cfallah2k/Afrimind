'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Globe, Leaf, Truck, Users, Smartphone, Wifi, Volume2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLoading } from '@/contexts/LoadingContext'

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const router = useRouter()
  const { login, verifyOTP } = useAuth()
  const { showLoading } = useLoading()

  const slides = [
    {
      icon: Globe,
      title: "Welcome to AfriContext",
      description: "Your intelligent African context platform",
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
      // Start authentication flow
      setShowOTP(true)
    }
  }

  const handlePhoneSubmit = async () => {
    if (phone.length < 10) return
    
    showLoading('Sending OTP...')
    await login(phone)
    setShowOTP(true)
  }

  const handleOTPSubmit = async () => {
    if (otp.length !== 4) return
    
    showLoading('Verifying OTP...')
    const isValid = await verifyOTP(otp)
    if (isValid) {
      router.push('/dashboard')
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-africa-50 to-earth-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-africa-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-africa-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Phone</h2>
            <p className="text-gray-600">Enter the 4-digit code sent to {phone}</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center space-x-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="input-otp"
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('')
                    newOtp[index] = e.target.value
                    setOtp(newOtp.join(''))
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleOTPSubmit}
              disabled={otp.length !== 4}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>

            <div className="text-center">
              <button
                onClick={() => setShowOTP(false)}
                className="text-africa-600 text-sm font-medium"
              >
                Change phone number
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
      <div className="onboarding-slide">
        <div className={`w-32 h-32 bg-${currentSlideData.color}-100 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg`}>
          <IconComponent className={`w-16 h-16 text-${currentSlideData.color}-600`} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {currentSlideData.title}
        </h1>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          {currentSlideData.description}
        </p>

        {/* Features for last slide */}
        {currentSlide === slides.length - 1 && (
          <div className="grid grid-cols-2 gap-4 mb-12 w-full">
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

        {/* Phone Input for last slide */}
        {currentSlide === slides.length - 1 && (
          <div className="w-full mb-8">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field text-center text-lg"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              We'll send you a verification code
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="w-full">
          <button
            onClick={handleNext}
            className="w-full btn-primary flex items-center justify-center"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>

          {currentSlide === slides.length - 1 && phone && (
            <button
              onClick={handlePhoneSubmit}
              className="w-full btn-secondary mt-4"
            >
              Send OTP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
