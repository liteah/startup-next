import type { Metadata } from "next"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { getTranslations } from "next-intl/server"

import "@/app/[locale]/globals.css"

import app from "@/constants"
import { locales } from "@/i18n"

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
				{app.canonical && <link rel="canonical" href={app.domain} />}
				<link rel="alternate" hrefLang="en" href={`${app.domain}/`} />
				{locales.map((lang) => (
					<link key={lang} rel="alternate" hrefLang={lang} href={`${app.domain}/${lang}`} />
				))}
				<link rel="alternate" hrefLang="x-default" href={app.domain} />
			</head>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
