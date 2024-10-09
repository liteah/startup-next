"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import app from "@/constants"
import { cn } from "@/lib/utils"
import SelectLanguage from "@/components/header/select-language"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"

export default function Header() {
	const pathname = usePathname()
	const headerClass = cn(
		"left-0 top-0 z-50 h-14 border-b border-gray-200/75 bg-white/75 backdrop-blur-md flex items-center justify-center",
	)
	return (
		<header className={headerClass}>
			<nav className='flex mx-auto p-3 w-full justify-between items-center'>
				<div className='flex items-center gap-x-2'>
					<Link className='opacity-75 hover:opacity-100 transition-opacity' href='/'>
						<span className='text-xl font-bold'>
              {app.name}
            </span>
					</Link>
				</div>
				<div className='flex h-full items-center justify-center flex-grow'>
					<div className='hidden lg:flex'>
            <NavigationMenu>
              <NavigationMenuList className='flex space-x-4'>
                {app.header.links.map((item) => (
                  <NavigationMenuItem key={item.href}>
								  	<Link href={item.href} legacyBehavior passHref>
								  		<NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
								  			{item.code}
								  		</NavigationMenuLink>
								  	</Link>
								  </NavigationMenuItem>
								))}
							</NavigationMenuList>
					  </NavigationMenu>
					</div>
				</div>
        <div className='hidden lg:flex items-center gap-x-3'>
					<SelectLanguage />
				</div>
			</nav>
		</header>
	)
}
