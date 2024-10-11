import app from "@/constants"
import { useTranslations } from "next-intl"

export default function Title() {
	const t = useTranslations("pages.home.hero")
	const slogan = app.useI18n ? t(app.pages.home.hero.sloganCode) : app.pages.home.hero.slogan
	const formattedSlogan = slogan.split(/(?<=[,，])/).map((part, index) => (
		<span key={index}>
			{part}
			{part.match(/[,，]/) && <br />}
		</span>
	))

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-balance break-words font-serif text-6xl font-semibold lg:text-7xl">{formattedSlogan}</h1>
			<p className="text-wrap break-words tracking-tighter text-muted-foreground md:text-lg lg:text-2xl">
				{app.useI18n ? t(app.pages.home.hero.descriptionCode) : app.pages.home.hero.description}
			</p>
		</div>
	)
}
