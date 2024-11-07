import type { Session, User } from 'next-auth'
/* eslint-disable node/prefer-global/process */
import { GoogleLogo } from '@/components/icons/brand/google'
import { adapter } from '@/lib/prisma'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const providers = [
  {
    id: 'google',
    name: 'Google',
    logo: GoogleLogo,
  },
  {
    id: 'github',
    name: 'GitHub',
    logo: GitHubLogoIcon,
  },
]

export const config = {
  adapter,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar: profile.picture,
          emailVerified: profile.email_verified ? new Date() : null,
          googleId: profile.sub,
        }
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          avatar: profile.avatar_url,
          emailVerified: null,
          githubId: profile.id.toString(),
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session, user: User }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
}

export const { auth } = NextAuth(config)
