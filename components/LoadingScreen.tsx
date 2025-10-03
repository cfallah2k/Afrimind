'use client'

import { Brain, Zap, Shield, Activity, Globe, Star, CheckCircle, ArrowRight, Leaf, Truck, Users, MessageCircle } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
  showFeatures?: boolean
}

export default function LoadingScreen({ 
  message = "Loading...", 
  showFeatures = false 
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/5 to-blue-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-3xl mx-auto flex items-center justify-center shadow-2xl animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-bounce flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-4">
          {message}
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Initializing AfriMind Intelligence Platform...
        </p>

        {/* Progress Steps */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-center space-x-3 text-white/80">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm">Loading AI Models</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-white/80">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-sm">Connecting to African Data Sources</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-white/60">
            <div className="w-5 h-5 border-2 border-white/20 rounded-full"></div>
            <span className="text-sm">Initializing Real-time Processing</span>
          </div>
        </div>

        {/* Feature Icons */}
        {showFeatures && (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-white/80">Agriculture</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-white/80">Logistics</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-white/80">Culture</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <MessageCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-white/80">AI Chat</p>
            </div>
          </div>
        )}

        {/* Enterprise Features */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-white/80">Real-time AI</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-white/80">Enterprise Security</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-white/80">Multi-language</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-white/80">Live Analytics</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-2 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white/70">System Online</span>
        </div>
      </div>
    </div>
  )
}