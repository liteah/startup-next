import constant from "@/constants"
import { useTranslations } from "next-intl"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BlurFade from "@/components/magicui/blur-fade"
import SectionTitle from "@/components/marketing/section-title"

export default function FAQ() {
	const t = useTranslations("pages.home.faq")
	return (
		<section className="mx-auto flex flex-col items-center justify-center gap-8">
			<BlurFade delay={0.35} inView>
				<SectionTitle
					headline={constant.useI18n ? t(constant.pages.home.faq.headlineCode) : constant.pages.home.faq.headline}
					title={constant.useI18n ? t(constant.pages.home.faq.titleCode) : constant.pages.home.faq.title}
				/>
			</BlurFade>
			<BlurFade delay={0.35 * 2} inView className="w-full max-w-xs sm:max-w-sm md:max-w-lg">
				<Accordion type="single" collapsible className="w-full">
					{constant.pages.home.faq.list.map((item, index) => (
						<AccordionItem key={index} value={`item-${index + 1}`}>
							<AccordionTrigger className="text-base hover:no-underline">{item.question}</AccordionTrigger>
							<AccordionContent className="text-base">{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</BlurFade>
		</section>
	)
}
