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
      color: 'blue',
      onClick: onAIChat
    },
    {
      icon: CameraIcon,
      label: 'Camera',
      color: 'green',
      onClick: onCamera
    },
    {
      icon: MicrophoneIcon,
      label: 'Voice',
      color: 'purple',
      onClick: onVoice
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: 'Message',
      color: 'orange',
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
                <motion.button
                  key={action.label}
                  onClick={action.onClick}
                  className={`w-12 h-12 bg-${action.color}-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-${action.color}-600 transition-colors`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
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
