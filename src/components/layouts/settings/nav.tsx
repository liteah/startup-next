'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface NavItem {
  link: string
  name: string
  icon?: React.ElementType
}

interface SideNavProps {
  navItems: NavItem[]
}

export function SettingsNav({ navItems }: SideNavProps) {
  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] overflow-auto hidden lg:block lg:w-1/4">
      <nav className="space-y-1">
        {navItems.map(item => (
          <Link
            key={item.link}
            href={item.link}
            className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.icon && <item.icon className="size-5" />}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
