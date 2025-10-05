'use client'

import { useState, useEffect } from 'react'
import { LocalStorageService, UserData } from '@/lib/local-storage'

export interface LocalSession {
  user: {
    id: string
    name: string
    email: string
    role: string
    language: string
    country: string
  } | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

export function useLocalAuth() {
  const [session, setSession] = useState<LocalSession>({
    user: null,
    status: 'loading'
  })

  useEffect(() => {
    // Check for existing session
    const localSession = LocalStorageService.getSession()
    if (localSession) {
      setSession({
        user: localSession.user,
        status: 'authenticated'
      })
    } else {
      setSession({
        user: null,
        status: 'unauthenticated'
      })
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // For demo purposes, accept any email/password
    // In production, this would validate against a real database
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Create or get user
    let user = LocalStorageService.getUser()
    if (!user) {
      user = LocalStorageService.createUser({
        name: email.split('@')[0], // Use email prefix as name
        email,
        language: 'en',
        country: 'NG'
      })
    }

    // Create session
    LocalStorageService.createSession(user)
    
    setSession({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        language: user.language,
        country: user.country
      },
      status: 'authenticated'
    })

    return { user }
  }

  const signUp = async (name: string, email: string, password: string, country: string, language: string) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required')
    }

    // Create new user
    const user = LocalStorageService.createUser({
      name,
      email,
      language,
      country,
      role: 'user'
    })

    // Create session
    LocalStorageService.createSession(user)
    
    setSession({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        language: user.language,
        country: user.country
      },
      status: 'authenticated'
    })

    return { user }
  }

  const signOut = () => {
    LocalStorageService.deleteSession()
    setSession({
      user: null,
      status: 'unauthenticated'
    })
  }

  const updateUser = (updates: Partial<UserData>) => {
    const updatedUser = LocalStorageService.updateUser(updates)
    if (updatedUser) {
      // Update session with new user data
      LocalStorageService.createSession(updatedUser)
      setSession({
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          language: updatedUser.language,
          country: updatedUser.country
        },
        status: 'authenticated'
      })
    }
    return updatedUser
  }

  return {
    data: session,
    status: session.status,
    signIn,
    signUp,
    signOut,
    updateUser
  }
}
