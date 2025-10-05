'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SunIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface MobileSplashProps {
  onComplete: () => void
}

export function MobileSplash({ onComplete }: MobileSplashProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: SunIcon,
      title: 'Welcome to AfriMind',
      subtitle: 'Your African Digital Sovereignty Platform',
      color: 'green'
    },
    {
      icon: GlobeAltIcon,
      title: 'Smart Agriculture',
      subtitle: 'AI-powered farming solutions for African farmers',
      color: 'blue'
    },
    {
      icon: HeartIcon,
      title: 'Community First',
      subtitle: 'Built by Africans, for Africans',
      color: 'red'
    },
    {
      icon: SparklesIcon,
      title: 'Ready to Grow',
      subtitle: 'Let\'s start your journey together',
      color: 'purple'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(onComplete, 1000)
          return prev
        }
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [onComplete, steps.length])

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center px-8">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <span className="text-2xl">🌍</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AfriMind</h1>
            <p className="text-white/80">African Digital Sovereignty</p>
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className={`w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-white/80 text-sm">
              {currentStepData.subtitle}
            </p>
          </motion.div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
                animate={{ scale: index === currentStep ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {/* Loading Animation */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
