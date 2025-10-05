'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BellIcon,
  UserIcon,
  CpuChipIcon,
  ChevronLeftIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { useLanguage } from './providers/language-provider'
import LanguageSelector from './ui/language-selector'

interface MobileAppHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  onBack?: () => void
  showNotifications?: boolean
  notificationCount?: number
}

export function MobileAppHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  onBack,
  showNotifications = true,
  notificationCount = 0
}: MobileAppHeaderProps) {
  const { data: session } = useSession()
  const { t } = useLanguage()

  return (
    <motion.div 
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {showNotifications && (
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <BellIcon className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </div>
                )}
              </button>
            )}
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ShareIcon className="w-5 h-5 text-gray-600" />
            </button>
            
            {session ? (
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <CpuChipIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <UserIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <LanguageSelector />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
