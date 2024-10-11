import Link from "next/link"
import constant from "@/constants"
import { useTranslations } from "next-intl"

import { RainbowButton } from "@/components/magicui/modified/rainbow-button"

export default function Button() {
	const t = useTranslations("pages.home.hero")
	return (
		<>
			<Link href={constant.pages.home.hero.cta.link}>
				<RainbowButton>
					{constant.useI18n ? t(constant.pages.home.hero.cta.labelCode) : constant.pages.home.hero.cta.label}
				</RainbowButton>
			</Link>
			{constant.pages.home.hero.cta.showDescription && (
				<p className="text-xs text-muted-foreground">
					{constant.useI18n
						? t(constant.pages.home.hero.cta.descriptionCode)
						: constant.pages.home.hero.cta.description}
				</p>
			)}
		</>
	)
}
