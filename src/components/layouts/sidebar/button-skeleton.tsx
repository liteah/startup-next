import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export function ButtonSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex gap-2">
        <Skeleton className="flex aspect-square size-8 items-center justify-center rounded-lg" />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
