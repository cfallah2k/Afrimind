'use client'

import { usePathname } from 'next/navigation'
import { AuthGuard } from './auth-guard'

interface ConditionalAuthGuardProps {
  children: React.ReactNode
}

export function ConditionalAuthGuard({ children }: ConditionalAuthGuardProps) {
  const pathname = usePathname()
  
  // Check if the current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth')
  
  // If it's an auth page, don't apply the auth guard
  if (isAuthPage) {
    return <>{children}</>
  }
  
  // For all other pages, apply the auth guard
  return <AuthGuard>{children}</AuthGuard>
}
