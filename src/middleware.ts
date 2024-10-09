import { type NextRequest } from 'next/server'

import intl from '@/middlewares/intl'

export default function middleware(request: NextRequest) {
  return intl(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};