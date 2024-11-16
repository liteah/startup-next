'use client'

import { setUserLocale } from '@/actions/locale'
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { languages } from '@/modules/i18n'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export function LanguageSwitchMenu() {
  const currentLocale = useLocale()
  const router = useRouter()

  async function setLocale(locale: string) {
    await setUserLocale(locale)
    router.refresh()
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
