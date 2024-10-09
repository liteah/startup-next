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
import DrawerHeader from "@/components/layout/header/drawer"
import SelectLanguage from "@/components/layout/select-language"
import ToggleTheme from "@/components/layout/toggle-theme"

export default function Header() {
	const headerClass = cn("bg-background/55", "backdrop-blur", "border-b", "sticky", "top-0", "z-50")
	return (
		<header className={headerClass}>
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-3">
				<Link href="/" className="flex items-center gap-1.5 lg:flex-1">
					{app.logo}
					<span className="text-xl font-bold">{app.name}</span>
				</Link>
				<div className="hidden lg:flex">
					<NavigationMenu>
						<NavigationMenuList className="flex space-x-2">
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
				<div className="flex items-center justify-end gap-1.5 lg:flex-1">
					<div className="hidden gap-2 lg:flex">
						{app.header.showLanguage && <SelectLanguage />}
						{app.header.showTheme && <ToggleTheme />}
					</div>
					<div className="flex lg:hidden">
						<DrawerHeader />
					</div>
				</div>
			</nav>
		</header>
	)
}
