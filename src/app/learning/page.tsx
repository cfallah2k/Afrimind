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
  LockClosedIcon,
  ChevronDownIcon,
  FireIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/components/providers/language-provider'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function LearningPage() {
  const { t, currentLanguage, setLanguage, currentCountry, setCountry, availableLanguages, availableCountries } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

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

  // Learning progress data
  const learningStats = {
    dayStreak: 7,
    totalTime: '24h',
    enrolledCourses: 3,
    lessonsCompleted: 22,
    studyStreak: '7 days',
    totalHours: '24h'
  }

  const achievements = [
    { id: 1, title: 'Liberia Learning Pioneer', icon: TrophyIcon, color: 'yellow', earned: true, description: 'Completed your first course in Liberia' },
    { id: 2, title: 'West African Scholar', icon: FireIcon, color: 'red', earned: true, description: '7-day learning streak achieved' },
    { id: 3, title: 'Regional Knowledge Seeker', icon: BookOpenIcon, color: 'blue', earned: false, description: 'Complete 5 West African courses' },
    { id: 4, title: 'ECOWAS Study Champion', icon: StarIcon, color: 'purple', earned: false, description: 'Master all regional subjects' }
  ]

  const recentActivity = [
    { id: 1, title: 'Completed lesson: Soil Management', course: 'Smart Farming Fundamentals', time: '2 hours ago', region: 'Liberia' },
    { id: 2, title: 'Started new course: Cross-Border Trade', course: 'Trade Mastery', time: '1 day ago', region: 'Ghana' },
    { id: 3, title: 'Earned achievement: First Course', course: 'Agriculture', time: '3 days ago', region: 'Liberia' }
  ]

  const myCourses = [
    {
      id: 1,
      title: 'Smart Farming Fundamentals',
      instructor: 'Dr. Amina Okafor',
      category: 'Agriculture',
      lastAccessed: '2 days ago',
      nextLesson: 'Water Management Techniques',
      progress: 75,
      completedLessons: 9,
      totalLessons: 12,
      isEnrolled: true,
      region: 'Liberia',
      description: 'Learn modern agricultural techniques for West African climates'
    },
    {
      id: 2,
      title: 'Cross-Border Trade Mastery',
      instructor: 'Kwame Asante',
      category: 'Trade',
      lastAccessed: '1 week ago',
      nextLesson: 'Customs Documentation',
      progress: 45,
      completedLessons: 8,
      totalLessons: 18,
      isEnrolled: true,
      region: 'Ghana',
      description: 'Master West African trade regulations and logistics'
    },
    {
      id: 3,
      title: 'West African Languages & Culture',
      instructor: 'Prof. Fatima Hassan',
      category: 'Culture',
      lastAccessed: '3 days ago',
      nextLesson: 'Business Etiquette',
      progress: 20,
      completedLessons: 5,
      totalLessons: 24,
      isEnrolled: true,
      region: 'Senegal',
      description: 'Explore West African languages and cultural practices'
    }
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
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative w-full">
      {/* Mobile Status Bar */}
      <div className="bg-black text-white text-xs px-3 sm:px-4 py-1 flex justify-between items-center">
        <span className="text-xs">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
          <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-sm"></div>
        </div>
        <span className="text-xs">100%</span>
      </div>

      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">My Learning</h1>
                <p className="text-xs text-gray-500">Track your progress and continue your journey in West Africa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FireIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900">{learningStats.dayStreak}</div>
                <div className="text-xs sm:text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900">{learningStats.totalTime}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Time</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900">{learningStats.enrolledCourses}</div>
                <div className="text-xs sm:text-sm text-gray-600">Enrolled Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900">{learningStats.lessonsCompleted}</div>
                <div className="text-xs sm:text-sm text-gray-600">Lessons Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'achievements'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recent Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            {myCourses.map((course, index) => (
              <div key={course.id} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{course.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">by {course.instructor}</p>
                    <p className="text-xs text-gray-500">{course.category} • {course.region} • Last accessed {course.lastAccessed}</p>
                  </div>
                </div>
                
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-1">
                    <span>Next: {course.nextLesson}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>Progress {course.progress}%</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-3 rounded-lg font-medium text-xs sm:text-sm hover:shadow-md transition-all">
                    Continue Learning
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={achievement.id} className={`bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 ${!achievement.earned ? 'opacity-50' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-${achievement.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${achievement.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{activity.course}</p>
                    <p className="text-xs text-gray-500">{activity.region} • {activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
