import FAQ from "@/components/marketing/faq"
import Features from "@/components/marketing/features"
import Hero from "@/components/marketing/hero"
import Testimonial from "@/components/marketing/testimonial"

export default function Home() {
	return (
		<div className="mx-auto flex max-w-7xl flex-col items-center justify-center mb-10 lg:mb-16 gap-8 md:gap-20 lg:gap-28 px-4 py-10 sm:px-6 lg:px-8">
			<Hero />
			<Features />
			<Testimonial />
			<FAQ />
		</div>
	)
}
