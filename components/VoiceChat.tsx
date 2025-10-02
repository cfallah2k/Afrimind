'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react'

interface VoiceChatProps {
  onMessage: (message: string) => void
  isListening: boolean
  onListeningChange: (listening: boolean) => void
}

export default function VoiceChat({ onMessage, isListening, onListeningChange }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)
  
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started')
        onListeningChange(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
        
        if (finalTranscript) {
          onMessage(finalTranscript)
          setTranscript('')
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        onListeningChange(false)
      }

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended')
        onListeningChange(false)
      }
    }

    // Initialize audio context for level monitoring
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContextRef.current = new AudioContext()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [onMessage, onListeningChange])

  const startRecording = async () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser')
      return
    }

    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Set up audio level monitoring
      if (audioContextRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream)
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        source.connect(analyserRef.current)
        
        // Start level monitoring
        monitorAudioLevel()
      }

      setIsRecording(true)
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Microphone access denied. Please allow microphone access to use voice chat.')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const updateLevel = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(average)
        animationRef.current = requestAnimationFrame(updateLevel)
      }
    }
    
    updateLevel()
  }

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthesisRef.current = utterance
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
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
            onClick={isRecording ? stopRecording : startRecording}
            className={`voice-button ${isRecording ? 'recording' : ''}`}
            style={{
              transform: isRecording ? `scale(${1 + audioLevel / 100})` : 'scale(1)',
              boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
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
          
          {transcript && (
            <div className="mt-2 p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-700">{transcript}</p>
            </div>
          )}
        </div>

        {/* Audio Level Indicator */}
        {isRecording && (
          <div className="flex justify-center mb-4">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-100"
                style={{ width: `${Math.min(audioLevel * 2, 100)}%` }}
              />
            </div>
          </div>
        )}

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
            onClick={() => speak('Hello! I am your African context AI assistant. How can I help you today?')}
            disabled={isSpeaking}
            className="flex items-center px-4 py-2 bg-africa-600 text-white rounded-xl hover:bg-africa-700 disabled:opacity-50 transition-colors"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Test Voice
          </button>
          
          <button
            onClick={stopSpeaking}
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
