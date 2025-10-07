'use client'

import { usePathname } from 'next/navigation'
import { ResponsiveNavigation } from '@/components/responsive-navigation'

export function ConditionalNavigation() {
	const pathname = usePathname()
	const isAuthRoute = pathname?.startsWith('/auth')
	if (isAuthRoute) return null
	return <ResponsiveNavigation />
}
