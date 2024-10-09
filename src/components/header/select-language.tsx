"use client"

import { useState } from "react"
import { languages } from "@/i18n"
import { Globe } from "lucide-react"
import { useLocale } from "next-intl"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "@/app/navigation"

export default function LocaleSwitcher() {
	const currentLocale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const currentLanguageLabel = languages.find((language) => language.lang === currentLocale)?.label || ""
	const [localeVal, setLocaleVal] = useState(currentLocale)

	const onValueChange = (newLocale: string) => {
		setLocaleVal(newLocale)
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<Select value={localeVal} defaultValue={currentLocale} onValueChange={onValueChange}>
			<SelectTrigger className="flex w-full items-center gap-1 px-2 focus:ring-0">
				<Globe size={16} />
				<SelectValue placeholder="locale" className="text-sm">
					{currentLanguageLabel}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Language</SelectLabel>
					{languages.map((language) => (
						<SelectItem value={language.lang} key={language.code}>
							{language.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
