'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  GlobeAltIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  TruckIcon,
  SunIcon,
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

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    {
      icon: GlobeAltIcon,
      number: '54',
      label: 'African Countries',
      description: 'Comprehensive coverage across the continent',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: UsersIcon,
      number: '1.4B',
      label: 'People Served',
      description: 'Reaching every corner of Africa',
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      icon: SunIcon,
      number: '2M+',
      label: 'Farmers Empowered',
      description: 'Agricultural intelligence for smallholder farmers',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
    {
      icon: TruckIcon,
      number: '500+',
      label: 'Trade Routes',
      description: 'Optimized cross-border logistics',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: LanguageIcon,
      number: '2000+',
      label: 'Languages Supported',
      description: 'Preserving African linguistic diversity',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: CurrencyDollarIcon,
      number: '85%',
      label: 'Financial Inclusion',
      description: 'Mobile money and banking access',
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      icon: ChartBarIcon,
      number: '40%',
      label: 'Productivity Increase',
      description: 'Average improvement in agricultural yields',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
    {
      icon: HeartIcon,
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable service for African communities',
      color: 'text-danger-600',
      bgColor: 'bg-danger-100',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Impacting Africa's Future
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Real numbers showing the transformative power of AI-driven 
              solutions for African digital sovereignty.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary-200">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Impact Metrics */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">$2.5B</div>
              <div className="text-primary-200">Economic Impact Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">50K+</div>
              <div className="text-primary-200">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">95%</div>
              <div className="text-primary-200">User Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
