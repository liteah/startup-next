import type { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export async function createDefaultWorkspace(user: User) {
  const defaultWorkspaceName = user.name
    ? `${user.name}'s Workspace`
    : `${user.email.split('@')[0]}'s Workspace`

  return await prisma.workspace.create({
    data: {
      name: defaultWorkspaceName,
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
