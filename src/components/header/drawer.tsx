import Link from "next/link"
import app from "@/constants"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import SelectLanguage from "@/components/header/select-language"
import { cn } from "@/lib/utils"
import { Menu, ChevronRight } from "lucide-react"

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
        <div className='space-y-8 m-6 lg:hidden'>
          <nav className='grid items-start gap-2.5 font-medium'>
            {app.header.links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={headerPanelTriggerClass}
              >
                {item.code}
                <span className='ml-1'>
                  <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </nav>
          <nav className='grid items-start w-full'>
            <SelectLanguage />
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
