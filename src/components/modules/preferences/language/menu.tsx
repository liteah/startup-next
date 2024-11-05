'use client'

import type { ChangeEvent } from 'react'
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { languages } from '@/modules/i18n'
import router from 'next/router'
import { useLocale } from 'next-intl'

export function LanguageSwitchMenu() {
  const currentLocale = useLocale()

  function setLocale(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale};`
    window.location.reload()
  }

  return (
    <DropdownMenuRadioGroup value={currentLocale} onValueChange={value => setLocale(value)}>
      {languages.map(lang => (
        <DropdownMenuRadioItem key={lang.lang} value={lang.lang}>
          {lang.name}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )
}
