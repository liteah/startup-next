import app from "@/constants"
import { useTranslations } from "next-intl"

import Marquee from "@/components/magicui/marquee"

export default function Logo() {
	const t = useTranslations("pages.home.hero")
	const logos = app.pages.home.hero.logo.src

	return (
		<div className="group relative mx-auto">
			<h3 className="text-center text-sm font-semibold text-gray-500">
				{app.useI18n ? t(app.pages.home.hero.logo.labelCode) : app.pages.home.hero.logo.label}
			</h3>
			<div className="relative mt-6 block max-w-xs md:max-w-md lg:max-w-screen-md xl:max-w-screen-lg">
				<Marquee
					pauseOnHover
					className="group flex flex-row overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]"
				>
					{logos.map((logo, index) => (
						<span key={index} className="mx-1.5">
							{logo}
						</span>
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background" />
				<div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background" />
			</div>
		</div>
	)
}
