'use client'

import { setUserLocale } from '@/actions/locale'
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { languages } from '@/modules/i18n'
import { useLocale } from 'next-intl'
import { startTransition } from 'react'

export function LanguageSwitchMenu() {
  const currentLocale = useLocale()

  function setLocale(locale: string) {
    startTransition(() => {
      setUserLocale(locale)
    })
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
