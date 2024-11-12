'use client'

import { NavMain } from '@/components/layouts/sidebar/nav-main'
import { NavProjects } from '@/components/layouts/sidebar/nav-projects'
import { NavSecondary } from '@/components/layouts/sidebar/nav-secondary'
import { NavUser } from '@/components/layouts/sidebar/user-menu'
import { WorkspaceSwitcher } from '@/components/layouts/sidebar/workspace-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import * as React from 'react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: `/workspace/${workspaceId}`,
        icon: SquareTerminal,
      },
      {
        title: 'Settings',
        url: `/workspace/${workspaceId}/settings`,
        icon: Settings2,
      },
    ],
    navSecondary: [
      {
        title: 'Support',
        url: '#',
        icon: LifeBuoy,
      },
      {
        title: 'Feedback',
        url: '#',
        icon: Send,
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: `/workspace/${workspaceId}/projects/design`,
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: `/workspace/${workspaceId}/projects/sales`,
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: `/workspace/${workspaceId}/projects/travel`,
        icon: Map,
      },
    ],
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
