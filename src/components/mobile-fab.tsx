'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon,
  CpuChipIcon,
  CameraIcon,
  MicrophoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface MobileFABProps {
  onAIChat?: () => void
  onCamera?: () => void
  onVoice?: () => void
  onMessage?: () => void
}

export function MobileFAB({ 
  onAIChat, 
  onCamera, 
  onVoice, 
  onMessage 
}: MobileFABProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: CpuChipIcon,
      label: 'AI Chat',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      onClick: onAIChat
    },
    {
      icon: CameraIcon,
      label: 'Camera',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      onClick: onCamera
    },
    {
      icon: MicrophoneIcon,
      label: 'Voice',
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      onClick: onVoice
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: 'Message',
      bgColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      onClick: onMessage
    }
  ]

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col space-y-3 mb-4"
          >
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <motion.button
                    onClick={action.onClick}
                    className={`w-12 h-12 ${action.bgColor} rounded-full shadow-lg flex items-center justify-center text-white ${action.hoverColor} transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={action.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                  
                  {/* Tooltip */}
                  <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {action.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <PlusIcon className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
