import BlurFade from "@/components/magicui/blur-fade"
import FAQ from "@/components/marketing/faq"
import PricingTable from "@/components/marketing/pricing"
import SectionTitle from "@/components/marketing/section-title"

export default function Pricing() {
	return (
		<div className="mx-auto my-16 flex max-w-7xl flex-col items-center justify-center gap-10 px-4 py-10 sm:px-6 lg:mb-16 lg:px-8">
			<BlurFade delay={0.35} inView className="flex flex-col items-center justify-center gap-4">
				<SectionTitle headline="Pricing" title="Ship your app with confidence" />
				<p className="text-muted-foreground">
					Choose the plan that&apos;s right for you. No extra charges. No hidden fees.
				</p>
			</BlurFade>
			<BlurFade delay={0.35 * 2} inView>
				<PricingTable />
			</BlurFade>
			<BlurFade delay={0.35 * 3} inView className="mt-10 flex flex-col">
				<FAQ />
			</BlurFade>
		</div>
	)
}
