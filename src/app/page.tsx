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
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ServicesSection } from '@/components/sections/services-section'
import { StatsSection } from '@/components/sections/stats-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CtaSection } from '@/components/sections/cta-section'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navigation />
      
      <motion.main
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="relative"
      >
        {/* Hero Section */}
        <motion.section variants={fadeInUp}>
          <HeroSection />
        </motion.section>

        {/* Features Overview */}
        <motion.section 
          variants={fadeInUp}
          className="py-20 bg-white/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Four Pillars of{' '}
                <span className="text-gradient">African Digital Sovereignty</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Empowering Africa through AI-driven solutions that respect local context, 
                preserve cultural heritage, and drive economic growth.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: SunIcon,
                  title: 'Agricultural Intelligence',
                  description: 'AI-powered farming insights, weather forecasts, and market intelligence for smallholder farmers.',
                  color: 'from-success-500 to-success-600',
                  bgColor: 'bg-success-50',
                  iconColor: 'text-success-600'
                },
                {
                  icon: TruckIcon,
                  title: 'Cross-Border Trade',
                  description: 'Streamlined logistics, customs data, and trade facilitation across African borders.',
                  color: 'from-primary-500 to-primary-600',
                  bgColor: 'bg-primary-50',
                  iconColor: 'text-primary-600'
                },
                {
                  icon: LanguageIcon,
                  title: 'Cultural Preservation',
                  description: 'AI that understands African languages, cultures, and local contexts.',
                  color: 'from-accent-500 to-accent-600',
                  bgColor: 'bg-accent-50',
                  iconColor: 'text-accent-600'
                },
                {
                  icon: CurrencyDollarIcon,
                  title: 'Financial Inclusion',
                  description: 'Mobile money integration, local banking, and financial services for all Africans.',
                  color: 'from-secondary-500 to-secondary-600',
                  bgColor: 'bg-secondary-50',
                  iconColor: 'text-secondary-600'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`${feature.bgColor} rounded-2xl p-8 hover:shadow-strong transition-all duration-300 group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section variants={fadeInUp}>
          <ServicesSection />
        </motion.section>

        {/* Stats Section */}
        <motion.section variants={fadeInUp}>
          <StatsSection />
        </motion.section>

        {/* Features Section */}
        <motion.section variants={fadeInUp}>
          <FeaturesSection />
        </motion.section>

        {/* Testimonials */}
        <motion.section variants={fadeInUp}>
          <TestimonialsSection />
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={fadeInUp}>
          <CtaSection />
        </motion.section>
      </motion.main>

      <Footer />
    </div>
  )
}
