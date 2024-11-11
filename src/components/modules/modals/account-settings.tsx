import { updateUserGeneralSettings } from '@/actions/update-user-settings'
import { SettingsItem, SettingsTitle } from '@/components/layouts/settings/items'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Cog, Loader2, Lock, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function AccountSettings() {
  const t = useTranslations('account.settings')

  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">{t('button')}</DialogTitle>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0 sm:max-h-full md:max-h-[500px] md:max-w-[500px]">
        <main className="flex h-[500px] flex-1 flex-col overflow-hidden">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <span className="text-md">{t('button')}</span>
          </header>
          <div className="settings-content flex flex-1 flex-col gap-8 overflow-y-auto p-4">
            <GeneralSettings />
            <SecuritySettings />
            <DangerSettings />
          </div>
        </main>
      </DialogContent>
    </>
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
      <SettingsTitle title={t('settings.security')} icon={Lock} separator />
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
      <SettingsTitle title={t('settings.danger')} icon={Trash} separator />
      <SettingsItem title={t('account.settings.delete-account')} description={t('account.settings.delete-account-description')} vertical>
        <Button variant="destructive">{t('settings.delete')}</Button>
      </SettingsItem>
    </div>
  )
}
