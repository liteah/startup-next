import app from "@/constants"
import { Star, StarHalf } from "lucide-react"

import NumberTicker from "@/components/magicui/number-ticker"

export default function Rating() {
	const rating = app.pages.home.hero.rating

	function renderStars() {
		const stars = []
		for (let i = 1; i <= 5; i++) {
			const isFilled = i <= Math.floor(rating)
			const isHalf = i === Math.ceil(rating) && rating % 1 !== 0

			if (isFilled) {
				stars.push(<Star key={i} fill="orange" color="orange" className="h-5 w-5" />)
			} else if (isHalf) {
				stars.push(
					<div key={i} className="relative">
						<Star fill="lightgray" color="lightgray" className="h-5 w-5" />
						<StarHalf fill="orange" color="orange" className="absolute left-0 top-0 h-5 w-5" />
					</div>,
				)
			} else {
				stars.push(<Star key={i} fill="gray" color="lightgray" className="h-5 w-5" />)
			}
		}
		return stars
	}
	return (
		<div className="flex items-center justify-center gap-0.5">
			{renderStars()}
			<NumberTicker
				value={rating}
				decimalPlaces={1}
				delay={0.35 * 2}
				className="ml-1 font-extrabold text-orange-600 dark:text-orange-400"
			/>
		</div>
	)
}
