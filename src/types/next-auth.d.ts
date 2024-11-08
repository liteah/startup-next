import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      avatar?: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    avatar?: string
    googleId?: string
    githubId?: string
    emailVerified?: Date | null
  }
}
