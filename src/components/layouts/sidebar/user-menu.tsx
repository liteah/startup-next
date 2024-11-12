'use client'

import { ButtonSkeleton } from '@/components/layouts/sidebar/button-skeleton'
import { AccountSettings } from '@/components/modules/modals/account-settings'
import { PreferencesMenu } from '@/components/modules/preferences/menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { BadgeCheck, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function NavUser() {
  const t = useTranslations()
  const { isMobile } = useSidebar()
  const { status } = useSession()

  if (status === 'loading') {
    return <ButtonSkeleton />
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
                <AccountLabel />
                <CaretSortIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <AccountLabel />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <BadgeCheck className="text-muted-foreground" />
                    {t('account.settings.button')}
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
              <PreferencesMenu />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="text-muted-foreground" />
                {t('signout.button')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AccountSettings />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function AccountLabel() {
  const { data: session } = useSession()

  if (!session?.user)
    return null

  const user = session.user
  const displayName = user.name || user.email?.split('@')[0] || 'User'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.avatar || undefined} alt={displayName} />
        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{displayName}</span>
        <span className="text-xs font-normal">{user.email}</span>
      </div>
    </>
  )
}
