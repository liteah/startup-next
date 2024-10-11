import Image from "next/image"
import constant from "@/constants"

export default function Demo() {
	return (
		<div className="group relative max-w-screen-lg cursor-pointer rounded-md border p-2 shadow-lg ring-1 ring-slate-200/50 backdrop-blur-md dark:bg-gray-900/70 dark:ring-white/10">
			<Image
				src={constant.pages.home.hero.demo.light}
				alt="Demo Light Image"
				width={1200}
				height={700}
				className="relative block h-full w-full rounded-[inherit] border object-contain dark:hidden"
			/>
			<Image
				src={constant.pages.home.hero.demo.dark}
				alt="Demo Dark Image"
				width={1200}
				height={700}
				className="relative hidden h-full w-full rounded-[inherit] border object-contain dark:block"
			/>
		</div>
	)
}
