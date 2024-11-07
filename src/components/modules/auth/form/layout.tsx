import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthFormLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  emoji?: string
}

export function AuthFormLayout({ children, title, description, emoji = '' }: AuthFormLayoutProps) {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-col">
        <CardTitle className="flex flex-col gap-1.5">
          <span className="text-3xl lg:text-5xl">{emoji}</span>
          <span className="text-2xl lg:text-3xl font-bold">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
