'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
  SparklesIcon,
  GlobeAltIcon,
  LanguageIcon,
  DocumentTextIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'agricultural' | 'trade' | 'cultural' | 'finance' | 'general'
}

const aiServices = [
  { id: 'agricultural', name: 'Agricultural AI', icon: GlobeAltIcon, color: 'green' },
  { id: 'trade', name: 'Trade Intelligence', icon: DocumentTextIcon, color: 'blue' },
  { id: 'cultural', name: 'Cultural Translator', icon: LanguageIcon, color: 'purple' },
  { id: 'finance', name: 'Financial Advisor', icon: CurrencyDollarIcon, color: 'yellow' }
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for African digital sovereignty. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'general'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedService, setSelectedService] = useState<string>('general')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: selectedService as any
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage, selectedService),
        sender: 'ai',
        timestamp: new Date(),
        type: selectedService as any
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message: string, service: string): string => {
    const responses = {
      agricultural: [
        "Based on your location and current season, I recommend planting maize or cassava. The soil conditions in your area are optimal for these crops.",
        "I can help you identify that pest. Could you describe the symptoms you're seeing on your crops?",
        "The current market prices for your region show maize at $200/ton and cassava at $150/ton. This is a good time to sell."
      ],
      trade: [
        "For cross-border trade between your countries, you'll need a valid passport, trade license, and customs declaration forms.",
        "The current border conditions show normal operations with a 2-hour average wait time.",
        "I recommend using the northern route as it has better infrastructure and shorter travel time."
      ],
      cultural: [
        "In that region, it's customary to greet elders first and use both hands when giving or receiving items.",
        "The local language greeting would be 'Salam aleikum' in that area. Here are some basic phrases you should know.",
        "This cultural practice dates back to the 15th century and is still important in modern business dealings."
      ],
      finance: [
        "For your financial goals, I recommend starting with a savings account and gradually building an emergency fund.",
        "The current interest rates for business loans in your country are around 12-15% annually.",
        "Mobile money services like M-Pesa offer convenient and secure transactions for small businesses."
      ],
      general: [
        "I understand you're looking for information about African digital sovereignty. Let me help you with that.",
        "That's an interesting question about African development. Here's what I can tell you based on current data.",
        "I can help you with various aspects of African digital sovereignty. What specific area interests you most?"
      ]
    }

    const serviceResponses = responses[service as keyof typeof responses] || responses.general
    return serviceResponses[Math.floor(Math.random() * serviceResponses.length)]
  }

  const getServiceIcon = (type: string) => {
    const service = aiServices.find(s => s.id === type)
    return service ? service.icon : CpuChipIcon
  }

  const getServiceColor = (type: string) => {
    const service = aiServices.find(s => s.id === type)
    return service ? service.color : 'blue'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
                <p className="text-sm text-gray-500">African Digital Sovereignty</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {aiServices.map((service) => {
                const Icon = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedService === service.id
                        ? `bg-${service.color}-100 text-${service.color}-600`
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={service.name}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const Icon = getServiceIcon(message.type)
            const color = getServiceColor(message.type)
            
            return (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500' 
                      : `bg-${color}-100`
                  }`}>
                    {message.sender === 'user' ? (
                      <UserIcon className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 text-${color}-600`} />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about African digital sovereignty..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
