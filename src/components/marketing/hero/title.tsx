import constant from "@/constants"
import { useTranslations } from "next-intl"

export default function Title() {
	const t = useTranslations("pages.home.hero")
	const slogan = constant.useI18n ? t(constant.pages.home.hero.sloganCode) : constant.pages.home.hero.slogan
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
				{constant.useI18n ? t(constant.pages.home.hero.descriptionCode) : constant.pages.home.hero.description}
			</p>
		</div>
	)
}
