'use client'

import { AuthFormLayout } from '@/components/modules/auth/form/layout'
import { Button } from '@/components/ui/button'
import { providers } from '@/modules/auth'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function AuthForm() {
  const t = useTranslations('signin')
  return (
    <AuthFormLayout title={t('title')} description={t('description')}>
      <OAuthButtonGroup />
    </AuthFormLayout>
  )
}

function OAuthButtonGroup() {
  const t = useTranslations('oauth')
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {providers.map(provider => (
        <Button
          key={provider.id}
          className="w-full"
          variant="outline"
          onClick={() => {
            signIn(provider.id, {
              callbackUrl: '/',
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
