'use server'

import { prisma } from '@/lib/prisma'
import { config } from '@/modules/auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export async function getUserWorkspaces() {
  const session = await getServerSession(config)
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const memberships = await prisma.membership.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      workspace: true,
    },
  })

  return memberships.map(membership => ({
    id: membership.workspace.id,
    name: membership.workspace.name,
    avatar: membership.workspace.avatar,
    plan: membership.workspace.plan,
    role: membership.role,
  }))
}

export async function switchWorkspace(workspaceId: string) {
  const session = await getServerSession(config)
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const membership = await prisma.membership.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId,
      },
    },
  })

  if (!membership) {
    throw new Error('Workspace not found')
  }

  redirect(`/workspace/${workspaceId}`)
}
