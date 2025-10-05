'use client'

import Link from 'next/link'

interface AuthNavigationProps {
  currentPage?: 'signin' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-otp'
  title?: string
}

export function AuthNavigation({ currentPage, title = "Authentication Options" }: AuthNavigationProps) {
  const authPages = [
    {
      key: 'signin',
      href: '/auth/signin',
      label: 'Sign In',
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
    },
    {
      key: 'signup',
      href: '/auth/signup',
      label: 'Create Account',
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      key: 'forgot-password',
      href: '/auth/forgot-password',
      label: 'Forgot Password',
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      key: 'verify-otp',
      href: '/auth/verify-otp',
      label: 'Verify Email',
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  // Filter out the current page
  const availablePages = authPages.filter(page => page.key !== currentPage)

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4 text-center">{title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {availablePages.map((page) => (
          <Link 
            key={page.key}
            href={page.href} 
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {page.icon}
            {page.label}
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Need help? Contact support or check our documentation
        </p>
      </div>
    </div>
  )
}
