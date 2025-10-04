'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChartBarIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 african-pattern opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-accent-200 rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-8"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            MCP Hackathon Africa 2025
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Empowering Africa through{' '}
            <span className="text-gradient">AI-Driven Solutions</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Four integrated MCP servers providing agricultural intelligence, 
            cross-border trade facilitation, cultural preservation, and 
            financial inclusion for African digital sovereignty.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/demo"
              className="btn btn-primary btn-lg group"
            >
              Start Building
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn"
              className="btn btn-outline btn-lg group"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '50+', label: 'African Countries', icon: GlobeAltIcon },
              { number: '1M+', label: 'Farmers Empowered', icon: ChartBarIcon },
              { number: '100+', label: 'Languages Supported', icon: HeartIcon },
              { number: '24/7', label: 'AI Assistance', icon: SparklesIcon },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
