/* eslint-disable node/prefer-global/process */
import type { AuthOptions, Session, User } from 'next-auth'
import { GoogleLogo } from '@/components/icons/brand/google'
import { generateId } from '@/lib/id'
import { adapter, prisma } from '@/lib/prisma'
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
    async signIn({ user }: { user: { id: string, name?: string, email: string } }) {
      const existingWorkspace = await prisma.membership.findFirst({
        where: { userId: user.id },
      })

      if (!existingWorkspace) {
        const workspaceId = generateId()
        await prisma.workspace.create({
          data: {
            id: workspaceId,
            name: user.name ? `${user.name}'s Workspace` : `${user.email.split('@')[0]}'s Workspace`,
            creatorId: user.id,
            members: {
              create: {
                userId: user.id,
                role: 'OWNER',
              },
            },
          },
        })
      }
      return true
    },
    async session({ session, user }: { session: Session, user: User }) {
      if (session.user) {
        session.user.id = user.id
        session.user.avatar = user.avatar
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
}
export const { auth, handlers } = NextAuth(config as AuthOptions)
