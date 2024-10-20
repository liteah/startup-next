"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import constant from "@/constants"
import { User } from "@supabase/supabase-js"
import { ArrowLeftIcon } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import SelectLanguage from "@/components/layout/select-language"
import ToggleTheme from "@/components/layout/toggle-theme"
import { useRouter } from "@/app/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user || null)
			if (session?.user) {
				router.push("/dashboard")
			}
		})

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [router])

	if (user) {
		return null
	}

	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex items-center justify-between p-4 sm:p-6">
				<Link href="/">
					<Button variant="outline" className="h-10">
						<ArrowLeftIcon className="size-4 md:mr-2" />
						<span className="hidden md:inline">Home</span>
					</Button>
				</Link>
				<Link href="/" className="hidden items-center space-x-2 md:flex">
					{constant.logo}
					<span className="text-lg font-semibold">{constant.name}</span>
				</Link>
				<div className="flex items-center space-x-2">
					<SelectLanguage />
					<ToggleTheme />
				</div>
			</header>

			<main className="flex flex-grow items-center justify-center p-4">{children}</main>

			<footer className="p-4 text-center text-xs text-muted-foreground">
				<div className="mb-2">
					© {new Date().getFullYear()} {constant.name}. All rights reserved.
				</div>
				<div className="space-x-4">
					<Link href="/privacy" className="transition-colors hover:text-primary">
						Privacy Policy
					</Link>
					<Link href="/terms" className="transition-colors hover:text-primary">
						Terms of Service
					</Link>
				</div>
			</footer>
		</div>
	)
}
