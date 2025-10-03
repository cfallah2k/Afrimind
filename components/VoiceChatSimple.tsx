'use client'

import { useState } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Phone } from 'lucide-react'

interface VoiceChatProps {
  onMessage: (message: string) => void
  isListening: boolean
  onListeningChange: (listening: boolean) => void
}

export default function VoiceChatSimple({ onMessage, isListening, onListeningChange }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
    console.log('Voice recording toggled')
  }

  const handleVoiceListen = () => {
    onListeningChange(!isListening)
    // Voice listening logic would go here
    console.log('Voice listening toggled')
  }

  const handleSpeak = (text: string) => {
    setIsSpeaking(true)
    // Text-to-speech logic would go here
    console.log('Speaking:', text)
    setTimeout(() => setIsSpeaking(false), 2000)
  }

  const handleVoiceCall = () => {
    // Simulate voice call functionality
    alert('Voice call feature would connect to our AI assistant via phone call')
  }

  return (
    <div className="space-y-6">
      {/* Voice Controls */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Voice Controls</h3>
        
        {/* Recording Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleVoiceRecord}
            className={`voice-button ${isRecording ? 'recording' : ''}`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
        </div>

        {/* Status */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            {isRecording ? 'Recording... Tap to stop' : 
             isListening ? 'Listening... Tap to stop' : 
             'Tap to start voice interaction'}
          </p>
        </div>

        {/* Voice Call Button */}
        <div className="flex justify-center">
          <button
            onClick={handleVoiceCall}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Voice Call
          </button>
        </div>
      </div>

      {/* Text-to-Speech Controls */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Text-to-Speech</h3>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSpeak('Hello! I am your African context AI assistant. How can I help you today?')}
            disabled={isSpeaking}
            className="flex items-center px-4 py-2 bg-africa-600 text-white rounded-xl hover:bg-africa-700 disabled:opacity-50 transition-colors"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Test Voice
          </button>
          
          <button
            onClick={() => setIsSpeaking(false)}
            disabled={!isSpeaking}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            <VolumeX className="w-4 h-4 mr-2" />
            Stop
          </button>
        </div>
      </div>

      {/* Voice Features */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Voice Features</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-1">Speech Recognition</h4>
            <p className="text-sm text-gray-600">Convert speech to text</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-1">Text-to-Speech</h4>
            <p className="text-sm text-gray-600">Convert text to speech</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-1">Voice Commands</h4>
            <p className="text-sm text-gray-600">Control with voice</p>
          </div>
          
          <div className="p-3 bg-orange-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-1">Multi-language</h4>
            <p className="text-sm text-gray-600">20+ African languages</p>
          </div>
        </div>
      </div>

      {/* Voice Tips */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Voice Tips</h3>
        
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Speak clearly and at normal pace</p>
          <p>• Use simple, direct language</p>
          <p>• Ask one question at a time</p>
          <p>• Wait for the AI to finish responding</p>
          <p>• Use voice commands like "What's the weather?"</p>
        </div>
      </div>
    </div>
  )
}
