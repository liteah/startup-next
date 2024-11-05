import type { NextRequest } from 'next/server'
import { locales } from '@/modules/i18n'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
})

export async function middleware(request: NextRequest) {
  const response = await intlMiddleware(request)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
