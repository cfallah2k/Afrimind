'use client'

import { useState, useEffect } from 'react'
import { MobileSplash } from './mobile-splash'
import { MobileBottomNav } from './mobile-bottom-nav'

interface MobileAppWrapperProps {
  children: React.ReactNode
}

export function MobileAppWrapper({ children }: MobileAppWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash screen for 3 seconds on first visit
    const hasSeenSplash = localStorage.getItem('afrimind-splash-seen')
    
    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem('afrimind-splash-seen', 'true')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showSplash ? (
        <MobileSplash onComplete={handleSplashComplete} />
      ) : (
        <>
          {children}
          <div className="lg:hidden">
            <MobileBottomNav />
          </div>
        </>
      )}
    </div>
  )
}
