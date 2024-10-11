import constant from "@/constants"
import { useTranslations } from "next-intl"

import AvatarCircles from "@/components/magicui/avatar-circles"
import Rating from "@/components/marketing/hero/rating"

export default function Testimonial() {
	const t = useTranslations("pages.home.hero")
	return (
		<div className="flex flex-col items-center gap-1.5">
			<AvatarCircles numPeople={99} avatarUrls={constant.pages.home.hero.avatars.urls} />
			<p className="text-sm text-muted-foreground">
				{constant.useI18n
					? t(constant.pages.home.hero.avatars.descriptionCode)
					: constant.pages.home.hero.avatars.description}
			</p>
			<Rating />
		</div>
	)
}
