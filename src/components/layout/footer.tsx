import Link from "next/link"
import constant from "@/constants"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
	const t = useTranslations("footer")
	return (
		<footer className="border-t bg-background/55">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
					<div className="mx-auto w-64 flex-shrink-0 text-center md:mx-0 md:text-left">
						<Link href="/#" aria-current="page" className="flex items-center justify-center gap-2 md:justify-start">
							{constant.logo}
							<strong className="text-base font-extrabold tracking-tight md:text-lg">{constant.name}</strong>
						</Link>
						<p className="mt-3 text-sm text-muted-foreground">
							Copyright © {new Date().getFullYear()} {constant.name}. All rights reserved.
						</p>
					</div>
					<div className="-mb-10 mt-10 flex flex-grow flex-wrap justify-center text-center md:mt-0">
						{constant.footer.links.map((link) => (
							<div className="w-full px-4 md:w-1/2 lg:w-1/3" key={link.code}>
								<div className="mb-3 text-left text-sm font-semibold tracking-widest">
									{constant.useI18n ? t(link.code) : link.group}
								</div>
								<div className="mb-10 flex flex-col items-start justify-center gap-2 text-sm">
									{link.list.map((item) => (
										<Link
											key={item.code}
											href={item.href}
											className="group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90"
											aria-label={constant.useI18n ? t(item.code) : item.label}
										>
											{constant.useI18n ? t(item.code) : item.label}
											<ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
