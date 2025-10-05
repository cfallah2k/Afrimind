'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  SunIcon,
  CloudIcon,
  DropletIcon,
  ScissorsIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface FarmingCalendarProps {
  isOpen: boolean
  onClose: () => void
}

export function FarmingCalendar({ isOpen, onClose }: FarmingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  // Sample farming events
  const farmingEvents = [
    {
      id: 1,
      title: 'Planting Day',
      date: new Date(2024, 0, 15),
      type: 'planting',
      description: 'Maize seeds planted',
      location: 'Field A',
      completed: true
    },
    {
      id: 2,
      title: 'First Weeding',
      date: new Date(2024, 0, 30),
      type: 'maintenance',
      description: 'First weeding session',
      location: 'Field A',
      completed: false
    },
    {
      id: 3,
      title: 'Fertilizer Application',
      date: new Date(2024, 1, 15),
      type: 'fertilizing',
      description: 'Apply first round of fertilizer',
      location: 'Field A',
      completed: false
    },
    {
      id: 4,
      title: 'Harvest Day',
      date: new Date(2024, 3, 15),
      type: 'harvesting',
      description: 'Expected harvest date',
      location: 'Field A',
      completed: false
    }
  ]

  const eventTypes = {
    planting: { icon: SunIcon, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    maintenance: { icon: ScissorsIcon, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    fertilizing: { icon: DropletIcon, color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
    harvesting: { icon: CheckCircleIcon, color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    weather: { icon: CloudIcon, color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' }
  }

  const getEventsForDate = (date: Date) => {
    return farmingEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setSelectedDate(newDate)
  }

  const days = getDaysInMonth(selectedDate)
  const today = new Date()
  const currentMonth = selectedDate.getMonth()
  const currentYear = selectedDate.getFullYear()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Farming Calendar</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {(['month', 'week', 'day'] as const).map((viewType) => (
                    <button
                      key={viewType}
                      onClick={() => setView(viewType)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        view === viewType
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ←
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              {view === 'month' && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Week day headers */}
                  <div className="grid grid-cols-7 bg-gray-50">
                    {weekDays.map((day) => (
                      <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={index} className="p-3 min-h-[80px]"></div>
                      }

                      const events = getEventsForDate(day)
                      const isToday = day.toDateString() === today.toDateString()
                      const isCurrentMonth = day.getMonth() === currentMonth

                      return (
                        <div
                          key={day.toISOString()}
                          className={`p-3 min-h-[80px] border-r border-b border-gray-200 ${
                            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                          } ${isToday ? 'bg-blue-50' : ''}`}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {events.slice(0, 2).map((event) => {
                              const eventType = eventTypes[event.type as keyof typeof eventTypes]
                              const Icon = eventType.icon
                              return (
                                <div
                                  key={event.id}
                                  className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                                    event.completed ? 'bg-green-100 text-green-800' : eventType.bgColor + ' ' + eventType.textColor
                                  }`}
                                >
                                  <Icon className="w-3 h-3" />
                                  <span className="truncate">{event.title}</span>
                                </div>
                              )
                            })}
                            {events.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{events.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Week View */}
              {view === 'week' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center text-gray-500">
                    Week view coming soon...
                  </div>
                </div>
              )}

              {/* Day View */}
              {view === 'day' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center text-gray-500">
                    Day view coming soon...
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {farmingEvents
                    .filter(event => event.date >= today && !event.completed)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 5)
                    .map((event) => {
                      const eventType = eventTypes[event.type as keyof typeof eventTypes]
                      const Icon = eventType.icon
                      const daysUntil = Math.ceil((event.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                      
                      return (
                        <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-10 h-10 ${eventType.bgColor} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${eventType.textColor}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <CalendarDaysIcon className="w-3 h-3" />
                                <span>{event.date.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <MapPinIcon className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                              <div className="text-xs text-blue-600 font-medium">
                                {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
