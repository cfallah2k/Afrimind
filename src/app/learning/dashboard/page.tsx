'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  TrophyIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  CalendarIcon,
  StarIcon as AwardIcon,
  FireIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState('my-courses')

  const enrolledCourses = [
    {
      id: 1,
      title: 'Smart Farming Fundamentals',
      instructor: 'Dr. Amina Okafor',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      nextLesson: 'Water Management Techniques',
      category: 'Agriculture',
      color: 'green',
      lastAccessed: '2 days ago'
    },
    {
      id: 2,
      title: 'Cross-Border Trade Mastery',
      instructor: 'Kwame Asante',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: 'Customs Documentation',
      category: 'Trade',
      color: 'blue',
      lastAccessed: '1 week ago'
    },
    {
      id: 3,
      title: 'African Languages & Culture',
      instructor: 'Prof. Fatima Hassan',
      progress: 20,
      totalLessons: 24,
      completedLessons: 5,
      nextLesson: 'Business Etiquette',
      category: 'Culture',
      color: 'purple',
      lastAccessed: '3 days ago'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: TrophyIcon,
      color: 'yellow',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Studied for 7 consecutive days',
      icon: FireIcon,
      color: 'red',
      earned: true,
      date: '2024-01-22'
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Completed 10 lessons',
      icon: BookOpenIcon,
      color: 'blue',
      earned: true,
      date: '2024-01-25'
    },
    {
      id: 4,
      title: 'Course Master',
      description: 'Complete your first course',
      icon: AwardIcon,
      color: 'purple',
      earned: false,
      date: null
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed: Soil Analysis and Management',
      course: 'Smart Farming Fundamentals',
      time: '2 hours ago',
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      id: 2,
      type: 'course_enrolled',
      title: 'Enrolled in: African Languages & Culture',
      course: 'Prof. Fatima Hassan',
      time: '1 day ago',
      icon: BookOpenIcon,
      color: 'blue'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned: Knowledge Seeker Badge',
      course: 'Completed 10 lessons',
      time: '3 days ago',
      icon: TrophyIcon,
      color: 'yellow'
    }
  ]

  const stats = {
    totalCourses: 3,
    completedLessons: 22,
    studyStreak: 7,
    totalHours: 24
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
              <p className="text-gray-600 mt-1">Track your progress and continue your journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{stats.studyStreak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{stats.totalHours}h</div>
                <div className="text-sm text-gray-500">Total Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Enrolled Courses', value: stats.totalCourses, icon: BookOpenIcon, color: 'blue' },
            { label: 'Lessons Completed', value: stats.completedLessons, icon: CheckCircleIcon, color: 'green' },
            { label: 'Study Streak', value: `${stats.studyStreak} days`, icon: FireIcon, color: 'red' },
            { label: 'Total Hours', value: `${stats.totalHours}h`, icon: ClockIcon, color: 'purple' }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'my-courses', label: 'My Courses' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'activity', label: 'Recent Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* My Courses Tab */}
            {activeTab === 'my-courses' && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${course.color}-100 text-${course.color}-800`}>
                              {course.category}
                            </span>
                            <span className="text-sm text-gray-500">Last accessed {course.lastAccessed}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-2">by {course.instructor}</p>
                          <p className="text-sm text-gray-500">
                            Next: {course.nextLesson}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {course.progress}%
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.completedLessons}/{course.totalLessons} lessons
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${course.color}-500 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          <PlayIcon className="w-4 h-4" />
                          <span>Continue Learning</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div 
                        key={achievement.id}
                        className={`border-2 rounded-lg p-6 ${
                          achievement.earned 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.earned 
                              ? `bg-${achievement.color}-100` 
                              : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              achievement.earned 
                                ? `text-${achievement.color}-600` 
                                : 'text-gray-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${
                              achievement.earned ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-sm ${
                              achievement.earned ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        {achievement.earned && (
                          <div className="text-sm text-green-600 font-medium">
                            Earned on {new Date(achievement.date!).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.course}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
