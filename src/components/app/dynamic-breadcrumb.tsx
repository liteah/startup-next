"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeMap: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/settings": "Account Settings",
}

export default function DynamicBreadcrumb() {
	const pathname = usePathname()
	const pathSegments = pathname.split("/").filter(Boolean)

	const relevantSegments = pathSegments.length > 1 ? pathSegments.slice(1) : pathSegments

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{relevantSegments.map((segment, index) => {
					const path = `/${relevantSegments.slice(0, index + 1).join("/")}`
					const isLast = index === relevantSegments.length - 1

					return (
						<BreadcrumbItem key={path}>
							{index > 0 && <BreadcrumbSeparator />}
							{isLast ? (
								<BreadcrumbPage>{routeMap[path] || segment}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={path}>{routeMap[path] || segment}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
