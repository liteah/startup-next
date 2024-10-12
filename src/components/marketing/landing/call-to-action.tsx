import ShimmerButton from "@/components/magicui/shimmer-button"
import constant from "@/constants"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function CallToAction() {
	const t = useTranslations("pages.home")
	return (
		<div className="flex flex-col col-5 items-center space-y-4">
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
				{constant.pages.home.cta.icon}
			</div>
			<h2 className="text-center text-2xl font-bold">{constant.pages.home.cta.title}</h2>
			<p className="text-center text-muted-foreground">{constant.pages.home.cta.description}</p>
			<Link href={constant.pages.home.cta.link}>
				<ShimmerButton className="shadow-xl">
					<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight dark:text-white lg:text-lg">
						{constant.useI18n ? t(constant.pages.home.cta.buttonCode) : constant.pages.home.cta.button}
					</span>
				</ShimmerButton>
			</Link>
		</div>
	)
}
