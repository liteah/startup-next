'use server'

import { generateId } from '@/lib/id'
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

export async function createWorkspace(data: { name: string }) {
  try {
    const session = await getServerSession(config)
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const workspaceId = generateId()
    const workspace = await prisma.workspace.create({
      data: {
        id: workspaceId,
        name: data.name,
        creatorId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER',
          },
        },
      },
    })

    return { success: true, workspaceId: workspace.id }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function updateWorkspaceSettings(workspaceId: string, data: {
  name: string
  avatar?: string
}) {
  try {
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

    if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
      throw new Error('Permission denied')
    }

    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        name: data.name,
        avatar: data.avatar,
      },
    })

    return { success: true, workspace }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteWorkspace(workspaceId: string) {
  try {
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

    if (!membership || membership.role !== 'OWNER') {
      throw new Error('Only workspace owner can delete workspace')
    }

    await prisma.workspace.delete({
      where: { id: workspaceId },
    })

    return { success: true }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
