'use client'

import { useState, useEffect } from 'react'
import { 
  Globe, 
  Leaf, 
  Truck, 
  Users, 
  Smartphone, 
  Wifi, 
  Volume2, 
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Brain,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  const slides = [
    {
      icon: Brain,
      title: "AfriMind Intelligence",
      subtitle: "Africa's Premier AI Platform",
      description: "Revolutionary Model Context Protocol implementation empowering African digital sovereignty through intelligent AI systems",
      color: "blue",
      features: ["MCP Protocol", "AI Integration", "Real-time Data", "Multi-language"],
      stats: { users: "10M+", countries: "54", languages: "20+", accuracy: "99.8%" }
    },
    {
      icon: Leaf,
      title: "Agricultural Revolution",
      subtitle: "Smart Farming Intelligence",
      description: "Advanced agricultural AI providing real-time weather analysis, market predictions, and crop optimization for African farmers",
      color: "green",
      features: ["Weather AI", "Market Analysis", "Crop Optimization", "Yield Prediction"],
      stats: { farmers: "2M+", yield: "+40%", savings: "$500M", regions: "15" }
    },
    {
      icon: Truck,
      title: "Trade Intelligence",
      subtitle: "Cross-Border Excellence",
      description: "Comprehensive logistics platform optimizing trade routes, border crossings, and supply chain management across Africa",
      color: "purple",
      features: ["Route Optimization", "Border Intelligence", "Documentation", "Real-time Tracking"],
      stats: { routes: "500+", efficiency: "+60%", time: "-50%", cost: "-30%" }
    },
    {
      icon: Users,
      title: "Cultural AI",
      subtitle: "Context-Aware Intelligence",
      description: "Deep cultural understanding enabling AI systems to communicate effectively across diverse African languages and customs",
      color: "pink",
      features: ["Language AI", "Cultural Context", "Business Etiquette", "Local Knowledge"],
      stats: { languages: "20+", cultures: "100+", accuracy: "98%", adoption: "95%" }
    },
    {
      icon: Smartphone,
      title: "Omnichannel Platform",
      subtitle: "Universal Access Technology",
      description: "Revolutionary multi-channel access ensuring every African can benefit from AI intelligence regardless of device or connectivity",
      color: "orange",
      features: ["Web App", "USSD", "SMS", "Voice AI"],
      stats: { channels: "4", coverage: "100%", offline: "Yes", devices: "Any" }
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      window.location.href = '/onboarding'
    }
  }

  const currentSlideData = slides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Enterprise Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-purple-900/20 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 pt-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AfriMind</h1>
              <p className="text-sm text-white/70">Enterprise AI Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/70">Live</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-4 mb-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
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
        <div className={`w-48 h-48 rounded-3xl mx-auto mb-12 flex items-center justify-center shadow-2xl transform transition-all duration-700 ${
          isAnimating ? 'scale-110 rotate-12' : ''
        } ${
          currentSlideData.color === 'blue' ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700' :
          currentSlideData.color === 'green' ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-green-700' :
          currentSlideData.color === 'purple' ? 'bg-gradient-to-br from-purple-500 via-pink-600 to-purple-700' :
          currentSlideData.color === 'pink' ? 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700' :
          'bg-gradient-to-br from-orange-500 via-red-600 to-orange-700'
        }`}>
          <IconComponent className="w-24 h-24 text-white" />
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-black text-white mb-4 leading-tight">
            {currentSlideData.title}
          </h1>
          <h2 className="text-2xl text-white/80 mb-6 font-light">
            {currentSlideData.subtitle}
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl font-light">
            {currentSlideData.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-2xl">
          {currentSlideData.features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">{feature}</span>
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

        {/* Premium Navigation */}
        <div className="w-full max-w-lg">
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center text-xl tracking-wide"
            style={{
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5), 0 16px 64px rgba(147, 51, 234, 0.3)'
            }}
          >
            {currentSlide === slides.length - 1 ? '🚀 Launch AfriMind' : 'Continue Journey'}
            <ArrowRight className="w-6 h-6 ml-3" />
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