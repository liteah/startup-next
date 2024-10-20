"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export interface NavItem {
	link: string
	name: string
	isDanger?: boolean
}

interface SideNavProps {
	navItems: NavItem[]
}

export default function SideNav({ navItems }: SideNavProps) {
	const [activeSection, setActiveSection] = useState("")

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{ threshold: 0.5 },
		)

		navItems.forEach((item) => {
			const element = document.querySelector(item.link)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [navItems])

	return (
		<aside className="sticky top-20 h-[calc(100vh-5rem)] overflow-auto lg:w-1/4">
			<nav className="space-y-1">
				{navItems.map((item, index) => (
					<Link
						key={index}
						href={item.link}
						className={`block rounded-lg p-2 text-sm font-medium ${
							activeSection === item.link.slice(1)
								? "bg-muted text-foreground"
								: item.isDanger
									? "text-destructive hover:bg-destructive/10"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						{item.name}
					</Link>
				))}
			</nav>
		</aside>
	)
}
