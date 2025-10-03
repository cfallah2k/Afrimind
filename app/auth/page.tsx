'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Phone, 
  MessageSquare, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Brain,
  Zap,
  Globe,
  Smartphone,
  Wifi,
  Volume2
} from 'lucide-react'

export default function Auth() {
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP, 3: Success
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setStep(2)
    setCountdown(60)
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setStep(3)
    
    // Redirect to dashboard after success
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }

  const resendOTP = () => {
    setCountdown(60)
    // Start countdown again
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/5 to-blue-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 pt-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AfriMind</h1>
              <p className="text-xs text-white/70">Enterprise AI Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/70">Live</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md">
          {/* Step 1: Phone Number */}
          {step === 1 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
                <Phone className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl font-black text-white mb-4">
                Enter Your Phone Number
              </h1>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                We'll send you a verification code to get started with AfriMind
              </p>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-white/50 border border-white/20 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !phoneNumber}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
                  style={{
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5), 0 16px 64px rgba(147, 51, 234, 0.3)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Sending Code...
                    </>
                  ) : (
                    <>
                      Send Verification Code
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </>
                  )}
                </button>
              </form>

              {/* Features */}
              <div className="mt-16 grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
                  <Wifi className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-sm font-semibold text-white">Offline Mode</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
                  <Volume2 className="w-8 h-8 text-green-400 mb-3" />
                  <p className="text-sm font-semibold text-white">Voice AI</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
                  <Smartphone className="w-8 h-8 text-purple-400 mb-3" />
                  <p className="text-sm font-semibold text-white">USSD Access</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
                  <MessageSquare className="w-8 h-8 text-orange-400 mb-3" />
                  <p className="text-sm font-semibold text-white">SMS Support</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
                <MessageSquare className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl font-black text-white mb-4">
                Enter Verification Code
              </h1>
              <p className="text-xl text-white/70 mb-4">
                We sent a 6-digit code to <span className="text-white font-semibold">{phoneNumber}</span>
              </p>
              <p className="text-lg text-white/50 mb-12">
                Enter the code below to continue
              </p>

              <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-white/50 border border-white/20 rounded-2xl px-6 py-4 text-2xl text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-500 hover:via-emerald-500 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
                  style={{
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.5), 0 16px 64px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8">
                {countdown > 0 ? (
                  <p className="text-white/50">
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <button
                    onClick={resendOTP}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-8 text-white/50 hover:text-white/70 flex items-center justify-center mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Phone Number
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>

              <h1 className="text-4xl font-black text-white mb-4">
                Welcome to AfriMind!
              </h1>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Your account has been successfully verified. You're now ready to experience Africa's premier AI intelligence platform.
              </p>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white">AfriMind Intelligence</h3>
                    <p className="text-sm text-white/70">Enterprise AI Platform</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  Redirecting you to your personalized dashboard...
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-8 px-6">
        <div className="flex justify-center items-center space-x-8 text-white/50">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Enterprise Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Real-time Processing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Global Coverage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
