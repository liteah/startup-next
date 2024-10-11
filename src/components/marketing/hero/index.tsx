import BlurFade from "@/components/magicui/blur-fade"
import Badge from "@/components/marketing/hero/badge"
import Button from "@/components/marketing/hero/button"
import Demo from "@/components/marketing/hero/demo"
import Logo from "@/components/marketing/hero/logo"
import Testimonial from "@/components/marketing/hero/testimonial"
import Title from "@/components/marketing/hero/title"

export default function Home() {
	return (
		<>
			<section className="mx-auto flex flex-col items-center justify-center gap-8 px-4 pt-20 text-center sm:px-6 lg:px-8">
				<BlurFade delay={0.35} inView className="flex flex-col gap-5">
					<Badge />
					<Title />
				</BlurFade>
				<BlurFade delay={0.35 * 1} inView className="flex flex-col gap-5">
					<Button />
					<Testimonial />
				</BlurFade>
				<BlurFade delay={0.35 * 2} inView>
					<Demo />
					<div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4" />
				</BlurFade>
				<BlurFade delay={0.35} inView className="flex flex-col gap-2">
					<Logo />
				</BlurFade>
			</section>
		</>
	)
}
