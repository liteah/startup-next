import { Loader2 } from "lucide-react"

export default function Loading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Loader2 className="mr-2 animate-spin" />
			<span>Loading...</span>
		</div>
	)
}
