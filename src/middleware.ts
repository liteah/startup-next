import { locales } from '@/modules/i18n'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
