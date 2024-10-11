import Link from "next/link"
import app from "@/constants"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import AnimatedGradientText from "@/components/magicui/animated-gradient-text"

export default function Badge() {
	const t = useTranslations("pages.home.hero")
	return (
		<Link href={app.pages.home.hero.badge.link}>
			<AnimatedGradientText>
				{app.pages.home.hero.badge.emoji}
				<hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
				<span
					className={cn(
						`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
					)}
				>
					{app.useI18n ? t(app.pages.home.hero.badge.labelCode) : app.pages.home.hero.badge.label}
				</span>
				<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
			</AnimatedGradientText>
		</Link>
	)
}
