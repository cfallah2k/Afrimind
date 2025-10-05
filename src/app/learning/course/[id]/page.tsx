'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CheckCircleIcon,
  LockClosedIcon,
  BookOpenIcon,
  TrophyIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)

  // Mock course data - in real app, this would come from API
  const course = {
    id: params.id,
    title: 'Smart Farming Fundamentals',
    description: 'Learn modern agricultural techniques, soil management, and crop optimization specifically designed for African climates and conditions.',
    instructor: {
      name: 'Dr. Amina Okafor',
      title: 'Agricultural Extension Officer',
      avatar: '/instructors/amina.jpg',
      rating: 4.9,
      students: 1250
    },
    rating: 4.8,
    students: 1250,
    duration: '4 weeks',
    lessons: 12,
    level: 'Beginner',
    category: 'Agriculture',
    price: 'Free',
    image: '/courses/smart-farming.jpg',
    isEnrolled: isEnrolled,
    progress: 25
  }

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Smart Farming',
      duration: '15 min',
      type: 'video',
      isCompleted: true,
      isLocked: false,
      description: 'Overview of modern farming techniques and their benefits'
    },
    {
      id: 2,
      title: 'Soil Analysis and Management',
      duration: '22 min',
      type: 'video',
      isCompleted: true,
      isLocked: false,
      description: 'Understanding soil composition and improvement techniques'
    },
    {
      id: 3,
      title: 'Crop Selection for African Climates',
      duration: '18 min',
      type: 'video',
      isCompleted: false,
      isLocked: false,
      description: 'Choosing the right crops for different African regions'
    },
    {
      id: 4,
      title: 'Water Management Techniques',
      duration: '20 min',
      type: 'video',
      isCompleted: false,
      isLocked: false,
      description: 'Efficient water usage and irrigation systems'
    },
    {
      id: 5,
      title: 'Pest and Disease Control',
      duration: '25 min',
      type: 'video',
      isCompleted: false,
      isLocked: true,
      description: 'Natural and chemical pest control methods'
    },
    {
      id: 6,
      title: 'Market Analysis and Pricing',
      duration: '16 min',
      type: 'video',
      isCompleted: false,
      isLocked: true,
      description: 'Understanding market trends and pricing strategies'
    }
  ]

  const handleEnroll = () => {
    setIsEnrolled(true)
  }

  const handleLessonClick = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId)
    if (lesson && !lesson.isLocked) {
      setCurrentLesson(lessonId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <HeartIcon className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-2">
                    {course.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {course.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {course.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {course.level} Level
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="w-5 h-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </motion.div>

            {/* Video Player */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayIcon className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {lessons[currentLesson]?.title || 'Select a lesson to start'}
                  </h3>
                  <p className="text-green-100">
                    {lessons[currentLesson]?.duration || 'Click on a lesson to begin'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Course Content */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
                      lesson.isLocked
                        ? 'bg-gray-50 cursor-not-allowed'
                        : lesson.isCompleted
                        ? 'bg-green-50 hover:bg-green-100'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.isLocked ? (
                        <LockClosedIcon className="w-6 h-6 text-gray-400" />
                      ) : lesson.isCompleted ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        <PlayIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        lesson.isLocked ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </h3>
                      <p className={`text-sm ${
                        lesson.isLocked ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {lesson.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`text-sm ${
                        lesson.isLocked ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Enrollment Card */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {course.price}
                </div>
                <div className="text-gray-600">
                  {isEnrolled ? 'You are enrolled' : 'One-time payment'}
                </div>
              </div>

              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
                >
                  Enroll Now
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="font-semibold text-green-800">Enrolled</div>
                    <div className="text-sm text-green-600">You can start learning now</div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>12 video lessons</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>Mobile and desktop access</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Instructor Card */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {course.instructor.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.instructor.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span>{course.instructor.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="w-4 h-4" />
                  <span>{course.instructor.students.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
