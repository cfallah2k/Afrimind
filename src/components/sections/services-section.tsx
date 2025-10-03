'use client'

import { motion } from 'framer-motion'
import { 
  SunIcon,
  TruckIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  CheckIcon
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

export function ServicesSection() {
  const services = [
    {
      icon: SunIcon,
      title: 'Agricultural Intelligence',
      description: 'AI-powered farming insights, weather forecasts, and market intelligence for smallholder farmers across Africa.',
      features: [
        'Real-time weather forecasting',
        'Crop recommendation engine',
        'Market price intelligence',
        'Pest and disease detection',
        'Farming best practices',
      ],
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50',
      iconColor: 'text-success-600',
      href: '/agriculture',
    },
    {
      icon: TruckIcon,
      title: 'Cross-Border Trade',
      description: 'Streamlined logistics, customs data, and trade facilitation across African borders for seamless commerce.',
      features: [
        'Customs regulations database',
        'Route optimization',
        'Documentation requirements',
        'Border condition monitoring',
        'Tariff calculations',
      ],
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      href: '/trade',
    },
    {
      icon: LanguageIcon,
      title: 'Cultural Preservation',
      description: 'AI that understands African languages, cultures, and local contexts to preserve and promote cultural heritage.',
      features: [
        'Language translation services',
        'Cultural practice database',
        'Local context understanding',
        'Language learning resources',
        'Historical context provision',
      ],
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      href: '/culture',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Financial Inclusion',
      description: 'Mobile money integration, local banking services, and financial tools to promote economic empowerment.',
      features: [
        'Mobile money services',
        'Banking service directory',
        'Financial regulations guide',
        'Credit scoring information',
        'Investment opportunities',
      ],
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
      href: '/finance',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
              Four Pillars of{' '}
              <span className="text-gradient">Digital Sovereignty</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive MCP servers designed to address Africa's unique challenges 
              while preserving cultural identity and promoting economic growth.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className={`${service.bgColor} rounded-2xl p-8 hover:shadow-strong transition-all duration-300 group`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckIcon className="w-4 h-4 text-success-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={service.href}
                      className={`inline-flex items-center text-${service.iconColor.split('-')[1]}-600 hover:text-${service.iconColor.split('-')[1]}-700 font-medium group`}
                    >
                      Learn More
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Africa's Digital Landscape?
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Join us in building a more connected, prosperous, and culturally 
                rich Africa through the power of AI and technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/demo"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg"
                >
                  Start Building
                </Link>
                <Link
                  href="/docs"
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 btn-lg"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
