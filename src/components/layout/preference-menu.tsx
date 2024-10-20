"use client"

import { languages } from "@/i18n"
import { Globe, MonitorSmartphone, Moon, Sun, SunMoon } from "lucide-react"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"

import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/app/navigation"

export default function PreferenceMenu() {
	const { setTheme } = useTheme()
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const onLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<DropdownMenuGroup>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>
					<Globe className="mr-2 size-4" />
					Languages
				</DropdownMenuSubTrigger>
				<DropdownMenuSubContent>
					{languages.map((language) => (
						<DropdownMenuItem
							key={language.lang}
							onClick={() => onLanguageChange(language.lang)}
							className="flex items-center justify-between"
						>
							{language.label}
							{currentLocale === language.lang && <span className="ml-2">✓</span>}
						</DropdownMenuItem>
					))}
				</DropdownMenuSubContent>
			</DropdownMenuSub>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>
					<Sun className="mr-2 block size-4 dark:hidden" />
					<Moon className="mr-2 hidden size-4 dark:block" />
					Appearance
				</DropdownMenuSubTrigger>
				<DropdownMenuSubContent>
					<DropdownMenuItem onClick={() => setTheme("light")}>
						<Sun />
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						<Moon />
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						<MonitorSmartphone />
						System
					</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuSub>
		</DropdownMenuGroup>
	)
}
