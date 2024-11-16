'use server'

import type { Locale } from '@/modules/i18n'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || 'en'
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale)
}
