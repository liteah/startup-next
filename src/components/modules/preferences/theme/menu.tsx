import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

export function ThemeSwitchMenu() {
  const t = useTranslations('preferences.theme')
  const { theme, setTheme } = useTheme()

  const iconStyle = 'size-4'

  const themes = [
    {
      label: t('light'),
      value: 'light',
      icon: <Sun className={iconStyle} />,
    },
    {
      label: t('dark'),
      value: 'dark',
      icon: <Moon className={iconStyle} />,
    },
    {
      label: t('system'),
      value: 'system',
      icon: <Monitor className={iconStyle} />,
    },
  ]

  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={value => setTheme(value)}>
      {themes.map(({ label, value, icon }) => (
        <DropdownMenuRadioItem key={value} value={value} className="flex gap-1.5">
          {icon}
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )
}
