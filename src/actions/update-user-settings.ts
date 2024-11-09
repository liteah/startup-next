'use server'

import { prisma } from '@/lib/prisma'
import { config } from '@/modules/auth'
import { getServerSession } from 'next-auth'

export async function updateUserGeneralSettings(data: {
  name?: string
  email?: string
  avatar?: string
}) {
  try {
    const session = await getServerSession(config)
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      },
    })

    return { success: true, user }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
