'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  SparklesIcon,
  GlobeAltIcon,
  LanguageIcon,
  UserGroupIcon,
  LightBulbIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function AIPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const aiServices = [
    {
      id: 'agricultural-ai',
      title: 'Agricultural AI Assistant',
      description: 'Get AI-powered insights for farming, crop recommendations, and agricultural planning',
      icon: GlobeAltIcon,
      features: [
        'Smart crop recommendations based on soil and weather',
        'Pest and disease identification',
        'Market price predictions',
        'Farming best practices'
      ],
      color: 'green'
    },
    {
      id: 'trade-ai',
      title: 'Trade Intelligence AI',
      description: 'AI-powered trade analysis, border conditions, and market insights',
      icon: DocumentTextIcon,
      features: [
        'Real-time border condition analysis',
        'Trade route optimization',
        'Customs regulation guidance',
        'Market opportunity identification'
      ],
      color: 'blue'
    },
    {
      id: 'cultural-ai',
      title: 'Cultural AI Translator',
      description: 'AI-powered language translation and cultural context understanding',
      icon: LanguageIcon,
      features: [
        'Multi-language translation',
        'Cultural context explanation',
        'Local business etiquette',
        'Historical context insights'
      ],
      color: 'purple'
    },
    {
      id: 'finance-ai',
      title: 'Financial AI Advisor',
      description: 'AI-powered financial planning, banking, and investment guidance',
      icon: CpuChipIcon,
      features: [
        'Personalized financial planning',
        'Investment opportunity analysis',
        'Credit score optimization',
        'Mobile money guidance'
      ],
      color: 'yellow'
    }
  ]

  const aiFeatures = [
    {
      title: 'Natural Language Processing',
      description: 'Communicate with AI in your preferred language',
      icon: ChatBubbleLeftRightIcon
    },
    {
      title: 'Context-Aware Responses',
      description: 'AI understands your location, culture, and specific needs',
      icon: LightBulbIcon
    },
    {
      title: 'Multi-Modal Intelligence',
      description: 'Process text, images, and data for comprehensive insights',
      icon: SparklesIcon
    },
    {
      title: 'Community Learning',
      description: 'AI learns from community interactions and feedback',
      icon: UserGroupIcon
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered African
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {' '}Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Harness the power of artificial intelligence tailored for African contexts. 
              Get personalized insights for agriculture, trade, culture, and finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start AI Chat
              </button>
              <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialized AI Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of AI-powered services designed specifically for African contexts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                  selectedService === service.id 
                    ? 'border-green-500 shadow-green-100' 
                    : 'border-gray-100'
                }`}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className={`w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center mb-4`}>
                  <service.icon className={`w-6 h-6 text-${service.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                {selectedService === service.id && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced AI Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI is designed to understand and serve African communities with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience AI-Powered Intelligence?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users across Africa who are already using AI to transform their businesses and communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg">
                Start Your AI Journey
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
