'use client'

import { PreferencesMenu } from '@/components/modules/preferences/menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
  BadgeCheck,
  LogOut,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function NavUser() {
  const t = useTranslations()
  const { isMobile } = useSidebar()
  const { data: session } = useSession()

  if (!session?.user)
    return null

  const user = session.user
  const displayName = user.name || user.email?.split('@')[0] || 'User'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar || undefined} alt={displayName} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="text-muted-foreground" />
                {t('account.settings.button')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <PreferencesMenu />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="text-muted-foreground" />
              {t('signout.button')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
