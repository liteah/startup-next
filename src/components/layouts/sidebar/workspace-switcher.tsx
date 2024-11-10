'use client'

import { getUserWorkspaces, switchWorkspace } from '@/actions/workspace'
import { CreateWorkspace } from '@/components/modules/modals/create-workspace'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { CaretSortIcon, PlusIcon } from '@radix-ui/react-icons'
import { House } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Workspace {
  id: string
  name: string
  avatar?: string | null
  plan: 'FREE' | 'PRO' | 'ULTIMATE'
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER'
}

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()
  const t = useTranslations('workspace')
  const params = useParams()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currentWorkspaceId = params.workspaceId as string

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await getUserWorkspaces()
        setWorkspaces(data)
      }
      catch (error) {
        toast.error((error as Error).message)
      }
      finally {
        setIsLoading(false)
      }
    }
    loadWorkspaces()
  }, [])

  const activeWorkspace = workspaces.find(w => w.id === currentWorkspaceId) || workspaces[0]

  if (isLoading) {
    return (
      <LoadingSkeleton />
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <WorkspaceAvatar workspace={activeWorkspace} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeWorkspace?.name}
                  </span>
                  <span className="truncate text-xs">{activeWorkspace?.plan}</span>
                </div>
                <CaretSortIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {t('group')}
              </DropdownMenuLabel>
              {workspaces.map(workspace => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => switchWorkspace(workspace.id)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <WorkspaceAvatar workspace={workspace} />
                  </div>
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <PlusIcon className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    {t('add')}
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateWorkspace />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function WorkspaceAvatar({ workspace }: { workspace: Workspace }) {
  return (
    workspace.avatar
      ? (
          <img
            src={workspace.avatar}
            alt={workspace.name}
            className="size-4 rounded"
          />
        )
      : (
          <House className="size-4" />
        )
  )
}

function LoadingSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex gap-2">
        <Skeleton className="flex aspect-square size-8 items-center justify-center rounded-lg" />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
