'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Mic, 
  MicOff, 
  Phone, 
  MessageCircle, 
  Bot,
  User,
  Volume2,
  VolumeX,
  Settings,
  Brain,
  Zap,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Globe,
  Smartphone,
  Wifi,
  Eye,
  Target,
  Award,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Flag,
  Languages,
  Handshake,
  Lightbulb,
  Sparkles,
  Zap as ZapIcon,
  Heart,
  BookOpen
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  type?: 'text' | 'voice' | 'image'
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm AfriMind, your African context AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const responses = [
      "Based on African market data, I can help you with that. Let me analyze the current trends...",
      "I understand you're looking for information about African business practices. Here's what I found...",
      "Great question! Let me provide you with context-aware insights for your region...",
      "I can help you with that. Let me check the latest data from our African intelligence network...",
      "Excellent! I have real-time information that can assist you with this African context..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceRecord = () => {
    if (isListening) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
    } else {
      // Start recording
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'

        recognition.onstart = () => {
          setIsListening(true)
        }

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          handleSendMessage(transcript)
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
        recognition.start()
      }
    }
  }

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      if (synthesisRef.current) {
        synthesisRef.current.cancel()
      }
      setIsSpeaking(false)
    } else {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 0.8

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        synthesisRef.current = utterance
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const quickActions = [
    { icon: Globe, label: 'Weather', color: 'blue', action: 'What\'s the weather like?' },
    { icon: TrendingUp, label: 'Market', color: 'green', action: 'Show me market prices' },
    { icon: MapPin, label: 'Logistics', color: 'purple', action: 'Check border status' },
    { icon: Languages, label: 'Culture', color: 'orange', action: 'Tell me about local customs' }
  ]

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Chat Intelligence</h1>
            <p className="text-cyan-100 text-sm md:text-base">Context-aware conversations powered by AI</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">{messages.length}</p>
            <p className="text-xs md:text-sm text-cyan-100">Messages</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">99.8%</p>
            <p className="text-xs md:text-sm text-cyan-100">Accuracy</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-bold">20+</p>
            <p className="text-xs md:text-sm text-cyan-100">Languages</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="h-96 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' && (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask me anything about Africa..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleVoiceRecord}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <button
                key={index}
                onClick={() => handleSendMessage(action.action)}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 text-white`}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-semibold">{action.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Voice Features */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Voice Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSpeak(messages[messages.length - 1]?.text || 'Hello')}
            className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isSpeaking 
                ? 'bg-red-500 text-white' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="font-semibold">{isSpeaking ? 'Stop' : 'Speak'}</span>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Voice Call</span>
            </div>
          </button>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI Capabilities</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Context Aware</p>
            <p className="text-xs text-gray-600">Understands African context</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Multi-language</p>
            <p className="text-xs text-gray-600">20+ African languages</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Real-time</p>
            <p className="text-xs text-gray-600">Live data processing</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Secure</p>
            <p className="text-xs text-gray-600">Enterprise security</p>
          </div>
        </div>
      </div>
    </div>
  )
}