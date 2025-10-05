'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
}

export function MobilePullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80 
}: MobilePullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)
  const [isPulling, setIsPulling] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return

    const currentY = e.touches[0].clientY
    const distance = Math.max(0, currentY - startY)
    
    if (distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    setIsPulling(false)
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setPullDistance(0)
  }

  const progress = Math.min(pullDistance / threshold, 1)
  const shouldTrigger = pullDistance >= threshold

  return (
    <div className="relative">
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ 
              transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)'
            }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ 
                  duration: isRefreshing ? 1 : 0,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: 'linear'
                }}
              >
                <ArrowPathIcon className={`w-5 h-5 ${
                  shouldTrigger ? 'text-green-500' : 'text-gray-400'
                }`} />
              </motion.div>
              <span className={`text-sm font-medium ${
                shouldTrigger ? 'text-green-500' : 'text-gray-500'
              }`}>
                {isRefreshing ? 'Refreshing...' : shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        style={{ 
          transform: `translateY(${Math.min(pullDistance * 0.3, threshold * 0.3)}px)`,
          opacity: isPulling ? 1 - (progress * 0.1) : 1
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </motion.div>
    </div>
  )
}
