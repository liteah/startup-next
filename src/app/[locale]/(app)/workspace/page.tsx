import { prisma } from '@/lib/prisma'
import { config } from '@/modules/auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function DefaultWorkspacePage() {
  const session = await getServerSession(config)
  if (!session?.user?.id)
    redirect('/signin')

  const firstWorkspace = await prisma.membership.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      workspace: true,
    },
  })

  if (firstWorkspace)
    redirect(`/workspace/${firstWorkspace.workspace.id}`)
}
