import * as React from "react"
import { CreditCard, LifeBuoy, Send, UserCircle2, type LucideIcon } from "lucide-react"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string
		url: string
		icon: LucideIcon
	}[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild size="sm">
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="sm">
							<Link href="#">
								<Send />
								<span>Feedback</span>
							</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild size="sm">
							<Link href="/settings">
								<UserCircle2 />
								<span>Account Settings</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
