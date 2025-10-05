// Local Storage Service for User Data
// This will be replaced with database in production

export interface UserData {
  id: string
  name: string
  email: string
  language: string
  country: string
  role: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
    location: {
      lat?: number
      lng?: number
      address?: string
    }
  }
  farmingData: {
    crops: Array<{
      id: string
      name: string
      plantingDate: string
      expectedHarvest: string
      status: 'planted' | 'growing' | 'harvested'
    }>
    analytics: Array<{
      date: string
      metric: string
      value: number
    }>
  }
  learningProgress: {
    completedCourses: string[]
    currentCourse?: string
    achievements: string[]
  }
  createdAt: string
  updatedAt: string
}

export class LocalStorageService {
  private static readonly USER_KEY = 'afrimind_user_data'
  private static readonly SESSION_KEY = 'afrimind_session'

  // User Management
  static createUser(userData: Partial<UserData>): UserData {
    const user: UserData = {
      id: crypto.randomUUID(),
      name: userData.name || 'Farmer',
      email: userData.email || '',
      language: userData.language || 'en',
      country: userData.country || 'NG',
      role: userData.role || 'user',
      preferences: {
        theme: 'light',
        notifications: true,
        location: {}
      },
      farmingData: {
        crops: [],
        analytics: []
      },
      learningProgress: {
        completedCourses: [],
        achievements: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    return user
  }

  static getUser(): UserData | null {
    if (typeof window === 'undefined') return null
    
    const userData = localStorage.getItem(this.USER_KEY)
    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  static updateUser(updates: Partial<UserData>): UserData | null {
    const user = this.getUser()
    if (!user) return null

    const updatedUser: UserData = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser))
    return updatedUser
  }

  static deleteUser(): void {
    localStorage.removeItem(this.USER_KEY)
    localStorage.removeItem(this.SESSION_KEY)
  }

  // Session Management
  static createSession(user: UserData): void {
    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        language: user.language,
        country: user.country
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
  }

  static getSession(): any | null {
    if (typeof window === 'undefined') return null
    
    const sessionData = localStorage.getItem(this.SESSION_KEY)
    if (!sessionData) return null

    try {
      const session = JSON.parse(sessionData)
      // Check if session is expired
      if (new Date(session.expires) < new Date()) {
        this.deleteSession()
        return null
      }
      return session
    } catch {
      return null
    }
  }

  static deleteSession(): void {
    localStorage.removeItem(this.SESSION_KEY)
  }

  // Farming Data
  static addCrop(crop: UserData['farmingData']['crops'][0]): UserData | null {
    const user = this.getUser()
    if (!user) return null

    user.farmingData.crops.push(crop)
    return this.updateUser({ farmingData: user.farmingData })
  }

  static updateCrop(cropId: string, updates: Partial<UserData['farmingData']['crops'][0]>): UserData | null {
    const user = this.getUser()
    if (!user) return null

    const cropIndex = user.farmingData.crops.findIndex(crop => crop.id === cropId)
    if (cropIndex === -1) return user

    user.farmingData.crops[cropIndex] = { ...user.farmingData.crops[cropIndex], ...updates }
    return this.updateUser({ farmingData: user.farmingData })
  }

  static addAnalytics(analytics: UserData['farmingData']['analytics'][0]): UserData | null {
    const user = this.getUser()
    if (!user) return null

    user.farmingData.analytics.push(analytics)
    return this.updateUser({ farmingData: user.farmingData })
  }

  // Learning Progress
  static completeCourse(courseId: string): UserData | null {
    const user = this.getUser()
    if (!user) return null

    if (!user.learningProgress.completedCourses.includes(courseId)) {
      user.learningProgress.completedCourses.push(courseId)
    }
    return this.updateUser({ learningProgress: user.learningProgress })
  }

  static addAchievement(achievement: string): UserData | null {
    const user = this.getUser()
    if (!user) return null

    if (!user.learningProgress.achievements.includes(achievement)) {
      user.learningProgress.achievements.push(achievement)
    }
    return this.updateUser({ learningProgress: user.learningProgress })
  }

  // Preferences
  static updatePreferences(preferences: Partial<UserData['preferences']>): UserData | null {
    const user = this.getUser()
    if (!user) return null

    user.preferences = { ...user.preferences, ...preferences }
    return this.updateUser({ preferences: user.preferences })
  }

  // Export/Import for Production Migration
  static exportUserData(): string {
    const user = this.getUser()
    return user ? JSON.stringify(user, null, 2) : ''
  }

  static importUserData(data: string): boolean {
    try {
      const userData = JSON.parse(data)
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData))
      return true
    } catch {
      return false
    }
  }
}
