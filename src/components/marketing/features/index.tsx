import constant from "@/constants"
import { Home, Settings, User } from "lucide-react"
import { useTranslations } from "next-intl"

import BlurFade from "@/components/magicui/blur-fade"
import SectionTitle from "@/components/marketing/landing/section-title"
import CallToAction from "@/components/marketing/landing/call-to-action"

const items = [
	{
		title: "主页",
		content: <div>主页内容</div>,
		description: "这是主页的描述",
		icon: <Home />,
	},
	{
		title: "设置",
		content: <div>设置内容</div>,
		description: "这是设置的描述",
		icon: <Settings />,
	},
	{
		title: "用户",
		content: <div>用户内容</div>,
		description: "这是用户的描述",
		icon: <User />,
	},
]

export default function Features() {
	const t = useTranslations("home.section")
	return (
		<section className="mx-auto flex w-full flex-col gap-8 text-center">
			<BlurFade delay={0.35 * 1} inView>
				<SectionTitle
					headline={
						constant.useI18n ? t(constant.pages.home.section[0].headlineCode) : constant.pages.home.section[0].headline
					}
					title={constant.useI18n ? t(constant.pages.home.section[0].titleCode) : constant.pages.home.section[0].title}
				/>
			</BlurFade>
			<CallToAction />
		</section>
	)
}
