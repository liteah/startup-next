import Features from "@/components/marketing/features"
import Hero from "@/components/marketing/hero"

export default function Home() {
	return (
		<div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
			<Hero />
			<Features />
		</div>
	)
}
