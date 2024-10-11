import constant from "@/constants"
import { useTranslations } from "next-intl"

import BlurFade from "@/components/magicui/blur-fade"
import SectionTitle from "@/components/marketing/section-title"

export default function Features() {
	const t = useTranslations("home.section")
	return (
		<section className="mx-auto flex flex-col gap-8 text-center">
			<BlurFade delay={0.35 * 1} inView>
				<SectionTitle
					headline={
						constant.useI18n ? t(constant.pages.home.section[0].headlineCode) : constant.pages.home.section[0].headline
					}
					title={constant.useI18n ? t(constant.pages.home.section[0].titleCode) : constant.pages.home.section[0].title}
				/>
			</BlurFade>
		</section>
	)
}
