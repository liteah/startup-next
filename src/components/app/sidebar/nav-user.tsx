"use client"

import Link from "next/link"
import { languages } from "@/i18n"
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	Globe,
	Home,
	LogOut,
	MonitorSmartphone,
	Moon,
	Sun,
	SunMoon,
} from "lucide-react"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import PreferenceMenu from "@/components/layout/preference-menu"
import { usePathname, useRouter } from "@/app/navigation"

export function NavUser({
	user,
}: {
	user: {
		email: string
		user_metadata: {
			avatar_url?: string
			name?: string
		}
	}
}) {
	const { setTheme } = useTheme()
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()
	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			toast.error("Logout failed")
		} else {
			toast.success("Log out success")
		}
	}
	const onLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
	}
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.user_metadata?.avatar_url} />
								<AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.user_metadata?.name || user.email?.split("@")[0]}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<Link href="/">
							<DropdownMenuItem>
								<Home />
								Home
							</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<PreferenceMenu />
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
