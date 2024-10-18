"use client"

import { languages } from "@/i18n"
import { Globe } from "lucide-react"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/app/navigation"

export default function LocaleSwitcher() {
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const onValueChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-10 bg-background/40 backdrop-blur-md focus-visible:ring-0"
				>
					<Globe size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="bg-background/85 backdrop-blur-md">
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.lang}
						onClick={() => onValueChange(language.lang)}
						className="flex items-center justify-between"
					>
						{language.label}
						{currentLocale === language.lang && <span className="ml-2">✓</span>}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
