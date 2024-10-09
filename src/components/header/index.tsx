import Link from "next/link"
import app from "@/constants"

import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import DrawerHeader from "@/components/header/drawer"
import SelectLanguage from "@/components/header/select-language"
import ToggleTheme from "@/components/header/toggle-theme"

export default function Header() {
	const headerClass = cn(
		"left-0",
		"top-0",
		"z-50",
		"h-14",
		"border-b",
		"bg-white/75",
		"dark:bg-black/75",
		"backdrop-blur-md",
		"flex",
		"items-center",
		"justify-center",
	)
	return (
		<header className={headerClass}>
			<nav className="mx-auto flex w-full items-center justify-between p-3">
				<div className="flex items-center gap-x-2">
					<Link className="opacity-75 transition-opacity hover:opacity-100" href="/">
						<span className="text-xl font-bold">{app.name}</span>
					</Link>
				</div>
				<div className="flex h-full flex-grow items-center justify-center">
					<div className="hidden lg:flex">
						<NavigationMenu>
							<NavigationMenuList className="flex space-x-4">
								{app.header.links.map((item) => (
									<NavigationMenuItem key={item.href}>
										<Link href={item.href} legacyBehavior passHref>
											<NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-opacity-75`}>
												{item.code}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
				<div className="hidden items-center gap-x-2 lg:flex">
					<SelectLanguage />
					<ToggleTheme />
				</div>
				<div className="flex items-center gap-x-3 lg:hidden">
					<DrawerHeader />
				</div>
			</nav>
		</header>
	)
}
