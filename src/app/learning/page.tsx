'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  PlayIcon,
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  TruckIcon,
  CheckCircleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/components/providers/language-provider'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function LearningPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const categories = [
    { id: 'agriculture', name: 'Agriculture', icon: GlobeAltIcon, color: 'green' },
    { id: 'trade', name: 'Trade & Commerce', icon: TruckIcon, color: 'blue' },
    { id: 'culture', name: 'Culture & Language', icon: LanguageIcon, color: 'purple' },
    { id: 'finance', name: 'Finance & Banking', icon: CurrencyDollarIcon, color: 'yellow' },
    { id: 'technology', name: 'Digital Skills', icon: AcademicCapIcon, color: 'indigo' }
  ]

  const levels = [
    { id: 'beginner', name: 'Beginner', color: 'green' },
    { id: 'intermediate', name: 'Intermediate', color: 'blue' },
    { id: 'advanced', name: 'Advanced', color: 'purple' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Smart Farming Fundamentals',
      description: 'Learn modern agricultural techniques, soil management, and crop optimization for African climates.',
      category: 'agriculture',
      level: 'beginner',
      duration: '4 weeks',
      lessons: 12,
      students: 1250,
      rating: 4.8,
      price: 'Free',
      image: '/courses/smart-farming.jpg',
      instructor: 'Dr. Amina Okafor',
      instructorTitle: 'Agricultural Extension Officer',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    },
    {
      id: 2,
      title: 'Cross-Border Trade Mastery',
      description: 'Master international trade regulations, customs procedures, and logistics for African markets.',
      category: 'trade',
      level: 'intermediate',
      duration: '6 weeks',
      lessons: 18,
      students: 890,
      rating: 4.9,
      price: 'Premium',
      image: '/courses/trade-mastery.jpg',
      instructor: 'Kwame Asante',
      instructorTitle: 'Trade Logistics Expert',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    },
    {
      id: 3,
      title: 'African Languages & Culture',
      description: 'Explore diverse African languages, cultural practices, and business etiquette across regions.',
      category: 'culture',
      level: 'beginner',
      duration: '8 weeks',
      lessons: 24,
      students: 2100,
      rating: 4.7,
      price: 'Free',
      image: '/courses/african-culture.jpg',
      instructor: 'Prof. Fatima Hassan',
      instructorTitle: 'Cultural Anthropologist',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    },
    {
      id: 4,
      title: 'Digital Financial Services',
      description: 'Understand mobile money, digital banking, and financial inclusion in African markets.',
      category: 'finance',
      level: 'beginner',
      duration: '5 weeks',
      lessons: 15,
      students: 1680,
      rating: 4.6,
      price: 'Free',
      image: '/courses/digital-finance.jpg',
      instructor: 'John Mwangi',
      instructorTitle: 'Fintech Specialist',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    },
    {
      id: 5,
      title: 'AI for African Development',
      description: 'Learn how artificial intelligence can solve African challenges in agriculture, healthcare, and education.',
      category: 'technology',
      level: 'advanced',
      duration: '10 weeks',
      lessons: 30,
      students: 450,
      rating: 4.9,
      price: 'Premium',
      image: '/courses/ai-development.jpg',
      instructor: 'Dr. Sarah Johnson',
      instructorTitle: 'AI Research Director',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    },
    {
      id: 6,
      title: 'Sustainable Agriculture Practices',
      description: 'Advanced techniques for sustainable farming, climate adaptation, and environmental conservation.',
      category: 'agriculture',
      level: 'advanced',
      duration: '7 weeks',
      lessons: 21,
      students: 320,
      rating: 4.8,
      price: 'Premium',
      image: '/courses/sustainable-agriculture.jpg',
      instructor: 'Dr. Ibrahim Ndiaye',
      instructorTitle: 'Environmental Scientist',
      progress: 0,
      isCompleted: false,
      isEnrolled: false
    }
  ]

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel
    return categoryMatch && levelMatch
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : BookOpenIcon
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : 'gray'
  }

  const getLevelColor = (level: string) => {
    const levelData = levels.find(l => l.id === level)
    return levelData ? levelData.color : 'gray'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn & Grow with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {' '}AfriMind
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master essential skills for African development through our comprehensive e-learning platform. 
              From agriculture to technology, culture to finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start Learning
              </button>
              <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Browse Courses
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '6,500+', label: 'Students Enrolled' },
              { number: '50+', label: 'Courses Available' },
              { number: '12', label: 'Languages Supported' },
              { number: '95%', label: 'Completion Rate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Learning Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of courses designed specifically for African contexts
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? `bg-${category.color}-600 text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>

          {/* Level Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Levels
            </button>
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedLevel === level.id
                    ? `bg-${level.color}-600 text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const CategoryIcon = getCategoryIcon(course.category)
              const categoryColor = getCategoryColor(course.category)
              const levelColor = getLevelColor(course.level)
              
              return (
                <motion.div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-800`}>
                        <CategoryIcon className="w-4 h-4 mr-1" />
                        {categories.find(c => c.id === course.category)?.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${levelColor}-100 text-${levelColor}-800`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <PlayIcon className="w-5 h-5" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {course.instructor}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {course.instructorTitle}
                        </div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">
                        {course.price}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of learners across Africa who are already building their skills and advancing their careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg">
                Browse All Courses
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                View Learning Paths
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
