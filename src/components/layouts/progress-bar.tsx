'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useTheme } from 'next-themes'

export function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color={theme === 'dark' ? '#ffffff' : '#000000'}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
