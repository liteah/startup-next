'use client'

import { ThemeSwitchMenu } from '@/components/modules/preferences/theme/menu'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitchDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="block dark:hidden" />
          <Moon className="hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeSwitchMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
