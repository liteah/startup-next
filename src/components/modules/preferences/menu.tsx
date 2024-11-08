import { LanguageSwitchMenu } from '@/components/modules/preferences/language/menu'
import { ThemeSwitchMenu } from '@/components/modules/preferences/theme/menu'
import { DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { Contrast, Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function PreferencesMenu() {
  const t = useTranslations('preferences')
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Contrast className="text-muted-foreground" />
            {t('theme.title')}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ThemeSwitchMenu />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="text-muted-foreground" />
            {t('language')}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <LanguageSwitchMenu />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  )
}
