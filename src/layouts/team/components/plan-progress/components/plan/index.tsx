import { useTranslation } from "react-i18next"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { CompanyPlan } from "@starsched/sdk"

import { useLanguage } from "@/hooks/use-language"

import { PriceUtils } from "@/utils/price"

import { Separator } from "@/components/ui/separator"

import { Progress } from "./components/progress"

type Props = {
  plan: CompanyPlan
}

export function Plan({ plan }: Props) {
  const { t } = useTranslation('plans', { keyPrefix: 'company-plan' })
  const { language } = useLanguage()

  const usedSeats = plan.member.current_active + plan.member.invited
  const limit = plan.member.limit ?? 0

  const limitExceeded = plan.member.limit !== null && usedSeats >= limit

  const formattedMonthlyPrice = PriceUtils.formatPrice(
    plan.price_in_cents,
    { locale: language }
  )

  return (
    <article className="flex flex-col border border-border rounded-md">
      <div className="flex items-center gap-6 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold tracking-tight">
            {t('name', { name: plan.name })}
            {limitExceeded && (
              <span
                className={"inline-flex items-center gap-1 shrink-0 font-normal text-sm text-nowrap ml-2 text-orange-600 dark:text-orange-400 py-0.5 pl-1.5 pr-2.5 rounded-full border-orange-600 dark:border-orange-400 border"}
              >
                <AlertCircle className="size-4" />
                {t('members-limit-exceeded')}
              </span>
            )}
          </span>

          <p className="text-muted-foreground">
            {/* TODO: O que colocar de texto aqui? */}
            Nosso plano mais popular para clínicas de médio porte. Até {limit} membros.
          </p>
        </div>

        <span className="font-semibold text-3xl tracking-tight ml-auto">
          {plan.price_in_cents ? t('price', { price: formattedMonthlyPrice }) : t('free')}
        </span>
      </div>

      <Separator />

      <div className="flex items-center gap-4 p-4">
        {limit ? (
          <>
            <Progress
              currentCount={plan.member.current_active}
              pendingCount={plan.member.invited}
              limit={limit}
            />
            <span
              className={"flex items-center gap-1 shrink-0 text-sm text-nowrap"}
            >
              {t('members-label', { count: usedSeats, total: limit })}
            </span>
          </>
        ) : (
          <span className="flex items-center gap-2 shrink-0 text-sm text-nowrap text-muted-foreground">
            <CheckCircle2 className="size-4" /> {t('no-limits')}
          </span>
        )}
      </div>
    </article >
  )
}
