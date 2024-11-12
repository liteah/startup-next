import { unflatten } from 'flat'
import { getRequestConfig } from 'next-intl/server'

export type Locale = (typeof locales)[number]

export const COOKIE_NAME = 'NEXT_LOCALE'

export const languages = [
  {
    code: 'en-US',
    lang: 'en',
    name: 'English',
  },
  {
    code: 'zh-CN',
    lang: 'zh',
    name: '简体中文',
  },
]

export const namespaces = ['app', 'common']

export const locales = languages.map(lang => lang.lang)

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'
  }

  const messages = {}
  for (const namespace of namespaces) {
    const nsMessages = (await import(`./locales/${namespace}/${locale}.json`)).default
    const flatMessages = unflatten(nsMessages)
    Object.assign(messages, flatMessages)
  }

  return {
    locale,
    messages,
  }
})
