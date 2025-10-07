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
  CurrencyDollarIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PhotoIcon,
  VideoCameraIcon,
  ClockIcon,
  TrashIcon,
  ShareIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  HeartIcon,
  HandThumbUpIcon as ThumbUpIcon,
  HandThumbDownIcon as ThumbDownIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'agricultural' | 'trade' | 'cultural' | 'finance' | 'general'
  isLiked?: boolean
  isDisliked?: boolean
  isBookmarked?: boolean
  attachments?: {
    type: 'image' | 'voice' | 'document'
    url: string
    name: string
  }[]
  isTyping?: boolean
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
      content: 'Hello! I\'m your advanced AI assistant for African digital sovereignty. I can help with agriculture, trade, culture, and finance. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'general'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedService, setSelectedService] = useState<string>('general')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [currentVoiceNote, setCurrentVoiceNote] = useState<Message | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingDuration(0)
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current)
        }
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      
      // Add voice message to chat
      const voiceMessage: Message = {
        id: Date.now().toString(),
        content: `Voice message (${formatDuration(recordingDuration)})`,
        sender: 'user',
        timestamp: new Date(),
        type: selectedService as any,
        attachments: [{
          type: 'voice',
          url: '#',
          name: `Voice_${Date.now()}.webm`
        }]
      }
      setMessages(prev => [...prev, voiceMessage])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `Shared ${file.type.startsWith('image/') ? 'image' : 'file'}: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: selectedService as any,
        attachments: [{
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: URL.createObjectURL(file),
          name: file.name
        }]
      }
      setMessages(prev => [...prev, fileMessage])
    }
  }

  const toggleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isLiked: !msg.isLiked, isDisliked: false }
        : msg
    ))
  }

  const toggleDislike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isDisliked: !msg.isDisliked, isLiked: false }
        : msg
    ))
  }

  const toggleBookmark = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isBookmarked: !msg.isBookmarked }
        : msg
    ))
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              <Link href="/ai" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
                <p className="text-sm text-gray-500">Advanced African Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Search Messages"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex space-x-1">
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
          
          {/* Search Bar */}
          {showSearch && (
            <div className="mt-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(searchQuery ? filteredMessages : messages).map((message) => {
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
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            {attachment.type === 'image' && (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}
                            {attachment.type === 'voice' && (
                              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                                <SpeakerWaveIcon className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-600">{attachment.name}</span>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <PlayIcon className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                            )}
                            {attachment.type === 'document' && (
                              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                                <DocumentTextIcon className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-600">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      
                      {/* Message Actions */}
                      {message.sender === 'ai' && (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleLike(message.id)}
                            className={`p-1 rounded transition-colors ${
                              message.isLiked ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                            }`}
                          >
                            <ThumbUpIcon className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleDislike(message.id)}
                            className={`p-1 rounded transition-colors ${
                              message.isDisliked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                            }`}
                          >
                            <ThumbDownIcon className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleBookmark(message.id)}
                            className={`p-1 rounded transition-colors ${
                              message.isBookmarked ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'
                            }`}
                          >
                            <BookmarkIcon className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                            <ShareIcon className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
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

        {/* Enhanced Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* Service Selection */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700">AI Service:</span>
              <div className="flex space-x-1">
                {aiServices.map((service) => {
                  const Icon = service.icon
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedService === service.id
                          ? `bg-${service.color}-100 text-${service.color}-700 border border-${service.color}-200`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{service.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Attachment Options */}
          {showAttachments && (
            <motion.div 
              className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Add Attachments</h3>
                <button
                  onClick={() => setShowAttachments(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center space-y-2 p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PhotoIcon className="w-6 h-6 text-blue-600" />
                  <span className="text-xs text-gray-700">Image</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center space-y-2 p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <DocumentTextIcon className="w-6 h-6 text-green-600" />
                  <span className="text-xs text-gray-700">Document</span>
                </button>
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className="flex flex-col items-center space-y-2 p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <MicrophoneIcon className="w-6 h-6 text-purple-600" />
                  <span className="text-xs text-gray-700">Voice</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>
          )}
          
          {/* Main Input Area */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-end space-x-3">
              <button
                onClick={() => setShowAttachments(!showAttachments)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                title="Add Attachments"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={`Ask me anything about ${selectedService === 'general' ? 'African digital sovereignty' : aiServices.find(s => s.id === selectedService)?.name}...`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none min-h-[44px] max-h-32"
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '44px',
                    maxHeight: '128px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px'
                  }}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {inputMessage.length}/1000
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Voice Message'}
                >
                  {isRecording ? (
                    <StopIcon className="w-5 h-5" />
                  ) : (
                    <MicrophoneIcon className="w-5 h-5" />
                  )}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Send Message"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {selectedService === 'general' ? 'General AI' : aiServices.find(s => s.id === selectedService)?.name}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  selectedService === 'general' ? 'bg-gray-400' : 
                  selectedService === 'agricultural' ? 'bg-green-500' :
                  selectedService === 'trade' ? 'bg-blue-500' :
                  selectedService === 'cultural' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
              </div>
            </div>
          </div>
          
          {/* Recording Indicator */}
          {isRecording && (
            <motion.div 
              className="mt-3 flex items-center justify-center space-x-2 text-red-600 bg-red-50 rounded-lg p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording... {formatDuration(recordingDuration)}</span>
              <button
                onClick={stopRecording}
                className="ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors"
              >
                Stop
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
