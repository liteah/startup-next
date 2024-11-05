import { Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ProductLogo() {
  const t = useTranslations('brand')
  return (
    <div className="flex items-center gap-1.5">
      <Rocket className="size-6" />
      <span className="text-lg font-bold">
        {t('name')}
      </span>
    </div>
  )
}
