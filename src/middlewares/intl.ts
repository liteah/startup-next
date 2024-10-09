import createMiddleware from 'next-intl/middleware';

import { localePrefix } from '@/app/navigation';

import { locales } from '@/i18n';

const intl = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix,
});

export default intl;