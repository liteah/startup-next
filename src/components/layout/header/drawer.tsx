import Link from "next/link"
import app from "@/constants"
import { ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import SelectLanguage from "@/components/layout/select-language"
import ToggleTheme from "@/components/layout/toggle-theme"

export default function DrawerHeader() {
	const headerPanelTriggerClass = cn(
		"flex",
		"items-center",
		"gap-2",
		"rounded-lg",
		"px-2",
		"py-1",
		"text-muted-foreground",
		"transition-all",
		"hover:text-primary",
	)
	return (
		<Drawer>
			<DrawerTrigger>
				<Menu />
			</DrawerTrigger>
			<DrawerContent>
				<div className="m-6 space-y-8 lg:hidden">
					<nav className="grid items-start gap-2.5 font-medium">
						{app.header.links.map((item, index) => (
							<Link key={index} href={item.href} className={headerPanelTriggerClass}>
								{item.code}
								<span className="ml-1">
									<ChevronRight size={16} />
								</span>
							</Link>
						))}
					</nav>
					<nav className="flex w-full items-center gap-2.5">
						<SelectLanguage />
						<ToggleTheme />
					</nav>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
