import { NextResponse } from 'next/server'

export function middleware(req: any) {
  const { pathname } = req.nextUrl
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/signin',
    '/auth/signup', 
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-otp',
    '/api/auth',
    '/_next',
    '/favicon.ico'
  ]
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // For all other routes, we'll let the client-side AuthGuard handle the authentication check
  // This allows for better user experience with loading states
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
