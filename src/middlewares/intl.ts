import { locales } from "@/i18n"
import createMiddleware from "next-intl/middleware"

import { localePrefix } from "@/app/navigation"

const intl = createMiddleware({
	locales,
	defaultLocale: "en",
	localePrefix,
})

export default intl
