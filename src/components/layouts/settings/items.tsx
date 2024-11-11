import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export function SettingsTitle({ title, icon: Icon, separator = false }: { title: string, icon: React.ElementType, separator?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      {separator && <Separator />}
      <span className="flex items-center gap-2 text-xl font-bold">
        <Icon />
        {title}
      </span>
    </div>
  )
}

export function SettingsItem({ title, description, vertical = false, children }: { title: string, description?: string, vertical?: boolean, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn('flex items-center justify-between', vertical && 'items-start flex-col gap-2.5')}>
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
        {children}
      </div>
    </div>
  )
}
