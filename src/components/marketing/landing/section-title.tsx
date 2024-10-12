import { ReactNode } from "react"

interface SectionTitleProps {
	headline: ReactNode
	title: ReactNode
}

export default function SectionTitle({ headline, title }: SectionTitleProps) {
	return (
		<div className="flex flex-col gap-3 text-center">
			<div className="font-semibold text-primary">{headline}</div>
			<h2 className="text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">{title}</h2>
		</div>
	)
}
