"use client"

import { useState } from "react"
import constant from "@/constants"
import { CheckIcon, StarIcon } from "lucide-react"
import { useTranslations } from "next-intl"

interface PricingTabProps {
	yearly: boolean
	popular?: boolean
	planName: string
	price: {
		monthly: number
		yearly: number
	}
	planDescription: string
	features: string[]
}

function PricingTab(props: PricingTabProps) {
	return (
		<div className={`h-full ${props.popular ? "rounded-2xl border-2 border-primary" : ""}`}>
			<div className="relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow shadow-foreground/5 dark:border-border dark:bg-background">
				{props.popular && (
					<div className="absolute right-0 top-0 -mt-4 mr-6">
						<div className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-foreground/5">
							<StarIcon className="mr-1 size-3" />
							Most Popular
						</div>
					</div>
				)}
				<div className="mb-5">
					<div className="mb-1 font-semibold text-foreground dark:text-foreground">{props.planName}</div>
					<div className="mb-2 inline-flex items-baseline">
						<span className="text-3xl font-bold text-foreground dark:text-foreground">$</span>
						<span className="text-4xl font-bold text-foreground dark:text-foreground">
							{props.yearly ? props.price.yearly : props.price.monthly}
						</span>
						<span className="font-medium text-muted-foreground">/mo</span>
					</div>
					<div className="mb-5 text-sm text-muted-foreground">{props.planDescription}</div>
					<a
						className={`inline-flex w-full justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium shadow-sm shadow-foreground/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-ring dark:focus-visible:ring-ring ${
							props.popular
								? "bg-primary text-primary-foreground hover:bg-primary/90"
								: "bg-secondary text-secondary-foreground hover:bg-secondary/90"
						}`}
						href="#0"
					>
						Purchase
					</a>
				</div>
				<div className="mb-3 font-medium text-foreground dark:text-foreground">Includes:</div>
				<ul className="grow space-y-3 text-sm text-muted-foreground dark:text-muted-foreground">
					{props.features.map((feature, index) => {
						return (
							<li key={index} className="flex items-center">
								<CheckIcon className="mr-2 size-4 text-primary" />
								<span>{feature}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default function PricingTable() {
	const t = useTranslations("pricing")
	const [isAnnual, setIsAnnual] = useState<boolean>(true)

	return (
		<div>
			<div className="m-auto mb-8 flex max-w-[14rem] justify-center lg:mb-16">
				<div className="relative flex w-full rounded-full bg-secondary p-1">
					<span className="pointer-events-none absolute inset-0 m-1" aria-hidden="true">
						<span
							className={`absolute inset-0 w-1/2 transform rounded-full bg-primary shadow-sm shadow-foreground/10 transition-transform duration-150 ease-in-out ${isAnnual ? "translate-x-0" : "translate-x-full"}`}
						/>
					</span>
					<button
						className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-ring dark:focus-visible:ring-ring ${isAnnual ? "text-primary-foreground" : "text-muted-foreground dark:text-muted-foreground"}`}
						onClick={() => setIsAnnual(true)}
						aria-pressed={isAnnual}
					>
						Yearly{" "}
						<span
							className={`${isAnnual ? "text-primary-foreground/80" : "text-muted-foreground dark:text-muted-foreground"}`}
						>
							-20%
						</span>
					</button>
					<button
						className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-ring dark:focus-visible:ring-ring ${isAnnual ? "text-muted-foreground dark:text-muted-foreground" : "text-primary-foreground"}`}
						onClick={() => setIsAnnual(false)}
						aria-pressed={isAnnual}
					>
						Monthly
					</button>
				</div>
			</div>

			<div className="mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
				{constant.pricing.plans.map((plan, index) => (
					<PricingTab
						key={index}
						yearly={isAnnual}
						popular={plan.popluar}
						planName={plan.name}
						price={plan.price}
						planDescription={constant.useI18n ? t(plan.descriptionCode) : plan.description}
						features={plan.features}
					/>
				))}
			</div>
		</div>
	)
}
