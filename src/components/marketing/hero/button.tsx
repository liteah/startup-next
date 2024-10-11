import Link from "next/link"
import app from "@/constants"
import { useTranslations } from "next-intl"

import { RainbowButton } from "@/components/magicui/modified/rainbow-button"

export default function Button() {
	const t = useTranslations("pages.home.hero")
	return (
		<>
			<Link href={app.pages.home.hero.cta.link}>
				<RainbowButton>
					{app.useI18n ? t(app.pages.home.hero.cta.labelCode) : app.pages.home.hero.cta.label}
				</RainbowButton>
			</Link>
			{app.pages.home.hero.cta.showDescription && (
				<p className="text-xs text-muted-foreground">
					{app.useI18n ? t(app.pages.home.hero.cta.descriptionCode) : app.pages.home.hero.cta.description}
				</p>
			)}
		</>
	)
}
