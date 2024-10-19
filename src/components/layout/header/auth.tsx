"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import {
	Bolt,
	CircleGauge,
	CreditCard,
	LogOut,
} from "lucide-react"

import { supabase } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PreferenceMenu from "@/components/layout/preference-menu"

export default function Auth() {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user || null)
		})

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [])

	if (user) {
		return (
			<>
				<Link href="/dashboard">
					<Button variant="outline" className="rounded-full">
						<CircleGauge />
						Dashboard
				</Button>
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={user.user_metadata?.avatar_url} />
							<AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>
							<span className="truncate font-semibold">{user.user_metadata?.name || user.email?.split("@")[0]}</span>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/dashboard">
								<DropdownMenuItem>
									<CircleGauge />
									Dashboard
								</DropdownMenuItem>
							</Link>
							<Link href="/settings">
								<DropdownMenuItem>
									<Bolt />
									Settings
								</DropdownMenuItem>
							</Link>
							<Link href="/billing">
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<PreferenceMenu />
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => supabase.auth.signOut()}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu></>
		)
	}

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
