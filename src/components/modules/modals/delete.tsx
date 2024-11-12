import type { Workspace } from '@prisma/client'
import { deleteWorkspace, getUserWorkspaces } from '@/actions/workspace'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface DeleteModalProps {
  type: 'workspace' | 'project' | 'account'
}

export function DeleteModal({ type }: DeleteModalProps) {
  return (
    <DialogContent>
      {type === 'workspace' && <DeleteWorkspace />}
    </DialogContent>
  )
}

function DeleteWorkspace() {
  const t = useTranslations()
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState(true)
  const [workspaceName, setWorkspaceName] = useState('')

  useEffect(() => {
    const loadWorkspace = async () => {
      setIsLoadingWorkspace(true)
      try {
        const workspaces = await getUserWorkspaces()
        const currentWorkspace = workspaces.find(w => w.id === params.workspaceId)
        if (currentWorkspace)
          setWorkspaceName(currentWorkspace.name)
      }
      catch (error) {
        toast.error((error as Error).message)
      }
      finally {
        setIsLoadingWorkspace(false)
      }
    }
    loadWorkspace()
  }, [params.workspaceId])

  const schema = z.object({
    confirm: z.string().refine(value => value === workspaceName, {
      message: t('workspace.settings.delete-confirm-error', { name: workspaceName }),
    }),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirm: '',
    },
  })

  async function onDeleteWorkspace(values: z.infer<typeof schema>) {
    if (values.confirm !== workspaceName)
      return

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
      toast.error((error as Error).message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('workspace.settings.delete')}</DialogTitle>
        <DialogDescription>
          {!isLoadingWorkspace && t('workspace.settings.delete-description', { name: workspaceName })}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onDeleteWorkspace)} className="space-y-4">
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('workspace.settings.delete-confirm-label')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={workspaceName}
                    disabled={isLoadingWorkspace}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="destructive"
            type="submit"
            disabled={
              form.formState.isSubmitting
              || isLoading
              || isLoadingWorkspace
              || !workspaceName
              || form.watch('confirm') !== workspaceName
            }
          >
            {t('workspace.settings.delete')}
          </Button>
        </form>
      </Form>
    </>
  )
}
