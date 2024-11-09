import { updateUserGeneralSettings } from '@/actions/update-user-settings'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Cog, Loader2, Lock, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function AccountSettings() {
  const t = useTranslations('account.settings')
  const [activeSection, setActiveSection] = useState('general')

  const generalRef = useRef<HTMLDivElement>(null)
  const securityRef = useRef<HTMLDivElement>(null)
  const dangerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (section: string) => {
    const refs = {
      general: generalRef,
      security: securityRef,
      danger: dangerRef,
    }

    const element = refs[section as keyof typeof refs]?.current
    if (!element)
      return

    const scrollContainer = element.closest('.settings-content')
    if (!scrollContainer)
      return

    const containerTop = scrollContainer.getBoundingClientRect().top
    const elementTop = element.getBoundingClientRect().top
    const offset = elementTop - containerTop

    scrollContainer.scrollTo({
      top: scrollContainer.scrollTop + offset,
      behavior: 'smooth',
    })

    setActiveSection(section)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">{t('button')}</DialogTitle>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <SidebarProvider className="items-start">
          <SidebarNav activeSection={activeSection} onSectionClick={scrollToSection} />
          <main className="flex h-[500px] flex-1 flex-col overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
              <span className="text-md">{t('button')}</span>
            </header>
            <div className="settings-content flex flex-1 flex-col gap-8 overflow-y-auto p-4">
              <div ref={generalRef}>
                <GeneralSettings />
              </div>
              <div ref={securityRef}>
                <SecuritySettings />
              </div>
              <div ref={dangerRef}>
                <DangerSettings />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </>
  )
}

function SidebarNav({
  activeSection,
  onSectionClick,
}: {
  activeSection: string
  onSectionClick: (section: string) => void
}) {
  const t = useTranslations('settings')

  const nav = [
    { id: 'general', name: t('general'), icon: Cog },
    { id: 'security', name: t('security'), icon: Lock },
    { id: 'danger', name: t('danger'), icon: Trash },
  ]

  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    onClick={() => onSectionClick(item.id)}
                  >
                    <button>
                      <item.icon />
                      <span>{item.name}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
function GeneralSettings() {
  const t = useTranslations()
  const { data: session, update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const schema = z.object({
    name: z.string().min(1, { message: t('account.settings.error.name') }),
    avatar: z.string().optional(),
    email: z.string().email({ message: t('account.settings.error.email') }),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: session?.user?.name || '',
      avatar: session?.user?.avatar || '',
      email: session?.user?.email || '',
    },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true)

    try {
      const result = await updateUserGeneralSettings(values)

      if (result.success) {
        await updateSession()

        toast.success(t('settings.success'), {
          description: t('settings.updated'),
        })
      }
      else {
        throw new Error(result.error)
      }
    }
    catch (error) {
      toast.error(t('settings.error'), {
        description: (error as Error).message,
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <SettingsTitle title={t('settings.general')} icon={Cog} />
        <SettingsItem
          title={t('account.settings.name')}
          description={t('account.settings.name-description')}
          vertical
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </SettingsItem>
        <SettingsItem
          title={t('account.settings.avatar')}
          description={t('account.settings.avatar-description')}
          vertical
        >
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </SettingsItem>
        <SettingsItem
          title={t('account.settings.email')}
          description={t('account.settings.email-description')}
          vertical
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </SettingsItem>
        <Button
          type="submit"
          className="w-fit"
          disabled={isLoading}
        >
          {isLoading
            ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('settings.saving')}
                </>
              )
            : (
                t('settings.save')
              )}
        </Button>
      </form>
    </Form>
  )
}

function SecuritySettings() {
  const t = useTranslations()
  return (
    <div className="flex flex-col gap-4">
      <SettingsTitle title={t('settings.security')} icon={Lock} />
      <SettingsItem title={t('account.settings.password')} description={t('account.settings.password-description')} vertical>
        <Button variant="outline">{t('settings.change')}</Button>
      </SettingsItem>
    </div>
  )
}

function DangerSettings() {
  const t = useTranslations()
  return (
    <div className="flex flex-col gap-4">
      <SettingsTitle title={t('settings.danger')} icon={Trash} />
      <SettingsItem title={t('account.settings.delete-account')} description={t('account.settings.delete-account-description')} vertical>
        <Button variant="destructive">{t('settings.delete')}</Button>
      </SettingsItem>
    </div>
  )
}

function SettingsTitle({ title, icon: Icon }: { title: string, icon: React.ElementType }) {
  return (
    <span className="flex items-center gap-2 text-xl font-bold">
      <Icon />
      {title}
    </span>
  )
}

function SettingsItem({ title, description, vertical = false, children }: { title: string, description?: string, vertical?: boolean, children: React.ReactNode }) {
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
