'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 african-pattern opacity-10"></div>
          
          {/* Main Content */}
          <motion.div
            variants={fadeInUp}
            className="relative z-10"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
              <SparklesIcon className="w-4 h-4 mr-2" />
              MCP Hackathon Africa 2025
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Build Africa's{' '}
              <span className="text-secondary-300">Digital Future?</span>
            </h2>

            <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of developers, entrepreneurs, and innovators 
              building the next generation of African AI solutions. 
              Start your journey today.
            </p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              <Link
                href="/demo"
                className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg group"
              >
                Start Building Now
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/learn"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg group"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: GlobeAltIcon,
                  title: 'Pan-African Impact',
                  description: 'Reach 54 countries with localized solutions',
                },
                {
                  icon: SparklesIcon,
                  title: 'AI-Powered',
                  description: 'Cutting-edge technology for African contexts',
                },
                {
                  icon: HeartIcon,
                  title: 'Community Driven',
                  description: 'Built by Africans, for Africans',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-primary-200 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10K+', label: 'Active Developers' },
                { number: '500+', label: 'Projects Built' },
                { number: '50+', label: 'Partner Organizations' },
                { number: '99.9%', label: 'Uptime SLA' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-200 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
