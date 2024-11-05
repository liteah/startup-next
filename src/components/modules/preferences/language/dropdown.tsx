'use client'

import { LanguageSwitchMenu } from '@/components/modules/preferences/language/menu'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Languages } from 'lucide-react'

export function LanguageSwitchIconDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <LanguageSwitchMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LanguageSwitchDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <LanguageSwitchMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
