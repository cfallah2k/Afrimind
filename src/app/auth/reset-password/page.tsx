'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check if token is valid
  useEffect(() => {
    if (!token || token !== 'verified') {
      router.push('/auth/forgot-password')
    }
  }, [token, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError('Password does not meet requirements')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Password has been reset successfully!')
      setIsSuccess(true)
      
      // Redirect to sign in page after 3 seconds
      setTimeout(() => {
        router.push('/auth/signin?message=Password reset successfully')
      }, 3000)
    } catch (err) {
      setError('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const passwordValidation = validatePassword(formData.password)

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Password Reset Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your password has been updated. Redirecting to sign in...
            </p>
          </motion.div>

          <motion.div 
            className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Redirecting to sign in...</p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Your Password
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Create a new password for
          </p>
          <p className="text-lg font-medium text-gray-900 mb-8">
            {email}
          </p>
        </motion.div>

        <motion.div 
          className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li className={`flex items-center ${passwordValidation.requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${passwordValidation.requirements.minLength ? 'text-green-500' : 'text-gray-400'}`} />
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.requirements.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${passwordValidation.requirements.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`} />
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.requirements.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${passwordValidation.requirements.hasLowerCase ? 'text-green-500' : 'text-gray-400'}`} />
                    One lowercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.requirements.hasNumbers ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${passwordValidation.requirements.hasNumbers ? 'text-green-500' : 'text-gray-400'}`} />
                    One number
                  </li>
                  <li className={`flex items-center ${passwordValidation.requirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                    <CheckCircleIcon className={`w-4 h-4 mr-2 ${passwordValidation.requirements.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`} />
                    One special character
                  </li>
                </ul>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <div className="flex">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="flex items-center justify-center text-sm text-green-600 hover:text-green-500"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </form>

          {/* Auth Navigation Section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4 text-center">Other Options</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link 
                href="/auth/signup" 
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create New Account
              </Link>
              
              <Link 
                href="/auth/forgot-password" 
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Forgot Password?
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
