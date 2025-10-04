'use client'

import { motion } from 'framer-motion'
import { 
  StarIcon,
  UserIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid'

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

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Amina Okafor',
      role: 'Agricultural Extension Officer',
      organization: 'Ministry of Agriculture, Nigeria',
      avatar: '/avatars/amina.jpg',
      content: 'The agricultural intelligence module has transformed how we advise farmers. Real-time weather data and crop recommendations have increased yields by 40% in our pilot regions.',
      rating: 5,
      category: 'Agriculture',
    },
    {
      name: 'Kwame Asante',
      role: 'Trade Logistics Manager',
      organization: 'Ghana Ports Authority',
      avatar: '/avatars/kwame.jpg',
      content: 'Cross-border trade has never been smoother. The customs regulations database and route optimization have reduced shipping times by 30% and costs by 25%.',
      rating: 5,
      category: 'Trade',
    },
    {
      name: 'Fatima Hassan',
      role: 'Cultural Preservation Officer',
      organization: 'African Cultural Heritage Foundation',
      avatar: '/avatars/fatima.jpg',
      content: 'This platform is preserving our cultural heritage while making it accessible to younger generations. The language translation and cultural context features are invaluable.',
      rating: 5,
      category: 'Culture',
    },
    {
      name: 'John Mwangi',
      role: 'Mobile Money Specialist',
      organization: 'Safaricom Kenya',
      avatar: '/avatars/john.jpg',
      content: 'The financial inclusion module has helped us reach underserved communities. Integration with our M-Pesa platform has been seamless and impactful.',
      rating: 5,
      category: 'Finance',
    },
    {
      name: 'Dr. Sarah Johnson',
      role: 'AI Research Director',
      organization: 'University of Cape Town',
      avatar: '/avatars/sarah.jpg',
      content: 'The MCP architecture is groundbreaking for African AI applications. The cultural sensitivity and local context understanding sets a new standard.',
      rating: 5,
      category: 'Research',
    },
    {
      name: 'Ahmed Ibrahim',
      role: 'Small Business Owner',
      organization: 'Ibrahim Trading Co.',
      avatar: '/avatars/ahmed.jpg',
      content: 'As a small business owner, this platform has been a game-changer. From agricultural insights to financial services, everything I need is in one place.',
      rating: 5,
      category: 'Business',
    },
  ]

  const stats = [
    { number: '98%', label: 'User Satisfaction' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '10K+', label: 'Active Users' },
    { number: '50+', label: 'Partner Organizations' },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
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
              Trusted by{' '}
              <span className="text-gradient">African Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how AfriMind is transforming lives and businesses across Africa 
              through real stories from our community.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-warning-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary-600">
                      {testimonial.organization}
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {testimonial.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Growing Community
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Be part of the movement that's transforming Africa through AI-driven solutions. 
                Start your journey with AfriMind today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn btn-primary btn-lg">
                  Get Started
                </button>
                <button className="btn btn-outline btn-lg">
                  View Case Studies
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
