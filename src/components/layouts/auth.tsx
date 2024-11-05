import { ProductLogo } from '@/components/common/product-logo'
import { LanguageSwitchIconDropdown } from '@/components/modules/preferences/language/dropdown'
import { ThemeSwitchDropdown } from '@/components/modules/preferences/theme/dropdown'
import { useTranslations } from 'next-intl'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex flex-grow items-center justify-center p-4">
        {children}
      </main>
      <AuthFooter />
    </div>
  )
}

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-4 sm:p-6">
      <ProductLogo />
      <div className="flex items-center space-x-2">
        <LanguageSwitchIconDropdown />
        <ThemeSwitchDropdown />
      </div>
    </header>
  )
}

export function AuthFooter() {
  const t = useTranslations('brand')
  return (
    <footer className="p-4 text-center text-xs text-muted-foreground">
      ©
      {' '}
      {new Date().getFullYear()}
      {' '}
      {t('name')}
      .
      {' '}
      {t('copyright')}
    </footer>
  )
}
