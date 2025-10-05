'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  SparklesIcon,
  GlobeAltIcon,
  LanguageIcon,
  UserGroupIcon,
  LightBulbIcon,
  DocumentTextIcon,
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
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

interface ChatSession {
  id: string
  title: string
  type: 'agricultural' | 'trade' | 'cultural' | 'finance' | 'general'
  lastMessage: string
  timestamp: Date
  messageCount: number
  isPinned: boolean
}

interface VoiceNote {
  id: string
  title: string
  duration: number
  timestamp: Date
  transcription: string
  isPlaying: boolean
}

export default function AIPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [showVoiceNotes, setShowVoiceNotes] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [currentVoiceNote, setCurrentVoiceNote] = useState<VoiceNote | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Mock chat history data
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Crop Planning for Maize',
      type: 'agricultural',
      lastMessage: 'Based on your soil analysis, I recommend planting maize in March...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 15,
      isPinned: true
    },
    {
      id: '2',
      title: 'Cross-Border Trade Routes',
      type: 'trade',
      lastMessage: 'The northern route has better infrastructure and shorter travel time...',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      messageCount: 8,
      isPinned: false
    },
    {
      id: '3',
      title: 'Language Translation Help',
      type: 'cultural',
      lastMessage: 'The greeting "Salam aleikum" is commonly used in that region...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 12,
      isPinned: false
    },
    {
      id: '4',
      title: 'Mobile Money Services',
      type: 'finance',
      lastMessage: 'Orange Money offers the best rates for your transaction volume...',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      messageCount: 6,
      isPinned: true
    }
  ])

  // Mock voice notes data
  const [voiceNotes] = useState<VoiceNote[]>([
    {
      id: '1',
      title: 'Farming Tips Recording',
      duration: 120,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      transcription: 'Today I learned about proper irrigation techniques for maize crops...',
      isPlaying: false
    },
    {
      id: '2',
      title: 'Market Price Discussion',
      duration: 180,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      transcription: 'The current market prices for cassava are showing an upward trend...',
      isPlaying: false
    }
  ])

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
      color: 'green',
      capabilities: ['Voice Chat', 'Image Analysis', 'Weather Integration', 'Market Data']
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
      color: 'blue',
      capabilities: ['Real-time Data', 'Route Planning', 'Document Assistance', 'Risk Assessment']
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
      color: 'purple',
      capabilities: ['Live Translation', 'Cultural Context', 'Voice Recognition', 'Cultural Etiquette']
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
      color: 'yellow',
      capabilities: ['Financial Planning', 'Investment Analysis', 'Credit Optimization', 'Mobile Money']
    }
  ]

  const aiFeatures = [
    {
      title: 'Voice Chat Integration',
      description: 'Speak naturally with AI in your language',
      icon: MicrophoneIcon,
      color: 'blue'
    },
    {
      title: 'Chat History & Memory',
      description: 'AI remembers your conversations and context',
      icon: ClockIcon,
      color: 'green'
    },
    {
      title: 'Multi-Modal Intelligence',
      description: 'Process text, images, and voice for comprehensive insights',
      icon: PhotoIcon,
      color: 'purple'
    },
    {
      title: 'Real-time Learning',
      description: 'AI continuously learns from community interactions',
      icon: SparklesIcon,
      color: 'orange'
    }
  ]

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
    }
  }

  const playVoiceNote = (voiceNote: VoiceNote) => {
    setCurrentVoiceNote(voiceNote)
    setIsPlaying(true)
    // Mock audio playback
    setTimeout(() => {
      setIsPlaying(false)
      setCurrentVoiceNote(null)
    }, voiceNote.duration * 1000)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filteredChatSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">AI Assistant 🤖</h1>
                <p className="text-sm lg:text-base xl:text-lg text-gray-600">Advanced African intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowChatHistory(!showChatHistory)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Chat History"
              >
                <ClockIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowVoiceNotes(!showVoiceNotes)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Voice Notes"
              >
                <MicrophoneIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto px-4 py-6"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-8"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Advanced AI Intelligence
          </h2>
          <p className="text-lg lg:text-xl opacity-90 mb-6">
            Experience the future of AI with voice chat, memory, and multi-modal intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai/chat" className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-md hover:bg-gray-100 transition-colors">
              Start Chatting
            </Link>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-indigo-600 transition-colors">
              Try Voice Chat
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/ai/chat" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Start Chat</h3>
            </div>
            <p className="text-sm text-gray-600">Begin a new conversation with AI</p>
          </Link>

          <button
            onClick={startRecording}
            disabled={isRecording}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow disabled:opacity-50"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MicrophoneIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Voice Chat</h3>
            </div>
            <p className="text-sm text-gray-600">
              {isRecording ? `Recording... ${formatDuration(recordingDuration)}` : 'Speak with AI naturally'}
            </p>
          </button>

          <button
            onClick={() => setShowChatHistory(true)}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Chat History</h3>
            </div>
            <p className="text-sm text-gray-600">View your conversation history</p>
          </button>

          <button
            onClick={() => setShowVoiceNotes(true)}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <SpeakerWaveIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Voice Notes</h3>
            </div>
            <p className="text-sm text-gray-600">Manage your voice recordings</p>
          </button>
        </motion.div>

        {/* AI Services Grid */}
        <motion.div
          className="mb-10"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Specialized AI Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedService === service.id 
                    ? 'border-indigo-500 shadow-indigo-100' 
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
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {service.description}
                </p>
                
                {selectedService === service.id && (
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Features:</h5>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Capabilities:</h5>
                      <div className="flex flex-wrap gap-2">
                        {service.capabilities.map((capability, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div
          className="mb-10"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>

      {/* Chat History Modal */}
      {showChatHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Chat History</h3>
                <button
                  onClick={() => setShowChatHistory(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {filteredChatSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{session.title}</h4>
                      <div className="flex items-center space-x-2">
                        {session.isPinned && <BookmarkIcon className="w-4 h-4 text-yellow-500" />}
                        <span className="text-xs text-gray-500">{session.messageCount} messages</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{session.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {session.timestamp.toLocaleDateString()} at {session.timestamp.toLocaleTimeString()}
                      </span>
                      <Link
                        href="/ai/chat"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Continue Chat
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Voice Notes Modal */}
      {showVoiceNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Voice Notes</h3>
                <button
                  onClick={() => setShowVoiceNotes(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {voiceNotes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{note.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{formatDuration(note.duration)}</span>
                        <button
                          onClick={() => playVoiceNote(note)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {currentVoiceNote?.id === note.id && isPlaying ? (
                            <PauseIcon className="w-4 h-4 text-gray-600" />
                          ) : (
                            <PlayIcon className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{note.transcription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {note.timestamp.toLocaleDateString()} at {note.timestamp.toLocaleTimeString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="text-xs text-indigo-600 hover:text-indigo-700">
                          <ShareIcon className="w-4 h-4" />
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-700">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Recording Controls */}
      {isRecording && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">Recording... {formatDuration(recordingDuration)}</span>
            <button
              onClick={stopRecording}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <StopIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
