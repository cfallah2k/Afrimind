'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  GlobeAltIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  LanguageIcon,
  TruckIcon,
  SunIcon,
  HeartIcon,
  SparklesIcon,
  CpuChipIcon,
  BookOpenIcon,
  MapPinIcon,
  BellIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { MobilePullToRefresh } from '@/components/mobile-pull-to-refresh'
import { useLocalAuth } from '@/hooks/use-local-auth'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useLocalAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  const quickActions = [
    {
      title: 'Farming Tracker',
      description: 'Track your crops and predict outcomes',
      icon: SunIcon,
      color: 'green',
      href: '/farming/tracker'
    },
    {
      title: 'Farmer Network',
      description: 'Connect with fellow farmers',
      icon: UsersIcon,
      color: 'orange',
      href: '/farmer-network'
    },
    {
      title: 'AI Chat',
      description: 'Get AI-powered farming advice',
      icon: CpuChipIcon,
      color: 'blue',
      href: '/ai/chat'
    },
    {
      title: 'Market Prices',
      description: 'Check current market prices',
      icon: TrendingUpIcon,
      color: 'purple',
      href: '/market-prices'
    },
    {
      title: 'Learning',
      description: 'Take courses and learn new skills',
      icon: BookOpenIcon,
      color: 'yellow',
      href: '/learning'
    }
  ]

  const recentActivity = [
    {
      title: 'Maize crop ready for harvest',
      time: '2 hours ago',
      type: 'harvest',
      icon: SunIcon,
      color: 'green'
    },
    {
      title: 'Weather alert: Rain expected',
      time: '4 hours ago',
      type: 'weather',
      icon: BellIcon,
      color: 'blue'
    },
    {
      title: 'Completed: Smart Farming course',
      time: '1 day ago',
      type: 'learning',
      icon: BookOpenIcon,
      color: 'purple'
    },
    {
      title: 'Market price update: Rice +15%',
      time: '2 days ago',
      type: 'market',
      icon: TrendingUpIcon,
      color: 'yellow'
    }
  ]

  const stats = [
    { label: 'Active Crops', value: '3', icon: SunIcon, color: 'green' },
    { label: 'Learning Hours', value: '24h', icon: BookOpenIcon, color: 'blue' },
    { label: 'AI Chats', value: '12', icon: CpuChipIcon, color: 'purple' },
    { label: 'Achievements', value: '5', icon: StarIcon, color: 'yellow' }
  ]

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <MobilePullToRefresh onRefresh={handleRefresh}>
        <motion.main
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-6"
        >
        {/* Welcome Header */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getGreeting()}{session?.user?.name ? `, ${session.user.name}` : ''}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to grow with AfriMind today?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
                <motion.div
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.a
                  key={action.title}
                  href={action.href}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 text-${action.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.a>
              )
            })}
          </div>
                </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center space-x-4 p-4 border-b border-gray-100 last:border-b-0">
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
            </div>
              )
            })}
          </div>
        </motion.div>

        {/* Services Overview */}
        <motion.div 
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.a
              href="/agriculture"
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlobeAltIcon className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Agriculture</h3>
              <p className="text-sm text-green-100">Smart farming tools</p>
            </motion.a>
            
            <motion.a
              href="/trade"
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TruckIcon className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Trade</h3>
              <p className="text-sm text-purple-100">Cross-border commerce</p>
            </motion.a>
            
            <motion.a
              href="/culture"
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LanguageIcon className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Culture</h3>
              <p className="text-sm text-orange-100">Language & heritage</p>
            </motion.a>
            
            <motion.a
              href="/finance"
              className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CurrencyDollarIcon className="w-6 h-6 mb-2" />
              <h3 className="font-semibold mb-1">Finance</h3>
              <p className="text-sm text-yellow-100">Financial inclusion</p>
            </motion.a>
          </div>
        </motion.div>

        {/* AI Assistant CTA */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <CpuChipIcon className="w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-blue-100 mb-4">
            Ask our AI assistant anything about farming, trade, culture, or finance
          </p>
          <motion.a
            href="/ai/chat"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Chat</span>
            <SparklesIcon className="w-4 h-4" />
          </motion.a>
        </motion.div>
        </motion.main>
      </MobilePullToRefresh>
    </div>
  )
}