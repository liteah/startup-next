import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Auth() {
	return (
		<div className="flex items-center justify-center gap-2">
			<Link href="/login">
				<Button variant="secondary">Log In</Button>
			</Link>
			<Link href="/signup">
				<Button>Get Started</Button>
			</Link>
		</div>
	)
}
