'use client'

import { deleteWorkspace, getUserWorkspaces, updateWorkspaceSettings } from '@/actions/workspace'

import { SettingsItem, SettingsTitle } from '@/components/layouts/settings/items'
import { SettingsNav } from '@/components/layouts/settings/nav'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Cog, Loader2, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function WorkspaceSettings() {
  const t = useTranslations()

  const navItems = [
    { name: t('settings.general'), link: '#general', icon: Cog },
    { name: t('settings.danger'), link: '#danger', icon: Trash },
  ]

  return (
    <div className="flex flex-1 flex-col gap-8 sm:mx-auto md:mx-16 lg:mx-32 pt-16">
      <h1 className="text-2xl font-bold">{t('workspace.settings.title')}</h1>
      <Separator />
      <div className="flex flex-col gap-8 lg:flex-row">
        <SettingsNav navItems={navItems} />
        <main className="flex flex-col gap-8 lg:w-3/4">
          <GeneralSettings />
          <DangerSettings />
        </main>
      </div>
    </div>
  )
}

function GeneralSettings() {
  const t = useTranslations()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const schema = z.object({
    name: z.string().min(1, { message: t('workspace.settings.error.name') }),
    avatar: z.string().optional(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      avatar: '',
    },
  })

  useEffect(() => {
    const loadWorkspace = async () => {
      const workspaces = await getUserWorkspaces()
      const currentWorkspace = workspaces.find(w => w.id === params.workspaceId)
      if (currentWorkspace) {
        form.reset({
          name: currentWorkspace.name,
          avatar: currentWorkspace.avatar || '',
        })
      }
    }
    loadWorkspace()
  }, [params.workspaceId, form])

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true)

    try {
      const result = await updateWorkspaceSettings(params.workspaceId as string, values)

      if (result.success) {
        toast.success(t('workspace.settings.success'), {
          description: t('workspace.settings.updated'),
        })
      }
      else {
        throw new Error(result.error)
      }
    }
    catch (error) {
      toast.error(t('workspace.settings.error'), {
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

function DangerSettings() {
  const t = useTranslations()
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(t('workspace.settings.delete-confirm'))) {
      return
    }

    setIsLoading(true)

    try {
      const result = await deleteWorkspace(params.workspaceId as string)

      if (result.success) {
        toast.success(t('workspace.settings.deleted'))
        router.push('/workspace')
      }
      else {
        throw new Error(result.error)
      }
    }
    catch (error) {
      toast.error(t('workspace.settings.error'), {
        description: (error as Error).message,
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SettingsTitle title={t('settings.danger')} icon={Trash} separator />
      <SettingsItem
        title={t('workspace.settings.delete')}
        description={t('workspace.settings.delete-description')}
        vertical
      >
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading
            ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('workspace.settings.deleting')}
                </>
              )
            : (
                t('workspace.settings.delete')
              )}
        </Button>
      </SettingsItem>
    </div>
  )
}
