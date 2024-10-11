import type { Metadata } from "next"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations } from "next-intl/server"

import "@/app/globals.css"

import constant from "@/constants"
import { locales } from "@/i18n"

import ThemeProvider from "@/components/layout/theme-provider"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "metadata" })

	return {
		title: t("title"),
		description: t("description"),
	}
}

export default function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const messages = useMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				{constant.canonical && <link rel="canonical" href={constant.domain} />}
				<link rel="alternate" hrefLang="en" href={`${constant.domain}/`} />
				{locales.map((lang) => (
					<link key={lang} rel="alternate" hrefLang={lang} href={`${constant.domain}/${lang}`} />
				))}
				<link rel="alternate" hrefLang="x-default" href={constant.domain} />
			</head>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
