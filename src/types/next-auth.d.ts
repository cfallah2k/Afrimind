import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      language?: string
      country?: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
    language?: string
    country?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}
