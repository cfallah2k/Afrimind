'use client'

import { useEffect, useState } from 'react'

export function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<{
    nextauthSecret: boolean
    nextauthUrl: boolean
    databaseUrl: boolean
  }>({
    nextauthSecret: false,
    nextauthUrl: false,
    databaseUrl: false
  })

  useEffect(() => {
    // Check environment variables (client-side check)
    const checkEnv = async () => {
      try {
        const response = await fetch('/api/env-check')
        const data = await response.json()
        setEnvStatus(data)
      } catch (error) {
        console.error('Failed to check environment variables:', error)
      }
    }

    checkEnv()
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return null // Don't show in development
  }

  const hasErrors = !envStatus.nextauthSecret || !envStatus.nextauthUrl

  if (!hasErrors) {
    return null
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Configuration Error
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>Missing required environment variables:</p>
            <ul className="list-disc list-inside mt-1">
              {!envStatus.nextauthSecret && <li>NEXTAUTH_SECRET</li>}
              {!envStatus.nextauthUrl && <li>NEXTAUTH_URL</li>}
            </ul>
            <p className="mt-2">
              Please check the <a href="/NETLIFY_SETUP.md" className="underline">setup guide</a> for instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
