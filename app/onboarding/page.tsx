'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Leaf, 
  Truck, 
  Users, 
  Smartphone,
  Shield,
  Zap,
  Brain,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Users2,
  Globe2,
  Smartphone2,
  Phone,
  MessageSquare,
  Wifi,
  Volume2
} from 'lucide-react'

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const slides = [
    {
      icon: Brain,
      title: "AfriMind Intelligence Platform",
      subtitle: "Africa's Premier AI Context Engine",
      description: "Revolutionary Model Context Protocol implementation empowering African digital sovereignty through intelligent AI systems that understand local context, culture, and business practices.",
      features: [
        "Model Context Protocol (MCP) Implementation",
        "Real-time African Context Intelligence", 
        "Multi-language AI Processing",
        "Enterprise-grade Security & Privacy"
      ],
      stats: { users: "10M+", countries: "54", languages: "20+", accuracy: "99.8%" }
    },
    {
      icon: Leaf,
      title: "Agricultural Intelligence Suite",
      subtitle: "Smart Farming Revolution",
      description: "Advanced agricultural AI providing real-time weather analysis, market predictions, crop optimization, and yield forecasting specifically designed for African farming conditions and market dynamics.",
      features: [
        "Weather Pattern Analysis & Predictions",
        "Market Price Intelligence & Forecasting",
        "Crop Optimization & Yield Prediction",
        "Soil Analysis & Fertilizer Recommendations"
      ],
      stats: { farmers: "2M+", yield: "+40%", savings: "$500M", regions: "15" }
    },
    {
      icon: Truck,
      title: "Trade & Logistics Intelligence",
      subtitle: "Cross-Border Excellence",
      description: "Comprehensive logistics platform optimizing trade routes, border crossings, documentation requirements, and supply chain management across African markets with real-time customs and regulatory intelligence.",
      features: [
        "Route Optimization & Traffic Intelligence",
        "Border Crossing & Customs Automation",
        "Documentation & Compliance Management",
        "Real-time Supply Chain Tracking"
      ],
      stats: { routes: "500+", efficiency: "+60%", time: "-50%", cost: "-30%" }
    },
    {
      icon: Users,
      title: "Cultural Context AI",
      subtitle: "Context-Aware Intelligence",
      description: "Deep cultural understanding enabling AI systems to communicate effectively across diverse African languages, customs, business practices, and social contexts with unprecedented accuracy and cultural sensitivity.",
      features: [
        "20+ African Language Processing",
        "Cultural Context & Business Etiquette",
        "Local Knowledge & Custom Integration",
        "Cross-cultural Communication AI"
      ],
      stats: { languages: "20+", cultures: "100+", accuracy: "98%", adoption: "95%" }
    },
    {
      icon: Smartphone,
      title: "Omnichannel Access Platform",
      subtitle: "Universal Connectivity Technology",
      description: "Revolutionary multi-channel access ensuring every African can benefit from AI intelligence regardless of device, connectivity, or technical literacy through web, USSD, SMS, and voice interfaces.",
      features: [
        "Progressive Web App (PWA)",
        "USSD Integration for Basic Phones",
        "SMS-based AI Interactions",
        "Voice AI & Speech Recognition"
      ],
      stats: { channels: "4", coverage: "100%", offline: "Yes", devices: "Any" }
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // Start phone verification
      router.push('/auth')
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const currentSlideData = slides[currentSlide]
  const IconComponent = currentSlideData.icon

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

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-3 mb-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= currentSlide 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-125' 
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className={`w-40 h-40 rounded-3xl mx-auto mb-12 flex items-center justify-center shadow-2xl transform transition-all duration-700 ${
          currentSlideData.color === 'blue' ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700' :
          currentSlideData.color === 'green' ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-green-700' :
          currentSlideData.color === 'purple' ? 'bg-gradient-to-br from-purple-500 via-pink-600 to-purple-700' :
          currentSlideData.color === 'pink' ? 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700' :
          'bg-gradient-to-br from-orange-500 via-red-600 to-orange-700'
        }`}>
          <IconComponent className="w-20 h-20 text-white" />
        </div>

        <div className="mb-8">
          <h1 className="text-5xl font-black text-white mb-4 leading-tight">
            {currentSlideData.title}
          </h1>
          <h2 className="text-2xl text-white/80 mb-6 font-light">
            {currentSlideData.subtitle}
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-3xl font-light">
            {currentSlideData.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-4xl">
          {currentSlideData.features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">{feature}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-16 w-full max-w-4xl">
          {Object.entries(currentSlideData.stats).map(([key, value], index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="text-3xl font-bold text-white mb-2">{value}</div>
              <div className="text-sm text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="w-full max-w-2xl flex space-x-4">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 bg-white/10 backdrop-blur-lg text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
            style={{
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5), 0 16px 64px rgba(147, 51, 234, 0.3)'
            }}
          >
            {currentSlide === slides.length - 1 ? '🚀 Get Started' : 'Continue'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
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
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Scalable Architecture</span>
          </div>
        </div>
      </div>
    </div>
  )
}