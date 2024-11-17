'use client'

import { AuthFormLayout } from '@/components/modules/auth/layout'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { providers } from '@/modules/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function AuthForm() {
  const t = useTranslations('auth.signin')
  return (
    <AuthFormLayout title={t('title')} description={t('description')}>
      <div className="space-y-6">
        <OAuthButtonGroup />
        {/* <OrSeparator />
        <EmailAuthForm /> */}
      </div>
    </AuthFormLayout>
  )
}

function OAuthButtonGroup() {
  const t = useTranslations('auth.oauth')
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {providers.map(provider => (
        <Button
          key={provider.id}
          className="w-full"
          variant="outline"
          onClick={() => {
            signIn(provider.id, {
              callbackUrl: '/workspace',
            })
          }}
        >
          <provider.logo className="size-5" />
          <span>{t('continue-with', { provider: provider.name })}</span>
        </Button>
      ))}
    </div>
  )
}

export function EmailAuthForm() {
  const t = useTranslations('auth.email')
  const [isSent, setIsSent] = useState(false)

  const formSchema = z.object({
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn('email', { email: values.email, callbackUrl: '/workspace' })
    setIsSent(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('continue')}
        </Button>
      </form>
    </Form>
  )
}

function OrSeparator() {
  const t = useTranslations('auth.signin')
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {t('or')}
        </span>
      </div>
    </div>
  )
}
