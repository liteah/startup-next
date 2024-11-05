import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitchMenu() {
  const { theme, setTheme } = useTheme()

  const iconStyle = 'size-4'

  const themes = [
    {
      label: 'Light',
      value: 'light',
      icon: <Sun className={iconStyle} />,
    },
    {
      label: 'Dark',
      value: 'dark',
      icon: <Moon className={iconStyle} />,
    },
    {
      label: 'System',
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
