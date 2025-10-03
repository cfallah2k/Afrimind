'use client'

import { motion } from 'framer-motion'
import { 
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BoltIcon,
  ScaleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

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

export function FeaturesSection() {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Advanced AI Integration',
      description: 'State-of-the-art machine learning models trained specifically for African contexts and challenges.',
      benefits: [
        'Context-aware recommendations',
        'Local language processing',
        'Cultural sensitivity training',
        'Real-time adaptation',
      ],
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance with international standards.',
      benefits: [
        '256-bit encryption',
        'GDPR compliance',
        'SOC 2 Type II certified',
        'Regular security audits',
      ],
    },
    {
      icon: GlobeAltIcon,
      title: 'Pan-African Coverage',
      description: 'Comprehensive coverage across all 54 African countries with localized data and services.',
      benefits: [
        'Multi-country support',
        'Local data centers',
        'Regional customization',
        'Cultural adaptation',
      ],
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast Performance',
      description: 'Optimized for African internet conditions with edge computing and smart caching.',
      benefits: [
        'Sub-second response times',
        'Offline functionality',
        'Data compression',
        'Smart caching',
      ],
    },
    {
      icon: ScaleIcon,
      title: 'Scalable Architecture',
      description: 'Built to handle millions of users with auto-scaling and load balancing.',
      benefits: [
        'Auto-scaling infrastructure',
        'Load balancing',
        'Microservices architecture',
        'Container orchestration',
      ],
    },
    {
      icon: HeartIcon,
      title: 'Community Driven',
      description: 'Open-source components with active community contributions and local partnerships.',
      benefits: [
        'Open-source modules',
        'Community contributions',
        'Local partnerships',
        'Transparent development',
      ],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Africa's{' '}
              <span className="text-gradient">Unique Needs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with deep understanding 
              of African contexts to deliver solutions that truly work.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technical Specifications */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Technical Excellence
              </h3>
              <p className="text-gray-600">
                Built with the latest technologies and best practices
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Response Time', value: '< 100ms' },
                { label: 'Uptime SLA', value: '99.9%' },
                { label: 'Data Centers', value: '12+' },
                { label: 'Languages', value: '50+' },
              ].map((spec, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {spec.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {spec.label}
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
