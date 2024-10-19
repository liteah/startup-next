"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { languages } from "@/i18n"
import { User } from "@supabase/supabase-js"
import {
	BoltIcon,
	CircleGaugeIcon,
	CreditCardIcon,
	Globe,
	LogOutIcon,
	MonitorSmartphoneIcon,
	MoonIcon,
	SunIcon,
	SunMoonIcon,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"

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
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/app/navigation"

export default function Auth() {
	const [user, setUser] = useState<User | null>(null)
	const { setTheme } = useTheme()
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()
	const t = useTranslations("Auth")

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user || null)
		})

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [])

	const onLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
	}

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={user.user_metadata?.avatar_url} />
						<AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{user.user_metadata?.name || user.email?.split("@")[0]}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link href="/dashboard">
							<DropdownMenuItem>
								<CircleGaugeIcon className="mr-2 size-4" />
								Dashboard
							</DropdownMenuItem>
						</Link>
						<Link href="/settings">
							<DropdownMenuItem>
								<BoltIcon className="mr-2 size-4" />
								Settings
							</DropdownMenuItem>
						</Link>
						<Link href="/billing">
							<DropdownMenuItem>
								<CreditCardIcon className="mr-2 size-4" />
								Billing
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<Globe className="mr-2 size-4" />
							Languages
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							{languages.map((language) => (
								<DropdownMenuItem key={language.lang} onClick={() => onLanguageChange(language.lang)}>
									{language.label}
									{currentLocale === language.lang && <span className="ml-2">✓</span>}
								</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<SunMoonIcon className="mr-2 size-4" />
							Theme Mode
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setTheme("light")}>
								<SunIcon className="mr-2 size-4" />
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								<MoonIcon className="mr-2 size-4" />
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								<MonitorSmartphoneIcon className="mr-2 size-4" />
								System
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => supabase.auth.signOut()}>
						<LogOutIcon className="mr-2 size-4" />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
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
