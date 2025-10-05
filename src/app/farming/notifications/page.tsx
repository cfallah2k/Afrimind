'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BellIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SunIcon,
  CloudIcon as CloudRainIcon,
  ScissorsIcon,
  SparklesIcon as SeedlingIcon,
  ClockIcon,
  MapPinIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  HeartIcon,
  StarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function FarmingNotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Weather Alert: Heavy Rain Expected',
      message: 'Heavy rainfall predicted for tomorrow. Consider covering your crops or harvesting early.',
      time: '2 hours ago',
      icon: CloudRainIcon,
      color: 'red',
      action: 'View Weather Details',
      read: false
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Harvest Time Approaching',
      message: 'Your maize crop will be ready for harvest in 5 days. Prepare your harvesting tools.',
      time: '4 hours ago',
      icon: ScissorsIcon,
      color: 'green',
      action: 'View Harvest Plan',
      read: false
    },
    {
      id: 3,
      type: 'tip',
      title: 'Fertilizer Application Reminder',
      message: 'It\'s time to apply the second round of fertilizer to your tomato plants.',
      time: '1 day ago',
      icon: LightBulbIcon,
      color: 'blue',
      action: 'View Fertilizer Guide',
      read: true
    },
    {
      id: 4,
      type: 'market',
      title: 'Price Alert: Tomato Prices Rising',
      message: 'Tomato prices have increased by 15% this week. Consider selling your harvest soon.',
      time: '2 days ago',
      icon: TrendingUpIcon,
      color: 'purple',
      action: 'View Market Prices',
      read: true
    },
    {
      id: 5,
      type: 'pest',
      title: 'Pest Alert: Aphids Detected',
      message: 'Aphids have been detected in your area. Check your crops and apply treatment if needed.',
      time: '3 days ago',
      icon: ExclamationTriangleIcon,
      color: 'yellow',
      action: 'View Pest Control Guide',
      read: true
    },
    {
      id: 6,
      type: 'success',
      title: 'Crop Growth Milestone',
      message: 'Congratulations! Your rice crop has reached the flowering stage.',
      time: '5 days ago',
      icon: HeartIcon,
      color: 'pink',
      action: 'View Growth Progress',
      read: true
    }
  ])

  const filters = [
    { id: 'all', name: 'All Notifications', count: notifications.length },
    { id: 'urgent', name: 'Urgent', count: notifications.filter(n => n.type === 'urgent').length },
    { id: 'milestone', name: 'Milestones', count: notifications.filter(n => n.type === 'milestone').length },
    { id: 'tip', name: 'Tips', count: notifications.filter(n => n.type === 'tip').length },
    { id: 'market', name: 'Market', count: notifications.filter(n => n.type === 'market').length },
    { id: 'pest', name: 'Pest Alerts', count: notifications.filter(n => n.type === 'pest').length }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'First Weeding Session',
      crop: 'Maize',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: 'high',
      description: 'Time to remove weeds from your maize field'
    },
    {
      id: 2,
      title: 'Fertilizer Application',
      crop: 'Tomato',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      description: 'Apply second round of fertilizer to tomato plants'
    },
    {
      id: 3,
      title: 'Harvest Preparation',
      crop: 'Rice',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      priority: 'high',
      description: 'Prepare tools and storage for rice harvest'
    },
    {
      id: 4,
      title: 'Pest Monitoring',
      crop: 'All Crops',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      description: 'Weekly pest inspection and treatment if needed'
    }
  ]

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === selectedFilter)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BellIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-bold text-gray-900 truncate">Notifications 🔔</h1>
                <p className="text-xs text-gray-600 truncate">Farming updates</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">{unreadCount}</span>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all read
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Farming Notifications</h1>
                <p className="text-gray-600">Stay updated with your farming activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{unreadCount} unread</span>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6"
      >
        {/* Filters */}
        <motion.div 
          className="mb-6 sm:mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg border-2 transition-colors text-sm sm:text-base ${
                  selectedFilter === filter.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="font-medium text-xs sm:text-sm">{filter.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedFilter === filter.id
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {selectedFilter === 'all' ? 'All Notifications' : filters.find(f => f.id === selectedFilter)?.name}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'urgent' ? 'bg-red-100' :
                          notification.type === 'milestone' ? 'bg-green-100' :
                          notification.type === 'tip' ? 'bg-blue-100' :
                          notification.type === 'market' ? 'bg-purple-100' :
                          notification.type === 'pest' ? 'bg-yellow-100' :
                          'bg-pink-100'
                        }`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            notification.type === 'urgent' ? 'text-red-600' :
                            notification.type === 'milestone' ? 'text-green-600' :
                            notification.type === 'tip' ? 'text-blue-600' :
                            notification.type === 'market' ? 'text-purple-600' :
                            notification.type === 'pest' ? 'text-yellow-600' :
                            'text-pink-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-sm sm:text-base font-semibold ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2 ml-2">
                              <span className="text-xs sm:text-sm text-gray-500">{notification.time}</span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{notification.message}</p>
                          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                            {notification.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Upcoming Events */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Upcoming Events</h3>
              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500">{event.crop}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {event.date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Set Reminder</span>
                </button>
                
                <button className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Weather Alert</span>
                </button>
                
                <button className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ScissorsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Harvest Reminder</span>
                </button>
                
                <button className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Price Alert</span>
                </button>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Notification Settings</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">Weather Alerts</span>
                  <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">Harvest Reminders</span>
                  <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">Market Updates</span>
                  <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">Pest Alerts</span>
                  <input type="checkbox" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700">Farming Tips</span>
                  <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}
