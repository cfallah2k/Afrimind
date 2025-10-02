'use client'

import { useState, useRef, useEffect } from 'react'
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
  Settings
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  type?: 'text' | 'voice'
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your African context AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('weather') || input.includes('rain')) {
      return 'The current weather in Nairobi is 28°C with partly cloudy skies. Light rain is expected tomorrow afternoon. Perfect conditions for planting maize!'
    }
    
    if (input.includes('price') || input.includes('market')) {
      return 'Current market prices: Maize $280/90kg bag (+15%), Beans $320/90kg bag (-5%), Rice $180/90kg bag (+8%). Prices are trending upward due to seasonal demand.'
    }
    
    if (input.includes('border') || input.includes('trade')) {
      return 'Malaba border is currently open with 1.5 hour wait time. Required documents: Passport, Certificate of Origin, Commercial Invoice, and Phytosanitary Certificate. Best crossing time is 6-10 AM.'
    }
    
    if (input.includes('plant') || input.includes('farming')) {
      return 'For maize planting in your region: Optimal time is March 15-30. Prepare soil with organic matter, plant 2-3cm deep, space 75cm between rows. Watch for armyworms in 2 weeks.'
    }
    
    if (input.includes('culture') || input.includes('language')) {
      return 'In East Africa, greet with "Hujambo" and shake hands. Business meetings start with 15 minutes of small talk. Swahili is widely spoken - "Asante" means thank you.'
    }
    
    return 'I understand you\'re asking about African context. I can help with agriculture, logistics, cultural information, and more. Could you be more specific about what you need?'
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  const handleVoiceListen = () => {
    setIsListening(!isListening)
    // Voice listening logic would go here
  }

  const handleSpeak = (text: string) => {
    setIsSpeaking(true)
    // Text-to-speech logic would go here
    setTimeout(() => setIsSpeaking(false), 2000)
  }

  const quickQuestions = [
    'What\'s the weather like?',
    'Check maize prices',
    'Border status',
    'Planting advice',
    'Cultural tips'
  ]

  return (
    <div className="space-y-6">
      {/* Chat Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-africa-100 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5 text-africa-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">AI Assistant</h3>
              <p className="text-sm text-gray-600">African Context Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="card">
        <div className="chat-container custom-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.sender}`}
            >
              <div className="flex items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  message.sender === 'user' ? 'bg-africa-600' : 'bg-gray-400'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-3 h-3 text-white" />
                  ) : (
                    <Bot className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'ai' && (
                  <button
                    onClick={() => handleSpeak(message.text)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-3 h-3 text-gray-600" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      <div className="card">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Quick Questions</h3>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="card">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Voice Controls</h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleVoiceRecord}
            className={`voice-button ${isRecording ? 'recording' : ''}`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button
            onClick={handleVoiceListen}
            className={`voice-button ${isListening ? 'listening' : ''}`}
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          {isRecording ? 'Recording... Tap to stop' : 
           isListening ? 'Listening... Tap to stop' : 
           'Tap to start voice interaction'}
        </p>
      </div>

      {/* Message Input */}
      <div className="card">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about agriculture, logistics, culture..."
            className="flex-1 input-field"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 bg-africa-600 text-white rounded-xl hover:bg-africa-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Access Methods */}
      <div className="card">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Other Access Methods</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center p-3 bg-africa-50 rounded-xl hover:bg-africa-100 transition-colors">
            <Phone className="w-4 h-4 text-africa-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">USSD: *123#</span>
          </button>
          <button className="flex items-center p-3 bg-earth-50 rounded-xl hover:bg-earth-100 transition-colors">
            <MessageCircle className="w-4 h-4 text-earth-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">SMS: Text us</span>
          </button>
        </div>
      </div>
    </div>
  )
}
