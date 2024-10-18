import FAQ from "@/components/marketing/faq"
import Features from "@/components/marketing/features"
import Hero from "@/components/marketing/hero"
import Testimonial from "@/components/marketing/testimonial"

export default function Home() {
	return (
		<div className="mx-auto mb-10 flex max-w-7xl flex-col items-center justify-center gap-8 px-4 py-10 sm:px-6 md:gap-20 lg:mb-16 lg:gap-28 lg:px-8">
			<Hero />
			<Features />
			<Testimonial />
			<FAQ />
		</div>
	)
}
