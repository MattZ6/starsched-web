import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

type Props = {
  error: Error
  onTryAgain: () => void
}

export function Failure({ onTryAgain }: Props) {
  const { t } = useTranslation('plans', { keyPrefix: 'company-plan.error' })

  return (
    <div className="flex flex-col items-center p-4 border border-border rounded-md">
      <AlertCircle className="size-9" />
      <span className="text-muted-foreground mt-1">
        {t('message')}
      </span>

      <Button type="button" size="sm" className="mt-[13px]" onClick={onTryAgain}>
        {t('try-again.label')}
      </Button>
    </div>
  )
}
