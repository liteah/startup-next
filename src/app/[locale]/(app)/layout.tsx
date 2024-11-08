import { SessionProvider } from '@/components/common/session-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
