import { createWorkspace } from '@/actions/workspace'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function CreateWorkspace() {
  const t = useTranslations('workspace')
  const router = useRouter()

  const createWorkspaceSchema = z.object({
    name: z.string().min(1),
  })

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
  })

  async function onCreateWorkspace(data: z.infer<typeof createWorkspaceSchema>) {
    try {
      const result = await createWorkspace(data)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success(t('create-success'))

      router.push(`/workspace/${result.workspaceId}`)
    }
    catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('create')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreateWorkspace)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t('create')}
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
